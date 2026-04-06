'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

interface SubstanceData {
  name: string
  unit: string
  unitPlural: string
  avgCostPerUnit: number
  unitHint: string
}

const SUBSTANCES: Record<string, SubstanceData> = {
  alcohol:      { name: 'Alcohol',           unit: 'drink', unitPlural: 'drinks',      avgCostPerUnit: 4.50, unitHint: 'e.g. pints, glasses of wine, shots (avg £4.50 each)' },
  cocaine:      { name: 'Cocaine',           unit: 'gram',  unitPlural: 'grams',       avgCostPerUnit: 60,   unitHint: 'Avg UK street price: £50–£80/g (we use £60)' },
  heroin:       { name: 'Heroin',            unit: 'bag',   unitPlural: 'bags',        avgCostPerUnit: 8,    unitHint: 'A typical bag (0.1–0.2g). Avg UK street price: £5–£12 per bag' },
  cannabis:     { name: 'Cannabis',          unit: 'gram',  unitPlural: 'grams',       avgCostPerUnit: 10,   unitHint: 'Avg UK street price: £8–£12/g (we use £10)' },
  mdma:         { name: 'MDMA',              unit: 'pill',  unitPlural: 'pills',       avgCostPerUnit: 8,    unitHint: 'Avg UK street price: £5–£12 per pill' },
  ketamine:     { name: 'Ketamine',          unit: 'gram',  unitPlural: 'grams',       avgCostPerUnit: 25,   unitHint: 'Avg UK street price: £20–£30/g' },
  prescription: { name: 'Prescription drugs',unit: 'pill',  unitPlural: 'pills/doses', avgCostPerUnit: 15,   unitHint: 'Estimated per pill/dose including prescription or black market cost' },
}

const FREQ_OPTIONS = [
  { value: 1, label: 'Daily', perYear: 365 },
  { value: 0.857, label: '6× per week', perYear: 312 },
  { value: 0.71, label: '5× per week', perYear: 260 },
  { value: 0.57, label: '4× per week', perYear: 208 },
  { value: 0.43, label: '3× per week', perYear: 156 },
  { value: 0.286, label: 'Twice a week', perYear: 104 },
  { value: 0.143, label: 'Once a week', perYear: 52 },
  { value: 0.066, label: 'Twice a month', perYear: 24 },
  { value: 0.033, label: 'Once a month', perYear: 12 },
]

// Real affordability benchmarks
const COMPARISONS = (amount: number) => [
  { label: 'Netflix subscriptions',    value: Math.round(amount / 10.99),  suffix: '/yr' },
  { label: 'UK holidays',              value: Math.round(amount / 800),    suffix: '' },
  { label: 'Restaurant meals',         value: Math.round(amount / 25),     suffix: '' },
  { label: 'New iPhones',              value: (amount / 999).toFixed(1),   suffix: '' },
  { label: 'Gym memberships',          value: Math.round(amount / 480),    suffix: '/yr' },
  { label: 'Private therapy sessions', value: Math.round(amount / 80),     suffix: '' },
]

