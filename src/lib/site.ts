/**
 * Central site configuration for SEO, links, and integrations.
 * All values can be overridden with Vite env vars (see .env.example).
 * No domain is hard-required: SITE_URL falls back to a placeholder
 * that executives can replace once DNS is live.
 */

export const SITE_URL =
  (import.meta as any)?.env?.VITE_SITE_URL?.replace(/\/$/, '') ||
  'https://ti-mun-website.vercel.app';

export const SITE_NAME = 'TiMUN — Trinity International Model United Nations';
export const SITE_SHORT_NAME = 'TiMUN 2027';
export const SITE_DESCRIPTION =
  'TiMUN 2027 is the inaugural Trinity International Model United Nations conference at Trinity University, Yaba, Lagos: youth diplomacy, delegate stories, venue and registration. Nov 12–14, 2027.';
export const SITE_KEYWORDS = [
  'Model United Nations',
  'MUN Nigeria',
  'MUN Lagos',
  'MUN Yaba',
  'TiMUN',
  'Trinity International Model United Nations',
  'Trinity University Yaba',
  'delegate registration',
  'youth diplomacy Nigeria',
].join(', ');

export const SITE_THEME_COLOR = '#00387d';
export const SITE_LOCALE = 'en_US';
export const SITE_TWITTER_HANDLE = '@timun_org';

export const CONTACT_EMAIL =
  (import.meta as any)?.env?.VITE_CONTACT_EMAIL || 'secretariat@timun.org';
