/**
 * POST /api/stripe/webhook
 * 
 * Handles Stripe webhook events for counsellor/centre verification.
 * 
 * Events handled:
 * - checkout.session.completed     → mark as verified + notify admin
 * - customer.subscription.deleted   → remove verified status immediately
 * - invoice.payment_failed          → flag as past_due (grace period: 7 days, then revoke)
 * - invoice.payment_succeeded       → restore if previously past_due
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

/**
 * Send a plain email notification to the admin.
 * Uses fetch to call an email endpoint if configured, otherwise logs.
 * To enable real emails: set ADMIN_EMAIL and optionally RESEND_API_KEY in env vars.
 */
async function notifyAdmin(subject: string, body: string) {
  const adminEmail = process.env.ADMIN_EMAIL || 'editorial@sobernation.co.uk'
  const resendKey = process.env.RESEND_API_KEY

  if (!resendKey) {
    // No email provider configured — log to console (visible in Vercel logs)
    console.log(`📧 ADMIN NOTIFICATION → ${adminEmail}`)
    console.log(`Subject: ${subject}`)
    console.log(`Body: ${body}`)
    return
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SoberNation <notifications@sobernation.co.uk>',
        to: adminEmail,
        subject,
        text: body,
      }),
    })
  } catch (err) {
    console.error('Failed to send admin email:', err)
  }
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

      const { data: record } = await supabase
        .from('counsellors')
        .update({
          verified: true,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          subscription_status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('id', counsellorId)
        .select('name, location_name, listing_type, email')
        .single()

      console.log(`✅ Verified ${session.metadata?.listing_type}: ${session.metadata?.counsellor_name} (${counsellorId})`)

      // Notify admin
      const listingType = session.metadata?.listing_type || 'counsellor'
      const name = record?.name || session.metadata?.counsellor_name || 'Unknown'
      const location = record?.location_name || session.metadata?.location_slug || 'Unknown'
      const email = record?.email || session.customer_email || 'Unknown'
      const price = listingType === 'counsellor' ? '£10/month' : '£30/month'

      await notifyAdmin(
        `New verified listing: ${name} (${location})`,
        `A new ${listingType} listing has been verified on SoberNation.\n\n` +
        `Name: ${name}\nLocation: ${location}\nEmail: ${email}\nPlan: ${price}\n\n` +
        `View in Supabase: https://app.supabase.com`
      )
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

      console.log(`🔴 Subscription cancelled — removed verification for ${counsellorId}`)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | { id: string } }
      const sub = invoice.subscription
      const subId = typeof sub === 'string' ? sub : sub?.id
      if (!subId) break

      // Check attempt count — after 3 failures, revoke verification
      const attemptCount = invoice.attempt_count || 1

      if (attemptCount >= 3) {
        // Revoke verification after 3 failed payment attempts
        await supabase
          .from('counsellors')
          .update({
            verified: false,
            subscription_status: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subId)

        console.log(`🟡 Verification revoked after ${attemptCount} failed payments for sub ${subId}`)
      } else {
        // Grace period — still past_due but verified badge remains
        await supabase
          .from('counsellors')
          .update({
            subscription_status: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subId)

        console.log(`🟡 Payment failed (attempt ${attemptCount}) for sub ${subId} — still verified`)
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice2 = event.data.object as Stripe.Invoice & { subscription?: string | { id: string } }
      const sub2 = invoice2.subscription
      const subId2 = typeof sub2 === 'string' ? sub2 : sub2?.id
      if (!subId2) break

      await supabase
        .from('counsellors')
        .update({
          verified: true,
          subscription_status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subId2)
        .eq('subscription_status', 'past_due') // Only restore if it was past_due

      break
    }

    default:
      // Ignore other events
  }

  return NextResponse.json({ received: true })
}
