'use client'

import { useState } from 'react'
import Link from 'next/link'

// ── Types ─────────────────────────────────────────────────────────────────────

interface DailyPoint { day: string; impressions: number; clicks: number; spend_pence: number }

interface Campaign {
  id: string
  display_name: string
  listing_type: 'centre' | 'counsellor'
  location_slug: string
  active: boolean
  paused_budget_depleted: boolean
  max_cpc_pence: number
  monthly_budget_pence: number
  budget_remaining_pence: number
  quality_score: number
  backlink_verified: boolean
  backlink_url: string | null
  destination_type: 'own_url' | 'sobernation_profile'
  destination_url: string | null
  display_phone: string | null
  impressions_this_month: number
  clicks_this_month: number
  created_at: string
  impressions_30d: number
  clicks_30d: number
  phone_taps_30d: number
  spend_30d_pence: number
  ctr_30d: string
  daily: DailyPoint[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function poundsStr(pence: number) {
  return `£${(pence / 100).toFixed(2)}`
}

function humanLocation(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
}

// ── Sparkline chart ───────────────────────────────────────────────────────────

function Sparkline({ daily, metric = 'clicks' }: { daily: DailyPoint[]; metric?: 'clicks' | 'impressions' }) {
  if (!daily.length) {
    return (
      <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-light)' }}>No data yet</span>
      </div>
    )
  }

  // Fill last 30 days
  const days30: DailyPoint[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    const found = daily.find(p => p.day === key)
    days30.push(found ?? { day: key, impressions: 0, clicks: 0, spend_pence: 0 })
  }

  const values = days30.map(d => d[metric])
  const max = Math.max(...values, 1)
  const w = 280; const h = 48

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - (v / max) * (h - 4)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#grad-${metric})`}
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      padding: '20px', borderRadius: 12,
      background: accent ? 'linear-gradient(135deg, #0d4a3a, #1a7a5e)' : 'var(--white)',
      border: accent ? 'none' : '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: accent ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: accent ? '#fff' : 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: accent ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  )
}

// ── Budget bar ────────────────────────────────────────────────────────────────

function BudgetBar({ remaining, total }: { remaining: number; total: number }) {
  const pct = total > 0 ? Math.round((remaining / total) * 100) : 0
  const color = pct > 40 ? 'var(--accent)' : pct > 15 ? '#f59e0b' : '#ef4444'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: 'var(--text-muted)' }}>Budget remaining</span>
        <span style={{ fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.5s' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginTop: 3, color: 'var(--text-muted)' }}>
        <span>{poundsStr(remaining)} left</span>
        <span>of {poundsStr(total)}</span>
      </div>
    </div>
  )
}

// ── Quality score badge ───────────────────────────────────────────────────────

