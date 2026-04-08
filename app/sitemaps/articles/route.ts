/**
 * Articles sitemap — /sitemaps/articles
 * Dynamically fetches all published article slugs from Supabase.
 * Referenced by the sitemap index at /sitemap.xml
 */
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 hour — articles publish frequently

const BASE = 'https://www.sobernation.co.uk'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from('articles')
    .select('slug, published_at, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const articles = data ?? []

  const urls = articles.map(a => {
    const lastmod = (a.updated_at ?? a.published_at ?? new Date().toISOString()).split('T')[0]
    return `  <url>\n    <loc>${BASE}/articles/${a.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.78</priority>\n  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
    },
  })
}
