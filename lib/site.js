/**
 * The site's canonical origin.
 *
 * Every absolute URL the app emits derives from this: canonical tags, og:url,
 * the sitemap, robots' sitemap pointer, the JSON-LD @id graph, and Zoho's
 * returnURL. It exists as one constant because the domain has moved once
 * already — atroposathome.com.au → atropos.com.au, on the rebrand to a single
 * Atropos identity covering residential and commercial — and at that point the
 * value was duplicated across sixteen files.
 *
 * No trailing slash. Everything concatenates onto it.
 *
 * Changing this is not sufficient on its own. The domain is also configured
 * outside the codebase, and those copies fail silently when they disagree:
 *
 *   - GitHub Pages custom domain (repo Settings → Pages) and public/CNAME
 *   - The Zoho webform's Form Location URL list, which is validated per page —
 *     a missed entry still creates the lead but never confirms it to the visitor
 *   - The Zoho webform's Action on Submission URL, which must match returnUrl
 *   - The welcome email template's logo and footer links
 *
 * See docs/LAUNCH.md.
 */
export const SITE_URL = 'https://atropos.com.au'
