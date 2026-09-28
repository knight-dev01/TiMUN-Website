/**
 * Delegate Passport — Duolingo psychology, TiMUN professionalism.
 *
 * The loop: every meaningful prep action earns XP, consecutive visit days
 * build a streak, and ranks mark the road from curious visitor to
 * seated delegate. All local-first (localStorage), zero backend.
 */

export interface Passport {
  xp: number;
  streakDays: number;
  lastVisitDay: string; // yyyy-mm-dd
  done: Record<string, boolean>;
  updatedAt: number;
}

const KEY = 'timun_passport_v1';

export const XP_ACTIONS = {
  registered: 100,
  resolution_opened: 20,
  resolution_saved: 50,
  subscribed: 15,
  story_read: 10,
  committees_explored: 10,
  toolkit_opened: 10,
} as const;

export type XpAction = keyof typeof XP_ACTIONS;

export const RANKS = [
  { min: 0, title: 'Curious Observer' },
  { min: 30, title: 'Aspiring Delegate' },
  { min: 80, title: 'Seated Delegate' },
  { min: 150, title: 'Seasoned Diplomat' },
  { min: 250, title: 'Ambassador of the Hall' },
] as const;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  return new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
}

export function readPassport(): Passport {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Passport;
      if (typeof p.xp === 'number') return p;
    }
  } catch {
    /* ignore */
  }
  return { xp: 0, streakDays: 0, lastVisitDay: '', done: {}, updatedAt: Date.now() };
}

function writePassport(p: Passport) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(new CustomEvent('timun:xp'));
  } catch {
    /* ignore */
  }
}

/** Record a daily visit (call once per load) — maintains the streak. */
export function touchVisit(): Passport {
  const p = readPassport();
  const t = today();
  if (p.lastVisitDay !== t) {
    p.streakDays = p.lastVisitDay === yesterday() ? p.streakDays + 1 : 1;
    p.lastVisitDay = t;
    p.updatedAt = Date.now();
    writePassport(p);
  }
  return p;
}

/**
 * Award XP for an action. Repeatable actions (story_read) grant XP every
 * time; milestone actions grant once. Returns the updated passport and
 * whether this specific grant was new.
 */
export function awardXp(action: XpAction): { passport: Passport; fresh: boolean } {
  const p = touchVisit();
  const once = action === 'registered' || action === 'subscribed' || action === 'resolution_saved';
  if (once && p.done[action]) return { passport: p, fresh: false };
  p.xp += XP_ACTIONS[action];
  if (once) p.done[action] = true;
  p.updatedAt = Date.now();
  writePassport(p);
  return { passport: p, fresh: true };
}

/** Mark a journey node complete without XP (e.g. section visited). */
export function markDone(key: string) {
  const p = touchVisit();
  if (!p.done[key]) {
    p.done[key] = true;
    p.updatedAt = Date.now();
    writePassport(p);
  }
}

export function rankFor(xp: number): string {
  let title: string = RANKS[0].title;
  for (const r of RANKS) {
    if (xp >= r.min) title = r.title;
  }
  return title;
}

export function nextRankFor(xp: number): { title: string; need: number } | null {
  for (const r of RANKS) {
    if (xp < r.min) return { title: r.title, need: r.min - xp };
  }
  return null;
}
