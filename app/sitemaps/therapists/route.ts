/**
 * Therapist profile sitemap — /sitemaps/therapists
 * Queries Supabase for all counsellor profile slugs.
 * Referenced by the sitemap index at /sitemap.xml
 */
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

const BASE = 'https://www.sobernation.co.uk'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from('counsellors')
    .select('profile_slug, verified')
    .not('profile_slug', 'is', null)

  const slugs = (data ?? []).filter(c => c.profile_slug)

  const urls = slugs.map(c => {
    const priority = c.verified ? 0.85 : 0.75
    return `  <url>\n    <loc>${BASE}/therapist/${c.profile_slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority.toFixed(2)}</priority>\n  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=43200, stale-while-revalidate=3600',
    },
  })
}
