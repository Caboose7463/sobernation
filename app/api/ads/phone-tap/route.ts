/**
 * POST /api/ads/phone-tap
 * Logs a phone number tap on a sponsored card.
 */

import { NextRequest, NextResponse } from 'next/server'
import { logPhoneTap } from '../../../../lib/ads'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { placement_id, location_slug } = await req.json()
    if (!placement_id || !location_slug) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    await logPhoneTap(placement_id, location_slug)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
