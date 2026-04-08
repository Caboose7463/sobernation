import { NextRequest, NextResponse } from 'next/server'
import { stripe, ENHANCED_PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { listingType, email, name } = await request.json()

    if (!listingType || !email || !name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const priceId = ENHANCED_PRICE_IDS[listingType as 'centre' | 'counsellor']
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid listing type' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sobernation.co.uk'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        product: 'enhanced_listing',
        listing_type: listingType,
        owner_name: name,
        owner_email: email,
      },
      subscription_data: {
        metadata: {
          product: 'enhanced_listing',
          listing_type: listingType,
          owner_name: name,
          owner_email: email,
        },
      },
      success_url: `${baseUrl}/advertise/enhance/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/advertise/enhance`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[enhanced-checkout]', err)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
