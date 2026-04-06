import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  const type = searchParams.get('type') // 'centre' or 'counsellor'

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const supabase = createServiceClient()

  try {
    if (type === 'counsellor') {
      const { data } = await supabase
        .from('counsellors')
        .select('id, name, location_name, location_slug, phone, website, email, profile_slug')
        .ilike('name', `%${q}%`)
        .limit(8)

      return NextResponse.json({
        results: (data ?? []).map(c => ({
          id: c.id,
          name: c.name,
          subtitle: c.location_name ?? '',
          locationSlug: c.location_slug ?? '',
          phone: c.phone ?? '',
          website: c.website ?? '',
          email: c.email ?? '',
          slug: c.profile_slug ?? c.id,
        }))
      })
    }

    if (type === 'centre') {
      // Search the actual CQC rehabs JSON data (not listing_owners which starts empty)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const rehabData = require('../../../../data/rehabs.json') as {
        byTown: Record<string, { town: string; centres: Array<{ name: string; phone: string; website: string; cqcUrl: string }> }>
      }

      const qLower = q.toLowerCase()
      const seen = new Set<string>()
      const results: Array<{ id: string; name: string; subtitle: string; locationSlug: string; phone: string; website: string; email: string; slug: string }> = []

      for (const [townSlug, townData] of Object.entries(rehabData.byTown)) {
        for (const centre of townData.centres) {
          if (centre.name.toLowerCase().includes(qLower) && !seen.has(centre.name)) {
            seen.add(centre.name)
            results.push({
              id: centre.cqcUrl || `${townSlug}-${centre.name}`,
              name: centre.name,
              subtitle: townData.town,
              locationSlug: townSlug,
              phone: centre.phone ?? '',
              website: centre.website ?? '',
              email: '',
              slug: townSlug,
            })
            if (results.length >= 10) break
          }
        }
        if (results.length >= 10) break
      }

      return NextResponse.json({ results })
    }

    return NextResponse.json({ results: [] })
  } catch (err) {
    console.error('[listings/search]', err)
    return NextResponse.json({ results: [] })
  }
}
