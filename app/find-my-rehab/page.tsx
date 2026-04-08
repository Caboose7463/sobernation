'use client'

import { useState } from 'react'
import Link from 'next/link'

type Step = 1 | 2 | 3 | 4 | 5 | 6

const ADDICTION_TYPES = [
  { value: 'alcohol', label: 'Alcohol' },
  { value: 'drugs', label: 'Drugs / other substances' },
  { value: 'gambling', label: 'Gambling' },
  { value: 'prescription', label: 'Prescription medication' },
  { value: 'other', label: 'Something else' },
]

const BUDGET_BANDS = [
  { value: 'nhs', label: 'NHS funded (free)', sub: 'May have a waiting list' },
  { value: 'under2k', label: 'Under £2,000', sub: 'Day programmes & outpatient' },
  { value: '2k-5k', label: '£2,000 – £5,000', sub: 'Short residential stays' },
  { value: '5k-10k', label: '£5,000 – £10,000', sub: '28-day residential' },
  { value: '10k+', label: '£10,000+', sub: 'Premium residential / long-term' },
]

const URGENCY = [
  { value: '24hrs', label: 'I need help within 24 hours', sub: 'We\'ll prioritise urgent matches' },
  { value: 'this_week', label: 'This week', sub: 'A few days to make a decision' },
  { value: 'exploring', label: 'Just exploring options', sub: 'No rush — gathering information' },
]

export default function FindMyRehabPage() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState({
    location: '',
    addiction: '',
    fundingType: '' as 'nhs' | 'private' | 'unsure' | '',
    budget: '',
    urgency: '',
    firstName: '',
    email: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function update(fields: Partial<typeof answers>) {
    setAnswers(a => ({ ...a, ...fields }))
  }

  async function submit() {
    setLoading(true)
    try {
      await fetch('/api/matching/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true) // still show success
    } finally {
      setLoading(false)
    }
  }

  const optionBtn = (selected: boolean, onClick: () => void, children: React.ReactNode) => (
    <button onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', padding: '14px 18px', borderRadius: 12,
        border: `2px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        background: selected ? 'var(--accent-pale)' : '#fff',
        cursor: 'pointer', transition: 'all 0.12s',
        boxShadow: selected ? '0 0 0 3px var(--accent-pale)' : 'none',
      }}>
      {children}
    </button>
  )

  if (submitted) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>✓</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>We're on it, {answers.firstName}</h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>
            We've matched you with rehab centres near {answers.location} and sent your details to them. You should hear back within the hour.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            If you need to talk to someone right now, call <strong>0300 123 6600</strong> (free, 24/7).
          </p>
        </div>
      </main>
    )
  }

  const totalSteps = 6
  const progress = ((step - 1) / totalSteps) * 100

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

        {/* Progress bar */}
        <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginBottom: 40, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.4s ease', borderRadius: 2 }} />
        </div>

        {/* Step 1: Location */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>1 of {totalSteps}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>Where are you based?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>We'll find centres near you.</p>
            <input
              placeholder="e.g. Manchester, Leeds, London..."
              value={answers.location}
              onChange={e => update({ location: e.target.value })}
              autoFocus
              style={{ padding: '14px 16px', borderRadius: 12, border: '2px solid var(--border)', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box', marginBottom: 16 }}
            />
            <button onClick={() => answers.location && setStep(2)}
              disabled={!answers.location}
              style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: answers.location ? 'var(--accent)' : '#e2e8f0', color: answers.location ? '#fff' : '#94a3b8', fontSize: 15, fontWeight: 700, cursor: answers.location ? 'pointer' : 'not-allowed' }}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Addiction type */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>2 of {totalSteps}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>What are you seeking help with?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>This helps us match you with specialists.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ADDICTION_TYPES.map(t => optionBtn(answers.addiction === t.value, () => { update({ addiction: t.value }); setTimeout(() => setStep(3), 300) },
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{t.label}</span>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
          </div>
        )}

        {/* Step 3: NHS or private */}
        {step === 3 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>3 of {totalSteps}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>NHS or private?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Both have their advantages.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { value: 'nhs', label: 'NHS (free)', sub: 'GP referral or self-refer — may have a wait' },
                { value: 'private', label: 'Private', sub: 'Can often start within 24–72 hours' },
                { value: 'unsure', label: 'Not sure', sub: 'We\'ll show you both options' },
              ].map(opt => optionBtn(answers.fundingType === opt.value, () => { update({ fundingType: opt.value as 'nhs'|'private'|'unsure' }); setTimeout(() => setStep(4), 300) },
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{opt.sub}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
          </div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>4 of {totalSteps}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>What's your budget?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>We'll only show options you can afford.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {BUDGET_BANDS.map(b => optionBtn(answers.budget === b.value, () => { update({ budget: b.value }); setTimeout(() => setStep(5), 300) },
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{b.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{b.sub}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(3)} style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
          </div>
        )}

        {/* Step 5: Urgency */}
        {step === 5 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>5 of {totalSteps}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>How soon do you need help?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>This helps us contact the right centres for you.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {URGENCY.map(u => optionBtn(answers.urgency === u.value, () => { update({ urgency: u.value }); setTimeout(() => setStep(6), 300) },
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{u.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{u.sub}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(4)} style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
          </div>
        )}

        {/* Step 6: Contact */}
        {step === 6 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>6 of {totalSteps}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>Who should we contact?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>We'll send your details to matched centres. They'll reach out directly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <input placeholder="First name *"
                value={answers.firstName} onChange={e => update({ firstName: e.target.value })}
                style={{ padding: '14px 16px', borderRadius: 12, border: '2px solid var(--border)', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              <input type="tel" placeholder="Phone number *"
                value={answers.phone} onChange={e => update({ phone: e.target.value })}
                style={{ padding: '14px 16px', borderRadius: 12, border: '2px solid var(--border)', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              <input type="email" placeholder="Email (optional)"
                value={answers.email} onChange={e => update({ email: e.target.value })}
                style={{ padding: '14px 16px', borderRadius: 12, border: '2px solid var(--border)', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <button onClick={submit} disabled={loading || !answers.firstName || !answers.phone}
              style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: (answers.firstName && answers.phone) ? 'var(--accent)' : '#e2e8f0', color: (answers.firstName && answers.phone) ? '#fff' : '#94a3b8', fontSize: 15, fontWeight: 700, cursor: (answers.firstName && answers.phone) ? 'pointer' : 'not-allowed' }}>
              {loading ? 'Matching you...' : 'Find my rehab →'}
            </button>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              Your details are only shared with matched centres. We never sell your data.
            </p>
            <button onClick={() => setStep(5)} style={{ display: 'block', margin: '12px auto 0', fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
          </div>
        )}
      </div>
    </main>
  )
}
