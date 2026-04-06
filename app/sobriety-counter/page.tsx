'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface SobrietyResult {
  days: number
  weeks: number
  months: number
  years: number
  hours: number
  minutes: number
  label: string
  phase: string
  milestone: string | null
}

const MILESTONES: Record<number, string> = {
  1: '🌱 Day One', 3: '💪 72 Hours', 7: '🗓 One Week', 14: '✌️ Two Weeks',
  21: '3️⃣ Three Weeks', 30: '🥇 One Month', 60: '2 Months', 90: '🎯 90 Days',
  100: '💯 100 Days', 180: '6️⃣ Six Months', 365: '🏆 One Year', 500: '5️⃣0️⃣0️⃣ 500 Days',
  730: '2️⃣ Two Years', 1000: '🔥 1,000 Days', 1095: '3️⃣ Three Years',
  1825: '⭐ Five Years', 3650: '🌟 Ten Years', 7300: '👑 Twenty Years',
}

function getPhase(days: number): string {
  if (days <= 3) return 'Acute withdrawal'
  if (days <= 7) return 'Early detox'
  if (days <= 30) return 'Early recovery'
  if (days <= 90) return 'Pink cloud phase'
  if (days <= 180) return 'Consolidation'
  if (days <= 365) return 'Foundation building'
  if (days <= 730) return 'Long-term recovery'
  return 'Sustained recovery'
}

function calculate(dateStr: string, type: 'sober' | 'clean'): SobrietyResult | null {
  if (!dateStr) return null
  const start = new Date(dateStr)
  const now = new Date()
  if (start >= now) return null

  const diffMs = now.getTime() - start.getTime()
  const totalMinutes = Math.floor(diffMs / 60000)
  const totalHours = Math.floor(diffMs / 3600000)
  const totalDays = Math.floor(diffMs / 86400000)
  const weeks = Math.floor(totalDays / 7)
  const months = Math.floor(totalDays / 30.44)
  const years = Math.floor(totalDays / 365.25)

  // Find the best milestone label
  const milestoneKeys = Object.keys(MILESTONES).map(Number).sort((a, b) => a - b)
  const exact = MILESTONES[totalDays] ?? null
  const prevMilestone = milestoneKeys.reverse().find(m => m <= totalDays)
  const label = exact ?? (prevMilestone ? MILESTONES[prevMilestone] : null) ?? `${totalDays} days`

  return {
    days: totalDays,
    weeks,
    months,
    years,
    hours: totalHours,
    minutes: totalMinutes,
    label,
    phase: getPhase(totalDays),
    milestone: exact,
  }
}

function getNextMilestone(days: number): { days: number; label: string; remaining: number } | null {
  const milestoneKeys = [1, 3, 7, 14, 21, 30, 60, 90, 100, 180, 365, 500, 730, 1000, 1095, 1825, 3650, 7300]
  const next = milestoneKeys.find(m => m > days)
  if (!next) return null
  const namedLabels: Record<number, string> = { 7: '1 week', 14: '2 weeks', 21: '3 weeks', 30: '1 month', 60: '2 months', 90: '3 months', 100: '100 days', 180: '6 months', 365: '1 year', 500: '500 days', 730: '2 years', 1000: '1,000 days', 1095: '3 years', 1825: '5 years', 3650: '10 years', 7300: '20 years' }
  return { days: next, label: namedLabels[next] ?? `${next} days`, remaining: next - days }
}