function QualityBadge({ score }: { score: number }) {
  const color = score >= 7 ? '#22c55e' : score >= 4 ? '#f59e0b' : '#ef4444'
  const label = score >= 7 ? 'Great' : score >= 4 ? 'OK' : 'Low'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: color + '20', border: `1.5px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 800, color,
      }}>
        {score}
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Quality Score</div>
        <div style={{ fontSize: 10, color }}>{label} — {score}/10</div>
      </div>
    </div>
  )
}

// ── Campaign card ─────────────────────────────────────────────────────────────

function CampaignCard({ c, expanded, onToggle }: { c: Campaign; expanded: boolean; onToggle: () => void }) {
  const budgetSpent = c.monthly_budget_pence - c.budget_remaining_pence
  const statusColor = c.active && !c.paused_budget_depleted ? '#22c55e' : '#ef4444'
  const statusLabel = c.active && !c.paused_budget_depleted ? 'Live' : c.paused_budget_depleted ? 'Budget depleted' : 'Paused'

  return (
    <div style={{
      border: '1.5px solid var(--border)', borderRadius: 14,
      background: 'var(--white)', overflow: 'hidden',
      boxShadow: expanded ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'box-shadow 0.2s',
    }}>
      {/* Card header */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 14, width: '100%',
          padding: '18px 20px', background: 'none', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        {/* Status dot */}
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor, flexShrink: 0, boxShadow: c.active && !c.paused_budget_depleted ? `0 0 0 3px ${statusColor}30` : 'none' }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{c.display_name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span>{humanLocation(c.location_slug)}</span>
            <span>·</span>
            <span>{c.listing_type === 'centre' ? 'Rehab centre' : 'Counsellor'}</span>
            <span>·</span>
            <span style={{ color: statusColor, fontWeight: 600 }}>{statusLabel}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
          {[
            { label: 'Clicks', value: c.clicks_30d },
            { label: 'Impr.', value: c.impressions_30d },
            { label: 'CTR', value: `${c.ctr_30d}%` },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.label} 30d</div>
            </div>
          ))}
        </div>

        {/* Expand chevron */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--text-muted)" strokeWidth="2"
          style={{ flexShrink: 0, transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>

            {/* Monthly fee */}
            <div style={{ padding: '16px', borderRadius: 10, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Monthly fee</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                {poundsStr(c.monthly_budget_pence)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Position {c.clicks_this_month > 0 ? '—' : '—'} renews monthly
              </div>
            </div>

            {/* Phone taps */}
            <div style={{ padding: '16px', borderRadius: 10, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Phone taps (30d)</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{c.phone_taps_30d}</div>
              {c.display_phone
                ? <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>📞 {c.display_phone}</div>
                : <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>No phone set — <a href="/advertise/promote" style={{ color: 'var(--accent)' }}>add one</a></div>
              }
            </div>

            {/* Quality score */}
            <div style={{ padding: '16px', borderRadius: 10, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <QualityBadge score={c.quality_score} />
              {!c.backlink_verified && (
                <div style={{ padding: '8px 10px', borderRadius: 8, background: '#fff7ed', border: '1px solid #fed7aa', fontSize: 11, color: '#92400e', lineHeight: 1.5 }}>
                  💡 Add a backlink to sobernation.co.uk for a <strong>+4 score boost</strong>
                </div>
              )}
              {c.backlink_verified && (
                <div style={{ padding: '8px 10px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 11, color: '#166534' }}>
                  ✓ Backlink verified — +4 quality boost active
                </div>
              )}
            </div>
          </div>

          {/* Sparkline chart */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Clicks — last 30 days</div>
            <div style={{ overflowX: 'auto' }}>
              <Sparkline daily={c.daily} metric="clicks" />
            </div>
          </div>

          {/* Destination info */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
              Clicks go to:&nbsp;<strong style={{ color: 'var(--text)' }}>
                {c.destination_type === 'own_url' ? (c.destination_url || 'Your website') : 'SoberNation profile'}
              </strong>
            </div>
            <Link
              href={`/rehab/${c.location_slug}`}
              target="_blank"
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
            >
              View your listing ↗
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Email gate ────────────────────────────────────────────────────────────────

function EmailGate({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState('')
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', width: 52, height: 52, borderRadius: 12,
            background: 'linear-gradient(135deg, #0d4a3a, #1a7a5e)',
            alignItems: 'center', justifyContent: 'center', marginBottom: 12,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', margin: 0 }}>
            Ads Dashboard
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
            Enter the email you used when setting up your campaign
          </p>
        </div>

        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
            Your email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && email && onSubmit(email)}
            placeholder="you@yourcentre.co.uk"
            style={{
              width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)',
              borderRadius: 8, fontSize: 14, color: 'var(--text)', background: '#fff',
              outline: 'none', boxSizing: 'border-box', marginBottom: 12,
            }}
            autoFocus
          />
          <button
            disabled={!email}
            onClick={() => onSubmit(email)}
            style={{
              width: '100%', padding: '14px', background: email ? 'var(--accent)' : 'var(--border)',
              color: email ? '#fff' : 'var(--text-muted)',
              border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15,
              cursor: email ? 'pointer' : 'not-allowed',
            }}
          >
            View my campaigns →
          </button>

          <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 14, marginBottom: 0 }}>
            No campaigns yet?&nbsp;
            <Link href="/advertise/promote" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              Start one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ email }: { email: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{
        display: 'inline-flex', width: 56, height: 56, borderRadius: 12,
        background: 'var(--accent-pale)', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>No campaigns found</h2>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 340, margin: '0 auto 24px' }}>
        No active campaigns found for <strong>{email}</strong>. Have you run the SQL to set up the database?
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/advertise/promote"
          style={{
            padding: '12px 24px', background: 'var(--accent)', color: '#fff',
            borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}
        >
          Start a campaign →
        </Link>
        <Link
          href="/advertise"
          style={{
            padding: '12px 24px', border: '1px solid var(--border)', color: 'var(--text)',
            borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none',
          }}
        >
          Learn more
        </Link>
      </div>
    </div>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function AdsDashboard() {
  const [email, setEmail] = useState<string | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  async function loadCampaigns(emailInput: string) {
    setEmail(emailInput)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/dashboard/ads/campaigns?email=${encodeURIComponent(emailInput)}`)
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setCampaigns(data.campaigns ?? [])
      if (data.campaigns?.length === 1) setExpandedId(data.campaigns[0].id)
    } catch {
      setError('Failed to load campaigns. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  if (!email) return <EmailGate onSubmit={loadCampaigns} />

  // Aggregate totals across all campaigns
  const totals = campaigns.reduce((acc, c) => ({
    impressions: acc.impressions + c.impressions_30d,
    clicks: acc.clicks + c.clicks_30d,
    phone_taps: acc.phone_taps + c.phone_taps_30d,
    spend: acc.spend + c.spend_30d_pence,
  }), { impressions: 0, clicks: 0, phone_taps: 0, spend: 0 })

  const overallCtr = totals.impressions > 0
    ? ((totals.clicks / totals.impressions) * 100).toFixed(1)
    : '—'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--white)', borderBottom: '1px solid var(--border)',
        padding: '0 24px', position: 'sticky', top: 0, zIndex: 40,
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, height: 56 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: 'linear-gradient(135deg, #0d4a3a, #1a7a5e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>SoberNation Ads</span>
          </Link>

          <div style={{ flex: 1 }} />

          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{email}</div>
          <button
            onClick={() => { setEmail(null); setCampaigns([]) }}
            style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}
          >
            Sign out
          </button>
          <Link
            href="/advertise/promote"
            style={{
              padding: '8px 16px', background: 'var(--accent)', color: '#fff',
              borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none',
            }}
          >
            + New campaign
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 80px' }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Loading your campaigns...
          </div>
        )}

        {error && (
          <div style={{ padding: '16px', borderRadius: 10, background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', fontSize: 14 }}>
            {error}
          </div>
        )}

        {!loading && !error && campaigns.length === 0 && <EmptyState email={email} />}

        {!loading && !error && campaigns.length > 0 && (
          <>
            {/* Page header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', margin: 0 }}>
                  Your campaigns
                </h1>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  {campaigns.length} campaign{campaigns.length > 1 ? 's' : ''} · Last 30 days
                </p>
              </div>
            </div>

            {/* Overview stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
              <StatCard label="Impressions" value={totals.impressions.toLocaleString()} sub="Last 30 days" />
              <StatCard label="Clicks" value={totals.clicks.toLocaleString()} sub="Last 30 days" accent />
              <StatCard label="Phone taps" value={totals.phone_taps.toLocaleString()} sub="Last 30 days" />
              <StatCard label="CTR" value={`${overallCtr}%`} sub="Click-through rate" />
            </div>

            {/* Campaign cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {campaigns.map(c => (
                <CampaignCard
                  key={c.id}
                  c={c}
                  expanded={expandedId === c.id}
                  onToggle={() => setExpandedId(expandedId === c.id ? null : c.id)}
                />
              ))}
            </div>

            {/* Backlink tips */}
            {campaigns.some(c => !c.backlink_verified) && (
              <div style={{
                marginTop: 24, padding: '20px', borderRadius: 12,
                background: '#fff7ed', border: '1px solid #fed7aa',
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>
                  💡 Boost your Ad Rank — it&apos;s free
                </div>
                <p style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6, margin: 0 }}>
                  Add a do-follow link to <strong>sobernation.co.uk</strong> somewhere on your website (footer, resources page, etc.)
                  and your Quality Score will increase by +4 points — this alone can push you above competitors paying twice your CPC.
                  Once added, email <strong>ads@sobernation.co.uk</strong> with your URL to get it verified.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
