import { SITE_URL } from './site.js'

/**
 * Every route on the site, and what it is.
 *
 * This exists because three things must agree and none of them can see the
 * others: the pages that exist, the sitemap, and the Form Location URL list
 * registered inside Zoho. Zoho validates the submitting page's URL per page —
 * an unregistered page still creates the lead but never confirms it to the
 * visitor, and nothing on the site reveals the failure. Nineteen form-bearing
 * pages is well past what anyone can track by eye.
 *
 * `path` has a leading slash and no trailing slash. The homepage is ''.
 * `routeUrl` adds the trailing slash, matching `trailingSlash: true`.
 */
export const ROUTES = [
  { path: '',        vertical: 'none', form: true,  changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/about',  vertical: 'none', form: true,  changeFrequency: 'yearly',  priority: 0.6 },
  { path: '/review', vertical: 'none', form: false, changeFrequency: 'yearly',  priority: 0.3 },

  { path: '/residential',              vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/residential/smart-home',   vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/home-theatre', vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/audio',        vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/network',      vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/acoustic',     vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/support',      vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.7 },

  { path: '/commercial',               vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/commercial/control',       vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/meeting-rooms', vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/audio',         vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/networks',      vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/signage',       vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/acoustic',      vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/support',       vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.7 },
]

/** Absolute URL for a route path, with the trailing slash the site serves. */
export function routeUrl(path) {
  return `${SITE_URL}${path}/`
}

/** Paths that render ContactForm. */
export const FORM_ROUTES = ROUTES.filter((r) => r.form).map((r) => r.path)

/**
 * The Form Location URLs registered in the Zoho webform.
 *
 * Derived rather than hand-listed so the two cannot drift. Kept as a named
 * export because docs/LAUNCH.md instructs a human to paste this exact list
 * into Zoho — printing it is the point.
 */
export const REGISTERED_FORM_URLS = FORM_ROUTES.map(routeUrl)