export default function SobrietyCounter() {
  const [type, setType] = useState<'sober' | 'clean'>('sober')
  const [dateStr, setDateStr] = useState('')
  const [result, setResult] = useState<SobrietyResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [tick, setTick] = useState(0)

  // Live clock tick
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (dateStr) setResult(calculate(dateStr, type))
  }, [dateStr, type, tick])

  const handleShare = useCallback(() => {
    if (!result) return
    const text = `I am ${result.days.toLocaleString()} days ${type} (${result.phase})! 🎉 Calculate yours at sobernation.co.uk/sobriety-counter`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) })
    }
  }, [result, type])

  const nextMilestone = result ? getNextMilestone(result.days) : null

  // Today's date minus 1 day max date
  const today = new Date().toISOString().split('T')[0]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <title>Sobriety Calculator — How Many Days Sober Am I? | SoberNation</title>

      {/* Hero */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="label" style={{ marginBottom: 12 }}>Free Tool · Recovery</div>
          <h1 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Sobriety Calculator
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 24px' }}>
            Enter your sobriety or clean date and see exactly how far you've come — days, weeks, months, and hours. Share your milestone and find out what's next.
          </p>

          {/* Type toggle */}
          <div style={{ display: 'inline-flex', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 28 }}>
            {(['sober', 'clean'] as const).map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{ padding: '8px 20px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', background: type === t ? 'var(--accent)' : 'transparent', color: type === t ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s' }}
              >
                {t === 'sober' ? 'Days Sober' : 'Days Clean'}
              </button>
            ))}
          </div>

          {/* Date input */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                My last {type === 'sober' ? 'drink' : 'use'} was on
              </label>
              <input
                type="date"
                value={dateStr}
                max={today}
                onChange={e => setDateStr(e.target.value)}
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border)', fontSize: 16, color: 'var(--text)', background: 'var(--white)', outline: 'none', fontFamily: 'inherit', cursor: 'pointer', minWidth: 200 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {result && result.days >= 0 && (
        <div className="container" style={{ maxWidth: 680, padding: '40px 20px' }}>

          {/* Main badge */}
          <div style={{ background: result.milestone ? 'linear-gradient(135deg, var(--accent) 0%, #0d4a36 100%)' : 'var(--white)', border: result.milestone ? 'none' : '2px solid var(--accent)', borderRadius: 20, padding: '36px 32px', textAlign: 'center', marginBottom: 24, boxShadow: result.milestone ? '0 8px 40px rgba(26,107,90,0.25)' : '0 2px 20px rgba(0,0,0,0.06)' }}>
            {result.milestone && (
              <div style={{ fontSize: 32, marginBottom: 12 }}>{result.milestone}</div>
            )}
            <div style={{ fontSize: 'clamp(48px,10vw,80px)', fontWeight: 800, color: result.milestone ? '#fff' : 'var(--accent)', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 8 }}>
              {result.days.toLocaleString()}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: result.milestone ? 'rgba(255,255,255,0.9)' : 'var(--text)', marginBottom: 16 }}>
              days {type}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
              {[
                { value: result.hours.toLocaleString(), label: 'hours' },
                { value: result.weeks.toLocaleString(), label: 'weeks' },
                { value: result.months.toLocaleString(), label: 'months' },
                result.years > 0 ? { value: result.years.toLocaleString(), label: 'years' } : null,
              ].filter(Boolean).map((item, i) => item && (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: result.milestone ? '#fff' : 'var(--accent)', letterSpacing: '-0.02em' }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: result.milestone ? 'rgba(255,255,255,0.7)' : 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: result.milestone ? 'rgba(255,255,255,0.2)' : 'var(--accent-pale)', borderRadius: 20, fontSize: 12, fontWeight: 600, color: result.milestone ? '#fff' : 'var(--accent)' }}>
              {result.phase}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Cigarettes not smoked', value: Math.round(result.days * 20).toLocaleString(), sub: 'if you smoked 20/day' },
              { label: 'Better sleep',           value: Math.round(result.days * 1.5) + 'hrs',         sub: 'better sleep quality' },
              { label: 'Calories avoided',       value: Math.round(result.days * 500).toLocaleString(), sub: 'avg based on typical drinking' },
              { label: 'Days of brain healing',  value: result.days.toLocaleString(),                   sub: 'neuroplasticity is working' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-light)' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Next milestone */}
          {nextMilestone && (
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Your next milestone</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{nextMilestone.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{nextMilestone.remaining.toLocaleString()} more day{nextMilestone.remaining !== 1 ? 's' : ''} to go</div>
              </div>
              <Link href={`/${type === 'sober' ? 'days-sober' : 'days-clean'}/${nextMilestone.days}`} style={{ fontSize: 13, padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
                What to expect →
              </Link>
            </div>
          )}

          {/* Read milestone page */}
          <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>
              Read: what happens at <strong>{result.days} days {type}</strong>
            </div>
            <Link href={`/${type === 'sober' ? 'days-sober' : 'days-clean'}/${Math.min(result.days, 7300)}`} style={{ fontSize: 13, padding: '8px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>
              Read guide →
            </Link>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            style={{ width: '100%', padding: '14px', background: copied ? '#16a34a' : 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s', marginBottom: 12 }}
          >
            {copied ? 'Copied to clipboard!' : `Share my ${result.days.toLocaleString()} days ${type} milestone`}
          </button>

          <p style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center' }}>
            Recovery is hard. Every single day counts.{' '}
            <a href="tel:03001236600" style={{ color: 'var(--accent)' }}>Call Frank (0300 123 6600)</a> if you need support today.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!result && (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16, color: 'var(--text-light)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div style={{ fontSize: 16, color: 'var(--text-muted)' }}>Enter your sobriety date above to see your results</div>
        </div>
      )}

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Withdrawal timeline', '/withdrawal-timeline'], ['Cost calculator', '/addiction-cost-calculator'], ['Days sober', '/days-sober/1']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
