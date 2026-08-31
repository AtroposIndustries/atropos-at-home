/**
 * Shared OpenGraph fields every page must repeat.
 *
 * Next.js does not deep-merge `metadata.openGraph` between a layout and a
 * page — a page that sets its own `openGraph` replaces the layout's
 * wholesale, so `siteName`, `locale` and `images` silently disappear from
 * every page that defines `url`/`description` by hand, unless it repeats
 * those fields itself. Nineteen pages did exactly that. Build a page's
 * `openGraph` with `pageOpenGraph()` instead of a hand-written object so the
 * shared fields cannot drift out of a page again.
 */

/** The one Open Graph image the site has. Shared with `app/layout.jsx`'s default. */
export const OG_IMAGE = {
  url:    '/img/og-image.jpg',
  width:  1200,
  height: 630,
  alt:    'Atropos — Integrated Technology for Tasmanian Homes & Businesses',
}

/**
 * Builds a page's `metadata.openGraph`.
 *
 * @param {object}   opts
 * @param {string}   opts.url          - absolute canonical URL for the page
 * @param {string}   opts.description  - og:description text
 * @param {string}  [opts.type]        - og:type, defaults to 'website'
 */
export function pageOpenGraph({ url, description, type = 'website' }) {
  return {
    type,
    locale:   'en_AU',
    siteName: 'Atropos',
    url,
    description,
    images: [OG_IMAGE],
  }
}
