/**
 * POST /api/ads/click
 * Logs a click, deducts CPC from budget, returns redirect URL.
 * Called by /go/[type]/[slug] route handler.
 */

import { NextRequest, NextResponse } from 'next/server'
import { processClick } from '../../../../lib/ads'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { placement_id } = await req.json()
    if (!placement_id) {
      return NextResponse.json({ error: 'Missing placement_id' }, { status: 400 })
    }

    const result = await processClick(placement_id)

    if (!result) {
      return NextResponse.json({ error: 'Placement not found' }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
