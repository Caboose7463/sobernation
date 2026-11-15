import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'
import { sendEmail, ENQUIRY_NOTIFY_EMAIL, detailsTable, detailsText } from '@/lib/email'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { location, addiction, fundingType, budget, urgency, firstName, email, phone, sourcePage } = await request.json()

    if (!location || !firstName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Normalise location to a slug
    const locationSlug = location.toLowerCase().trim().replace(/\s+/g, '-')

    // Find matching centres in the pool for this location
    const { data: members } = await supabase
      .from('matching_members')
      .select('*')
      .eq('active', true)
      .or(`location_slug.eq.${locationSlug},location_slug.eq.national`)
      .order('created_at', { ascending: true })
      .limit(3)

    const matchedIds = (members ?? []).map((m: { id: string }) => m.id)

    // Store the lead
    const { data: lead, error: leadError } = await supabase
      .from('matching_leads')
      .insert({
        first_name: firstName,
        contact_email: email || null,
        contact_phone: phone,
        location_slug: locationSlug,
        location_name: location,
        addiction_type: addiction || 'unknown',
        funding_type: fundingType || 'unsure',
        budget_band: budget || 'unknown',
        urgency: urgency || 'exploring',
        matched_member_ids: matchedIds,
        emails_sent: false,
      })
      .select()
      .single()

    if (leadError) console.error('[matching/submit] Supabase insert failed:', leadError.message)

    // Notify the site owner of every enquiry (awaited so it isn't cut off when the function ends)
    const rows: Array<[string, unknown]> = [
      ['First name', firstName],
      ['Phone', phone],
      ['Email', email],
      ['Location', location],
      ['Addiction', addiction],
      ['Funding', fundingType],
      ['Budget', budget],
      ['Urgency', urgency],
      ['Came from', sourcePage],
      ['Matched centres', (members ?? []).map((m: MatchingMember) => m.centre_name).join(', ') || 'none'],
      ['Saved to database', lead ? `yes (matching_leads ${lead.id})` : 'NO — check Vercel logs'],
      ['Received', new Date().toISOString()],
    ]
    await sendEmail({
      to: ENQUIRY_NOTIFY_EMAIL,
      replyTo: email || undefined,
      subject: `New rehab enquiry: ${firstName} in ${location}`,
      html: `<p>New enquiry from the Sober Nation "Find my rehab" form.</p>${detailsTable(rows)}`,
      text: detailsText(rows),
    })

    // Lead emails to matched centres. NOTE: sendLeadEmails currently only logs —
    // it does not email centres. Leave disabled until the owner approves.
    if (members && members.length > 0 && lead) {
      sendLeadEmails(members, { firstName, phone, email, location, addiction, urgency, budget, leadId: lead.id })
        .catch(err => console.error('[matching/submit] email error:', err))
    }

    return NextResponse.json({ success: true, matched: matchedIds.length })
  } catch (err) {
    console.error('[matching/submit]', err)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}

interface MatchingMember {
  contact_email: string
  centre_name: string
  id: string
}

async function sendLeadEmails(members: MatchingMember[], lead: {
  firstName: string; phone: string; email?: string; location: string;
  addiction: string; urgency: string; budget: string; leadId: string
}) {
  // Use Supabase edge function or a simple fetch to your email provider
  // For now, log — replace with Resend / SendGrid / Supabase Edge Function
  for (const member of members) {
    console.log(`[lead email] → ${member.contact_email} (${member.centre_name})`, {
      name: lead.firstName,
      phone: lead.phone,
      email: lead.email,
      location: lead.location,
      addiction: lead.addiction,
      urgency: lead.urgency,
      budget: lead.budget,
    })
    // TODO: Replace with:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     from: 'leads@sobernation.co.uk',
    //     to: member.contact_email,
    //     subject: `New rehab enquiry from ${lead.firstName} in ${lead.location}`,
    //     html: buildLeadEmail(member, lead),
    //   }),
    // })
  }
}
