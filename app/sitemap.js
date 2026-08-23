const BASE = 'https://atroposathome.com.au'
const NOW  = new Date().toISOString()

export default function sitemap() {
  return [
    { url: BASE,                   lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/smart-home`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/home-theatre`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/audio`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/network`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/acoustic`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/support`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,        lastModified: NOW, changeFrequency: 'yearly',  priority: 0.6 },
  ]
}
