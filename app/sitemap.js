const BASE = 'https://atroposathome.com.au'
const NOW  = new Date().toISOString()

// Next's metadata resolver normalises canonical tags to match trailingSlash:
// true (e.g. /about/), but a plain template string here would not. Route
// through this helper so <loc> values always agree with the canonical the
// page itself renders. The root path has no trailing slash either way.
const url = (path) => (path ? `${BASE}/${path}/` : BASE)

export default function sitemap() {
  return [
    { url: url(''),             lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: url('smart-home'),   lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('home-theatre'), lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('audio'),        lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('network'),      lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('acoustic'),     lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('support'),      lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('about'),        lastModified: NOW, changeFrequency: 'yearly',  priority: 0.6 },
  ]
}
