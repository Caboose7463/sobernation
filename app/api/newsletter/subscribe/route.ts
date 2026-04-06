/**
 * app/api/newsletter/subscribe/route.ts
 * Subscribes an email to the newsletter.
 * Stores in Supabase, sends a welcome email via Resend.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'SoberNation <onboarding@resend.dev>'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const { email, source = 'website' } = await req.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = getSupabase()

    // Check for duplicate
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, confirmed')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ message: 'You\'re already subscribed — check your inbox!', alreadySubscribed: true })
    }

    // Insert subscriber
    const { error: insertError } = await supabase.from('newsletter_subscribers').insert({
      email: email.toLowerCase().trim(),
      source,
      confirmed: false,
    })

    if (insertError) {
      console.error('Newsletter insert error:', insertError)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    // Send welcome email via Resend
    await resend.emails.send({
      from: FROM,
      to: [email],
      subject: 'Welcome to SoberNation — you\'re in 💪',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #111827; background: #f9fafb;">
          <div style="background: #fff; border-radius: 12px; padding: 40px; border: 1px solid #e4e7eb;">
            <div style="font-size: 28px; font-weight: 800; color: #1a6b5a; margin-bottom: 8px;">SoberNation</div>
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #f3f4f6;">The UK's addiction recovery hub</div>

            <h1 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 16px;">You're in. Welcome. 👋</h1>
            <p style="font-size: 15px; line-height: 1.7; color: #4b5563; margin: 0 0 20px;">
              Thanks for joining SoberNation. Every week or so we'll send you recovery news, practical guides, and honest advice — nothing spammy, nothing preachy.
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #4b5563; margin: 0 0 32px;">
              If you or someone you know is struggling right now, here are some of our most useful resources:
            </p>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <a href="https://www.sobernation.co.uk/am-i-an-alcoholic" style="display: block; padding: 14px 18px; background: #eaf4f1; border-radius: 8px; text-decoration: none; color: #1a6b5a; font-weight: 600; font-size: 14px;">🧪 Take the WHO AUDIT alcohol test</a>
              <a href="https://www.sobernation.co.uk/rehab/london" style="display: block; padding: 14px 18px; background: #eaf4f1; border-radius: 8px; text-decoration: none; color: #1a6b5a; font-weight: 600; font-size: 14px;">🏥 Find a rehab centre near you</a>
              <a href="https://www.sobernation.co.uk/sobriety-counter" style="display: block; padding: 14px 18px; background: #eaf4f1; border-radius: 8px; text-decoration: none; color: #1a6b5a; font-weight: 600; font-size: 14px;">📅 Track your sobriety milestones</a>
              <a href="https://www.sobernation.co.uk/community" style="display: block; padding: 14px 18px; background: #eaf4f1; border-radius: 8px; text-decoration: none; color: #1a6b5a; font-weight: 600; font-size: 14px;">💬 Join the community forum</a>
            </div>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f3f4f6;">
              <p style="font-size: 13px; color: #9ca3af; margin: 0;">
                Need help right now? Call <strong style="color: #c0392b;">Frank free on 0300 123 6600</strong> — 24/7, confidential.<br><br>
                <a href="https://www.sobernation.co.uk" style="color: #9ca3af;">sobernation.co.uk</a> · <a href="https://www.sobernation.co.uk/privacy-policy" style="color: #9ca3af;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, message: 'You\'re subscribed! Check your inbox for a welcome email.' })

  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
