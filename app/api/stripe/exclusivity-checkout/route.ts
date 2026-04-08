import { NextRequest, NextResponse } from 'next/server'
import { stripe, EXCLUSIVITY_PRICE_IDS, getExclusivityTier } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { locationSlug, locationName, tier, name, email, phone, website } = await request.json()

    if (!locationSlug || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = EXCLUSIVITY_PRICE_IDS[tier as 1 | 2 | 3] || EXCLUSIVITY_PRICE_IDS[getExclusivityTier(locationSlug)]
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sobernation.co.uk'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        product: 'city_exclusivity',
        location_slug: locationSlug,
        location_name: locationName,
        centre_name: name,
        centre_phone: phone || '',
        centre_website: website || '',
        owner_email: email,
        tier: String(tier),
      },
      subscription_data: {
        metadata: {
          product: 'city_exclusivity',
          location_slug: locationSlug,
          location_name: locationName,
          centre_name: name,
          owner_email: email,
        },
      },
      success_url: `${baseUrl}/advertise/exclusivity/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/advertise/exclusivity`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[exclusivity-checkout]', err)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
