import { NextRequest, NextResponse } from 'next/server'
import { stripe, MATCHING_PRICE_ID } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { centreName, email, contactEmail, phone, locationName, locationSlug, addictions, acceptsNhs, acceptsPrivate } = await request.json()

    if (!centreName || !email || !locationName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sobernation.co.uk'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: MATCHING_PRICE_ID, quantity: 1 }],
      metadata: {
        product: 'matching_network',
        centre_name: centreName,
        owner_email: email,
        contact_email: contactEmail || email,
        contact_phone: phone || '',
        location_name: locationName,
        location_slug: locationSlug || locationName.toLowerCase().replace(/\s+/g, '-'),
        addiction_types: (addictions || []).join(','),
        accepts_nhs: String(acceptsNhs ?? true),
        accepts_private: String(acceptsPrivate ?? true),
      },
      subscription_data: {
        metadata: {
          product: 'matching_network',
          centre_name: centreName,
          location_slug: locationSlug || locationName.toLowerCase().replace(/\s+/g, '-'),
          owner_email: email,
        },
      },
      success_url: `${baseUrl}/advertise/matching/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/advertise/matching`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[matching-checkout]', err)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
