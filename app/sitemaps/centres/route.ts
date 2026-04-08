/**
 * Centre profile sitemap — /sitemaps/centres
 * Generates sitemap for all /centre/[slug] pages from rehabs.json (static).
 * Referenced by the sitemap index at /sitemap.xml
 */
import { getAllCentreSlugs } from '../../../lib/rehabs'

export const dynamic = 'force-static'
export const revalidate = 86400

const BASE = 'https://www.sobernation.co.uk'

export async function GET() {
  const slugs = getAllCentreSlugs()
  const now = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  const urls = slugs.map(slug =>
    `  <url>\n    <loc>${BASE}/centre/${slug}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.80</priority>\n  </url>`
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
