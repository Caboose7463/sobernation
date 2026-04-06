import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim().toLowerCase() ?? ''

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const locData = require('../../../../../data/locations.json') as {
      locations: Array<{ slug: string; name: string; county?: string }>
    }

    const all = locData.locations

    // If no query, return top 30 by index (most populated)
    if (!q || q.length < 1) {
      return NextResponse.json({
        locations: all.slice(0, 30).map(l => ({ slug: l.slug, name: l.name }))
      })
    }

    // Search by slug or name
    const matches = all
      .filter(l =>
        l.slug.includes(q) ||
        l.name.toLowerCase().includes(q) ||
        (l.county && l.county.toLowerCase().includes(q))
      )
      .slice(0, 20)
      .map(l => ({ slug: l.slug, name: l.name }))

    return NextResponse.json({ locations: matches })
  } catch (err) {
    console.error('[listings/locations]', err)
    // Fallback to top cities
    return NextResponse.json({
      locations: [
        'london','birmingham','manchester','leeds','sheffield','liverpool',
        'bristol','newcastle','nottingham','leicester','coventry','bradford',
        'edinburgh','glasgow','cardiff','belfast','brighton','plymouth',
      ].map(s => ({ slug: s, name: s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') }))
    })
  }
}
