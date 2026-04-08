/**
 * /go/[type]/[slug] — click redirect handler
 *
 * When a user clicks a sponsored card:
 *   1. Extracts placement_id from ?p= query param
 *   2. Calls processClick() to log + deduct budget
 *   3. 302 redirects to destination (their website or SoberNation profile)
 *
 * Falls back gracefully: if placement_id missing or invalid,
 * redirects to the SoberNation internal profile instead.
 */

import { NextRequest, NextResponse } from 'next/server'
import { processClick } from '../../../../lib/ads'

export const dynamic = 'force-dynamic'

interface Params {
  params: Promise<{ type: string; slug: string }>
}

export async function GET(req: NextRequest, { params }: Params) {
  const { type, slug } = await params
  const placementId = req.nextUrl.searchParams.get('p')

  // Fallback if no placement ID (shouldn't happen but defensive)
  const fallbackUrl = type === 'counsellor'
    ? `/counsellor/${slug}`
    : `/centre/${slug}`

  if (!placementId) {
    return NextResponse.redirect(new URL(fallbackUrl, req.url))
  }

  try {
    const result = await processClick(placementId)

    if (!result?.destination_url) {
      return NextResponse.redirect(new URL(fallbackUrl, req.url))
    }

    // External URL — redirect directly
    const destination = result.destination_url
    if (destination.startsWith('http')) {
      // Add UTM params so they can track in their own GA
      const url = new URL(destination)
      url.searchParams.set('utm_source', 'sobernation')
      url.searchParams.set('utm_medium', 'cpc')
      url.searchParams.set('utm_campaign', 'directory')
      return NextResponse.redirect(url.toString())
    }

    // Internal profile
    return NextResponse.redirect(new URL(destination, req.url))
  } catch {
    return NextResponse.redirect(new URL(fallbackUrl, req.url))
  }
}
