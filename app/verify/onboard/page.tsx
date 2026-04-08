'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
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
  ownerName: string
  ownerPhone: string
  name: string
  location: string
  phone: string
  website: string
  contactEmail: string
  docFile: File | null
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

// ── Styles ────────────────────────────────────────────────────────────────────

const stepLabelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 12,
}
const stepHeadingStyle: React.CSSProperties = {
  fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700,
  letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 10, lineHeight: 1.2,
}
const stepSubStyle: React.CSSProperties = {
  fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6,
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px', border: '1.5px solid var(--border-mid)',
  borderRadius: 10, fontSize: 15, outline: 'none',
  transition: 'border-color 0.15s', boxSizing: 'border-box', background: '#fff',
  color: 'var(--text)',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text)',
}
const errorStyle: React.CSSProperties = {
  background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8,
  padding: '10px 14px', fontSize: 13, color: '#991b1b', marginTop: 16,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatSlug(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ── Listing Preview ───────────────────────────────────────────────────────────

function ListingPreview({ form }: { form: FormState }) {
  const initials = form.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
  const isCircle = form.listingType === 'counsellor'

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: '#fff', overflow: 'hidden', marginBottom: 24 }}>
      {/* Header bar */}
      <div style={{ background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#4ade80' }}>
          <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
        </svg>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>Your verified listing — appears first</span>
      </div>

      {/* Your card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44,
            borderRadius: isCircle ? '50%' : 10,
            background: 'var(--accent)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 15, fontWeight: 700,
          }}>
            {initials}
          </div>
          {/* Verified tick */}
          <span style={{
            position: 'absolute', bottom: -3, right: -3,
            width: 16, height: 16, borderRadius: '50%',
            background: '#1d9bf0', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <polyline points="2,5 4.2,7.5 8,3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 3 }}>
            {form.name || (form.listingType === 'counsellor' ? 'Your Name' : 'Your Centre Name')}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {form.listingType === 'centre'
              ? `Addiction Service · Private · ${form.location ? formatSlug(form.location) : 'Your location'}`
              : `Registered Counsellor · ${form.location ? formatSlug(form.location) : 'Your location'}`}
          </div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Verified →
        </span>
      </div>

      {/* Ghost unverified rows */}
      {[1, 2].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderTop: '1px solid var(--border)', opacity: 0.3 }}>
          <div style={{ width: 44, height: 44, borderRadius: isCircle ? '50%' : 10, background: 'var(--border)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 12, background: 'var(--border)', borderRadius: 4, width: '55%', marginBottom: 6 }} />
            <div style={{ height: 10, background: 'var(--border)', borderRadius: 4, width: '35%' }} />
          </div>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Unverified</span>
        </div>
      ))}
    </div>
  )
}

// ── Next Button ───────────────────────────────────────────────────────────────

function NextButton({ onClick, loading, disabled, label }: {
  onClick: () => void; loading?: boolean; disabled?: boolean; label?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        marginTop: 28, width: '100%',
        background: disabled ? '#d1d5db' : 'var(--accent)',
        color: '#fff', border: 'none', borderRadius: 10, padding: '15px',
        fontWeight: 700, fontSize: 16, cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1, transition: 'background 0.15s, transform 0.1s',
        boxShadow: !disabled && !loading ? '0 4px 16px rgba(26,107,90,0.3)' : 'none',
        letterSpacing: '-0.01em',
      }}
    >
      {loading ? 'Please wait…' : label || 'Continue →'}
    </button>
  )
}

// ── Document Upload Step ──────────────────────────────────────────────────────

