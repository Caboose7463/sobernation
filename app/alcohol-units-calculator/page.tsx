import type { Metadata } from 'next'
import Link from 'next/link'
import AlcoholUnitsCalculator from '../../components/AlcoholUnitsCalculator'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Alcohol Units Calculator UK | How Many Units Have You Had? | SoberNation',
  description: 'Calculate alcohol units instantly. Add drinks, see your total units, risk level, and compare to UK guidelines. Free interactive UK alcohol units calculator.',
  openGraph: {
    title: 'Alcohol Units Calculator UK',
    description: 'How many units have you had? Interactive calculator with UK guidelines, risk levels, calorie counts and more.',
  },
}

const faqs = [
  { question: 'What is a unit of alcohol?', answer: 'One unit of alcohol is 10ml (8g) of pure alcohol. This is roughly equivalent to: a single 25ml measure of spirits (40% ABV), half a pint of average-strength beer (3.6% ABV), or half a standard glass of wine (11.5% ABV). Most drinks contain more than one unit.' },
  { question: 'How many units per week is safe?', answer: 'The UK Chief Medical Officers recommend drinking no more than 14 units per week for both men and women. This should be spread over at least 3 days — not saved up for a single session. There is no completely "safe" level of alcohol consumption — these guidelines indicate lower-risk levels, not zero risk.' },
  { question: 'How do I calculate alcohol units?', answer: 'To calculate alcohol units: Multiply the volume (in ml) by the ABV percentage, then divide by 1000. For example: a 250ml glass of 13% wine = (250 × 13) ÷ 1000 = 3.25 units. Our calculator does this automatically for common drinks.' },
  { question: 'How long does alcohol stay in your system?', answer: 'Your liver processes alcohol at approximately 1 unit per hour. This rate does not increase significantly with coffee, food, or water. If you drink 10 units, it will take approximately 10 hours for the alcohol to clear from your blood. This is why morning-after drink-driving is a real risk.' },
  { question: 'What is binge drinking?', answer: 'The NHS defines binge drinking as drinking more than 6 units in a single session for women, or more than 8 units for men. This is roughly equivalent to 2 large glasses of wine (6 units) or 3–4 pints of beer (8 units). Binge drinking carries significantly higher short-term risks than spreading the same amount of alcohol over a week.' },
  { question: 'Am I drinking too much?', answer: 'If you regularly drink more than 14 units per week, drink to cope with stress or emotions, find it difficult to control how much you drink, or feel you need alcohol to function normally — these are signs that your drinking may be becoming a problem. Speak to your GP or call Frank (0300 123 6600, free, 24/7) for confidential advice.' },
]

export default function AlcoholUnitsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <a href="tel:03001236600" style={{ fontSize: 13, background: 'var(--crisis)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>Help: 0300 123 6600</a>
        </div>
      </nav>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide" style={{ maxWidth: 680 }}>
          <div className="label" style={{ marginBottom: 12 }}>Interactive Tool · Alcohol</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Alcohol Units Calculator UK
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 560 }}>
            Add your drinks to instantly calculate your units, compare them to UK guidelines, and see your risk level. One unit of alcohol is 10ml of pure alcohol — the UK guideline is a maximum of <strong>14 units per week</strong>, spread over at least 3 days.
          </p>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px, 340px)', gap: 40, alignItems: 'start' }}>
          <div>
            <AlcoholUnitsCalculator />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>UK alcohol guidelines</h3>
              {[
                { icon: '🟢', label: 'Low risk', detail: 'Up to 14 units/week', sub: 'Spread over 3+ days' },
                { icon: '🟡', label: 'Increasing risk', detail: '14–21 units/week', sub: 'Above CMO guidelines' },
                { icon: '🔴', label: 'Higher risk', detail: '21+ units/week', sub: 'Significant health risks' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 16 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{r.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{r.detail}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{r.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Related tools</h3>
              {[
                ['Sobriety counter', '/sobriety-counter'],
                ['Withdrawal timeline', '/withdrawal-timeline'],
                ['Addiction cost calculator', '/addiction-cost-calculator'],
                ['How long does alcohol stay in your system?', '/how-long-does-alcohol-stay-in-your-system'],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'var(--accent)', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  {label} →
                </Link>
              ))}
            </div>

            <div style={{ padding: 16, background: 'var(--crisis)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Concerned about drinking?</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 12, lineHeight: 1.6 }}>Frank's free helpline is available 24/7 for confidential advice about alcohol and drugs.</div>
              <a href="tel:03001236600" style={{ display: 'block', textAlign: 'center', padding: '10px 16px', background: '#fff', color: 'var(--crisis)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                0300 123 6600
              </a>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div style={{ maxWidth: 720, marginTop: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>About alcohol units — frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)', padding: '0' }}>
                <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.question}
                  <span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Alcohol help', '/alcohol-addiction/london'], ['Rehab', '/rehab/london'], ['Withdrawal timeline', '/withdrawal-timeline']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
