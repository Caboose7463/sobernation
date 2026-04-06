/**
 * lib/link-alert.ts
 *
 * Sends email alerts via Resend when broken links can't be auto-fixed.
 */

import { Resend } from 'resend'
import type { LinkIssue, ScanReport } from './link-validator'

const ALERT_TO = 'james@hettiebells.com'
const ALERT_FROM = 'SoberNation Alerts <alerts@sobernation.co.uk>'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

function issueRow(issue: LinkIssue): string {
  return `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:10px 12px;font-size:13px;color:#374151;">${issue.sourcePage}</td>
      <td style="padding:10px 12px;font-size:13px;font-family:monospace;color:#dc2626;">${issue.brokenUrl}</td>
      <td style="padding:10px 12px;font-size:13px;color:#6b7280;">${issue.errorType}</td>
      <td style="padding:10px 12px;font-size:13px;color:#059669;">${issue.suggestedFix ?? '—'}</td>
      <td style="padding:10px 12px;font-size:13px;color:#6b7280;">${issue.notes}</td>
    </tr>`
}

export async function sendLinkScanAlert(report: ScanReport): Promise<void> {
  const resend = getResend()

  const unresolved = report.issues.filter(i => i.status === 'unresolved')
  const redirectNeeded = report.issues.filter(i => i.status === 'redirect_recommended')
  const highPriority = report.issues.filter(i => i.priority === 'high')

  if (unresolved.length === 0 && redirectNeeded.length === 0) return // nothing to alert on

  const duration = Math.round(
    (report.finishedAt.getTime() - report.startedAt.getTime()) / 1000
  )

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:20px;">
      <div style="max-width:900px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <div style="background:#064e3b;padding:24px 32px;">
          <div style="font-size:18px;font-weight:700;color:#fff;margin-bottom:4px;">
            SoberNation · Link Health Report
          </div>
          <div style="font-size:13px;color:rgba(255,255,255,0.7);">
            Scan completed ${report.finishedAt.toUTCString()} · ${duration}s · ${report.totalLinksChecked.toLocaleString()} links checked
          </div>
        </div>

        <!-- Summary -->
        <div style="padding:24px 32px;border-bottom:1px solid #e5e7eb;display:flex;gap:32px;flex-wrap:wrap;">
          <div>
            <div style="font-size:28px;font-weight:800;color:#dc2626;">${unresolved.length}</div>
            <div style="font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Need manual fix</div>
          </div>
          <div>
            <div style="font-size:28px;font-weight:800;color:#d97706;">${redirectNeeded.length}</div>
            <div style="font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Redirect recommended</div>
          </div>
          <div>
            <div style="font-size:28px;font-weight:800;color:#1d9bf0;">${highPriority.length}</div>
            <div style="font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">High priority</div>
          </div>
          <div>
            <div style="font-size:28px;font-weight:800;color:#374151;">${report.totalIssues}</div>
            <div style="font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Total issues</div>
          </div>
        </div>

        <div style="padding:24px 32px;">
          <a href="https://www.sobernation.co.uk/admin/link-health"
             style="display:inline-block;background:#064e3b;color:#fff;font-size:13px;font-weight:700;padding:10px 20px;border-radius:8px;text-decoration:none;margin-bottom:24px;">
            View full report →
          </a>

          ${unresolved.length > 0 ? `
          <!-- Unresolved -->
          <h2 style="font-size:15px;font-weight:700;color:#991b1b;margin:0 0 12px;">
            ⚠ Unresolved — manual action required (${unresolved.length})
          </h2>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;">
            <thead>
              <tr style="background:#fef2f2;">
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em;">Source page</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em;">Broken URL</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em;">Error type</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em;">Suggested fix</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em;">Notes</th>
              </tr>
            </thead>
            <tbody>
              ${unresolved.slice(0, 50).map(issueRow).join('')}
              ${unresolved.length > 50 ? `<tr><td colspan="5" style="padding:10px 12px;font-size:12px;color:#6b7280;">... and ${unresolved.length - 50} more. See full report.</td></tr>` : ''}
            </tbody>
          </table>
          ` : ''}

          ${redirectNeeded.length > 0 ? `
          <!-- Redirects -->
          <h2 style="font-size:15px;font-weight:700;color:#92400e;margin:0 0 12px;">
            ↪ Redirect recommended (${redirectNeeded.length})
          </h2>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;">
            <thead>
              <tr style="background:#fffbeb;">
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;">Broken URL</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;">Redirect to</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;">Notes</th>
              </tr>
            </thead>
            <tbody>
              ${redirectNeeded.slice(0, 50).map(i => `
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:10px 12px;font-size:13px;font-family:monospace;color:#dc2626;">${i.brokenUrl}</td>
                <td style="padding:10px 12px;font-size:13px;font-family:monospace;color:#059669;">${i.suggestedFix ?? '—'}</td>
                <td style="padding:10px 12px;font-size:13px;color:#6b7280;">${i.notes}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          ` : ''}
        </div>

        <!-- Footer -->
        <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
          Scan ID: ${report.scanId} · Generated by SoberNation automated link monitor
        </div>
      </div>
    </body>
    </html>
  `

  await resend.emails.send({
    from: ALERT_FROM,
    to: ALERT_TO,
    subject: `[SoberNation] Link Health: ${unresolved.length} need manual fix, ${redirectNeeded.length} redirects recommended`,
    html,
  })
}

export async function sendQuickAlert(issue: LinkIssue): Promise<void> {
  const resend = getResend()

  await resend.emails.send({
    from: ALERT_FROM,
    to: ALERT_TO,
    subject: `[SoberNation] Broken link detected: ${issue.brokenUrl}`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2 style="color:#991b1b;">Broken link detected</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:700;color:#374151;">Source page</td><td style="padding:8px;">${issue.sourcePage}</td></tr>
          <tr><td style="padding:8px;font-weight:700;color:#374151;">Broken URL</td><td style="padding:8px;font-family:monospace;color:#dc2626;">${issue.brokenUrl}</td></tr>
          <tr><td style="padding:8px;font-weight:700;color:#374151;">Error type</td><td style="padding:8px;">${issue.errorType}</td></tr>
          <tr><td style="padding:8px;font-weight:700;color:#374151;">Suggested fix</td><td style="padding:8px;color:#059669;">${issue.suggestedFix ?? 'None found'}</td></tr>
          <tr><td style="padding:8px;font-weight:700;color:#374151;">Priority</td><td style="padding:8px;">${issue.priority}</td></tr>
          <tr><td style="padding:8px;font-weight:700;color:#374151;">Notes</td><td style="padding:8px;">${issue.notes}</td></tr>
        </table>
        <a href="https://www.sobernation.co.uk/admin/link-health" style="display:inline-block;margin-top:16px;background:#064e3b;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;">View dashboard →</a>
      </div>
    `,
  })
}
