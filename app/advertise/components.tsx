'use client'

import { useState, useEffect } from 'react'

const LOCATIONS = [
  { slug: 'london', name: 'London', tier: 1 },
  { slug: 'manchester', name: 'Manchester', tier: 1 },
  { slug: 'birmingham', name: 'Birmingham', tier: 1 },
  { slug: 'leeds', name: 'Leeds', tier: 1 },
  { slug: 'glasgow', name: 'Glasgow', tier: 1 },
  { slug: 'bristol', name: 'Bristol', tier: 1 },
  { slug: 'liverpool', name: 'Liverpool', tier: 1 },
  { slug: 'sheffield', name: 'Sheffield', tier: 2 },
  { slug: 'newcastle', name: 'Newcastle', tier: 2 },
  { slug: 'nottingham', name: 'Nottingham', tier: 2 },
  { slug: 'cardiff', name: 'Cardiff', tier: 2 },
  { slug: 'edinburgh', name: 'Edinburgh', tier: 2 },
  { slug: 'leicester', name: 'Leicester', tier: 2 },
  { slug: 'southampton', name: 'Southampton', tier: 2 },
  { slug: 'oxford', name: 'Oxford', tier: 2 },
  { slug: 'cambridge', name: 'Cambridge', tier: 2 },
  { slug: 'salisbury', name: 'Salisbury', tier: 3 },
  { slug: 'kettering', name: 'Kettering', tier: 3 },
  { slug: 'shrewsbury', name: 'Shrewsbury', tier: 3 },
]

interface AuctionResult {
  winners: { position: number; display_name: string }[]
  total_bidders: number
}

export function PositionChecker() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'centre' | 'counsellor'>('centre')
  const [result, setResult] = useState<AuctionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<{ slug: string; name: string; tier: number } | null>(null)

  const filtered = query.length > 1
    ? LOCATIONS.filter(l => l.name.toLowerCase().startsWith(query.toLowerCase()))
    : []

  async function check(loc: { slug: string; name: string; tier: number }) {
    setSelected(loc)
    setQuery(loc.name)
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`/api/ads/auction?location=${loc.slug}&type=${type}`)
      const data = await res.json()
      setResult(data)
    } catch {
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selected) check(selected)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const takenPositions = result?.winners.map(w => w.position) ?? []
  const available = [1, 2, 3].filter(p => !takenPositions.includes(p))

  return (
    <div>
      {/* Search inputs */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null); setResult(null) }}
            placeholder="Search your city or town..."
            style={{
              width: '100%', padding: '12px 16px', border: '2px solid var(--border)',
              borderRadius: 8, fontSize: 15, outline: 'none', boxSizing: 'border-box',
              background: '#fff', color: 'var(--text)',
            }}
          />
          {filtered.length > 0 && !selected && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
              background: '#fff', border: '1.5px solid var(--border)', borderRadius: 8,
              marginTop: 4, boxShadow: '0 4px 16px rgba(0,0,0,0.10)', overflow: 'hidden',
            }}>
              {filtered.map(loc => (
                <button
                  key={loc.slug}
                  onClick={() => check(loc)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '10px 16px', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: 14, color: 'var(--text)',
                  }}
                >
                  {loc.name}
                  <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text-muted)' }}>
                    {loc.tier === 1 ? '· High competition' : loc.tier === 2 ? '· Medium' : '· Low competition'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <select
          value={type}
          onChange={e => setType(e.target.value as 'centre' | 'counsellor')}
          style={{
            padding: '12px 16px', border: '2px solid var(--border)',
            borderRadius: 8, fontSize: 14, background: '#fff', color: 'var(--text)',
            cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="centre">Rehab Centre</option>
          <option value="counsellor">Counsellor</option>
        </select>
      </div>

      {/* Results */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: 14 }}>
          Checking positions...
        </div>
      )}

      {result && selected && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1, 2, 3].map(pos => {
            const winner = result.winners.find(w => w.position === pos)
            const isTaken = !!winner
            return (
              <div
                key={pos}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 10,
                  border: isTaken ? '1px solid #fde68a' : '1.5px dashed #22c55e',
                  background: isTaken ? '#fffbeb' : '#f0fdf4',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: isTaken ? '#fde68a' : '#bbf7d0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: isTaken ? '#78350f' : '#15803d',
                }}>
                  {pos}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: isTaken ? '#92400e' : '#15803d' }}>
                    Position {pos} — {isTaken ? 'Taken' : '✓ Available'}
                  </div>
                  {isTaken
                    ? <div style={{ fontSize: 12, color: '#78350f', marginTop: 1 }}>{winner!.display_name} is in this slot</div>
                    : <div style={{ fontSize: 12, color: '#16a34a', marginTop: 1 }}>Claim this spot in {selected.name}</div>
                  }
                </div>
                {!isTaken && (
                  <a
                    href={`/advertise/promote`}
                    style={{
                      fontSize: 13, fontWeight: 700, padding: '7px 14px',
                      background: 'var(--accent)', color: '#fff',
                      borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap',
                    }}
                  >
                    Claim →
                  </a>
                )}
                {isTaken && (
                  <a
                    href={`/advertise/promote`}
                    style={{
                      fontSize: 12, fontWeight: 600, padding: '6px 12px',
                      border: '1px solid #fde68a', color: '#92400e',
                      borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap',
                      background: '#fef3c7',
                    }}
                  >
                    Outbid
                  </a>
                )}
              </div>
            )
          })}
          {available.length > 0 && (
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, margin: 0 }}>
              {available.length} of 3 positions available in {selected.name}.
            </p>
          )}
        </div>
      )}

      {!result && !loading && (
        <div style={{
          padding: '20px 16px', borderRadius: 10,
          border: '1px solid var(--border)', background: 'var(--bg)',
          fontSize: 14, color: 'var(--text-muted)', textAlign: 'center',
        }}>
          Search for a city or town to see live position availability
        </div>
      )}
    </div>
  )
}

