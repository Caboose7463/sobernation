import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Alcohol Withdrawal Symptoms | Timeline, Signs & Treatment | SoberNation',
  description: 'Alcohol withdrawal symptoms explained: shakes, sweating, seizures, delirium tremens (DTs). Full timeline from 6 hours to 72+ hours. When to seek emergency help.',
}

const TIMELINE = [
  { time: '6–12 hours', severity: 'Mild', colour: '#16a34a', symptoms: ['Anxiety and restlessness', 'Tremors (shaking, particularly of the hands)', 'Sweating', 'Nausea and vomiting', 'Headache', 'Elevated heart rate', 'Difficulty sleeping'] },
  { time: '12–24 hours', severity: 'Moderate', colour: '#d97706', symptoms: ['Hallucinations (visual, auditory, or tactile) — you are conscious but perceiving things that are not there', 'Worsening tremors', 'Increased anxiety and agitation', 'High blood pressure', 'Rapid heart rate', 'Fever'] },
  { time: '24–48 hours', severity: 'Moderate–Severe', colour: '#ea580c', symptoms: ['Seizures — a medical emergency: call 999 immediately', 'Continued hallucinations', 'Severe disorientation', 'Severe sweating and tremors', 'Very high blood pressure'] },
  { time: '48–72 hours', severity: 'Severe — Delirium Tremens', colour: '#dc2626', symptoms: ['Delirium tremens (DTs): profound confusion, agitation, fever, and hallucinations', 'Life-threatening cardiovascular complications', 'Fatal without medical treatment in up to 15–37% of untreated cases', 'Requires intensive medical care — ICU admission may be necessary'] },
]

const faqs = [
  { question: 'What are the first signs of alcohol withdrawal?', answer: 'The first signs of alcohol withdrawal typically appear 6–12 hours after the last drink and include: anxiety, restlessness, tremors (shaking hands), sweating, nausea, vomiting, headache, and elevated heart rate. Many heavy drinkers experience these symptoms every morning before their first drink without realising they are symptoms of physical alcohol dependency.' },
  { question: 'How long do alcohol withdrawal symptoms last?', answer: 'Mild alcohol withdrawal symptoms typically peak at 24–48 hours and begin to resolve after 5–7 days. However, some symptoms — particularly anxiety, insomnia, and mood disruption — can persist for weeks or months as part of Post-Acute Withdrawal Syndrome (PAWS). Seizures typically occur 24–48 hours after the last drink. Delirium tremens (DTs) typically peaks at 48–72 hours.' },
  { question: 'What is delirium tremens (DTs)?', answer: 'Delirium tremens (DTs) is a severe, potentially fatal form of alcohol withdrawal that occurs in approximately 5% of people going through alcohol withdrawal. It is characterised by profound confusion, agitation, fever, and hallucinations, and requires emergency medical treatment. Without treatment, DTs has a mortality rate of up to 37%. Risk factors include long duration of heavy drinking, previous DTs, older age, and malnutrition.' },
  { question: 'Can alcohol withdrawal kill you?', answer: 'Yes. Severe alcohol withdrawal — particularly delirium tremens (DTs) and withdrawal seizures — can be fatal without medical treatment. This is one of very few withdrawal syndromes that can directly kill you (opioid withdrawal, by contrast, is extremely unpleasant but rarely directly fatal). Anyone with a significant alcohol dependency should seek medical supervision before stopping drinking.' },
  { question: 'Is it safe to stop drinking at home?', answer: 'For people with mild alcohol use who are not physically dependent, stopping at home is generally safe. For people who drink heavily every day, experience morning shakes or sweats, or have previously experienced withdrawal seizures or DTs, stopping at home without medical support is dangerous. NHS community alcohol detox — at home but with daily clinical supervision and detox medication — is available free across the UK.' },
]

export default function AlcoholWithdrawalPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div style={{ background: '#dc2626', padding: '12px 20px', color: '#fff', textAlign: 'center', fontSize: 14 }}>
        🚨 <strong>If someone is having a seizure or is severely confused after stopping alcohol — call 999 immediately.</strong>
      </div>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '40px 20px 36px' }}>
        <div className="container-wide" style={{ maxWidth: 720 }}>
          <div className="label" style={{ marginBottom: 12 }}>Alcohol Withdrawal · Clinical Guide</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Alcohol Withdrawal Symptoms, Timeline & Treatment
          </h1>
          {/* Featured snippet paragraph */}
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640 }}>
            Alcohol withdrawal symptoms begin <strong>6–12 hours after the last drink</strong> and include anxiety, tremors (shakes), sweating, nausea, and elevated heart rate. Seizures can occur at 24–48 hours. In severe cases, delirium tremens (DTs) develops at 48–72 hours and is potentially fatal — requiring emergency medical treatment. <strong>Do not stop drinking heavily without medical supervision.</strong>
          </p>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '40px 20px', maxWidth: 760 }}>
        {/* Timeline */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Alcohol withdrawal timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {TIMELINE.map((phase, i) => (
            <div key={i} style={{ display: 'flex', gap: 0, background: 'var(--white)', border: `1px solid var(--border)`, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div style={{ width: 6, flexShrink: 0, background: phase.colour }} />
              <div style={{ padding: '20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{phase.time}</div>
                  <div style={{ padding: '3px 10px', borderRadius: 20, background: phase.colour, color: '#fff', fontSize: 12, fontWeight: 700 }}>{phase.severity}</div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {phase.symptoms.map((s, j) => (
                    <li key={j} style={{ fontSize: 14, color: s.includes('999') || s.includes('Fatal') ? '#dc2626' : 'var(--text-muted)', lineHeight: 1.6, fontWeight: s.includes('999') || s.includes('Fatal') ? 700 : 400 }}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Treatment */}
        <div style={{ padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Alcohol withdrawal treatment</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 12 }}>NHS outpatient alcohol detox (community detox) is the most common form of treatment — you stay at home but receive daily clinical supervision and medication. The standard medication is <strong>chlordiazepoxide (Librium)</strong>, a benzodiazepine that prevents withdrawal seizures and makes the process much more manageable. This is free on the NHS.</p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 14 }}>Residential detox is available for those with severe dependency, previous seizures or DTs, or unsafe home situations. Call Frank on <strong>0300 123 6600</strong> (free, 24/7) to access the right level of support for your situation.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="tel:03001236600" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Call Frank: 0300 123 6600</a>
            <Link href="/detox-centres/london" style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Find detox centres →</Link>
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
              {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12 }}>+</span>
            </summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}

        {/* See also */}
        <div style={{ marginTop: 40, marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>See also</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { label: 'How to stop drinking', href: '/how-to-stop-drinking' },
              { label: 'Signs of alcoholism', href: '/signs-of-alcoholism' },
              { label: 'Am I an alcoholic?', href: '/am-i-an-alcoholic' },
              { label: 'Alcohol addiction help', href: '/alcohol-addiction/london' },
              { label: 'Alcohol detox centres', href: '/detox-centres/london' },
              { label: 'Alcohol rehab', href: '/alcohol-rehab/london' },
              { label: 'AA meetings near you', href: '/aa-meetings/london' },
              { label: 'Withdrawal timeline', href: '/withdrawal-timeline' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ padding: '8px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
                {item.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 24 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['How to stop drinking', '/how-to-stop-drinking'], ['Alcohol rehab', '/alcohol-rehab/london'], ['About', '/about'], ['Privacy', '/privacy-policy']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
