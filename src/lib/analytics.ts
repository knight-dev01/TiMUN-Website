/**
 * Lightweight privacy-friendly analytics.
 * - Always logs events to localStorage (for the executive dashboard).
 * - If VITE_GA_MEASUREMENT_ID is set, forwards page_views + events to GA4 (gtag).
 *
 * No cookies, no fingerprinting. Works offline-first.
 */

export interface AnalyticsEvent {
  id: string;
  name: string;
  data?: Record<string, string | number | boolean>;
  ts: number;
  path: string;
}

const EVENTS_KEY = 'timun_analytics_events_v1';
const MAX_EVENTS = 1000;

function readEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEvents(events: AnalyticsEvent[]) {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch {
    /* storage full / private mode — ignore */
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let gaInitialised = false;

function gaId(): string {
  return (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID || '';
}

function ensureGa() {
  if (gaInitialised || typeof document === 'undefined') return;
  const id = gaId();
  if (!id) return;
  // Inject gtag.js once
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    (window.dataLayer as unknown[]).push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  gaInitialised = true;
}

export function trackEvent(
  name: string,
  data?: Record<string, string | number | boolean>
) {
  const path =
    typeof window !== 'undefined'
      ? window.location.pathname + window.location.hash
      : '/';
  const evt: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    data,
    ts: Date.now(),
    path,
  };
  // 1) local log (dashboard source of truth)
  const events = readEvents();
  events.push(evt);
  writeEvents(events);

  // 2) GA4 passthrough (optional)
  try {
    ensureGa();
    if (gaId() && typeof window.gtag === 'function') {
      window.gtag('event', name, { ...data, page_path: path });
    }
  } catch {
    /* never break the app for analytics */
  }
}

export function trackPageView(section?: string) {
  trackEvent('page_view', section ? { section } : undefined);
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  return readEvents();
}

export function clearAnalyticsEvents() {
  try {
    localStorage.removeItem(EVENTS_KEY);
  } catch {
    /* ignore */
  }
}

export interface AnalyticsSummary {
  totalEvents: number;
  pageViews: number;
  registrationStarted: number;
  registrationCompleted: number;
  paymentInitiated: number;
  paymentSuccess: number;
  paymentFailed: number;
  resolutionOpened: number;
  byDay: { day: string; count: number }[];
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = readEvents();
  const count = (n: string) => events.filter((e) => e.name === n).length;
  const byDayMap = new Map<string, number>();
  for (const e of events) {
    const day = new Date(e.ts).toISOString().slice(0, 10);
    byDayMap.set(day, (byDayMap.get(day) || 0) + 1);
  }
  const byDay = [...byDayMap.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .slice(-14)
    .map(([day, c]) => ({ day, count: c }));
  return {
    totalEvents: events.length,
    pageViews: count('page_view'),
    registrationStarted: count('registration_started'),
    registrationCompleted: count('registration_completed'),
    paymentInitiated: count('payment_initiated'),
    paymentSuccess: count('payment_success'),
    paymentFailed: count('payment_failed'),
    resolutionOpened: count('resolution_builder_opened'),
    byDay,
  };
}
