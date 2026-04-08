/**
 * GET /api/ads/auction?location=manchester&type=centre
 * Returns the current auction winners for a location (for the /advertise page live preview).
 */

import { NextRequest, NextResponse } from 'next/server'
import { runAuction } from '../../../../lib/ads'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get('location')
  const type = req.nextUrl.searchParams.get('type') as 'centre' | 'counsellor' | null

  if (!location || !type || !['centre', 'counsellor'].includes(type)) {
    return NextResponse.json({ error: 'Missing location or type' }, { status: 400 })
  }

  const winners = await runAuction(location, type)

  return NextResponse.json({
    location,
    type,
    winners: winners.map((w) => ({
      id: w.id,
      position: w.position,
      display_name: w.display_name,
      ad_rank: w.ad_rank,
      // Don't expose max_cpc / budget to public
    })),
    total_bidders: winners.length,
  })
}
