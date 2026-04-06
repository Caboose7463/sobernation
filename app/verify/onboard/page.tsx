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

interface SearchResult {
  id: string
  name: string
  subtitle: string
  locationSlug: string
  phone: string
  website: string
  email: string
}

// ── Shared styles (declared before component so TS sees them) ─────────────────

const stepLabelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 12,
}
const stepHeadingStyle: React.CSSProperties = {
  fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700,
  letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: 8,
}
const stepSubStyle: React.CSSProperties = {
  fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6,
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', border: '1px solid var(--border-mid)',
  borderRadius: 10, fontSize: 15, outline: 'none',
  transition: 'border-color 0.15s', boxSizing: 'border-box', background: '#fff',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text)',
}
const errorStyle: React.CSSProperties = {
  background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8,
  padding: '10px 14px', fontSize: 13, color: '#991b1b', marginTop: 16,
}
const skipStyle: React.CSSProperties = {
  display: 'block', margin: '12px auto 0', background: 'none', border: 'none',
  color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
}

function formatSlug(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ── Estimated clicks data ─────────────────────────────────────────────────────

const LOCATION_SEARCHES: Record<string, number> = {
  london: 4800, birmingham: 2200, manchester: 2100, leeds: 1600, liverpool: 1400,
  sheffield: 1100, bristol: 1000, newcastle: 900, 'newcastle-upon-tyne': 900,
  nottingham: 850, leicester: 820, coventry: 780, bradford: 700, edinburgh: 950,
  glasgow: 880, cardiff: 760, belfast: 600, brighton: 680, plymouth: 580,
  southampton: 620, portsmouth: 540, oxford: 640, cambridge: 590, reading: 560,
  sunderland: 460, exeter: 420, derby: 480, york: 440, norwich: 400,
  hull: 420, 'stoke-on-trent': 380, wolverhampton: 390, swansea: 340,
  middlesbrough: 360, salford: 380, stockport: 320, bolton: 340, oldham: 300,
  'milton-keynes': 380, luton: 340, ipswich: 300, swindon: 310, gloucester: 280,
  cheltenham: 290, doncaster: 300, wakefield: 280, barnsley: 240, rotherham: 260,
}
const DEFAULT_SEARCHES = 220

function getClicks(loc: string, type: ListingType | null) {
  const s = LOCATION_SEARCHES[loc] ?? DEFAULT_SEARCHES
  const lo = type === 'centre' ? 0.30 : 0.22
  const hi = type === 'centre' ? 0.48 : 0.36
  return { s, lo: Math.round(s * lo), hi: Math.round(s * hi) }
}

// ── EstimatedClicks component ─────────────────────────────────────────────────

function EstimatedClicks({ locations, listingType }: { locations: string[]; listingType: ListingType | null }) {
  if (!locations.length) return null
  const perLoc = locations.map(l => ({ name: formatSlug(l), ...getClicks(l, listingType) }))
  const totalLo = perLoc.reduce((a, l) => a + l.lo, 0)
  const totalHi = perLoc.reduce((a, l) => a + l.hi, 0)
  const totalS = perLoc.reduce((a, l) => a + l.s, 0)

  // Enquiry conversion: ~3–5% of profile views become actual enquiries
  const enqLo = Math.max(1, Math.round(totalLo * 0.03))
  const enqHi = Math.max(1, Math.round(totalHi * 0.05))

  // Value per admission
  const admissionValue = listingType === 'centre' ? 8000 : 600
  const admissionLabel = listingType === 'centre' ? '£8,000+' : '£600+'
  const monthlyPrice = listingType === 'centre' ? 99 : 10
  const totalLocCount = locations.length
  const totalMonthlyPrice = monthlyPrice * Math.max(totalLocCount, 1)
  // Days for ROI: 1 patient / 30 days * monthly cost
  const roiDays = Math.round((totalMonthlyPrice / admissionValue) * 30)

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
      {/* Header — enquiries front and centre */}
      <div style={{ background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)', padding: '18px 20px', color: '#fff' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 8 }}>
          Your estimated monthly reach
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 2 }}>Profile views</div>
            <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{totalLo.toLocaleString()}–{totalHi.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 2 }}>Estimated enquiries</div>
            <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: '#4ade80' }}>{enqLo}–{enqHi}<span style={{ fontSize: 14, fontWeight: 500, opacity: 0.8 }}>/month</span></div>
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.55, marginTop: 8 }}>
          Based on {totalS.toLocaleString()} monthly searches · verified #1 position · 3–5% enquiry rate
        </div>
      </div>

      {/* ROI callout */}
      <div style={{ background: 'var(--accent-pale)', borderBottom: '1px solid #c8e6df', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ fontSize: 24, lineHeight: 1 }}>💰</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 2 }}>
            1 admission = {admissionLabel} revenue
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Your subscription pays for itself in approximately <strong style={{ color: 'var(--text)' }}>{roiDays} {roiDays === 1 ? 'day' : 'days'}</strong> of a single new {listingType === 'centre' ? 'admission' : 'client engagement'}.
          </div>
        </div>
      </div>

      {/* Per-location breakdown */}
      {perLoc.map((loc, i) => {
        const locEnqLo = Math.max(1, Math.round(loc.lo * 0.03))
        const locEnqHi = Math.max(1, Math.round(loc.hi * 0.05))
        return (
          <div key={loc.name} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '11px 18px', borderTop: '1px solid var(--border)',
            background: i % 2 === 0 ? '#fff' : 'var(--bg)',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{loc.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{loc.s.toLocaleString()} searches/month · {loc.lo}–{loc.hi} views</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{locEnqLo}–{locEnqHi} enquiries</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>est. per month</div>
            </div>
          </div>
        )
      })}

      <div style={{ padding: '10px 18px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
          Estimates based on organic search volume and industry conversion rates. Verified listings appear first and receive 2–3× more clicks than unverified results.
        </p>
      </div>
    </div>
  )
}

// ── NextButton ────────────────────────────────────────────────────────────────

function NextButton({ onClick, loading, disabled, label, accent }: {
  onClick: () => void; loading?: boolean; disabled?: boolean; label?: string; accent?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        marginTop: 28, width: '100%',
        background: disabled ? 'var(--border-mid)' : 'var(--accent)',
        color: '#fff', border: 'none', borderRadius: 10, padding: '14px',
        fontWeight: 600, fontSize: 15, cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1, transition: 'background 0.15s',
        boxShadow: (!disabled && !loading) ? '0 4px 12px rgba(26,107,90,0.25)' : 'none',
      }}
    >
      {loading ? 'Please wait…' : label || 'Continue →'}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function OnboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const typeFromUrl = searchParams.get('type') as ListingType | null

  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const [form, setForm] = useState<FormState>({
    listingType: typeFromUrl,
    email: '', password: '', name: '',
    locations: [], registrationNumber: '',
    phone: '', website: '', contactEmail: '',
  })

  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [claimedListingId, setClaimedListingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Location picker
  const [locationSearch, setLocationSearch] = useState('')
  const [locationOptions, setLocationOptions] = useState<Array<{ slug: string; name: string }>>([])
  const [showLocationDrop, setShowLocationDrop] = useState(false)
  const locationRef = useRef<HTMLDivElement>(null)

  // Name search (Step 3)
  const [nameSearch, setNameSearch] = useState('')
  const [nameResults, setNameResults] = useState<SearchResult[]>([])
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
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setShowLocationDrop(false)
      if (nameRef.current && !nameRef.current.contains(e.target as Node)) setShowNameDrop(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Debounced name search
  useEffect(() => {
    if (!nameSearch || nameSearch.length < 2 || !form.listingType) { setNameResults([]); return }
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

  // Fetch locations from API
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/listings/locations?q=${encodeURIComponent(locationSearch)}`)
        const data = await res.json()
        setLocationOptions((data.locations ?? []).filter((l: { slug: string }) => !form.locations.includes(l.slug)))
      } catch { /* ignore */ }
    }, 200)
    return () => clearTimeout(timer)
  }, [locationSearch, form.locations])

  // Start at step 2 if type pre-selected
  useEffect(() => {
    if (typeFromUrl && step === 1) setStep(2)
  }, [typeFromUrl, step])

  function handleClaimExisting(result: SearchResult) {
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
    setTimeout(() => { setStep(target); setAnimating(false) }, 220)
  }, [])

  async function handleNext() {
    setError('')

    if (step === 1 && !form.listingType) { setError('Please select a listing type.'); return }
    if (step === 2) {
      if (!form.email || !form.password) { setError('Please fill in your email and password.'); return }
      if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    }
    if (step === 3 && !form.name.trim()) { setError('Please enter your name or centre name.'); return }
    if (step === 4 && form.locations.length === 0) { setError('Please add at least one location.'); return }

    if (step === 2 && !ownerId) {
      setLoading(true)
      try {
        const res = await fetch('/api/verify/signup', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password, name: form.name || 'TBC', listingType: form.listingType }),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || 'Failed to create account.'); setLoading(false); return }
        setOwnerId(data.ownerId)
        await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      } catch { setError('Network error, please try again.'); setLoading(false); return }
      setLoading(false)
    }

    if (step === 7) {
      if (!ownerId) { setError('Something went wrong — please restart.'); return }
      setLoading(true)
      try {
        const res = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ownerId, locations: form.locations }),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || 'Failed to start checkout.'); setLoading(false); return }
        window.location.href = data.url
      } catch { setError('Network error, please try again.'); setLoading(false) }
      return
    }

    goTo(step + 1, 'forward')
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky header with integrated progress bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', borderBottom: '1px solid var(--border)',
        background: '#fff', position: 'sticky', top: 0, zIndex: 50,
        outline: 'none',
      }}>
        <Link href="/verify" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
          </svg>
          <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>SoberNation</span>
        </Link>

        {/* Progress bar + step label, centered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, padding: '0 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>Step {step} of {totalSteps}</div>
          <div style={{ width: '100%', maxWidth: 200, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.4s ease', borderRadius: 2 }} />
          </div>
        </div>

        {step > 1 ? (
          <button onClick={() => goTo(step - 1, 'back')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
            Back
          </button>
        ) : (
          <div style={{ width: 50 }} />
        )}
      </div>

      {/* Step content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{
          width: '100%', maxWidth: step === 4 || step === 7 ? 580 : 480,
          opacity: animating ? 0 : 1,
          transform: animating ? (direction === 'forward' ? 'translateX(40px)' : 'translateX(-40px)') : 'translateX(0)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}>

          {/* ── STEP 1: Type ── */}
          {step === 1 && (
            <div>
              <div style={stepLabelStyle}>Step 1 of 7</div>
              <h2 style={stepHeadingStyle}>What are you listing?</h2>
              <p style={stepSubStyle}>Choose the type that best describes your service.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
                {([
                  { type: 'counsellor' as const, label: 'Counsellor', price: '£10/month', desc: 'Individual addiction counsellors & therapists' },
                  { type: 'centre' as const, label: 'Rehab Centre', price: '£99/month', desc: 'Residential & outpatient treatment centres' },
                ] as const).map(opt => (
                  <button key={opt.type} onClick={() => { updateForm('listingType', opt.type); goTo(2, 'forward') }} style={{
                    padding: '24px 20px',
                    border: form.listingType === opt.type ? '2px solid var(--accent)' : '1px solid var(--border)',
                    borderRadius: 12,
                    background: form.listingType === opt.type ? 'var(--accent-pale)' : '#fff',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{opt.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 8 }}>{opt.price} per location</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
              {error && <div style={errorStyle}>{error}</div>}
            </div>
          )}

          {/* ── STEP 2: Account ── */}
          {step === 2 && (
            <div>
              <div style={stepLabelStyle}>Step 2 of 7</div>
              <h2 style={stepHeadingStyle}>Create your account</h2>
              <p style={stepSubStyle}>Already have an account? <Link href="/verify/login" style={{ color: 'var(--accent)' }}>Log in</Link></p>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="you@example.com" autoFocus onKeyDown={e => e.key === 'Enter' && handleNext()} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" value={form.password} onChange={e => updateForm('password', e.target.value)} placeholder="At least 8 characters" onKeyDown={e => e.key === 'Enter' && handleNext()} style={inputStyle} />
                </div>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
            </div>
          )}

          {/* ── STEP 3: Name + claim search ── */}
          {step === 3 && (
            <div>
              <div style={stepLabelStyle}>Step 3 of 7</div>
              <h2 style={stepHeadingStyle}>{form.listingType === 'centre' ? 'What is your centre called?' : 'What is your full name?'}</h2>
              <p style={stepSubStyle}>Start typing — if you&apos;re already in our directory, select your listing to claim it.</p>

              <div ref={nameRef} style={{ position: 'relative', marginTop: 32 }}>
                <input
                  type="text"
                  value={nameSearch || form.name}
                  onChange={e => { setNameSearch(e.target.value); updateForm('name', e.target.value); setClaimedListingId(null) }}
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
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 200, marginTop: 4 }}>
                    <div style={{ padding: '8px 14px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                      Found in our directory — click to claim
                    </div>
                    {nameResults.map(r => (
                      <button key={r.id} onClick={() => handleClaimExisting(r)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-pale)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{r.name}</div>
                        {r.subtitle && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.subtitle}</div>}
                      </button>
                    ))}
                    <button onClick={() => { setShowNameDrop(false); setNameResults([]) }} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '10px 16px', border: 'none', background: 'var(--bg)', cursor: 'pointer', fontSize: 12, color: 'var(--text-muted)' }}>
                      Not in the list? Continue with your name as typed
                    </button>
                  </div>
                )}
              </div>

              {claimedListingId && (
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px' }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="#16a34a"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span style={{ fontSize: 13, color: '#166534' }}>We found your listing! Your details have been pre-filled.</span>
                </div>
              )}
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
            </div>
          )}

          {/* ── STEP 4: Locations ── */}
          {step === 4 && (
            <div>
              <div style={stepLabelStyle}>Step 4 of 7</div>
              <h2 style={stepHeadingStyle}>Which locations do you cover?</h2>
              <p style={stepSubStyle}>Add every area where you offer services. Price updates as you add locations.</p>

              <div style={{ background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 10, padding: '14px 18px', marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'var(--accent)' }}>{form.locations.length} location{form.locations.length !== 1 ? 's' : ''} × £{pricePerLocation}/month</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>£{form.locations.length > 0 ? totalPrice : pricePerLocation}/mo</span>
              </div>

              <div ref={locationRef} style={{ position: 'relative', marginTop: 20 }}>
                <input
                  type="text"
                  value={locationSearch}
                  onChange={e => { setLocationSearch(e.target.value); setShowLocationDrop(true) }}
                  onFocus={() => setShowLocationDrop(true)}
                  placeholder="Search location (e.g. Manchester, London…)"
                  style={inputStyle}
                />
                {showLocationDrop && locationOptions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 100, marginTop: 4, maxHeight: 280, overflowY: 'auto' }}>
                    {locationOptions.map(loc => (
                      <button key={loc.slug} onClick={() => addLocation(loc.slug)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '11px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--text)', borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                        {loc.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {form.locations.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                  {form.locations.map(loc => (
                    <div key={loc} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--accent)', color: '#fff', borderRadius: 100, padding: '5px 12px', fontSize: 13, fontWeight: 500 }}>
                      {formatSlug(loc)}
                      <button onClick={() => removeLocation(loc)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} disabled={form.locations.length === 0} />
            </div>
          )}

          {/* ── STEP 5: Registration ── */}
          {step === 5 && (
            <div>
              <div style={stepLabelStyle}>Step 5 of 7</div>
              <h2 style={stepHeadingStyle}>{form.listingType === 'counsellor' ? 'BACP registration number' : 'CQC registration number'}</h2>
              <p style={stepSubStyle}>Optional — but highly recommended. Builds trust with people searching for help.</p>
              <div style={{ marginTop: 32 }}>
                <input type="text" value={form.registrationNumber} onChange={e => updateForm('registrationNumber', e.target.value)} placeholder={form.listingType === 'counsellor' ? 'e.g. BACP 123456' : 'e.g. 1-12345678901'} autoFocus onKeyDown={e => e.key === 'Enter' && handleNext()} style={{ ...inputStyle, fontSize: 16 }} />
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Leave blank to skip — you can add this later in your dashboard.</p>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
              <button onClick={() => goTo(6, 'forward')} style={skipStyle}>Skip for now</button>
            </div>
          )}

          {/* ── STEP 6: Contact info ── */}
          {step === 6 && (
            <div>
              <div style={stepLabelStyle}>Step 6 of 7</div>
              <h2 style={stepHeadingStyle}>Contact information</h2>
              <p style={stepSubStyle}>This overrides any scraped data we already have. Shown on your listing.</p>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Phone number</label>
                  <input type="tel" value={form.phone} onChange={e => updateForm('phone', e.target.value)} placeholder="e.g. 0800 123 4567" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Website</label>
                  <input type="url" value={form.website} onChange={e => updateForm('website', e.target.value)} placeholder="https://yourwebsite.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Contact email</label>
                  <input type="email" value={form.contactEmail} onChange={e => updateForm('contactEmail', e.target.value)} placeholder="enquiries@yourpractice.com" style={inputStyle} />
                </div>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
              <button onClick={() => goTo(7, 'forward')} style={skipStyle}>Skip for now</button>
            </div>
          )}

          {/* ── STEP 7: Review & pay ── */}
          {step === 7 && (
            <div>
              <div style={stepLabelStyle}>Step 7 of 7</div>
              <h2 style={stepHeadingStyle}>Review and pay</h2>
              <p style={stepSubStyle}>Here&apos;s exactly how your listing will look — badge goes live the moment payment clears.</p>

              {/* Listing preview */}
              <div style={{ marginTop: 28, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 10 }}>Your listing preview</div>
                <div style={{ border: '1px solid var(--border)', borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
                  {/* Position label */}
                  <div style={{ background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                    #1 position — verified listings appear first
                  </div>

                  {/* Your verified card row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
                    <div style={{ position: 'relative', flexShrink: 0, width: 44, height: 44 }}>
                      <div style={{
                        width: 44, height: 44,
                        borderRadius: form.listingType === 'counsellor' ? '50%' : 10,
                        background: 'var(--accent)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 15, fontWeight: 700,
                      }}>
                        {form.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'}
                      </div>
                      <span style={{ position: 'absolute', bottom: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: '#1d9bf0', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4.2,7.5 8,3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 3 }}>{form.name || 'Your Name / Centre'}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {form.listingType === 'centre'
                          ? `Addiction Service · Private · ${form.locations[0] ? formatSlug(form.locations[0]) : 'Your location'}`
                          : `Registered Counsellor · ${form.locations[0] ? formatSlug(form.locations[0]) : 'Your location'}`}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', whiteSpace: 'nowrap', flexShrink: 0 }}>Verified</span>
                  </div>

                  {/* Ghost "not verified" rows */}
                  {[1, 2].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderTop: '1px solid var(--border)', opacity: 0.35 }}>
                      <div style={{ width: 44, height: 44, borderRadius: form.listingType === 'counsellor' ? '50%' : 10, background: 'var(--border)', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 12, background: 'var(--border)', borderRadius: 4, width: '55%', marginBottom: 6 }} />
                        <div style={{ height: 10, background: 'var(--border)', borderRadius: 4, width: '35%' }} />
                      </div>
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>Not Verified</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated clicks */}
              <EstimatedClicks locations={form.locations} listingType={form.listingType} />

              {/* Summary */}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 8 }}>
                {[
                  { label: 'Type', value: form.listingType === 'centre' ? 'Rehab Centre' : 'Counsellor' },
                  { label: 'Name', value: form.name || '—' },
                  { label: 'Locations', value: form.locations.map(formatSlug).join(', ') || '—' },
                  { label: 'Registration', value: form.registrationNumber || 'Not provided' },
                  { label: 'Phone', value: form.phone || 'Not provided' },
                  { label: 'Website', value: form.website || 'Not provided' },
                ].map((row, i) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, padding: '13px 18px', borderBottom: i < 5 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, textAlign: 'right', color: row.value === 'Not provided' ? 'var(--text-light)' : 'var(--text)' }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', background: 'var(--accent-pale)', borderTop: '2px solid #c8e6df' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Total per month</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>£{totalPrice}</span>
                </div>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, textAlign: 'center', lineHeight: 1.6 }}>
                Billed monthly via Stripe. Cancel any time. Your badge is live instantly after payment.
              </p>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} label={loading ? 'Redirecting to Stripe…' : `Pay £${totalPrice}/month →`} accent />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
