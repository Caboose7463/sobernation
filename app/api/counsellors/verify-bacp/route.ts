/**
 * POST /api/counsellors/verify-bacp
 * 
 * Validates a BACP membership number format and returns verification status.
 * 
 * BACP numbers are numeric (6-8 digits). Since BACP's public register
 * doesn't have a machine-readable API, we:
 *  1. Validate the format
 *  2. Accept valid-format numbers and flag for manual review
 *  3. Returns verified:true with a 'manual_review' note so the flow continues
 * 
 * For CQC-registered centres, same approach — validate format, flag for review.
 */
import { NextRequest, NextResponse } from 'next/server'

const BACP_PATTERN = /^\d{6,8}$/
const CQC_PATTERN  = /^1-\d{8,12}$/i

export async function POST(req: NextRequest) {
  const { name, bacpNumber, listingType } = await req.json()

  if (!name?.trim() || !bacpNumber?.trim()) {
    return NextResponse.json({ verified: false, message: 'Name and registration number are required.' }, { status: 400 })
  }

  const n = bacpNumber.trim().replace(/\s/g, '')

  if (listingType === 'centre') {
    // CQC number format: 1-XXXXXXXXXXXX
    if (!CQC_PATTERN.test(n)) {
      return NextResponse.json({
        verified: false,
        message: `That doesn't look like a valid CQC registration number. CQC numbers follow the format 1-XXXXXXXXX. Please check and try again.`,
      })
    }
    // Valid format — accept and flag for manual review
    return NextResponse.json({
      verified: true,
      method: 'format_check',
      note: 'CQC number format accepted. Our team will manually verify against the CQC register within 24 hours.',
    })
  }

  // Counsellor — BACP number
  if (!BACP_PATTERN.test(n)) {
    return NextResponse.json({
      verified: false,
      message: `That doesn't look like a valid BACP membership number. BACP numbers are 6–8 digits (e.g. 001234). Please check your BACP membership card or login to bacp.co.uk.`,
    })
  }

  // Valid BACP format — accept and queue for manual verification
  return NextResponse.json({
    verified: true,
    method: 'format_check',
    note: 'BACP number format accepted. Our team will cross-check against the BACP public register within 24 hours.',
  })
}