// ── ROI Calculator ────────────────────────────────────────────────────────────

const TIER_CPC = {
  centre:     { 1: 8, 2: 5, 3: 2.5 },
  counsellor: { 1: 2, 2: 1.2, 3: 0.7 },
}

export function RoiCalculator() {
  const [budget, setBudget] = useState(300)
  const [tier, setTier] = useState<1 | 2 | 3>(1)
  const [bizType, setBizType] = useState<'centre' | 'counsellor'>('centre')

  const cpc = TIER_CPC[bizType][tier]
  const clicks = Math.round(budget / cpc)
  const clicksLow = Math.round(clicks * 0.75)
  const clicksHigh = Math.round(clicks * 1.25)
  const enquiriesLow = Math.round(clicksLow * 0.03)
  const enquiriesHigh = Math.ceil(clicksHigh * 0.05)
  const revenuePerEnquiry = bizType === 'centre' ? 8000 : 300
  const roiMin = enquiriesLow > 0 ? Math.round((enquiriesLow * revenuePerEnquiry) / budget) : 0
  const roiMax = Math.round((enquiriesHigh * revenuePerEnquiry) / budget)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
            Business type
          </label>
          <select
            value={bizType}
            onChange={e => setBizType(e.target.value as 'centre' | 'counsellor')}
            style={{
              width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)',
              borderRadius: 8, fontSize: 14, background: '#fff', color: 'var(--text)',
            }}
          >
            <option value="centre">Rehab Centre</option>
            <option value="counsellor">Counsellor</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
            Location type
          </label>
          <select
            value={tier}
            onChange={e => setTier(Number(e.target.value) as 1 | 2 | 3)}
            style={{
              width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)',
              borderRadius: 8, fontSize: 14, background: '#fff', color: 'var(--text)',
            }}
          >
            <option value={1}>Major city (London, Manchester...)</option>
            <option value={2}>Regional city (Sheffield, Cardiff...)</option>
            <option value={3}>Town / niche (Salisbury, Kettering...)</option>
          </select>
        </div>
      </div>

      {/* Budget slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Monthly budget</label>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>£{budget.toLocaleString()}/mo</span>
        </div>
        <input
          type="range" min={50} max={2000} step={50}
          value={budget}
          onChange={e => setBudget(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-light)', marginTop: 4 }}>
          <span>£50</span><span>£2,000</span>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { label: 'Est. clicks/month', value: `${clicksLow}–${clicksHigh}`, sub: `at ~£${cpc.toFixed(2)} CPC` },
          { label: 'Est. enquiries', value: `${enquiriesLow}–${enquiriesHigh}`, sub: 'at 3–5% rate' },
          { label: 'Est. ROI', value: roiMin > 0 ? `${roiMin}x–${roiMax}x` : `${roiMax}x`, sub: `vs £${budget} spend` },
        ].map(item => (
          <div
            key={item.label}
            style={{
              padding: '14px 12px', borderRadius: 10,
              background: 'var(--accent-pale)', border: '1px solid #c8e6df',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
              {item.value}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{item.label}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <a
        href="/advertise/promote"
        style={{
          display: 'block', textAlign: 'center', padding: '14px 24px',
          background: 'var(--accent)', color: '#fff', borderRadius: 8,
          textDecoration: 'none', fontWeight: 700, fontSize: 15,
        }}
      >
        Start your campaign — from £{budget}/month →
      </a>
    </div>
  )
}
