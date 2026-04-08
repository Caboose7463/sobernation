'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HELPLINE_PRICES_GBP } from '../../../lib/stripe'

const TIERS = [
  {
    key: 'national',
    title: 'National Sponsor',
    price: HELPLINE_PRICES_GBP.national,
    coverage: 'Entire UK — all 246 cities and towns',
    impressions: '~180,000',
    features: [
      'Logo + name next to helpline on every page sitewide',
      'Dedicated sponsor banner in the helpline sidebar',
      'Featured in site footer and homepage',
      'Monthly traffic report with impression data',
      'Exclusive — only 1 national sponsor at a time',
    ],
    badge: '🇬🇧',
    highlight: true,
  },
  {
    key: 'regional',
    title: 'Regional Sponsor',
    price: HELPLINE_PRICES_GBP.regional,
    coverage: 'Your chosen region (e.g. North West, South East)',
    impressions: '~20,000–40,000',
    features: [
      'Logo + name on all pages in your region',
      'Featured in regional city sidebar widgets',
      'Monthly traffic report',
      'Up to 3 regional sponsors active at once',
    ],
    badge: '📍',
    highlight: false,
  },
  {
    key: 'county',
    title: 'County Sponsor',
    price: HELPLINE_PRICES_GBP.county,
    coverage: 'Your chosen counties (e.g. Hampshire, Kent)',
    impressions: '~3,000–10,000',
    features: [
      'Logo + name on county-specific pages',
      'Appear in relevant city sidebars',
      'Monthly traffic report',
    ],
    badge: '🏘',
    highlight: false,
  },
]

export default function HelplineSponsorPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', logoUrl: '', website: '', region: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tier = TIERS.find(t => t.key === selectedTier)

  async function handleCheckout() {
    if (!form.name || !form.email || !selectedTier) {
      setError('Please fill in your name and email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/helpline-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: selectedTier, ...form }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Something went wrong.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--border)',
    fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box',
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '60px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <Link href="/advertise" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 32 }}>
          ← Back to advertising
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Helpline Sponsorship
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
            Be seen at the moment people reach out
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 480, marginInline: 'auto', lineHeight: 1.6 }}>
            Our helpline number appears on every page. Sponsor the helpline and your brand appears next to it — seen by thousands of people seeking addiction help every month.
          </p>

          {/* Live helpline preview */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 20, background: '#fff', border: '1.5px solid var(--border)', borderRadius: 10, padding: '10px 18px' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--accent-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Help: 0300 123 6600</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>
                Sponsored by <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{form.name || 'Your Organisation'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {TIERS.map(t => (
            <button key={t.key} onClick={() => setSelectedTier(t.key)}
              style={{
                textAlign: 'left', padding: 24, borderRadius: 14,
                border: `2px solid ${selectedTier === t.key ? 'var(--accent)' : t.highlight ? 'var(--accent)' : 'var(--border)'}`,
                background: selectedTier === t.key ? 'var(--accent-pale)' : t.highlight ? '#f0fdf4' : '#fff',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{t.badge}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{t.coverage}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: selectedTier === t.key ? 'var(--accent)' : 'var(--text)', letterSpacing: '-0.03em' }}>
                    £{t.price.toLocaleString()}
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.impressions} impressions/mo</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {t.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text)' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Form */}
        {selectedTier && (
          <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Your organisation details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
              <input placeholder="Organisation name *" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} style={inputStyle} />
              <input type="email" placeholder="Email address *" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} style={inputStyle} />
              <input type="url" placeholder="Website URL" value={form.website} onChange={e => setForm(f=>({...f,website:e.target.value}))} style={inputStyle} />
              <input placeholder="Logo image URL (optional — we can set up later)" value={form.logoUrl} onChange={e => setForm(f=>({...f,logoUrl:e.target.value}))} style={inputStyle} />
              {(selectedTier === 'regional' || selectedTier === 'county') && (
                <input placeholder={selectedTier === 'regional' ? 'Which region? (e.g. North West, South East)' : 'Which counties? (e.g. Hampshire, Kent, Surrey)'}
                  value={form.region} onChange={e => setForm(f=>({...f,region:e.target.value}))} style={inputStyle} />
              )}
            </div>
            {error && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button onClick={handleCheckout} disabled={loading}
              style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: loading ? '#94a3b8' : 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Redirecting...' : `Start ${tier?.title} — £${tier?.price.toLocaleString()}/mo →`}
            </button>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              Secure payment via Stripe · Cancel anytime · Appears live within 24 hours
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
