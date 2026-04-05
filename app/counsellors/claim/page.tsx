'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────────

type ListingType = 'counsellor' | 'centre'
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface FormData {
  listingType: ListingType | ''
  name: string
  bacpNumber: string
  email: string
  location: string
  specialisms: string[]
  phone: string
  website: string
}

const SPECIALISMS = [
  { id: 'alcohol',         label: 'Alcohol' },
  { id: 'drugs',           label: 'Drug addiction' },
  { id: 'substances',      label: 'Substance misuse' },
  { id: 'gambling',        label: 'Gambling' },
  { id: 'eating-disorders',label: 'Eating disorders' },
  { id: 'dual-diagnosis',  label: 'Dual diagnosis' },
  { id: 'codependency',    label: 'Codependency' },
  { id: 'trauma',          label: 'Trauma & PTSD' },
  { id: 'anxiety',         label: 'Anxiety' },
  { id: 'depression',      label: 'Depression' },
]

const LOCATIONS = [
  'london','manchester','birmingham','leeds','glasgow','sheffield','liverpool',
  'bristol','edinburgh','cardiff','leicester','nottingham','coventry','bradford',
  'belfast','southampton','portsmouth','reading','hull','exeter','plymouth',
  'bournemouth','newcastle-upon-tyne','brighton','oxford','cambridge','york',
  'bath','chester','worcester','gloucester','ipswich','norwich','sunderland',
  'middlesbrough','milton-keynes','northampton','swansea','dundee','aberdeen',
  'inverness','derby','stoke-on-trent','wolverhampton','peterborough',
  'cheltenham','blackpool','burnley','blackburn','warrington',
]

