/**
 * POST /api/stripe/webhook
 * 
 * Handles Stripe webhook events for counsellor verification.
 * 
 * Events handled:
 * - checkout.session.completed  → mark counsellor as verified
 * - customer.subscription.deleted → remove verified status
 * - invoice.payment_failed       → flag as past_due
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
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabase()

  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const counsellorId = session.metadata?.counsellor_id
      if (!counsellorId) break

      await supabase
        .from('counsellors')
        .update({
          verified: true,
          verified_at: new Date().toISOString(),
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          subscription_status: 'active',
          subscription_expires_at: null, // active subscription, no expiry
          updated_at: new Date().toISOString(),
        })
        .eq('id', counsellorId)

      console.log(`✅ Verified counsellor ${counsellorId}`)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const counsellorId = sub.metadata?.counsellor_id
      if (!counsellorId) break

      await supabase
        .from('counsellors')
        .update({
          verified: false,
          subscription_status: 'cancelled',
          stripe_subscription_id: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', counsellorId)

      console.log(`🔴 Removed verification for counsellor ${counsellorId}`)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id
      if (!subId) break

      await supabase
        .from('counsellors')
        .update({
          subscription_status: 'past_due',
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subId)

      break
    }

    default:
      // Ignore other events
  }

  return NextResponse.json({ received: true })
}
