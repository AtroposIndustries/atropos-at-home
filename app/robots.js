export default function robots() {
  return {
    rules: [
      { userAgent: '*',             allow: '/', disallow: ['/api/'] },
      { userAgent: 'GPTBot',        allow: '/'                      },
      { userAgent: 'CCBot',         allow: '/'                      },
      { userAgent: 'PerplexityBot', allow: '/'                      },
      { userAgent: 'anthropic-ai',  allow: '/'                      },
      { userAgent: 'Claude-Web',    allow: '/'                      },
    ],
    sitemap: 'https://atroposathome.com.au/sitemap.xml',
  }
}
