import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: owner } = await supabase
      .from('listing_owners')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    if (!owner?.stripe_customer_id) {
      return NextResponse.json({ error: 'No Stripe customer found' }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sobernation.co.uk'

    const session = await stripe.billingPortal.sessions.create({
      customer: owner.stripe_customer_id,
      return_url: `${baseUrl}/dashboard/invoices`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/portal]', err)
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
  }
}
