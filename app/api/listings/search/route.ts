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
      // centres are stored in JSON-based rehab data, not in a simple table
      // so we search by name using the centres table if it exists, otherwise
      // fall back to the listing_owners table for already-claimed centres
      const { data } = await supabase
        .from('listing_owners')
        .select('id, name, locations, phone, website, contact_email, centre_slug')
        .eq('listing_type', 'centre')
        .ilike('name', `%${q}%`)
        .limit(8)

      // Also search counsellors table for centre names (some centres are in there)
      return NextResponse.json({
        results: (data ?? []).map(c => ({
          id: c.id,
          name: c.name,
          subtitle: c.locations?.join(', ') ?? '',
          locationSlug: c.locations?.[0] ?? '',
          phone: c.phone ?? '',
          website: c.website ?? '',
          email: c.contact_email ?? '',
          slug: c.centre_slug ?? '',
        }))
      })
    }

    return NextResponse.json({ results: [] })
  } catch (err) {
    console.error('[listings/search]', err)
    return NextResponse.json({ results: [] })
  }
}
