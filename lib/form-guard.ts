/**
 * Light spam protection for public forms.
 *
 * 1. Honeypot: a hidden field (default name "website") that people never see.
 *    If it has a value, the submission came from a bot.
 * 2. Timing: the form sends "t", the time it was rendered (ms since epoch).
 *    Anything submitted less than 3 seconds after render is treated as a bot.
 *    A missing or unreadable "t" is allowed (cached pages, old clients).
 * 3. Soft per IP rate limit held in memory (per server instance), keyed on the
 *    first x-forwarded-for address. The Vercel Firewall also limits these paths.
 *
 * Bots get a normal looking success response from the route and nothing is
 * stored or sent. Rate limited requests get a 429 with a plain message.
 */
import { NextResponse } from 'next/server'

export const MIN_FILL_MS = 3000
export const DEFAULT_WINDOW_MS = 10 * 60 * 1000
export const DEFAULT_MAX = 5
export const RATE_LIMIT_MESSAGE =
  'Too many submissions from your connection. Please wait a few minutes and try again.'

const hits = new Map<string, number[]>()
/** A Request, or `{ headers: await headers() }` inside a server action. */
type HasHeaders = { headers: { get(name: string): string | null } }
let lastSweep = 0

export function getClientIp(req: HasHeaders): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

function sweep(now: number, windowMs: number) {
  if (now - lastSweep < 60_000 && hits.size < 5000) return
  lastSweep = now
  for (const [key, times] of hits) {
    const fresh = times.filter(ts => now - ts < windowMs)
    if (fresh.length) hits.set(key, fresh)
    else hits.delete(key)
  }
}

/** Records a hit and returns true if this IP is over the limit for the bucket. */
export function isRateLimited(
  req: HasHeaders,
  bucket: string,
  max: number = DEFAULT_MAX,
  windowMs: number = DEFAULT_WINDOW_MS,
): boolean {
  const now = Date.now()
  sweep(now, windowMs)
  const key = `${bucket}:${getClientIp(req)}`
  const recent = (hits.get(key) ?? []).filter(ts => now - ts < windowMs)
  if (recent.length >= max) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  return false
}

/** True when the honeypot is filled or the form was submitted too fast. */
export function looksLikeBot(honeypot: unknown, t: unknown): boolean {
  if (honeypot != null && String(honeypot).trim() !== '') return true
  if (t == null || t === '') return false
  const rendered = Number(t)
  if (!Number.isFinite(rendered) || rendered <= 0) return false
  const elapsed = Date.now() - rendered
  // Negative elapsed means the visitor's clock is ahead of ours: allow it.
  return elapsed >= 0 && elapsed < MIN_FILL_MS
}

export type GuardResult =
  | { status: 'ok' }
  | { status: 'bot' }
  | { status: 'limited'; response: NextResponse }

/**
 * Runs all checks for a submission. `fields` is the parsed body (JSON object
 * or FormData). Bots are not counted against the rate limit.
 */
export function checkForm(
  req: HasHeaders,
  fields: Record<string, unknown> | FormData | null | undefined,
  opts: { bucket: string; max?: number; windowMs?: number; honeypotField?: string },
): GuardResult {
  const hpName = opts.honeypotField ?? 'website'
  const get = (k: string): unknown =>
    fields instanceof FormData ? fields.get(k) : fields ? fields[k] : undefined
  if (looksLikeBot(get(hpName), get('t'))) return { status: 'bot' }
  if (isRateLimited(req, opts.bucket, opts.max, opts.windowMs)) {
    return { status: 'limited', response: tooManyResponse() }
  }
  return { status: 'ok' }
}

export function tooManyResponse(): NextResponse {
  return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 })
}
