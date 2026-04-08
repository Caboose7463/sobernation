'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EXCLUSIVITY_PRICES_GBP } from '../../../lib/stripe'

// Tier definitions for the UI
const TIER_CITIES = {
  1: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
  2: ['Leeds', 'Bristol', 'Edinburgh', 'Sheffield', 'Newcastle', 'Nottingham', 'Cardiff', 'Leicester', 'Southampton', 'Brighton', 'Oxford', 'Cambridge', 'Belfast', 'Aberdeen', 'Bournemouth'],
  3: ['All other UK towns and cities'],
}

type Step = 1 | 2 | 3

export default function ExclusivityPage() {
  const [step, setStep] = useState<Step>(1)
  const [cityQuery, setCityQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<{ slug: string; name: string; tier: 1|2|3 } | null>(null)
  const [availability, setAvailability] = useState<'available' | 'taken' | 'loading' | null>(null)
  const [takenBy, setTakenBy] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const price = selectedCity ? EXCLUSIVITY_PRICES_GBP[selectedCity.tier] : 400

  useEffect(() => {
    if (!selectedCity) return
    setAvailability('loading')
    fetch(`/api/exclusivity/check?slug=${selectedCity.slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.taken) {
          setAvailability('taken')
          setTakenBy(d.taken_by || 'another centre')
        } else {
          setAvailability('available')
        }
      })
      .catch(() => setAvailability('available'))
  }, [selectedCity])

  async function handleCheckout() {
    if (!form.name || !form.email || !selectedCity) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/exclusivity-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationSlug: selectedCity.slug,
          locationName: selectedCity.name,
          tier: selectedCity.tier,
          ...form,
        }),
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
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            City Exclusive Partner
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, maxWidth: 400, marginInline: 'auto' }}>
            Own the top spot in your city — one centre per city, forever. Your full-width banner appears above every listing in that city.
          </p>
        </div>

        {/* Tiers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 32 }}>
          {([1, 2, 3] as const).map(tier => (
            <div key={tier} style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>
                {tier === 1 ? 'Major city' : tier === 2 ? 'Regional city' : 'Smaller town'}
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em' }}>
                £{EXCLUSIVITY_PRICES_GBP[tier]}<span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
                {TIER_CITIES[tier].slice(0, 2).join(', ')}{tier < 3 ? '...' : ''}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: City search */}
        {step === 1 && (
          <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>Which city do you want to own?</div>
            <input
              placeholder="Search for a city..."
              value={cityQuery}
              onChange={e => setCityQuery(e.target.value)}
              style={inputStyle}
            />
            {cityQuery.length >= 2 && (
              <div style={{ marginTop: 8, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                {/* We'll load from LOCATIONS in the real impl — showing fake suggestions */}
                {['London', 'Leeds', 'Lancaster', 'Lichfield']
                  .filter(c => c.toLowerCase().startsWith(cityQuery.toLowerCase()))
                  .slice(0, 5)
                  .map(city => (
                    <button key={city}
                      onClick={() => {
                        const tier = city === 'London' ? 1 : city === 'Leeds' ? 2 : 3
                        setSelectedCity({ slug: city.toLowerCase(), name: city, tier: tier as 1|2|3 })
                        setCityQuery(city)
                        setStep(2)
                      }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', borderBottom: '1px solid var(--border)', background: '#fff', cursor: 'pointer', fontSize: 14, color: 'var(--text)' }}>
                      {city}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
                        £{EXCLUSIVITY_PRICES_GBP[city === 'London' ? 1 : city === 'Leeds' ? 2 : 3]}/mo
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Availability */}
        {step === 2 && selectedCity && (
          <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{selectedCity.name}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                £{price}/mo exclusive partner
              </div>
            </div>

            {availability === 'loading' && (
              <div style={{ padding: 16, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                Checking availability...
              </div>
            )}

            {availability === 'taken' && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: 14, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: 4 }}>This city is taken</div>
                <div style={{ fontSize: 13, color: '#7f1d1d' }}>{takenBy} holds the exclusive partner slot for {selectedCity.name}.</div>
                <button onClick={() => { setStep(1); setCityQuery(''); setSelectedCity(null) }}
                  style={{ marginTop: 12, fontSize: 13, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  ← Search another city
                </button>
              </div>
            )}

            {availability === 'available' && (
              <>
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 14, marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, color: '#16a34a', fontSize: 14 }}>✓ Available — claim it now</div>
                  <div style={{ fontSize: 12, color: '#166534', marginTop: 2 }}>Once purchased, this slot is exclusively yours for as long as you subscribe.</div>
                </div>
                <button onClick={() => setStep(3)}
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Claim {selectedCity.name} → £{price}/mo
                </button>
                <button onClick={() => { setStep(1); setCityQuery(''); setSelectedCity(null) }}
                  style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid var(--border)', background: '#fff', fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Search another city
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 3: Details + checkout */}
        {step === 3 && selectedCity && (
          <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>
              Your details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
              <input placeholder="Centre name *" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} style={inputStyle} />
              <input type="email" placeholder="Email address *" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} style={inputStyle} />
              <input type="tel" placeholder="Phone number" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} style={inputStyle} />
              <input type="url" placeholder="Website URL" value={form.website} onChange={e => setForm(f=>({...f,website:e.target.value}))} style={inputStyle} />
            </div>
            {error && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button onClick={handleCheckout} disabled={loading}
              style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: loading ? '#94a3b8' : 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Redirecting...' : `Pay £${price}/mo — Claim ${selectedCity.name}`}
            </button>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              Secure payment via Stripe · Cancel anytime
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
