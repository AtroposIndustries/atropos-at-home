// Relative, not the @/ alias: lib/routes.test.mjs imports this file, and
// `node --test` cannot resolve jsconfig path aliases. Next handles relative
// imports identically.
import { ROUTES, routeUrl } from '../lib/routes.js'

const NOW = new Date().toISOString()

/**
 * Driven from lib/routes.js so a new page cannot be added without appearing
 * here. routeUrl applies the trailing slash, which must match the canonical
 * each page renders under trailingSlash: true.
 */
export default function sitemap() {
  return ROUTES.map((r) => ({
    url:             routeUrl(r.path),
    lastModified:    NOW,
    changeFrequency: r.changeFrequency,
    priority:        r.priority,
  }))
}
