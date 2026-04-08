'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MATCHING_PRICE_GBP } from '../../../lib/stripe'

const ADDICTION_OPTIONS = ['Alcohol', 'Drugs / substances', 'Gambling', 'Prescription meds', 'All types']

export default function MatchingSignupPage() {
  const [form, setForm] = useState({
    centreName: '',
    email: '',
    contactEmail: '',
    phone: '',
    locationSlug: '',
    locationName: '',
    addictions: [] as string[],
    acceptsNhs: true,
    acceptsPrivate: true,
    minBudget: 'any',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggle(type: string) {
    setForm(f => ({
      ...f,
      addictions: f.addictions.includes(type)
        ? f.addictions.filter(a => a !== type)
        : [...f.addictions, type],
    }))
  }

  async function handleCheckout() {
    if (!form.centreName || !form.email || !form.locationName) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/matching-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        <Link href="/advertise" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 32 }}>
          ← Back to advertising
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔗</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Join the Matching Network
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 400, marginInline: 'auto' }}>
            Receive pre-qualified enquiries from people actively looking for rehab near you. We match them to you — you just answer the phone.
          </p>
        </div>

        {/* Value prop stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 }}>
          {[
            { stat: '£99', label: 'per month, flat fee' },
            { stat: '2–5', label: 'leads per month avg.' },
            { stat: '0%', label: 'commission on admissions' },
          ].map(({ stat, label }) => (
            <div key={label} style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{stat}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Your centre details</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <input placeholder="Centre name *" value={form.centreName} onChange={e => setForm(f=>({...f,centreName:e.target.value}))} style={inputStyle} />
            <input placeholder="Your city / town *" value={form.locationName} onChange={e => setForm(f=>({...f,locationName:e.target.value, locationSlug:e.target.value.toLowerCase().replace(/\s+/g,'-')}))} style={inputStyle} />
            <input type="email" placeholder="Billing email *" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} style={inputStyle} />
            <input type="email" placeholder="Enquiry email (where leads are sent)" value={form.contactEmail} onChange={e => setForm(f=>({...f,contactEmail:e.target.value}))} style={inputStyle} />
            <input type="tel" placeholder="Centre phone" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} style={inputStyle} />
          </div>

          {/* Addiction types you accept */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>Which addiction types do you treat?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ADDICTION_OPTIONS.map(type => (
                <button key={type} onClick={() => toggle(type)}
                  style={{
                    padding: '6px 14px', borderRadius: 20, border: '1.5px solid',
                    borderColor: form.addictions.includes(type) ? 'var(--accent)' : 'var(--border)',
                    background: form.addictions.includes(type) ? 'var(--accent-pale)' : '#fff',
                    color: form.addictions.includes(type) ? 'var(--accent)' : 'var(--text-muted)',
                    fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.12s',
                  }}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* NHS / Private */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>Referral types accepted</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'acceptsNhs', label: 'NHS referrals' },
                { key: 'acceptsPrivate', label: 'Private / self-pay' },
              ].map(({ key, label }) => (
                <button key={key}
                  onClick={() => setForm(f => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid',
                    borderColor: form[key as keyof typeof form] ? 'var(--accent)' : 'var(--border)',
                    background: form[key as keyof typeof form] ? 'var(--accent-pale)' : '#fff',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.12s',
                    color: form[key as keyof typeof form] ? 'var(--accent)' : 'var(--text-muted)',
                  }}>
                  {form[key as keyof typeof form] ? '✓ ' : ''}{label}
                </button>
              ))}
            </div>
          </div>

          {error && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 10 }}>{error}</div>}

          <button onClick={handleCheckout} disabled={loading}
            style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: loading ? '#94a3b8' : 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Redirecting...' : `Join the network — £${MATCHING_PRICE_GBP}/mo →`}
          </button>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
            Secure payment via Stripe · Cancel anytime · Start receiving leads immediately
          </p>
        </div>
      </div>
    </main>
  )
}
