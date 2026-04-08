import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' })

// Position prices in pence (GBP)
const CENTRE_PRICES: Record<number, number> = { 1: 15000, 2: 10000, 3: 5000 }
const COUNSELLOR_PRICES: Record<number, number> = { 1: 1500, 2: 1000, 3: 500 }

interface LocationLine {
  slug: string
  name: string
  position: 1 | 2 | 3
}

export async function POST(request: NextRequest) {
  try {
    const {
      businessName,
      email,
      listingType,
      locations,
      phone,
      destinationType,
      destinationUrl,
    }: {
      businessName: string
      email: string
      listingType: 'centre' | 'counsellor'
      locations: LocationLine[]
      phone?: string
      destinationType?: string
      destinationUrl?: string
    } = await request.json()

    if (!businessName || !email || !listingType || !locations?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const prices = listingType === 'centre' ? CENTRE_PRICES : COUNSELLOR_PRICES

    // Build one line item per location/position combo using price_data
    // This requires NO pre-created Stripe price IDs — works with just STRIPE_SECRET_KEY
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = locations.map((loc) => ({
      price_data: {
        currency: 'gbp',
        unit_amount: prices[loc.position] ?? prices[3],
        recurring: { interval: 'month' },
        product_data: {
          name: `SoberNation – ${loc.name} (Position ${loc.position})`,
          description: `${listingType === 'centre' ? 'Rehab centre' : 'Counsellor'} sponsored listing · Position ${loc.position} · ${loc.name}`,
          metadata: {
            location_slug: loc.slug,
            location_name: loc.name,
            position: String(loc.position),
          },
        },
      },
      quantity: 1,
    }))

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sobernation.co.uk'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: lineItems,
      metadata: {
        product: 'sponsored_listing',
        business_name: businessName,
        listing_type: listingType,
        owner_email: email,
        phone: phone || '',
        destination_type: destinationType || 'own_url',
        destination_url: destinationUrl || '',
        locations: locations.map(l => `${l.slug}:${l.position}`).join(','),
      },
      subscription_data: {
        metadata: {
          product: 'sponsored_listing',
          business_name: businessName,
          listing_type: listingType,
          owner_email: email,
          locations: locations.map(l => `${l.slug}:${l.position}`).join(','),
        },
      },
      success_url: `${baseUrl}/advertise/claim/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/advertise/claim`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[claim-checkout]', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
