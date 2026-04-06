'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ── Types ─────────────────────────────────────────────────────────────────────

type ListingType = 'counsellor' | 'centre'

interface FormState {
  listingType: ListingType | null
  email: string
  password: string
  name: string
  locations: string[]
  registrationNumber: string
  phone: string
  website: string
  contactEmail: string
}

// ── UK locations (top 200 by population) ─────────────────────────────────────

const UK_LOCATIONS = [
  'london', 'birmingham', 'manchester', 'leeds', 'sheffield', 'liverpool',
  'bristol', 'newcastle', 'nottingham', 'leicester', 'coventry', 'bradford',
  'edinburgh', 'glasgow', 'cardiff', 'belfast', 'brighton', 'plymouth',
  'stoke-on-trent', 'wolverhampton', 'derby', 'swansea', 'southampton',
  'portsmouth', 'oxford', 'cambridge', 'reading', 'sunderland', 'exeter',
  'york', 'norwich', 'peterborough', 'luton', 'northampton', 'bath',
  'middlesbrough', 'huddersfield', 'blackpool', 'bolton', 'stockport',
  'blackburn', 'wigan', 'burnley', 'rochdale', 'oldham', 'salford',
  'milton-keynes', 'watford', 'ipswich', 'colchester', 'chelmsford',
  'southend-on-sea', 'woking', 'guildford', 'slough', 'swindon',
  'gloucester', 'cheltenham', 'worcester', 'hereford', 'shrewsbury',
  'stafford', 'lichfield', 'warwick', 'lincoln', 'hull', 'doncaster',
  'barnsley', 'rotherham', 'wakefield', 'harrogate', 'scarborough',
  'chester', 'wirral', 'st-helens', 'warrington', 'crewe', 'macclesfield',
  'carlisle', 'barrow-in-furness', 'lancaster', 'preston', 'blackburn',
  'durham', 'darlington', 'hartlepool', 'teesside', 'gateshead',
  'aberdeen', 'dundee', 'inverness', 'perth', 'stirling', 'falkirk',
  'newport', 'wrexham', 'swansea', 'bangor', 'aberystwyth',
].filter((v, i, a) => a.indexOf(v) === i)

