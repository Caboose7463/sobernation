/**
 * Counsellors location pages sitemap — /sitemaps/counsellors
 * Generates sitemap entries for all 3,835 /counsellors/[location] pages.
 * Static — no DB needed, all locations are known at build time.
 */

import locationsData from '../../../data/locations.json'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

const BASE = 'https://www.sobernation.co.uk'

export async function GET() {
  const locations = (locationsData as { locations: { slug: string }[] }).locations

  const urls = locations.map(l =>
    `  <url>\n    <loc>${BASE}/counsellors/${l.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.70</priority>\n  </url>`
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
