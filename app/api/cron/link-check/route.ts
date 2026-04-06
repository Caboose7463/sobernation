/**
 * app/api/cron/link-check/route.ts
 *
 * Cron endpoint — called daily by Vercel at 03:00 UTC.
 * Also callable manually with ?secret=... for on-demand scans.
 *
 * Flow:
 * 1. Run the full link validation scan
 * 2. Write all results to Supabase link_scan_log
 * 3. Send email alert for anything unresolved or needing redirects
 * 4. Return a summary JSON
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { runLinkScan } from '../../../../lib/link-validator'
import { sendLinkScanAlert } from '../../../../lib/link-alert'

export const maxDuration = 300 // 5 minutes (requires Vercel Pro, safe on Hobby too)
export const dynamic = 'force-dynamic'

const CRON_SECRET = process.env.CRON_SECRET ?? 'sobernation-link-check-secret'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel automatically passes the CRON_SECRET header)
  const authHeader = req.headers.get('authorization')
  const querySecret = req.nextUrl.searchParams.get('secret')
  const validSecret = `Bearer ${CRON_SECRET}`

  if (authHeader !== validSecret && querySecret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const trigger = req.nextUrl.searchParams.get('trigger') ?? 'cron'
  console.log(`[link-check] Scan triggered: ${trigger}`)

  try {
    // ── 1. Run the scan ──────────────────────────────────────────────────────
    const report = await runLinkScan()
    console.log(`[link-check] Scan complete: ${report.totalLinksChecked} links, ${report.totalIssues} issues`)

    // ── 2. Persist to Supabase ───────────────────────────────────────────────
    if (report.issues.length > 0) {
      const supabase = getSupabase()

      const rows = report.issues.map(issue => ({
        scan_id: report.scanId,
        scanned_at: report.finishedAt.toISOString(),
        source_page: issue.sourcePage,
        broken_url: issue.brokenUrl,
        error_type: issue.errorType,
        status: issue.status,
        suggested_fix: issue.suggestedFix,
        priority: issue.priority,
        alert_sent: false,
        notes: issue.notes,
      }))

      // Insert in batches of 100 to avoid payload limits
      for (let i = 0; i < rows.length; i += 100) {
        const batch = rows.slice(i, i + 100)
        const { error } = await supabase.from('link_scan_log').insert(batch)
        if (error) {
          console.error(`[link-check] Supabase insert error (batch ${i}):`, error)
        }
      }

      // ── 3. Email alert ───────────────────────────────────────────────────
      const needsAlert = report.issues.some(
        i => i.status === 'unresolved' || i.status === 'redirect_recommended'
      )

      if (needsAlert) {
        try {
          await sendLinkScanAlert(report)

          // Mark all as alert_sent
          await supabase
            .from('link_scan_log')
            .update({ alert_sent: true })
            .eq('scan_id', report.scanId)

          console.log(`[link-check] Alert email sent`)
        } catch (emailErr) {
          console.error(`[link-check] Failed to send alert email:`, emailErr)
        }
      }
    }

    // ── 4. Return summary ────────────────────────────────────────────────────
    const summary = {
      scanId: report.scanId,
      trigger,
      startedAt: report.startedAt,
      finishedAt: report.finishedAt,
      durationMs: report.finishedAt.getTime() - report.startedAt.getTime(),
      totalLinksChecked: report.totalLinksChecked,
      totalIssues: report.totalIssues,
      byStatus: {
        auto_fixed: report.issues.filter(i => i.status === 'auto_fixed').length,
        redirect_recommended: report.issues.filter(i => i.status === 'redirect_recommended').length,
        unresolved: report.issues.filter(i => i.status === 'unresolved').length,
      },
      byPriority: {
        high: report.issues.filter(i => i.priority === 'high').length,
        normal: report.issues.filter(i => i.priority === 'normal').length,
        low: report.issues.filter(i => i.priority === 'low').length,
      },
    }

    return NextResponse.json({ ok: true, summary })
  } catch (err) {
    console.error('[link-check] Fatal scan error:', err)
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    )
  }
}
