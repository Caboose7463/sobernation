import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase-server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    const body = await request.text()
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret)
  } catch (err) {
    console.error('[stripe/webhook] signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as import('stripe').Stripe.Checkout.Session
        // Metadata is passed on the subscription via subscription_data.metadata at creation,
        // but on the session object after checkout it lives in session.metadata
        const meta = (session.metadata ?? {}) as Record<string, string>
        const ownerId = meta.owner_id
        const locations = meta.locations ? meta.locations.split(',') : []
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (!ownerId) break

        // Auto-approve: payment received → fully active + verified
        await supabase
          .from('listing_owners')
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            subscription_status: 'active',
            verified: true,
            admin_approved: true,
            locations,
            updated_at: new Date().toISOString(),
          })
          .eq('id', ownerId)

        // Send approval email
        const { data: owner } = await supabase
          .from('listing_owners')
          .select('name, email, listing_type')
          .eq('id', ownerId)
          .single()

        if (owner) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: owner.email,
            subject: 'Your SoberNation listing is now verified!',
            html: `
              <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
                <h2 style="color: #1a6b5a;">Your listing is live!</h2>
                <p>Hi ${owner.name},</p>
                <p>Your payment was successful and your SoberNation listing is now <strong>verified</strong>. Your verified badge is live on the directory.</p>
                <p><a href="https://www.sobernation.co.uk/dashboard" style="background: #1a6b5a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 16px;">View your dashboard</a></p>
                <p style="color: #6b7280; font-size: 13px; margin-top: 32px;">Questions? Reply to this email and we'll help.</p>
              </div>
            `,
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as import('stripe').Stripe.Invoice
        const customerId = invoice.customer as string

        await supabase
          .from('listing_owners')
          .update({ subscription_status: 'active', updated_at: new Date().toISOString() })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as import('stripe').Stripe.Invoice
        const customerId = invoice.customer as string

        await supabase
          .from('listing_owners')
          .update({ subscription_status: 'past_due', updated_at: new Date().toISOString() })
          .eq('stripe_customer_id', customerId)

        // Notify the owner
        const { data: owner } = await supabase
          .from('listing_owners')
          .select('name, email')
          .eq('stripe_customer_id', customerId)
          .single()

        if (owner) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: owner.email,
            subject: 'Action required — payment failed for your SoberNation listing',
            html: `
              <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
                <h2 style="color: #c0392b;">Payment failed</h2>
                <p>Hi ${owner.name},</p>
                <p>We couldn't process your latest payment. Please update your billing details to keep your verified listing active.</p>
                <p><a href="https://www.sobernation.co.uk/dashboard/invoices" style="background: #1a6b5a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 16px;">Update billing</a></p>
              </div>
            `,
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as import('stripe').Stripe.Subscription
        const customerId = subscription.customer as string

        await supabase
          .from('listing_owners')
          .update({
            subscription_status: 'cancelled',
            verified: false,
            admin_approved: false,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      default:
        console.log(`[stripe/webhook] Unhandled event: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[stripe/webhook] handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
