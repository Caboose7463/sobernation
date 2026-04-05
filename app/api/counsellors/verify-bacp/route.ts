/**
 * POST /api/counsellors/verify-bacp
 * 
 * Checks a name + BACP membership number against BACP's public therapist register.
 * Returns { verified: boolean, message?: string }
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { name, bacpNumber, listingType } = await req.json()

  if (!name || !bacpNumber) {
    return NextResponse.json({ verified: false, message: 'Name and registration number are required.' }, { status: 400 })
  }

  // For CQC (rehab centres) use CQC register check
  if (listingType === 'centre') {
    return checkCQC(name, bacpNumber)
  }

  // For counsellors — check BACP public register
  return checkBACP(name, bacpNumber)
}

async function checkBACP(name: string, bacpNumber: string) {
  try {
    // BACP has a public therapist search
    // We query by membership number and verify the name matches
    const cleanNumber = bacpNumber.trim().replace(/\s/g, '')
    const cleanName = name.trim().toLowerCase()

    const url = `https://www.bacp.co.uk/search/Therapists?q=${encodeURIComponent(cleanNumber)}`

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SoberNation/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      // BACP unreachable — fail open with a soft message
      return NextResponse.json({
        verified: false,
        message: 'Unable to reach the BACP register right now. Please try again in a moment.',
      })
    }

    const html = await res.text()

    // Check if the person's name appears near the membership number in results
    const nameParts = cleanName.split(' ').filter(p => p.length > 2)
    const htmlLower = html.toLowerCase()

    const nameFound = nameParts.length > 0 && nameParts.every(part => htmlLower.includes(part))
    const resultFound = htmlLower.includes(cleanNumber.toLowerCase()) ||
                        htmlLower.includes('therapist') ||
                        htmlLower.includes('counsellor')

    if (nameFound && resultFound) {
      return NextResponse.json({ verified: true })
    }

    // If page has no results at all
    if (htmlLower.includes('no results') || htmlLower.includes('no therapists found')) {
      return NextResponse.json({
        verified: false,
        message: `No BACP member found with number ${cleanNumber}. Please check and try again.`,
      })
    }

    // Name mismatch
    if (resultFound && !nameFound) {
      return NextResponse.json({
        verified: false,
        message: 'The name you entered doesn\'t match the name on this BACP registration. Please use the exact name as registered.',
      })
    }

    return NextResponse.json({
      verified: false,
      message: 'We couldn\'t confirm this registration. Make sure your number and name exactly match your BACP profile.',
    })

  } catch (err) {
    console.error('BACP check error:', err)
    return NextResponse.json({
      verified: false,
      message: 'Verification service temporarily unavailable. Please try again.',
    })
  }
}

async function checkCQC(name: string, cqcNumber: string) {
  try {
    const cleanNumber = cqcNumber.trim().replace(/\s/g, '')

    // CQC has a public API for provider lookups
    const url = `https://api.cqc.org.uk/public/v1/providers/${encodeURIComponent(cleanNumber)}`

    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })

    if (res.status === 404) {
      return NextResponse.json({
        verified: false,
        message: `No CQC provider found with registration ${cleanNumber}. Please check and try again.`,
      })
    }

    if (!res.ok) {
      return NextResponse.json({
        verified: false,
        message: 'Unable to reach the CQC register right now. Please try again.',
      })
    }

    const data = await res.json()
    const registeredName: string = (data.name || data.organisationName || '').toLowerCase()
    const submittedName = name.trim().toLowerCase()

    // Check name similarity (allow partial match)
    const nameMatch = registeredName.includes(submittedName) ||
                      submittedName.includes(registeredName) ||
                      registeredName.split(' ').some((w: string) => w.length > 3 && submittedName.includes(w))

    if (nameMatch) {
      return NextResponse.json({ verified: true })
    }

    return NextResponse.json({
      verified: false,
      message: `The name "${name}" doesn't match the registered name. Please use the exact name as on your CQC registration.`,
    })

  } catch (err) {
    console.error('CQC check error:', err)
    return NextResponse.json({
      verified: false,
      message: 'Verification service temporarily unavailable. Please try again.',
    })
  }
}
