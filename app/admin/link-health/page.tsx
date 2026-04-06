'use client'

/**
 * /admin/link-health — Link health monitoring dashboard
 *
 * Shows the latest scan results, historical trend, and lets you
 * trigger a new scan on demand.
 */

import { useState, useEffect, useCallback } from 'react'

// Read from env — fall back to the hardcoded default for local dev
const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? 'sobernation-link-check-secret'

interface Issue {
  id: string
  scan_id: string
  scanned_at: string
  source_page: string
  broken_url: string
  error_type: string
  status: 'auto_fixed' | 'redirect_recommended' | 'unresolved' | 'ignored'
  suggested_fix: string | null
  priority: 'high' | 'normal' | 'low'
  alert_sent: boolean
  notes: string
}

interface HistoryEntry {
  scanId: string
  scannedAt: string
  total: number
  unresolved: number
  redirects: number
}

interface ScanData {
  latestScanId: string | null
  latestScannedAt: string | null
  issues: Issue[]
  history: HistoryEntry[]
}

type FilterStatus = 'all' | 'unresolved' | 'redirect_recommended' | 'auto_fixed'

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  unresolved:             { bg: '#fef2f2', color: '#dc2626', label: 'Unresolved' },
  redirect_recommended:   { bg: '#fffbeb', color: '#d97706', label: 'Redirect needed' },
  auto_fixed:             { bg: '#f0fdf4', color: '#16a34a', label: 'Auto-fixed' },
  ignored:                { bg: '#f9fafb', color: '#6b7280', label: 'Ignored' },
}

const PRIORITY_STYLES: Record<string, { bg: string; color: string }> = {
  high:   { bg: '#fef2f2', color: '#dc2626' },
  normal: { bg: '#f9fafb', color: '#6b7280' },
  low:    { bg: '#f0fdf4', color: '#16a34a' },
}

