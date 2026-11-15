/**
 * Shared email sending via Resend.
 *
 * - FROM address is on sobernation.co.uk (override with RESEND_FROM_EMAIL).
 *   The domain must be verified in Resend or sends are rejected.
 * - Internal enquiry notifications go to ENQUIRY_NOTIFY_EMAIL
 *   (defaults to the owner's inbox).
 * - The Resend client is created lazily so builds don't need the API key.
 */
import { Resend } from 'resend'

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Sober Nation <enquiries@sobernation.co.uk>'
export const COMMUNITY_FROM_EMAIL =
  process.env.RESEND_COMMUNITY_FROM_EMAIL || 'Sober Nation Community <community@sobernation.co.uk>'
export const ENQUIRY_NOTIFY_EMAIL =
  process.env.ENQUIRY_NOTIFY_EMAIL || 'james@hettiebells.com'

let client: Resend | null = null
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!client) client = new Resend(process.env.RESEND_API_KEY)
  return client
}

export interface SendEmailInput {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}

/** Sends an email. Never throws: returns { ok, id?, error? } and logs failures. */
export async function sendEmail(input: SendEmailInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  const resend = getResend()
  if (!resend) {
    console.error('[email] RESEND_API_KEY not set — email not sent:', input.subject)
    return { ok: false, error: 'RESEND_API_KEY not set' }
  }
  try {
    const { data, error } = await resend.emails.send({
      from: input.from ?? FROM_EMAIL,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    })
    if (error) {
      console.error('[email] Resend rejected email:', input.subject, JSON.stringify(error))
      // Until sobernation.co.uk is verified in Resend, internal notifications fall back
      // to Resend's shared sender, which can only deliver to the Resend account owner.
      if (/not verified/i.test(error.message) && sameRecipients(input.to, ENQUIRY_NOTIFY_EMAIL)) {
        const retry = await resend.emails.send({
          from: 'Sober Nation (unverified domain) <onboarding@resend.dev>',
          to: input.to,
          subject: input.subject,
          html: input.html,
          text: input.text,
          replyTo: input.replyTo,
        })
        if (!retry.error) {
          console.warn('[email] sent via onboarding@resend.dev fallback — verify sobernation.co.uk in Resend', retry.data?.id)
          return { ok: true, id: retry.data?.id }
        }
        console.error('[email] fallback sender also rejected:', JSON.stringify(retry.error))
      }
      return { ok: false, error: error.message }
    }
    console.log('[email] sent', data?.id, input.subject)
    return { ok: true, id: data?.id }
  } catch (e) {
    console.error('[email] send threw:', input.subject, e)
    return { ok: false, error: String(e) }
  }
}

function sameRecipients(to: string | string[], expected: string): boolean {
  const list = Array.isArray(to) ? to : [to]
  return list.length === 1 && list[0].toLowerCase() === expected.toLowerCase()
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Renders a simple two-column table of label/value rows for notification emails. */
export function detailsTable(rows: Array<[string, unknown]>): string {
  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top;white-space:nowrap"><strong>${escapeHtml(k)}</strong></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v || '—')}</td></tr>`
    )
    .join('')
  return `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${body}</table>`
}

export function detailsText(rows: Array<[string, unknown]>): string {
  return rows.map(([k, v]) => `${k}: ${v || '—'}`).join('\n')
}
