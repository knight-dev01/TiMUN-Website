/**
 * Newsletter subscription — NO backend required.
 *
 * How it works:
 *  1. Every signup is validated + deduped and saved to localStorage, so the
 *     executive dashboard always has the full subscriber list (CSV export).
 *  2. If VITE_NEWSLETTER_ENDPOINT is set (Formspree, Brevo, ConvertKit,
 *     Mailchimp or any JSON webhook), the signup is also POSTed there in the
 *     background and marked `synced: true`. If the POST fails we keep the
 *     local copy and mark `synced: false` for later retry/export.
 *
 * When you outgrow this: point the endpoint at Brevo/Mailchimp (free tiers
 * cover thousands of contacts) and later move the list into Supabase/Firebase.
 * The UI and dashboard code does not need to change.
 */

import { NewsletterSubscriber } from '../types';

const SUBS_KEY = 'timun_newsletter_subs_v1';

function endpoint(): string {
  return (import.meta as any)?.env?.VITE_NEWSLETTER_ENDPOINT || '';
}

export function isNewsletterEndpointConfigured(): boolean {
  return endpoint().startsWith('http');
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function readSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem(SUBS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSubscribers(subs: NewsletterSubscriber[]) {
  try {
    localStorage.setItem(SUBS_KEY, JSON.stringify(subs));
  } catch {
    /* private mode — ignore */
  }
}

export type SubscribeResult =
  | { status: 'synced' | 'saved-local'; subscriber: NewsletterSubscriber }
  | { status: 'duplicate'; subscriber: NewsletterSubscriber }
  | { status: 'invalid' }
  | { status: 'error'; message: string };

export async function subscribeNewsletter(
  email: string,
  name = '',
  source = 'footer'
): Promise<SubscribeResult> {
  const clean = email.trim().toLowerCase();
  if (!isValidEmail(clean)) return { status: 'invalid' };

  const existing = readSubscribers().find((s) => s.email === clean);
  if (existing) return { status: 'duplicate', subscriber: existing };

  const subscriber: NewsletterSubscriber = {
    id: `sub-${Date.now().toString(36)}`,
    email: clean,
    name: name.trim(),
    createdAt: Date.now(),
    source,
    synced: false,
  };

  // Always persist locally first — the dashboard source of truth.
  writeSubscribers([subscriber, ...readSubscribers()]);

  // Best-effort forward to the email service (Formspree/Brevo/etc).
  const url = endpoint();
  if (url) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: clean, name: name.trim(), source, list: 'timun-bulletin' }),
      });
      if (res.ok) {
        subscriber.synced = true;
        writeSubscribers(
          readSubscribers().map((s) => (s.id === subscriber.id ? subscriber : s))
        );
        return { status: 'synced', subscriber };
      }
    } catch {
      /* offline — local copy retained, export later */
    }
  }
  return { status: 'saved-local', subscriber };
}

export function removeSubscriber(id: string) {
  writeSubscribers(readSubscribers().filter((s) => s.id !== id));
}

export function subscribersToCsv(subs: NewsletterSubscriber[]): string {
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = ['email,name,subscribedAt,source,synced'];
  for (const s of subs) {
    lines.push(
      [s.email, s.name, new Date(s.createdAt).toISOString(), s.source, s.synced]
        .map(esc)
        .join(',')
    );
  }
  return lines.join('\n');
}
