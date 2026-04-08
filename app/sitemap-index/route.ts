/**
 * Sitemap index — served at /sitemap.xml via a rewrite in next.config.ts.
 *
 * Using a plain route name + rewrite instead of an app/sitemap.xml directory
 * because dots in Next.js App Router directory names can be unreliable.
 */

export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

const BASE = 'https://www.sobernation.co.uk'
const SHARD_COUNT = 8 // shards 0-7 (location/topic pages)

export async function GET() {
  const now = new Date().toISOString()

  // Static location/topic shards
  const shardEntries = Array.from({ length: SHARD_COUNT }, (_, i) =>
    `  <sitemap>\n    <loc>${BASE}/sitemaps/${i}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`
  ).join('\n')

  // Profile sitemaps (dynamic — therapists from Supabase, centres from rehabs.json)
  const profileEntries = [
    `  <sitemap>\n    <loc>${BASE}/sitemaps/therapists</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
    `  <sitemap>\n    <loc>${BASE}/sitemaps/centres</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
    `  <sitemap>\n    <loc>${BASE}/sitemaps/counsellors</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
    `  <sitemap>\n    <loc>${BASE}/sitemaps/articles</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
  ].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${shardEntries}
${profileEntries}
</sitemapindex>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      'X-Robots-Tag': 'noindex',
    },
  })
}
