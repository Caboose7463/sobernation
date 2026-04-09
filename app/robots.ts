import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/dashboard/',
          '/verify/',
          '/go/',
          // /search is intentionally NOT blocked here — the search page has
          // its own `robots: { index: false }` metadata, which is sufficient
          // to prevent indexing while still allowing Google to validate the
          // SiteLinksSearchBox schema action URL.
        ],
      },
      {
        // Block AI training scrapers
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.sobernation.co.uk/sitemap.xml',
    host: 'https://www.sobernation.co.uk',
  }
}
