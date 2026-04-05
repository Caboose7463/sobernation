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
  const locationName = location.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Check if a scraped record already exists for this name + location
  // If so, update it — otherwise insert new
  let counsellorId: string

  const { data: existing } = await supabase
    .from('counsellors')
    .select('id')
    .eq('name', name)
    .eq('location_slug', location)
    .maybeSingle()

  if (existing?.id) {
    // Update the existing scraped record
    const { error: updateError } = await supabase
      .from('counsellors')
      .update({
        email,
        phone: phone || null,
        website: website || null,
        bacp_number: bacpNumber || null,
        listing_type: listingType,
        specialisms: specialisms || [],
        source: 'self_registered',
        verified: false,
      })
      .eq('id', existing.id)

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json({ error: 'Failed to save listing' }, { status: 500 })
    }
    counsellorId = existing.id
  } else {
    // Insert new record
    const { data: inserted, error: insertError } = await supabase
      .from('counsellors')
      .insert({
        name,
        location_slug: location,
        location_name: locationName,
        specialisms: specialisms || [],
        phone: phone || null,
        email,
        website: website || null,
        bacp_number: bacpNumber || null,
        listing_type: listingType,
        verified: false,
        source: 'self_registered',
      })
      .select('id')
      .single()

    if (insertError || !inserted) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save listing' }, { status: 500 })
    }
    counsellorId = inserted.id
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
      counsellor_id: counsellorId,
      listing_type: listingType,
      counsellor_name: name,
      location_slug: location,
    },
    subscription_data: {
      metadata: {
        counsellor_id: counsellorId,
        listing_type: listingType,
      },
    },
  })

  return NextResponse.json({ url: session.url })
}
