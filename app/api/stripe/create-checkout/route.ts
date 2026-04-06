import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRICE_IDS } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { ownerId, locations } = await request.json()

    if (!ownerId || !locations?.length) {
      return NextResponse.json({ error: 'Missing ownerId or locations' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Fetch the owner
    const { data: owner, error } = await supabase
      .from('listing_owners')
      .select('*')
      .eq('id', ownerId)
      .single()

    if (error || !owner) {
      return NextResponse.json({ error: 'Owner not found' }, { status: 404 })
    }

    const priceId = PRICE_IDS[owner.listing_type as 'counsellor' | 'centre']

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid listing type' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sobernation.co.uk'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: owner.email,
      line_items: [
        {
          price: priceId,
          quantity: locations.length,
        },
      ],
      // metadata at session level — readable in webhook as session.metadata
      metadata: {
        owner_id: ownerId,
        locations: locations.join(','),
        listing_type: owner.listing_type,
      },
      subscription_data: {
        metadata: {
          owner_id: ownerId,
          locations: locations.join(','),
          listing_type: owner.listing_type,
        },
      },
      success_url: `${baseUrl}/verify/onboard/success?session_id={CHECKOUT_SESSION_ID}&owner_id=${ownerId}`,
      cancel_url: `${baseUrl}/verify/onboard?step=7&owner_id=${ownerId}`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    // Save the pending locations to the owner row
    await supabase
      .from('listing_owners')
      .update({ locations })
      .eq('id', ownerId)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/create-checkout]', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
