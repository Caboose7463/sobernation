import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'What is Methadone? | Treatment, Side Effects & FAQs | SoberNation',
  description: 'What is methadone? Complete guide to methadone treatment for heroin and opiate addiction — how it works, side effects, dosing, and getting it free on the NHS.',
}

const faqs = [
  { question: 'What is methadone used for?', answer: 'Methadone is used primarily to treat heroin and opioid addiction as part of medication-assisted treatment (MAT) — also called opioid substitution therapy (OST). It occupies opioid receptors in the brain, eliminating heroin withdrawal symptoms and cravings without the intoxicating peaks and crashes of heroin or short-acting opioids. It is also used as a pain medication, though this is a separate application.' },
  { question: 'How does methadone work?', answer: 'Methadone is a full opioid agonist — it activates the same receptors as heroin, codeine, and other opioids. Because it has a very long half-life (24–36 hours), a single daily dose provides stable opioid blood levels throughout the day. This eliminates the withdrawal-driven cycle of heroin use and allows people to live stable, functional lives. The dose is carefully calibrated by a prescriber to eliminate withdrawal without causing significant intoxication.' },
  { question: 'Is methadone addictive?', answer: 'Methadone causes physical dependency — stopping suddenly causes withdrawal (similar to heroin withdrawal, but longer-lasting due to methadone\'s long half-life). However, "addiction" in the clinical sense — characterised by compulsive drug-seeking, loss of control, and harm — is the problem methadone is treating, not causing. People on stable methadone maintenance live functional, productive lives. The dependency on prescribed methadone is managed, not chaotic.' },
  { question: 'Can I drive on methadone?', answer: 'Being on a stable, prescribed dose of methadone does not automatically disqualify you from driving in the UK. DVLA guidance requires you to notify them if you are on methadone, and your prescriber may need to confirm your dose is stable and not impairing you. This is assessed on a case-by-case basis. If your dose is stable and you are not impaired, many people on methadone drive legally.' },
  { question: 'How long do people stay on methadone?', answer: 'Research consistently shows that longer duration of methadone treatment produces better outcomes. Short-term methadone (less than 12 months) is associated with high relapse rates on cessation. Many people benefit from methadone maintenance for years or indefinitely. The decision to reduce and stop should be patient-led and gradual — very slow tapering over many months under medical supervision.' },
  { question: 'What are the side effects of methadone?', answer: 'Common side effects include: constipation (very common), sweating, drowsiness (particularly in the early stages of finding the right dose), dry mouth, weight gain, and reduced libido. Cardiac effects (QT prolongation) are a risk at high doses — an ECG is usually done before starting high-dose methadone. Side effects typically diminish once a stable dose is established.' },
]

export default function WhatIsMethadonePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <a href="tel:03001236600" style={{ fontSize: 13, background: 'var(--crisis)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>Frank: 0300 123 6600</a>
        </div>
      </nav>
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px' }}>
        <div className="container-wide" style={{ maxWidth: 720 }}>
          <div className="label" style={{ marginBottom: 12 }}>Medication Guide · Opioid Treatment</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-0.02em' }}>What is Methadone?</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640 }}>
            Methadone is a long-acting opioid prescribed by NHS drug services to treat heroin and opioid addiction. It works by occupying opioid receptors in the brain — eliminating withdrawal symptoms and cravings without the intoxicating cycle of heroin use. Methadone maintenance is free on the NHS and is one of the most evidence-based treatments available for opioid addiction, reducing overdose deaths by up to 50%.
          </p>
        </div>
      </section>
      <div className="container-wide" style={{ padding: '40px 20px', maxWidth: 760 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'Type', value: 'Full opioid agonist', icon: '🔬' },
            { label: 'Half-life', value: '24–36 hours', icon: '⏱️' },
            { label: 'NHS cost', value: 'Completely free', icon: '💙' },
            { label: 'Access', value: 'Via drug treatment service', icon: '🏥' },
            { label: 'Evidence', value: 'Reduces overdose deaths by up to 50%', icon: '📊' },
            { label: 'Format', value: 'Daily oral liquid, dispensed from pharmacy', icon: '💊' },
          ].map((f, i) => (
            <div key={i} style={{ padding: 16, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{f.value}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: 20, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', marginBottom: 32, fontSize: 14, color: '#1e40af' }}>
          <strong>Getting methadone on the NHS:</strong> Self-refer to your local drug treatment service by calling Frank on <a href="tel:03001236600" style={{ color: '#1e40af', fontWeight: 700 }}>0300 123 6600</a> (free, 24/7). Methadone is dispensed daily from a designated pharmacy under a supervised consumption arrangement that is adjusted as treatment progresses.
        </div>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Methadone vs Buprenorphine</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { name: 'Methadone', points: ['Full agonist — activates all opioid receptors', 'Higher overdose risk if diverted', 'Daily dispensing from pharmacy', 'Effective at high dependency levels', 'QT prolongation risk (ECG needed)', 'Cannot drive until stable dose confirmed'] },
              { name: 'Buprenorphine (Subutex/Suboxone)', points: ['Partial agonist — ceiling on opioid effect', 'Lower overdose risk', 'Can be prescribed takeaway doses earlier', 'Can be prescribed by GPs', 'Less sedating', 'Easier to taper and stop'] },
            ].map(med => (
              <div key={med.name} style={{ padding: 16, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{med.name}</div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {med.points.map((p, i) => <li key={i} style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, paddingLeft: 14, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>•</span>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>{faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12 }}>+</span></summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}
        <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[['Heroin addiction help', '/heroin-addiction/london'], ['Opioid substitution therapy', '/opioid-substitution/london'], ['Opiate addiction', '/opiate-addiction/london'], ['Drug detox', '/drug-detox/london']].map(([l, h]) => (
            <Link key={h} href={h} style={{ padding: '9px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, color: 'var(--text)', textDecoration: 'none' }}>{l} →</Link>
          ))}
        </div>
      </div>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 20px', background: 'var(--white)', marginTop: 24 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 16 }}>{[['About', '/about'], ['Editorial policy', '/editorial-policy'], ['Privacy', '/privacy-policy']].map(([l, h]) => <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>)}</div>
        </div>
      </footer>
    </div>
  )
}