export default function LinkHealthPage() {
  const [data, setData] = useState<ScanData | null>(null)
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [search, setSearch] = useState('')
  const [scanResult, setScanResult] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/link-scan-results?secret=${ADMIN_SECRET}`)
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  async function triggerScan() {
    setScanning(true)
    setScanResult(null)
    try {
      const res = await fetch(`/api/cron/link-check?secret=${ADMIN_SECRET}&trigger=manual`)
      const json = await res.json()
      if (json.ok) {
        setScanResult(`✓ Scan complete — ${json.summary.totalIssues} issues found across ${json.summary.totalLinksChecked.toLocaleString()} links`)
        await fetchData()
      } else {
        setScanResult(`✗ Scan failed: ${json.error}`)
      }
    } catch (e) {
      setScanResult(`✗ Error: ${String(e)}`)
    } finally {
      setScanning(false)
    }
  }

  const issues = data?.issues ?? []
  const filtered = issues.filter(i => {
    if (filter !== 'all' && i.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return i.broken_url.toLowerCase().includes(q) ||
        i.source_page.toLowerCase().includes(q) ||
        i.error_type.toLowerCase().includes(q)
    }
    return true
  })

  const unresolved = issues.filter(i => i.status === 'unresolved').length
  const redirects = issues.filter(i => i.status === 'redirect_recommended').length
  const fixed = issues.filter(i => i.status === 'auto_fixed').length
  const high = issues.filter(i => i.priority === 'high').length

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'inherit' }}>
      <style>{`
        .lh-stat { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px 20px; }
        .lh-stat-value { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
        .lh-stat-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #9ca3af; margin-top: 2px; }
        .lh-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb; }
        .lh-table th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #6b7280; background: #f9fafb; border-bottom: 1px solid #e5e7eb; white-space: nowrap; }
        .lh-table td { padding: 11px 14px; font-size: 13px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
        .lh-table tr:last-child td { border-bottom: none; }
        .lh-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .lh-mono { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 12px; }
        .lh-btn { border: none; cursor: pointer; font-weight: 700; border-radius: 8px; transition: opacity 0.12s; }
        .lh-btn:hover { opacity: 0.85; }
        .lh-input { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 13px; outline: none; width: 260px; }
        .lh-input:focus { border-color: #064e3b; }
        .lh-filter-btn { border: 1px solid #e5e7eb; background: #fff; border-radius: 8px; padding: 7px 14px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.12s; }
        .lh-filter-btn.active { background: #064e3b; color: #fff; border-color: #064e3b; }
        .lh-empty { text-align: center; padding: 60px 20px; color: #9ca3af; font-size: 14px; }
      `}</style>

      {/* Header */}
      <div style={{ background: '#064e3b', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Link Health Monitor</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            {data?.latestScannedAt
              ? `Last scan: ${new Date(data.latestScannedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`
              : 'No scans yet'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            className="lh-btn"
            onClick={fetchData}
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '9px 16px', fontSize: 13 }}
          >
            ↻ Refresh
          </button>
          <button
            className="lh-btn"
            onClick={triggerScan}
            disabled={scanning}
            style={{ background: scanning ? '#9ca3af' : '#fff', color: '#064e3b', padding: '9px 18px', fontSize: 13 }}
          >
            {scanning ? 'Scanning…' : '⟳ Run scan now'}
          </button>
        </div>
      </div>

      {scanResult && (
        <div style={{
          padding: '12px 32px', fontSize: 13, fontWeight: 600,
          background: scanResult.startsWith('✓') ? '#f0fdf4' : '#fef2f2',
          color: scanResult.startsWith('✓') ? '#16a34a' : '#dc2626',
          borderBottom: '1px solid #e5e7eb',
        }}>
          {scanResult}
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
          <div className="lh-stat">
            <div className="lh-stat-value" style={{ color: '#dc2626' }}>{loading ? '…' : unresolved}</div>
            <div className="lh-stat-label">Need manual fix</div>
          </div>
          <div className="lh-stat">
            <div className="lh-stat-value" style={{ color: '#d97706' }}>{loading ? '…' : redirects}</div>
            <div className="lh-stat-label">Redirect recommended</div>
          </div>
          <div className="lh-stat">
            <div className="lh-stat-value" style={{ color: '#1d9bf0' }}>{loading ? '…' : high}</div>
            <div className="lh-stat-label">High priority</div>
          </div>
          <div className="lh-stat">
            <div className="lh-stat-value" style={{ color: '#16a34a' }}>{loading ? '…' : fixed}</div>
            <div className="lh-stat-label">Auto-fixed</div>
          </div>
          <div className="lh-stat">
            <div className="lh-stat-value" style={{ color: '#374151' }}>{loading ? '…' : issues.length}</div>
            <div className="lh-stat-label">Total issues</div>
          </div>
        </div>

        {/* Scan history */}
        {(data?.history?.length ?? 0) > 0 && (
          <details style={{ marginBottom: 24 }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: 13, color: '#374151', padding: '12px 16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }}>
              Scan history ({data!.history.length} scans)
            </summary>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
              <table className="lh-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total issues</th>
                    <th>Unresolved</th>
                    <th>Redirects needed</th>
                  </tr>
                </thead>
                <tbody>
                  {data!.history.map(h => (
                    <tr key={h.scanId}>
                      <td>{new Date(h.scannedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                      <td>{h.total}</td>
                      <td style={{ color: h.unresolved > 0 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>{h.unresolved}</td>
                      <td style={{ color: h.redirects > 0 ? '#d97706' : '#16a34a', fontWeight: 700 }}>{h.redirects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}

        {/* Redirect recommendations — highlighted separately */}
        {filtered.filter(i => i.status === 'redirect_recommended').length > 0 && filter === 'all' && (
          <div style={{ marginBottom: 24, background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 12 }}>
              ↪ Recommended 301 redirects — add these to next.config.ts → redirects()
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {filtered.filter(i => i.status === 'redirect_recommended').slice(0, 20).map(i => (
                <code key={i.id} style={{ fontSize: 12, background: '#fff', padding: '6px 10px', borderRadius: 6, border: '1px solid #fcd34d', display: 'block' }}>
                  {`{ source: '${i.broken_url}', destination: '${i.suggestedFix}', permanent: true },`}
                </code>
              ))}
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['all', 'unresolved', 'redirect_recommended', 'auto_fixed'] as FilterStatus[]).map(s => (
            <button
              key={s}
              className={`lh-filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s === 'all' ? `All (${issues.length})` :
               s === 'unresolved' ? `Unresolved (${unresolved})` :
               s === 'redirect_recommended' ? `Redirects (${redirects})` :
               `Auto-fixed (${fixed})`}
            </button>
          ))}
          <input
            className="lh-input"
            placeholder="Search URL or source page…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Issues table */}
        {loading ? (
          <div className="lh-empty">Loading scan results…</div>
        ) : filtered.length === 0 ? (
          <div className="lh-empty">
            {issues.length === 0 ? '🎉 No issues found. Run a scan to check.' : 'No issues match your filter.'}
          </div>
        ) : (
          <table className="lh-table">
            <thead>
              <tr>
                <th style={{ width: 70 }}>Priority</th>
                <th style={{ width: 120 }}>Status</th>
                <th>Broken URL</th>
                <th>Source page</th>
                <th>Error</th>
                <th>Suggested fix</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(issue => {
                const statusStyle = STATUS_STYLES[issue.status] ?? STATUS_STYLES.ignored
                const priorityStyle = PRIORITY_STYLES[issue.priority] ?? PRIORITY_STYLES.normal
                return (
                  <tr key={issue.id}>
                    <td>
                      <span className="lh-badge" style={{ background: priorityStyle.bg, color: priorityStyle.color }}>
                        {issue.priority}
                      </span>
                    </td>
                    <td>
                      <span className="lh-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                        {statusStyle.label}
                      </span>
                    </td>
                    <td>
                      <a href={issue.broken_url} target="_blank" rel="noopener noreferrer" className="lh-mono" style={{ color: '#dc2626', textDecoration: 'none' }}>
                        {issue.broken_url}
                      </a>
                    </td>
                    <td>
                      <a href={issue.source_page} target="_blank" rel="noopener noreferrer" className="lh-mono" style={{ color: '#4b5563', textDecoration: 'none' }}>
                        {issue.source_page}
                      </a>
                    </td>
                    <td>
                      <code style={{ fontSize: 11, background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
                        {issue.error_type}
                      </code>
                    </td>
                    <td>
                      {issue.suggested_fix ? (
                        <a href={issue.suggested_fix} target="_blank" rel="noopener noreferrer" className="lh-mono" style={{ color: '#059669', textDecoration: 'none' }}>
                          {issue.suggested_fix}
                        </a>
                      ) : <span style={{ color: '#9ca3af' }}>—</span>}
                    </td>
                    <td style={{ maxWidth: 280, color: '#6b7280', fontSize: 12, lineHeight: 1.5 }}>
                      {issue.notes}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        {filtered.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
            Showing {filtered.length} of {issues.length} issues · Scan ID: {data?.latestScanId}
          </div>
        )}
      </div>
    </div>
  )
}