function toLocationName(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ── Main component (inner) ─────────────────────────────────────────────────────

function ClaimFlowInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating] = useState(false)

  const [form, setForm] = useState<FormData>({
    listingType: '',
    name: '',
    bacpNumber: '',
    email: '',
    location: searchParams.get('location') || '',
    specialisms: [],
    phone: '',
    website: '',
  })

  const [bacpChecking, setBacpChecking] = useState(false)
  const [bacpResult, setBacpResult] = useState<'pending' | 'passed' | 'failed'>('pending')
  const [bacpError, setBacpError] = useState('')
  const [loading, setLoading] = useState(false)

  function goNext(nextStep: Step) {
    setDirection('forward')
    setAnimating(true)
    setTimeout(() => {
      setStep(nextStep)
      setAnimating(false)
    }, 200)
  }

  function goBack(prevStep: Step) {
    setDirection('back')
    setAnimating(true)
    setTimeout(() => {
      setStep(prevStep)
      setAnimating(false)
    }, 200)
  }

  async function checkBACP() {
    setBacpChecking(true)
    setBacpResult('pending')
    setBacpError('')

    try {
      const res = await fetch('/api/counsellors/verify-bacp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, bacpNumber: form.bacpNumber }),
      })
      const data = await res.json()

      if (data.verified) {
        setBacpResult('passed')
        setTimeout(() => goNext(5), 1000)
      } else {
        setBacpResult('failed')
        setBacpError(data.message || 'We couldn\'t verify this BACP number.')
      }
    } catch {
      setBacpResult('failed')
      setBacpError('Network error — please try again.')
    } finally {
      setBacpChecking(false)
    }
  }

  // Auto-trigger BACP check when arriving at step 4
  useEffect(() => {
    if (step === 4 && form.bacpNumber && form.name) {
      checkBACP()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  async function handlePayment() {
    setLoading(true)
    try {
      const res = await fetch('/api/counsellors/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Payment error: ' + (data.error || 'Unknown error'))
      }
    } catch {
      alert('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  const progress = Math.round((step / 8) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .cf-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .cf-card {
          width: 100%;
          max-width: 540px;
          background: var(--white);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 48px 40px;
          transition: opacity 0.2s, transform 0.2s;
        }
        .cf-card--out-forward { opacity: 0; transform: translateX(-20px); }
        .cf-card--out-back    { opacity: 0; transform: translateX(20px); }
        .cf-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 10px;
        }
        .cf-q {
          font-size: clamp(18px, 3vw, 24px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 28px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .cf-input {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid var(--border-mid);
          border-radius: var(--radius-md);
          font-size: 15px;
          color: var(--text);
          background: var(--white);
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .cf-input:focus { border-color: var(--accent); }
        .cf-btn {
          margin-top: 20px;
          padding: 14px 28px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: var(--radius-md);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.12s;
          width: 100%;
          letter-spacing: 0.01em;
        }
        .cf-btn:hover { opacity: 0.9; }
        .cf-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .cf-type-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 8px;
        }
        .cf-type-card {
          padding: 20px 16px;
          border: 1.5px solid var(--border-mid);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          text-align: left;
          background: none;
        }
        .cf-type-card:hover { border-color: var(--accent); }
        .cf-type-card--selected { border-color: var(--accent); background: var(--accent-pale); }
        .cf-type-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .cf-type-sub  { font-size: 12px; color: var(--text-muted); }
        .cf-type-price { font-size: 13px; font-weight: 700; color: var(--accent); margin-top: 10px; }
        .cf-pill-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
        .cf-pill {
          padding: 8px 14px;
          border: 1.5px solid var(--border-mid);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          background: none;
          color: var(--text-muted);
          transition: all 0.12s;
        }
        .cf-pill--selected { border-color: var(--accent); background: var(--accent-pale); color: var(--accent); }
        .cf-back {
          background: none;
          border: none;
          font-size: 13px;
          color: var(--text-light);
          cursor: pointer;
          padding: 0;
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .cf-back:hover { color: var(--text-muted); }
        .cf-check-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 24px 0;
          text-align: center;
        }
        .cf-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: cf-spin 0.8s linear infinite;
        }
        @keyframes cf-spin { to { transform: rotate(360deg); } }
        @media (max-width: 500px) {
          .cf-card { padding: 32px 24px; }
          .cf-type-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'var(--border)', zIndex: 100 }}>
        <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.3s ease' }} />
      </div>

      {/* Top nav */}
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>S</span>
          SoberNation
        </Link>
        <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Step {step} of 8</span>
      </div>

      <div className="cf-wrap">
        <div className={`cf-card${animating ? (direction === 'forward' ? ' cf-card--out-forward' : ' cf-card--out-back') : ''}`}>

          {/* ── Step 1: Type ── */}
          {step === 1 && (
            <>
              <div className="cf-label">Get verified</div>
              <div className="cf-q">Are you a counsellor or a rehab centre?</div>
              <div className="cf-type-grid">
                <button
                  className={`cf-type-card${form.listingType === 'counsellor' ? ' cf-type-card--selected' : ''}`}
                  onClick={() => { setForm(f => ({ ...f, listingType: 'counsellor' })); goNext(2) }}
                >
                  <div className="cf-type-title">Counsellor</div>
                  <div className="cf-type-sub">Individual therapist or practitioner</div>
                  <div className="cf-type-price">£10 / month</div>
                </button>
                <button
                  className={`cf-type-card${form.listingType === 'centre' ? ' cf-type-card--selected' : ''}`}
                  onClick={() => { setForm(f => ({ ...f, listingType: 'centre' })); goNext(2) }}
                >
                  <div className="cf-type-title">Rehab Centre</div>
                  <div className="cf-type-sub">Clinic, treatment facility or organisation</div>
                  <div className="cf-type-price">£30 / month</div>
                </button>
              </div>
            </>
          )}

          {/* ── Step 2: Name ── */}
          {step === 2 && (
            <>
              <div className="cf-label">{form.listingType === 'counsellor' ? 'Your details' : 'Centre details'}</div>
              <div className="cf-q">{form.listingType === 'counsellor' ? 'What\'s your full name?' : 'What\'s the name of your centre?'}</div>
              <input
                className="cf-input"
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder={form.listingType === 'counsellor' ? 'e.g. Sarah Mitchell' : 'e.g. Sunrise Recovery Centre'}
                autoFocus
                onKeyDown={e => { if (e.key === 'Enter' && form.name.trim()) goNext(3) }}
              />
              <button className="cf-btn" disabled={!form.name.trim()} onClick={() => goNext(3)}>
                Continue →
              </button>
              <button className="cf-back" onClick={() => goBack(1)}>← Back</button>
            </>
          )}

          {/* ── Step 3: BACP number ── */}
          {step === 3 && (
            <>
              <div className="cf-label">Verification</div>
              <div className="cf-q">
                {form.listingType === 'counsellor'
                  ? 'What\'s your BACP membership number?'
                  : 'What\'s your CQC registration number?'}
              </div>
              <input
                className="cf-input"
                type="text"
                value={form.bacpNumber}
                onChange={e => setForm(f => ({ ...f, bacpNumber: e.target.value }))}
                placeholder={form.listingType === 'counsellor' ? 'e.g. 00123456' : 'e.g. 1-12345678901'}
                autoFocus
                onKeyDown={e => { if (e.key === 'Enter' && form.bacpNumber.trim()) goNext(4) }}
              />
              <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 10 }}>
                {form.listingType === 'counsellor'
                  ? 'We\'ll automatically verify this against the BACP public register.'
                  : 'We\'ll verify this against the CQC register of providers.'}
              </p>
              <button className="cf-btn" disabled={!form.bacpNumber.trim()} onClick={() => goNext(4)}>
                Continue →
              </button>
              <button className="cf-back" onClick={() => goBack(2)}>← Back</button>
            </>
          )}

          {/* ── Step 4: BACP auto-check ── */}
          {step === 4 && (
            <>
              <div className="cf-label">Checking register…</div>
              <div className="cf-q">Verifying your registration</div>
              <div className="cf-check-state">
                {(bacpChecking || bacpResult === 'pending') && (
                  <>
                    <div className="cf-spinner" />
                    <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                      Checking the {form.listingType === 'counsellor' ? 'BACP' : 'CQC'} register…
                    </div>
                  </>
                )}
                {!bacpChecking && bacpResult === 'passed' && (
                  <>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>Verified!</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      Taking you to the next step…
                    </div>
                  </>
                )}
                {!bacpChecking && bacpResult === 'failed' && (
                  <>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#ef4444' }}>Couldn&apos;t verify</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 320 }}>{bacpError}</div>
                    <button className="cf-btn" style={{ maxWidth: 220 }} onClick={() => { setBacpResult('pending'); goBack(3) }}>
                      Try a different number
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {/* ── Step 5: Email ── */}
          {step === 5 && (
            <>
              <div className="cf-label">Contact details</div>
              <div className="cf-q">What&apos;s your email address?</div>
              <input
                className="cf-input"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                autoFocus
                onKeyDown={e => { if (e.key === 'Enter' && form.email.trim()) goNext(6) }}
              />
              <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 10 }}>
                Used for subscription management and listing updates only.
              </p>
              <button className="cf-btn" disabled={!form.email.trim()} onClick={() => goNext(6)}>
                Continue →
              </button>
              <button className="cf-back" onClick={() => goBack(3)}>← Back</button>
            </>
          )}

          {/* ── Step 6: Location ── */}
          {step === 6 && (
            <>
              <div className="cf-label">Your location</div>
              <div className="cf-q">Where are you based?</div>
              <select
                className="cf-input"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              >
                <option value="">Select a city…</option>
                {LOCATIONS.map(l => (
                  <option key={l} value={l}>{toLocationName(l)}</option>
                ))}
              </select>
              <button className="cf-btn" disabled={!form.location} onClick={() => goNext(7)}>
                Continue →
              </button>
              <button className="cf-back" onClick={() => goBack(5)}>← Back</button>
            </>
          )}

          {/* ── Step 7: Specialisms ── */}
          {step === 7 && (
            <>
              <div className="cf-label">Specialisms</div>
              <div className="cf-q">What do you specialise in?</div>
              <div className="cf-pill-grid">
                {SPECIALISMS.map(s => (
                  <button
                    key={s.id}
                    className={`cf-pill${form.specialisms.includes(s.id) ? ' cf-pill--selected' : ''}`}
                    onClick={() => setForm(f => ({
                      ...f,
                      specialisms: f.specialisms.includes(s.id)
                        ? f.specialisms.filter(x => x !== s.id)
                        : [...f.specialisms, s.id]
                    }))}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <button className="cf-btn" disabled={form.specialisms.length === 0} onClick={() => goNext(8)}>
                Continue →
              </button>
              <button className="cf-back" onClick={() => goBack(6)}>← Back</button>
            </>
          )}

          {/* ── Step 8: Payment ── */}
          {step === 8 && (
            <>
              <div className="cf-label">Almost done</div>
              <div className="cf-q">Publish your verified listing</div>

              {/* Summary */}
              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 18px', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{form.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span>{toLocationName(form.location)}</span>
                  {form.specialisms.length > 0 && (
                    <span>{form.specialisms.slice(0, 3).join(', ')}</span>
                  )}
                </div>
              </div>

              <div style={{ background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
                    {form.listingType === 'counsellor' ? 'Verified Counsellor Listing' : 'Verified Rehab Centre'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Billed monthly — cancel any time</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)' }}>
                  {form.listingType === 'counsellor' ? '£10' : '£30'}<span style={{ fontSize: 13, fontWeight: 500 }}>/mo</span>
                </div>
              </div>

              <button className="cf-btn" disabled={loading} onClick={handlePayment}>
                {loading ? 'Redirecting to payment…' : 'Pay & publish listing →'}
              </button>
              <p style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'center', marginTop: 12 }}>
                Secure payment via Stripe. Verified badge appears instantly after payment.
              </p>
              <button className="cf-back" onClick={() => goBack(7)}>← Back</button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default function CounsellorClaimPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading…</div>}>
      <ClaimFlowInner />
    </Suspense>
  )
}
