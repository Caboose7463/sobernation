import { NextRequest, NextResponse } from 'next/server'
import { stripe, HELPLINE_PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { tier, name, email, website, logoUrl, region } = await request.json()

    if (!tier || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = HELPLINE_PRICE_IDS[tier as 'national' | 'regional' | 'county']
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sobernation.co.uk'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        product: 'helpline_sponsorship',
        tier,
        sponsor_name: name,
        sponsor_website: website || '',
        sponsor_logo_url: logoUrl || '',
        owner_email: email,
        regions: region || '',
      },
      subscription_data: {
        metadata: {
          product: 'helpline_sponsorship',
          tier,
          sponsor_name: name,
          owner_email: email,
        },
      },
      success_url: `${baseUrl}/advertise/helpline/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/advertise/helpline`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[helpline-checkout]', err)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
