/**
 * GET /api/ads/search-listing?q=castle+craig&type=centre
 *
 * Searches the CQC directory (centres) or Supabase (counsellors) by name.
 * Used by the /advertise/claim autocomplete in Step 1 so advertisers can
 * find their existing listing and auto-fill their campaign details.
 */

import { NextRequest, NextResponse } from 'next/server'
import { searchCentres } from '../../../../lib/rehabs'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''
  const type = req.nextUrl.searchParams.get('type') ?? 'centre'

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  // ── Centre search — from in-memory CQC JSON ──────────────────────────────
  if (type === 'centre') {
    const centres = searchCentres(q, 10)
    return NextResponse.json(
      centres.map(c => ({
        slug: c.slug,
        name: c.name,
        address: c.address,
        town: c.townName,
        location_slug: c.townSlug,
        phone: c.phone || null,
        website: c.website || null,
        service_type: c.serviceType,
        listing_type: 'centre',
      }))
    )
  }

  // ── Counsellor search — from Supabase ────────────────────────────────────
  if (type === 'counsellor') {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      )
      const { data } = await supabase
        .from('counsellors')
        .select('id, name, title, location_name, location_slug, phone, website, profile_slug')
        .ilike('name', `%${q}%`)
        .limit(10)

      return NextResponse.json(
        (data ?? []).map((c) => ({
          slug: c.profile_slug ?? c.name.toLowerCase().replace(/\s+/g, '-') + '-' + c.location_slug,
          name: c.name,
          address: null,
          town: c.location_name,
          location_slug: c.location_slug,
          phone: c.phone || null,
          website: c.website || null,
          service_type: c.title || 'Counsellor',
          listing_type: 'counsellor',
        }))
      )
    } catch {
      return NextResponse.json([])
    }
  }

  return NextResponse.json([])
}