function DocUpload({ listingType, file, onChange }: {
  listingType: ListingType | null
  file: File | null
  onChange: (f: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const docLabel = listingType === 'centre' ? 'Utility bill' : 'Photo ID'
  const docHint = listingType === 'centre'
    ? 'A recent utility bill or bank statement showing your registered address'
    : 'Passport, driving licence, or government-issued photo ID'

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault(); setDragging(false)
          const f = e.dataTransfer.files[0]
          if (f) onChange(f)
        }}
        style={{
          border: `2px dashed ${dragging ? 'var(--accent)' : file ? '#16a34a' : 'var(--border-mid)'}`,
          borderRadius: 12, padding: '32px 20px', textAlign: 'center',
          background: file ? '#f0fdf4' : dragging ? 'var(--accent-pale)' : '#fafafa',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          style={{ display: 'none' }}
          onChange={e => onChange(e.target.files?.[0] ?? null)}
        />

        {file ? (
          <>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#166534', marginBottom: 4 }}>{file.name}</div>
            <div style={{ fontSize: 12, color: '#16a34a' }}>
              {(file.size / 1024).toFixed(0)} KB · Click to change
            </div>
          </>
        ) : (
          <>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
              Upload {docLabel}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Drag & drop or click to browse · JPG, PNG or PDF · max 10MB
            </div>
          </>
        )}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.6 }}>
        {docHint}. This is used solely for identity verification and is never shown publicly.
      </p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const PRICE = 25
const TOTAL_STEPS = 7

export default function OnboardPage() {
  const searchParams = useSearchParams()
  const typeFromUrl = searchParams.get('type') as ListingType | null

  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const [form, setForm] = useState<FormState>({
    listingType: typeFromUrl,
    email: '', password: '',
    ownerName: '', ownerPhone: '',
    name: '', location: '',
    phone: '', website: '',
    contactEmail: '', docFile: null,
  })

  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [claimedListingId, setClaimedListingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Location search
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

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100

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
        setLocationOptions(data.locations ?? [])
      } catch { /* ignore */ }
    }, 200)
    return () => clearTimeout(timer)
  }, [locationSearch])

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
      location: result.locationSlug || f.location,
    }))
    setClaimedListingId(result.id)
    setNameSearch(result.name)
    setShowNameDrop(false)
  }

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
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
      if (!form.ownerName.trim()) { setError('Please enter your full name.'); return }
      if (!form.email || !form.password) { setError('Please fill in your email and password.'); return }
      if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
      setLoading(true)
      try {
        const res = await fetch('/api/verify/signup', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password, name: form.ownerName, ownerPhone: form.ownerPhone, listingType: form.listingType }),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || 'Failed to create account.'); setLoading(false); return }
        setOwnerId(data.ownerId)
        await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      } catch { setError('Network error, please try again.'); setLoading(false); return }
      setLoading(false)
    }

    if (step === 3 && !form.name.trim()) { setError('Please enter your name or centre name.'); return }
    if (step === 4 && !form.location) { setError('Please select your location.'); return }
    if (step === 5 && !form.docFile) { setError('Please upload your verification document.'); return }

    if (step === TOTAL_STEPS) {
      if (!ownerId) { setError('Something went wrong — please restart.'); return }
      setLoading(true)
      try {
        const res = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ownerId, locations: [form.location], listingType: form.listingType }),
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
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .ob-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(26,107,90,0.1); }
        .ob-type-btn:hover { border-color: var(--accent) !important; }
      `}</style>

      {/* Sticky progress header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', borderBottom: '1px solid var(--border)',
        background: '#fff', position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/verify" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
          <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>SoberNation</span>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, padding: '0 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>Step {step} of {TOTAL_STEPS}</div>
          <div style={{ width: '100%', maxWidth: 200, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.4s ease', borderRadius: 2 }} />
          </div>
        </div>

        {step > 1 ? (
          <button onClick={() => goTo(step - 1, 'back')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
            Back
          </button>
        ) : <div style={{ width: 50 }} />}
      </div>

      {/* Step content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{
          width: '100%', maxWidth: step === 6 || step === 7 ? 560 : 480,
          opacity: animating ? 0 : 1,
          transform: animating ? (direction === 'forward' ? 'translateX(40px)' : 'translateX(-40px)') : 'translateX(0)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}>

          {/* ── STEP 1: Type ── */}
          {step === 1 && (
            <div>
              <div style={stepLabelStyle}>Let&apos;s get started</div>
              <h2 style={stepHeadingStyle}>Are you a rehab centre<br/>or a counsellor?</h2>
              <p style={stepSubStyle}>Choose the type that best describes you. Both are just £25/month.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
                {([
                  {
                    type: 'counsellor' as const,
                    label: 'Counsellor',
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    ),
                    desc: 'Individual addiction counsellors & therapists',
                    docNeeded: 'Photo ID required',
                  },
                  {
                    type: 'centre' as const,
                    label: 'Rehab Centre',
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    ),
                    desc: 'Residential & outpatient treatment centres',
                    docNeeded: 'Utility bill required',
                  },
                ] as const).map(opt => (
                  <button
                    key={opt.type}
                    className="ob-type-btn"
                    onClick={() => { updateForm('listingType', opt.type); goTo(2, 'forward') }}
                    style={{
                      padding: '28px 20px',
                      border: form.listingType === opt.type ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                      borderRadius: 14,
                      background: form.listingType === opt.type ? 'var(--accent-pale)' : '#fff',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ color: 'var(--accent)', marginBottom: 12 }}>{opt.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: 'var(--text)' }}>{opt.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>{opt.desc}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--accent-pale)', borderRadius: 100, padding: '4px 10px' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.03em' }}>{opt.docNeeded}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 20 }}>
                Both plans are <strong style={{ color: 'var(--text)' }}>£25/month</strong> · cancel anytime · verified badge goes live on payment
              </p>
              {error && <div style={errorStyle}>{error}</div>}
            </div>
          )}

          {/* ── STEP 2: Account ── */}
          {step === 2 && (
            <div>
              <div style={stepLabelStyle}>Step 2 of {TOTAL_STEPS}</div>
              <h2 style={stepHeadingStyle}>Create your account</h2>
              <p style={stepSubStyle}>Already have an account? <Link href="/verify/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Log in instead</Link></p>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Your full name <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="ob-input" type="text" value={form.ownerName} onChange={e => updateForm('ownerName', e.target.value)} placeholder="e.g. James Smith" autoFocus style={inputStyle} />
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Used for account management only — not shown publicly.</p>
                </div>
                <div>
                  <label style={labelStyle}>Your mobile number</label>
                  <input className="ob-input" type="tel" value={form.ownerPhone} onChange={e => updateForm('ownerPhone', e.target.value)} placeholder="e.g. 07700 900 123" style={inputStyle} />
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>We&apos;ll only call if there&apos;s an issue with your verification.</p>
                </div>
                <div>
                  <label style={labelStyle}>Email address <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="ob-input" type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="you@example.com" onKeyDown={e => e.key === 'Enter' && handleNext()} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="ob-input" type="password" value={form.password} onChange={e => updateForm('password', e.target.value)} placeholder="At least 8 characters" onKeyDown={e => e.key === 'Enter' && handleNext()} style={inputStyle} />
                </div>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} />
            </div>
          )}

          {/* ── STEP 3: Name / Centre search ── */}
          {step === 3 && (
            <div>
              <div style={stepLabelStyle}>Step 3 of {TOTAL_STEPS}</div>
              <h2 style={stepHeadingStyle}>{form.listingType === 'centre' ? 'What is your centre called?' : 'What is your full name?'}</h2>
              <p style={stepSubStyle}>Start typing — if you&apos;re already in our directory, select your listing to claim it.</p>

              <div ref={nameRef} style={{ position: 'relative', marginTop: 32 }}>
                <input
                  className="ob-input"
                  type="text"
                  value={nameSearch || form.name}
                  onChange={e => { setNameSearch(e.target.value); updateForm('name', e.target.value); setClaimedListingId(null) }}
                  placeholder={form.listingType === 'centre' ? 'e.g. The Priory Hospital' : 'e.g. Dr. Jane Smith'}
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleNext()}
                  style={{ ...inputStyle, fontSize: 17, padding: '14px 16px', paddingRight: nameSearchLoading ? 44 : 16 }}
                />
                {nameSearchLoading && (
                  <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
                    <div style={{ width: 18, height: 18, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  </div>
                )}
                {showNameDrop && nameResults.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 200, marginTop: 4 }}>
                    <div style={{ padding: '8px 14px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                      Found in our directory — click to claim
                    </div>
                    {nameResults.map(r => (
                      <button key={r.id} onClick={() => handleClaimExisting(r)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
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
              <NextButton onClick={handleNext} />
            </div>
          )}

          {/* ── STEP 4: Location ── */}
          {step === 4 && (
            <div>
              <div style={stepLabelStyle}>Step 4 of {TOTAL_STEPS}</div>
              <h2 style={stepHeadingStyle}>{form.listingType === 'centre' ? 'Where is your centre based?' : 'Where do you practise?'}</h2>
              <p style={stepSubStyle}>Your verified badge will appear on this location&apos;s search results.</p>

              <div ref={locationRef} style={{ position: 'relative', marginTop: 32 }}>
                <input
                  className="ob-input"
                  type="text"
                  value={locationSearch || (form.location ? formatSlug(form.location) : '')}
                  onChange={e => { setLocationSearch(e.target.value); updateForm('location', ''); setShowLocationDrop(true) }}
                  onFocus={() => setShowLocationDrop(true)}
                  placeholder="Search city or town (e.g. Manchester)"
                  autoFocus
                  style={inputStyle}
                />
                {showLocationDrop && locationOptions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 100, marginTop: 4, maxHeight: 260, overflowY: 'auto' }}>
                    {locationOptions.map(loc => (
                      <button key={loc.slug} onClick={() => { updateForm('location', loc.slug); setLocationSearch(loc.name); setShowLocationDrop(false) }}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--text)', borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                        {loc.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {form.location && (
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 8, padding: '10px 14px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{formatSlug(form.location)} selected</span>
                </div>
              )}

              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} disabled={!form.location} />
            </div>
          )}

          {/* ── STEP 5: Document Upload ── */}
          {step === 5 && (
            <div>
              <div style={stepLabelStyle}>Step 5 of {TOTAL_STEPS}</div>
              <h2 style={stepHeadingStyle}>
                {form.listingType === 'centre' ? 'Upload a utility bill' : 'Upload your photo ID'}
              </h2>
              <p style={stepSubStyle}>
                {form.listingType === 'centre'
                  ? 'We need to verify your centre\'s registered address. A recent utility bill or bank statement works perfectly.'
                  : 'We need to confirm your identity. A passport or driving licence is ideal.'}
              </p>

              <div style={{ marginTop: 28 }}>
                <DocUpload
                  listingType={form.listingType}
                  file={form.docFile}
                  onChange={f => updateForm('docFile', f)}
                />
              </div>

              {/* Trust note */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, padding: '12px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid var(--border)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Your document is encrypted, stored securely, and deleted after verification. It is never visible to other users.
                </p>
              </div>

              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} disabled={!form.docFile} />
              <button onClick={() => goTo(6, 'forward')} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
                I&apos;ll upload this later
              </button>
            </div>
          )}

          {/* ── STEP 6: Contact info ── */}
          {step === 6 && (
            <div>
              <div style={stepLabelStyle}>Step 6 of {TOTAL_STEPS}</div>
              <h2 style={stepHeadingStyle}>How should people contact you?</h2>
              <p style={stepSubStyle}>This information goes on your verified listing. Leave anything blank to skip — you can update it later.</p>

              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Phone number</label>
                  <input className="ob-input" type="tel" value={form.phone} onChange={e => updateForm('phone', e.target.value)} placeholder="e.g. 0800 123 4567" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Website</label>
                  <input className="ob-input" type="url" value={form.website} onChange={e => updateForm('website', e.target.value)} placeholder="https://yourwebsite.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Contact email</label>
                  <input className="ob-input" type="email" value={form.contactEmail} onChange={e => updateForm('contactEmail', e.target.value)} placeholder="enquiries@yourpractice.com" style={inputStyle} />
                </div>
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} />
              <button onClick={() => goTo(7, 'forward')} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
                Skip for now
              </button>
            </div>
          )}

          {/* ── STEP 7: Preview & Pay ── */}
          {step === 7 && (
            <div>
              <div style={stepLabelStyle}>Step 7 of {TOTAL_STEPS} — Almost there!</div>
              <h2 style={stepHeadingStyle}>Here&apos;s your verified listing preview</h2>
              <p style={stepSubStyle}>This is exactly how you&apos;ll appear. Your badge goes live the moment payment clears.</p>

              {/* Live preview */}
              <div style={{ marginTop: 28 }}>
                <ListingPreview form={form} />
              </div>

              {/* Benefits strip */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
                {[
                  { icon: '📨', label: 'Leads sent to you' },
                  { icon: '✓', label: 'Verified badge' },
                  { icon: '📊', label: 'Stats dashboard' },
                ].map(b => (
                  <div key={b.label} style={{ background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{b.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', lineHeight: 1.3 }}>{b.label}</div>
                  </div>
                ))}
              </div>

              {/* Pricing summary */}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
                {[
                  { label: 'Type', value: form.listingType === 'centre' ? 'Rehab Centre' : 'Counsellor' },
                  { label: 'Name', value: form.name || '—' },
                  { label: 'Location', value: form.location ? formatSlug(form.location) : '—' },
                  { label: 'Verification doc', value: form.docFile ? `${form.docFile.name} uploaded ✓` : 'To be uploaded' },
                ].map((row, i) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '12px 18px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, textAlign: 'right', color: 'var(--text)', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', background: 'var(--accent-pale)', borderTop: '2px solid #c8e6df' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>Monthly total</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Cancel anytime · no contracts</div>
                  </div>
                  <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>£{PRICE}<span style={{ fontSize: 14, fontWeight: 500 }}>/mo</span></span>
                </div>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
                Billed monthly via Stripe. Secure checkout. Cancel any time from your dashboard.
              </p>
              {error && <div style={errorStyle}>{error}</div>}
              <NextButton onClick={handleNext} loading={loading} label={loading ? 'Redirecting to Stripe…' : `Pay £${PRICE}/month & get verified →`} />
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
