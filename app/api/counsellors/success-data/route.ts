/**
 * GET /api/counsellors/success-data?session_id=...
 * 
 * Called by the success page after Stripe checkout.
 * Looks up the Stripe session and returns the counsellor's listing data
 * so the success page can show their name and link to their live profile.
 */
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const counsellorId = session.metadata?.counsellor_id
    if (!counsellorId) return NextResponse.json({ listing: null })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data } = await supabase
      .from('counsellors')
      .select('name, profile_slug, location_slug, listing_type, dashboard_token')
      .eq('id', counsellorId)
      .maybeSingle()

    return NextResponse.json({ listing: data ?? null })
  } catch {
    return NextResponse.json({ listing: null })
  }
}
