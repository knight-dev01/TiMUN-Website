import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './site';

/** Set/replace a <meta name|property> tag. */
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Apply runtime SEO tags (SPA-safe). Call once in App + on route/section change. */
export function applySeo(opts?: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}) {
  if (typeof document === 'undefined') return;
  const title = opts?.title || `${SITE_NAME} 2027 | Yaba, Lagos`;
  const description = opts?.description || SITE_DESCRIPTION;
  const url = `${SITE_URL}${opts?.path || '/'}`;
  const image = opts?.image || `${SITE_URL}/og-image.png`;

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertLink('canonical', url);

  // Open Graph
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', image);

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', image);
}

/** JSON-LD structured data for the conference (Event + Organization). */
export function conferenceJsonLd(opts: {
  name: string;
  startDate: string;
  endDate: string;
  locationName: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Trinity International Model United Nations (TiMUN)',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        email: 'secretariat@timun.org',
      },
      {
        '@type': 'Event',
        name: opts.name || 'TiMUN 2027',
        description: opts.description || SITE_DESCRIPTION,
        startDate: opts.startDate || '2027',
        endDate: opts.endDate || '2027',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: opts.locationName || 'Trinity University, Yaba, Lagos',
        },
        organizer: {
          '@type': 'Organization',
          name: 'TiMUN Secretariat',
          url: SITE_URL,
        },
      },
    ],
  };
}

/** Inject (or refresh) the JSON-LD script tag. */
export function injectJsonLd(id: string, data: unknown) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLScriptElement>(
    `script[data-jsonld="${id}"]`
  );
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-jsonld', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
