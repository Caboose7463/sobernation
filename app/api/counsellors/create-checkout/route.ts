/**
 * POST /api/counsellors/create-checkout
 * 
 * Creates a Stripe Checkout session for counsellor/centre verification.
 * Saves the counsellor to Supabase first, then redirects to Stripe.
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    listingType,
    name,
    bacpNumber,
    email,
    location,
    specialisms,
    phone,
    website,
  } = body

  if (!listingType || !name || !email || !location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = getSupabase()

  // Upsert counsellor record (not yet verified — verification happens after payment)
  const { data: counsellor, error: dbError } = await supabase
    .from('counsellors')
    .upsert({
      name,
      location_slug: location,
      location_name: location.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      specialisms: specialisms || [],
      phone: phone || null,
      email,
      website: website || null,
      bacp_number: bacpNumber || null,
      listing_type: listingType,
      verified: false,
      source: 'self_registered',
    }, { onConflict: 'name,location_slug' })
    .select('id')
    .single()

  if (dbError || !counsellor) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'Failed to save listing' }, { status: 500 })
  }

  const priceId = listingType === 'counsellor'
    ? process.env.STRIPE_COUNSELLOR_PRICE_ID!
    : process.env.STRIPE_CENTRE_PRICE_ID!

  const origin = req.headers.get('origin') || 'https://www.sobernation.co.uk'

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/counsellors/claim/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/counsellors/claim?cancelled=1`,
    metadata: {
      counsellor_id: counsellor.id,
      listing_type: listingType,
      counsellor_name: name,
      location_slug: location,
    },
    subscription_data: {
      metadata: {
        counsellor_id: counsellor.id,
        listing_type: listingType,
      },
    },
  })

  return NextResponse.json({ url: session.url })
}
