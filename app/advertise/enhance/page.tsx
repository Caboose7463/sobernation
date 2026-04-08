'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ENHANCED_PRICES_GBP } from '../../../lib/stripe'

export default function EnhancedUpgradePage() {
  const [listingType, setListingType] = useState<'centre' | 'counsellor'>('centre')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const price = ENHANCED_PRICES_GBP[listingType]

  const features = [
    { icon: '✓', text: 'Blue verified tick on your profile and in search results' },
    { icon: '✓', text: 'Priority placement above non-enhanced listings' },
    { icon: '✓', text: 'Upload up to 8 photos of your facility' },
    { icon: '✓', text: 'Display your CQC or BACP accreditation badge' },
    { icon: '✓', text: 'Show real-time bed availability' },
    { icon: '✓', text: 'Add patient testimonials to your profile' },
    { icon: '✓', text: 'Cancel anytime — no contract' },
  ]

  async function handleUpgrade() {
    if (!email.trim() || !name.trim()) {
      setError('Please fill in your name and email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/enhanced-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingType, email, name }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '60px 20px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        {/* Back */}
        <Link href="/advertise" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 32 }}>
          ← Back to advertising
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#2563eb', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="26" height="26" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4,10 8,14 16,6"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Enhanced Listing
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
            Stand out from free listings with a verified, premium profile.
          </p>
        </div>

        {/* Price toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, background: '#f1f5f9', borderRadius: 10, padding: 4 }}>
          {(['centre', 'counsellor'] as const).map(t => (
            <button key={t} onClick={() => setListingType(t)}
              style={{
                flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                background: listingType === t ? '#fff' : 'transparent',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                color: listingType === t ? 'var(--text)' : 'var(--text-muted)',
                boxShadow: listingType === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}>
              {t === 'centre' ? 'Rehab Centre' : 'Counsellor'}
            </button>
          ))}
        </div>

        {/* Features card */}
        <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 2 }}>Monthly subscription</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em' }}>
                £{price}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span>
              </div>
            </div>
            {/* Blue tick preview */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: '#fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#78350f' }}>
                  {name ? name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase() : 'AB'}
                </div>
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#2563eb', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="3"><polyline points="4,10 8,14 16,6"/></svg>
                </div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Preview</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map(f => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text)' }}>
                <span style={{ color: '#2563eb', fontWeight: 700, flexShrink: 0 }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <input
            placeholder="Your name / business name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--border)', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--border)', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        {error && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{error}</div>}

        <button
          onClick={handleUpgrade}
          disabled={loading}
          style={{
            width: '100%', padding: '14px', borderRadius: 10, border: 'none',
            background: loading ? '#94a3b8' : 'var(--accent)', color: '#fff',
            fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}>
          {loading ? 'Redirecting to checkout...' : `Upgrade for £${price}/mo →`}
        </button>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
          Secure payment via Stripe · Cancel anytime · No long-term contract
        </p>
      </div>
    </main>
  )
}