function formatSlug(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function OnboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const typeFromUrl = searchParams.get('type') as ListingType | null

  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const [form, setForm] = useState<FormState>({
    listingType: typeFromUrl,
    email: '',
    password: '',
    name: '',
    locations: [],
    registrationNumber: '',
    phone: '',
    website: '',
    contactEmail: '',
  })

  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [claimedListingId, setClaimedListingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Location picker state
  const [locationSearch, setLocationSearch] = useState('')
  const [showLocationDrop, setShowLocationDrop] = useState(false)
  const locationRef = useRef<HTMLDivElement>(null)

  // Name search state (Step 3)
  const [nameSearch, setNameSearch] = useState('')
  const [nameResults, setNameResults] = useState<Array<{ id: string; name: string; subtitle: string; locationSlug: string; phone: string; website: string; email: string }>>([]
  )
  const [showNameDrop, setShowNameDrop] = useState(false)
  const [nameSearchLoading, setNameSearchLoading] = useState(false)
  const nameRef = useRef<HTMLDivElement>(null)

  const totalSteps = 7
  const progress = ((step - 1) / (totalSteps - 1)) * 100

  const pricePerLocation = form.listingType === 'centre' ? 99 : 10
  const totalPrice = pricePerLocation * Math.max(form.locations.length, 1)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocationDrop(false)
      }
      if (nameRef.current && !nameRef.current.contains(e.target as Node)) {
        setShowNameDrop(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Debounced name search
  useEffect(() => {
    if (!nameSearch || nameSearch.length < 2 || !form.listingType) {
      setNameResults([])
      return
    }
    const timer = setTimeout(async () => {
      setNameSearchLoading(true)
      try {
        const res = await fetch(`/api/listings/search?q=${encodeURIComponent(nameSearch)}&type=${form.listingType}`)
        const data = await res.json()
        setNameResults(data.results ?? [])
        setShowNameDrop(true)
      } catch { /* ignore */ }
      setNameSearchLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [nameSearch, form.listingType])

  function handleClaimExisting(result: typeof nameResults[0]) {
    setForm(f => ({
      ...f,
      name: result.name,
      phone: result.phone || f.phone,
      website: result.website || f.website,
      contactEmail: result.email || f.contactEmail,
      locations: result.locationSlug ? [result.locationSlug] : f.locations,
    }))
    setClaimedListingId(result.id)
    setNameSearch(result.name)
    setShowNameDrop(false)
  }

  // If type already selected from URL, start at step 2
  useEffect(() => {
    if (typeFromUrl && step === 1) setStep(2)
  }, [typeFromUrl, step])

  const filteredLocations = UK_LOCATIONS.filter(l =>
    l.includes(locationSearch.toLowerCase()) &&
    !form.locations.includes(l)
  ).slice(0, 8)

  function addLocation(slug: string) {
    setForm(f => ({ ...f, locations: [...f.locations, slug] }))
    setLocationSearch('')
    setShowLocationDrop(false)
  }

  function removeLocation(slug: string) {
    setForm(f => ({ ...f, locations: f.locations.filter(l => l !== slug) }))
  }

  function updateForm(key: keyof FormState, value: string | ListingType | null) {
    setForm(f => ({ ...f, [key]: value }))
  }

  const goTo = useCallback((target: number, dir: 'forward' | 'back' = 'forward') => {
    setError('')
    setAnimating(true)
    setDirection(dir)
    setTimeout(() => {
      setStep(target)
      setAnimating(false)
    }, 220)
  }, [])

  async function handleNext() {
    setError('')

    // Validate current step
    if (step === 1 && !form.listingType) {
      setError('Please select a listing type to continue.')
      return
    }
    if (step === 2) {
      if (!form.email || !form.password) {
        setError('Please fill in your email and password.')
        return
      }
      if (form.password.length < 8) {
        setError('Password must be at least 8 characters.')
        return
      }
    }
    if (step === 3 && !form.name.trim()) {
      setError('Please enter your name or centre name.')
      return
    }
    if (step === 4 && form.locations.length === 0) {
      setError('Please add at least one location.')
      return
    }

    // Step 2: Create account
    if (step === 2 && !ownerId) {
      setLoading(true)
      try {
        const res = await fetch('/api/verify/signup', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name || 'TBC',
            listingType: form.listingType,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Failed to create account.')
          setLoading(false)
          return
        }
        setOwnerId(data.ownerId)

        // Also sign in locally so the user is logged in
        await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
      } catch {
        setError('Network error, please try again.')
        setLoading(false)
        return
      }
      setLoading(false)
    }

    // Step 7: Redirect to Stripe
    if (step === 7) {
      if (!ownerId) {
        setError('Something went wrong — please restart the flow.')
        return
      }
      setLoading(true)
      try {
        const res = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ownerId, locations: form.locations }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Failed to start checkout.')
          setLoading(false)
          return
        }
        window.location.href = data.url
      } catch {
        setError('Network error, please try again.')
        setLoading(false)
      }
      return
    }

    goTo(step + 1, 'forward')
  }

  function handleBack() {
    if (step > 1) goTo(step - 1, 'back')
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'var(--border)', zIndex: 100 }}>
        <div style={{
          height: '100%',
          background: 'var(--accent)',
          width: `${progress}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/verify" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
          <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>SoberNation</span>
        </Link>

        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
          Step {step} of {totalSteps}
        </div>

        {step > 1 && (
          <button
            onClick={handleBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Step content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{
          width: '100%',
          maxWidth: step === 4 ? 580 : 480,
          opacity: animating ? 0 : 1,
          transform: animating
            ? direction === 'forward' ? 'translateX(40px)' : 'translateX(-40px)'
            : 'translateX(0)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}>

          {/* ── STEP 1: Choose type ────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <div style={stepLabelStyle}>Step 1 of 7</div>
              <h2 style={stepHeadingStyle}>What are you listing?</h2>
              <p style={stepSubStyle}>Choose the type that best describes your service.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
                {([
                  { type: 'counsellor' as const, label: 'Counsellor', price: '£10/month', desc: 'Individual addiction counsellors & therapists', icon: '🧑‍⚕️' },
                  { type: 'centre' as const, label: 'Rehab Centre', price: '£99/month', desc: 'Residential & outpatient treatment centres', icon: '🏥' },
                ] as const).map(opt => (
                  <button
                    key={opt.type}
                    onClick={() => { updateForm('listingType', opt.type); goTo(2, 'forward') }}
                    style={{
                      padding: '24px 20px',
                      border: form.listingType === opt.type ? '2px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: 12,
                      background: form.listingType === opt.type ? 'var(--accent-pale)' : '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{opt.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{opt.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 8 }}>{opt.price} per location</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
              {error && <div style={errorStyle}>{error}</div>}
            </div>
          )}

          {/* ── STEP 2: Account ────────────────────────────────────────── */}
          {step === 2 && (
            <div>
              <div style={stepLabelStyle}>Step 2 of 7</div>
              <h2 style={stepHeadingStyle}>Create your account</h2>
              <p style={stepSubStyle}>Already have an account? <Link href="/verify/login" style={{ color: 'var(--accent)' }}>Log in</Link></p>

              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                    placeholder="you@example.com"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && handleNext()}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}
                    placeholder="At least 8 characters"
                    onKeyDown={e => e.key === 'Enter' && handleNext()}
                    style={inputStyle}
                  />
                </div>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
            </div>
          )}

          {/* ── STEP 3: Name (with existing listing search) ────────── */}
          {step === 3 && (
            <div>
              <div style={stepLabelStyle}>Step 3 of 7</div>
              <h2 style={stepHeadingStyle}>
                {form.listingType === 'centre' ? 'What is your centre called?' : 'What is your full name?'}
              </h2>
              <p style={stepSubStyle}>
                Start typing — if you&apos;re already in our directory, select your listing to claim it.
              </p>

              <div ref={nameRef} style={{ position: 'relative', marginTop: 32 }}>
                <input
                  type="text"
                  value={nameSearch || form.name}
                  onChange={e => {
                    setNameSearch(e.target.value)
                    updateForm('name', e.target.value)
                    setClaimedListingId(null)
                  }}
                  placeholder={form.listingType === 'centre' ? 'e.g. The Priory Hospital' : 'e.g. Dr. Jane Smith'}
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleNext()}
                  style={{ ...inputStyle, fontSize: 18, padding: '14px 16px', paddingRight: nameSearchLoading ? 44 : 16 }}
                />
                {nameSearchLoading && (
                  <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
                    <div style={{ width: 18, height: 18, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                )}

                {showNameDrop && nameResults.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    zIndex: 200,
                    marginTop: 4,
                  }}>
                    <div style={{ padding: '8px 14px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                      Found in our directory — click to claim
                    </div>
                    {nameResults.map(r => (
                      <button
                        key={r.id}
                        onClick={() => handleClaimExisting(r)}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          padding: '12px 16px', border: 'none', background: 'none',
                          cursor: 'pointer', borderBottom: '1px solid var(--border)',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-pale)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                      >
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{r.name}</div>
                        {r.subtitle && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.subtitle}</div>}
                      </button>
                    ))}
                    <button
                      onClick={() => { setShowNameDrop(false); setNameResults([]) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'center',
                        padding: '10px 16px', border: 'none', background: 'var(--bg)',
                        cursor: 'pointer', fontSize: 12, color: 'var(--text-muted)',
                      }}
                    >
                      Not in the list? Continue with your name as typed
                    </button>
                  </div>
                )}
              </div>

              {claimedListingId && (
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px' }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="#16a34a"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span style={{ fontSize: 13, color: '#166534' }}>Great — we found your listing! Your details have been pre-filled.</span>
                </div>
              )}

              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
            </div>
          )}

          {/* ── STEP 4: Locations ─────────────────────────────────────── */}
          {step === 4 && (
            <div>
              <div style={stepLabelStyle}>Step 4 of 7</div>
              <h2 style={stepHeadingStyle}>Which locations do you cover?</h2>
              <p style={stepSubStyle}>Add every area where you offer services. Price updates as you add locations.</p>

              {/* Live price */}
              <div style={{
                background: 'var(--accent-pale)',
                border: '1px solid #c8e6df',
                borderRadius: 10,
                padding: '14px 18px',
                marginTop: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: 14, color: 'var(--accent)' }}>
                  {form.locations.length} location{form.locations.length !== 1 ? 's' : ''} × £{pricePerLocation}/month
                </span>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>
                  £{form.locations.length > 0 ? totalPrice : pricePerLocation}/mo
                </span>
              </div>

              {/* Search input */}
              <div ref={locationRef} style={{ position: 'relative', marginTop: 20 }}>
                <input
                  type="text"
                  value={locationSearch}
                  onChange={e => { setLocationSearch(e.target.value); setShowLocationDrop(true) }}
                  onFocus={() => setShowLocationDrop(true)}
                  placeholder="Search location (e.g. Manchester, London…)"
                  style={inputStyle}
                />
                {showLocationDrop && filteredLocations.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    zIndex: 100,
                    marginTop: 4,
                  }}>
                    {filteredLocations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => addLocation(loc)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '11px 16px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          fontSize: 14,
                          color: 'var(--text)',
                          borderBottom: '1px solid var(--border)',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                      >
                        {formatSlug(loc)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected chips */}
              {form.locations.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                  {form.locations.map(loc => (
                    <div key={loc} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'var(--accent)',
                      color: '#fff',
                      borderRadius: 100,
                      padding: '5px 12px',
                      fontSize: 13,
                      fontWeight: 500,
                    }}>
                      {formatSlug(loc)}
                      <button
                        onClick={() => removeLocation(loc)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1, padding: 0 }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} disabled={form.locations.length === 0} />
            </div>
          )}

          {/* ── STEP 5: Registration ──────────────────────────────────── */}
          {step === 5 && (
            <div>
              <div style={stepLabelStyle}>Step 5 of 7</div>
              <h2 style={stepHeadingStyle}>
                {form.listingType === 'counsellor' ? 'BACP registration number' : 'CQC registration number'}
              </h2>
              <p style={stepSubStyle}>
                Optional — but highly recommended. This builds trust with people searching for help.
              </p>

              <div style={{ marginTop: 32 }}>
                <input
                  type="text"
                  value={form.registrationNumber}
                  onChange={e => updateForm('registrationNumber', e.target.value)}
                  placeholder={form.listingType === 'counsellor' ? 'e.g. BACP 123456' : 'e.g. 1-12345678901'}
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleNext()}
                  style={{ ...inputStyle, fontSize: 16 }}
                />
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                  Leave blank to skip — you can add this later in your dashboard.
                </p>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
              <button onClick={() => goTo(6, 'forward')} style={skipStyle}>Skip for now</button>
            </div>
          )}

          {/* ── STEP 6: Contact info ──────────────────────────────────── */}
          {step === 6 && (
            <div>
              <div style={stepLabelStyle}>Step 6 of 7</div>
              <h2 style={stepHeadingStyle}>Contact information</h2>
              <p style={stepSubStyle}>This overrides any scraped data we already have. Shown on your listing.</p>

              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Phone number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => updateForm('phone', e.target.value)}
                    placeholder="e.g. 0800 123 4567"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Website</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={e => updateForm('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Contact email</label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={e => updateForm('contactEmail', e.target.value)}
                    placeholder="enquiries@yourpractice.com"
                    style={inputStyle}
                  />
                </div>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
              <button onClick={() => goTo(7, 'forward')} style={skipStyle}>Skip for now</button>
            </div>
          )}

          {/* ── STEP 7: Review & pay ──────────────────────────────────── */}
          {step === 7 && (
            <div>
              <div style={stepLabelStyle}>Step 7 of 7</div>
              <h2 style={stepHeadingStyle}>Review and pay</h2>
              <p style={stepSubStyle}>Everything look right? Your badge goes live the moment payment clears.</p>

              <div style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 14,
                overflow: 'hidden',
                marginTop: 28,
              }}>
                {[
                  { label: 'Type', value: form.listingType === 'centre' ? 'Rehab Centre' : 'Counsellor' },
                  { label: 'Name', value: form.name || '—' },
                  { label: 'Locations', value: form.locations.map(formatSlug).join(', ') || '—' },
                  { label: 'Registration', value: form.registrationNumber || 'Not provided' },
                  { label: 'Phone', value: form.phone || 'Not provided' },
                  { label: 'Website', value: form.website || 'Not provided' },
                ].map((row, i) => (
                  <div key={row.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '14px 18px',
                    borderBottom: i < 5 ? '1px solid var(--border)' : 'none',
                    background: i % 2 === 0 ? '#fff' : 'var(--bg)',
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, textAlign: 'right', color: row.value === 'Not provided' ? 'var(--text-light)' : 'var(--text)' }}>{row.value}</span>
                  </div>
                ))}

                {/* Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px',
                  background: 'var(--accent-pale)',
                  borderTop: '2px solid #c8e6df',
                }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Total per month</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>£{totalPrice}</span>
                </div>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, textAlign: 'center', lineHeight: 1.6 }}>
                Billed monthly via Stripe. Cancel any time. Your badge is live instantly after payment.
              </p>

              {error && <div style={errorStyle}>{error}</div>}

              <NextButton
                onClick={handleNext}
                loading={loading}
                label={loading ? 'Redirecting to Stripe…' : `Pay £${totalPrice}/month →`}
                accent
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// ── Shared sub-components ──────────────────────────────────────────────────────

function NextButton({
  onClick, loading, disabled, label, accent,
}: {
  onClick: () => void
  loading?: boolean
  disabled?: boolean
  label?: string
  accent?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        marginTop: 28,
        width: '100%',
        background: disabled ? 'var(--border-mid)' : 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '14px',
        fontWeight: 600,
        fontSize: 15,
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'background 0.15s',
        boxShadow: (!disabled && !loading) ? '0 4px 12px rgba(26,107,90,0.25)' : 'none',
      }}
    >
      {loading ? 'Please wait…' : label || 'Continue →'}
    </button>
  )
}

// ── Shared styles ──────────────────────────────────────────────────────────────

const stepLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--text-light)',
  marginBottom: 12,
}

const stepHeadingStyle: React.CSSProperties = {
  fontSize: 'clamp(22px, 4vw, 32px)',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  color: 'var(--text)',
  marginBottom: 8,
}

const stepSubStyle: React.CSSProperties = {
  fontSize: 15,
  color: 'var(--text-muted)',
  lineHeight: 1.6,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid var(--border-mid)',
  borderRadius: 10,
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
  background: '#fff',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: 'var(--text)',
}

const errorStyle: React.CSSProperties = {
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: 8,
  padding: '10px 14px',
  fontSize: 13,
  color: '#991b1b',
  marginTop: 16,
}

const skipStyle: React.CSSProperties = {
  display: 'block',
  margin: '12px auto 0',
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  fontSize: 13,
  cursor: 'pointer',
  textDecoration: 'underline',
}
