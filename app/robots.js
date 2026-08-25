import { SITE_URL } from '@/lib/site'

export default function robots() {
  return {
    rules: [
      { userAgent: '*',             allow: '/'                      },
      { userAgent: 'GPTBot',        allow: '/'                      },
      { userAgent: 'CCBot',         allow: '/'                      },
      { userAgent: 'PerplexityBot', allow: '/'                      },
      { userAgent: 'anthropic-ai',  allow: '/'                      },
      { userAgent: 'Claude-Web',    allow: '/'                      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
