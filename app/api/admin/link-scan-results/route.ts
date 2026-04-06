/**
 * app/api/admin/link-scan-results/route.ts
 *
 * Returns recent scan results from Supabase for the admin dashboard.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const ADMIN_SECRET = process.env.CRON_SECRET ?? 'sobernation-link-check-secret'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: NextRequest) {
  const querySecret = req.nextUrl.searchParams.get('secret')
  if (querySecret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()

  // Latest scan summary
  const { data: latest } = await supabase
    .from('link_scan_log')
    .select('scan_id, scanned_at')
    .order('scanned_at', { ascending: false })
    .limit(1)
    .single()

  const latestScanId = latest?.scan_id

  // Count by status for the latest scan
  const { data: rows } = await supabase
    .from('link_scan_log')
    .select('*')
    .eq('scan_id', latestScanId ?? '')
    .order('priority', { ascending: true })
    .order('scanned_at', { ascending: false })
    .limit(500)

  // Historical scan summaries (last 30 scans)
  const { data: history } = await supabase
    .from('link_scan_log')
    .select('scan_id, scanned_at, status')
    .order('scanned_at', { ascending: false })
    .limit(1000)

  const scanGroups: Record<string, { scanId: string; scannedAt: string; total: number; unresolved: number; redirects: number }> = {}
  for (const row of history ?? []) {
    if (!scanGroups[row.scan_id]) {
      scanGroups[row.scan_id] = { scanId: row.scan_id, scannedAt: row.scanned_at, total: 0, unresolved: 0, redirects: 0 }
    }
    scanGroups[row.scan_id].total++
    if (row.status === 'unresolved') scanGroups[row.scan_id].unresolved++
    if (row.status === 'redirect_recommended') scanGroups[row.scan_id].redirects++
  }

  return NextResponse.json({
    latestScanId,
    latestScannedAt: latest?.scanned_at,
    issues: rows ?? [],
    history: Object.values(scanGroups).slice(0, 30),
  })
}