function formatGBP(n: number): string {
  if (n >= 1000000) return `£${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `£${Math.round(n).toLocaleString()}`
  return `£${Math.round(n).toLocaleString()}`
}

export default function AddictionCostCalculator() {
  const [substance, setSubstance] = useState('alcohol')
  const [amount, setAmount] = useState(10)
  const [freqValue, setFreqValue] = useState(1) // daily
  const [years, setYears] = useState(5)

  const sub = SUBSTANCES[substance]
  const freq = FREQ_OPTIONS.find(f => f.value === freqValue) ?? FREQ_OPTIONS[0]

  const results = useMemo(() => {
    const costPerSession = amount * sub.avgCostPerUnit
    const perWeek = costPerSession * freqValue * 7
    const perMonth = perWeek * 4.33
    const perYear = costPerSession * freq.perYear
    const total = perYear * years

    return { costPerSession, perWeek, perMonth, perYear, total }
  }, [substance, amount, freqValue, years, sub.avgCostPerUnit, freq.perYear])

  const comparisons = COMPARISONS(results.total)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <title>Addiction Cost Calculator — How Much Does Your Habit Cost? | SoberNation</title>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much does alcohol addiction cost per year in the UK?', acceptedAnswer: { '@type': 'Answer', text: 'The average cost of alcohol addiction in the UK varies significantly. Someone drinking 10 pints per day at an average pub price of £4.50 would spend approximately £16,425 per year on alcohol alone. This does not include the hidden costs: lost productivity, health problems, relationship breakdown, and legal issues. The total economic cost of alcohol harm to England has been estimated at £21 billion per year.' } },
          { '@type': 'Question', name: 'How much does cocaine cost per year if used regularly?', acceptedAnswer: { '@type': 'Answer', text: 'At an average UK street price of £60/gram, a regular cocaine user consuming 1 gram per day would spend approximately £21,900 per year. Many heavy users consume significantly more. The financial pressure of cocaine dependency is a common driver of debt, crime, and relationship breakdown. NHS cocaine treatment is free through community drug services.' } },
          { '@type': 'Question', name: 'Is private rehab worth the cost?', acceptedAnswer: { '@type': 'Answer', text: 'When compared to the ongoing financial cost of addiction, private residential rehabilitation often represents a clear financial case. A 28-day private rehab programme typically costs £3,000–£8,000 — equivalent to a few months of a typical drug or alcohol habit. NHS rehabilitation is entirely free. Both are significantly less than the lifetime cost of continued addiction, which can run to tens of thousands of pounds annually.' } },
          { '@type': 'Question', name: 'What is the financial cost of heroin addiction?', acceptedAnswer: { '@type': 'Answer', text: 'Heroin typically costs £5–£12 per bag in the UK, and many users need multiple bags per day to prevent withdrawal. A person using 5 bags per day would spend approximately £14,600–£21,900 per year on heroin. Methadone and buprenorphine prescribed through NHS drug services eliminate this cost entirely while supporting recovery.' } },
        ],
      }) }} />

      {/* Hero */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="label" style={{ marginBottom: 12 }}>Free Tool · Finance</div>
          <h1 style={{ fontSize: 'clamp(24px,5vw,38px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Addiction Cost Calculator
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 540 }}>
            How much is your habit costing you? Enter your substance, how much you use, and how often — see what you could do with that money instead.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 720, padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>

          {/* Input panel */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px 24px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Your usage</div>

            {/* Substance select */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Substance</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {Object.entries(SUBSTANCES).map(([key, s]) => (
                    <button key={key} onClick={() => setSubstance(key)} style={{ padding: '8px 14px', borderRadius: 'var(--radius-md)', border: `2px solid ${substance === key ? 'var(--accent)' : 'var(--border)'}`, background: substance === key ? 'var(--accent-pale)' : 'var(--white)', color: substance === key ? 'var(--accent)' : 'var(--text-muted)', fontWeight: substance === key ? 700 : 500, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}>
                      {s.name}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 8 }}>{sub.unitHint}</div>
            </div>

            {/* Amount per session */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                {sub.unitPlural} per session
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input
                  type="range"
                  min={1}
                  max={substance === 'alcohol' ? 30 : substance === 'heroin' ? 20 : 10}
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--accent)' }}
                />
                <div style={{ minWidth: 60, textAlign: 'right', fontSize: 20, fontWeight: 800, color: 'var(--accent)' }}>{amount}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 4 }}>
                Cost per session: <strong style={{ color: 'var(--text)' }}>£{(amount * sub.avgCostPerUnit).toLocaleString()}</strong>
              </div>
            </div>

            {/* Frequency */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                How often?
              </label>
              <select
                value={freqValue}
                onChange={e => setFreqValue(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: 14, color: 'var(--text)', background: 'var(--white)', outline: 'none', fontFamily: 'inherit' }}
              >
                {FREQ_OPTIONS.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Years */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                Calculate over
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 5, 10, 20].map(y => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    style={{ flex: 1, padding: '9px 4px', borderRadius: 'var(--radius-md)', border: `2px solid ${years === y ? 'var(--accent)' : 'var(--border)'}`, background: years === y ? 'var(--accent-pale)' : 'var(--white)', color: years === y ? 'var(--accent)' : 'var(--text-muted)', fontWeight: years === y ? 700 : 500, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}
                  >
                    {y}yr{y !== 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {/* Total hero */}
            <div style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)', borderRadius: 20, padding: '32px 28px', textAlign: 'center', marginBottom: 16, boxShadow: '0 8px 40px rgba(127,29,29,0.3)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Total cost over {years} year{years !== 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: 'clamp(42px,10vw,72px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {formatGBP(results.total)}
              </div>
              <div style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                {amount} {sub.unitPlural} · {freq.label.toLowerCase()}
              </div>
            </div>

            {/* Breakdown grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Per week', value: formatGBP(results.perWeek) },
                { label: 'Per month', value: formatGBP(results.perMonth) },
                { label: 'Per year', value: formatGBP(results.perYear) },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* What you could do instead */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
                What {formatGBP(results.total)} could buy instead
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {comparisons.filter(c => Number(c.value) >= 1).map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>
                      {Number(c.value).toLocaleString()}{c.suffix}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rehab affordability */}
            <div style={{ background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)', padding: '18px 20px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>
                You could fund rehab instead
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                Private residential rehab typically costs £3,000–£8,000 for 28 days. At your current spend rate, that's just{' '}
                <strong style={{ color: 'var(--accent)' }}>
                  {Math.ceil(3000 / (results.perYear / 12))} month{Math.ceil(3000 / (results.perYear / 12)) !== 1 ? 's' : ''}
                </strong>{' '}
                of habit spending. NHS rehab is free.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="tel:03001236600" style={{ flex: 1, minWidth: 160, textAlign: 'center', padding: '13px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Get help now — 0300 123 6600
              </a>
              <Link href={`/${substance === 'alcohol' ? 'alcohol-addiction' : substance}-addiction/london`} style={{ flex: 1, minWidth: 160, textAlign: 'center', padding: '13px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Find {sub.name} treatment →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Prices are estimated UK averages. Individual costs vary. © {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Sobriety calculator', '/sobriety-counter'], ['Withdrawal timeline', '/withdrawal-timeline'], ['Find help', '/help/london']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
