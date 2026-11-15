/**
 * POST /api/contact — contact page form.
 * Saves the message to Supabase `contact_messages` and emails the owner.
 * If the table is missing or the insert fails, the email is still sent
 * (and vice versa) so a message is never silently lost.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'
import { sendEmail, ENQUIRY_NOTIFY_EMAIL, detailsTable, detailsText } from '@/lib/email'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim().slice(0, 200)
  const email = String(body.email ?? '').trim().slice(0, 320)
  const subject = String(body.subject ?? '').trim().slice(0, 200) || 'General enquiry'
  const message = String(body.message ?? '').trim().slice(0, 5000)
  const sourcePage = String(body.sourcePage ?? '').trim().slice(0, 500)

  // Honeypot: real users never fill this hidden field
  if (String(body.website ?? '').trim()) {
    return NextResponse.json({ success: true })
  }
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 })
  }

  // 1. Save to Supabase
  let saved = false
  let savedId: string | null = null
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({ name, email, subject, message, source_page: sourcePage || null })
      .select('id')
      .single()
    if (error) console.error('[contact] Supabase insert failed:', error.message)
    else { saved = true; savedId = data?.id ?? null }
  } catch (e) {
    console.error('[contact] Supabase insert threw:', e)
  }

  // 2. Email the owner
  const rows: Array<[string, unknown]> = [
    ['Name', name],
    ['Email', email],
    ['Subject', subject],
    ['Message', message],
    ['Sent from page', sourcePage],
    ['Received', new Date().toISOString()],
    ['Saved to database', saved ? `yes (contact_messages ${savedId ?? ''})` : 'NO — check Vercel logs'],
  ]
  const sent = await sendEmail({
    to: ENQUIRY_NOTIFY_EMAIL,
    replyTo: email,
    subject: `Contact form: ${subject} — ${name}`,
    html: `<p>New message from the Sober Nation contact page.</p>${detailsTable(rows)}`,
    text: detailsText(rows),
  })

  if (!saved && !sent.ok) {
    return NextResponse.json(
      { error: 'Sorry, we could not send your message. Please email info@sobernation.co.uk.' },
      { status: 500 },
    )
  }
  return NextResponse.json({ success: true })
}
