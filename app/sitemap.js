const BASE = 'https://atroposathome.com.au'
const NOW  = new Date().toISOString()

// Next's metadata resolver renders every canonical tag with a trailing slash
// under trailingSlash: true, root included, but a plain template string here
// would not. Route through this helper so <loc> always agrees with the
// canonical the page itself renders.
const url = (path) => `${BASE}/${path}`

export default function sitemap() {
  return [
    { url: url(''),              lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: url('smart-home/'),   lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('home-theatre/'), lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('audio/'),        lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('network/'),      lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('acoustic/'),     lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('support/'),      lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('about/'),        lastModified: NOW, changeFrequency: 'yearly',  priority: 0.6 },
  ]
}
