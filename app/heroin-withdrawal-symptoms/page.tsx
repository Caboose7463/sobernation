import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Heroin Withdrawal Symptoms | Timeline & Treatment | SoberNation',
  description: 'Heroin withdrawal symptoms explained: onset, timeline, what to expect, and how to manage safely. Free NHS heroin detox available — call Frank 0300 123 6600.',
}

const faqs = [
  { question: 'When do heroin withdrawal symptoms start?', answer: 'Heroin withdrawal symptoms typically begin 6–12 hours after the last dose (or sooner for very heavy users). Short-acting opioids like heroin and codeine cause earlier onset of withdrawal than longer-acting opioids like methadone (24–36 hours onset) or buprenorphine (36–48 hours onset).' },
  { question: 'How long does heroin withdrawal last?', answer: 'Acute heroin withdrawal peaks at 36–72 hours after the last dose and the worst physical symptoms typically resolve within 5–7 days. However, post-acute withdrawal syndrome (PAWS) — including fatigue, sleep disruption, mood instability, and psychological cravings — can persist for weeks or months. Sleep disruption is particularly persistent and can continue for 3–6 months.' },
  { question: 'Is heroin withdrawal dangerous?', answer: 'Unlike alcohol or benzodiazepine withdrawal, heroin withdrawal is rarely directly fatal. However, it is severely unpleasant — making unassisted cessation extremely difficult — and the period after stopping is very high risk for overdose. People who relapse after a period of abstinence (even a short detox) have reduced tolerance and frequently overdose fatally on their previous dose. Medical supervision significantly reduces this risk.' },
  { question: 'What is the best medication for heroin withdrawal?', answer: 'Buprenorphine (Subutex) is widely considered the most effective medication for managing heroin withdrawal — it significantly reduces withdrawal severity by partially activating opioid receptors. Lofexidine (Lucemyra) reduces autonomic withdrawal symptoms like sweating, cramps, and insomnia. Methadone on a reducing dose is also effective. All are available free through NHS drug treatment services.' },
  { question: 'Can I detox from heroin at home?', answer: 'Community heroin detox — where you remain at home while receiving daily clinical supervision and medication — is available free through NHS drug services. This is different from attempting to detox alone at home without support, which is very difficult and carries significant overdose risk if you relapse. Always access proper medical support before attempting heroin detox.' },
  { question: 'What does heroin withdrawal feel like?', answer: 'Heroin withdrawal has been described as a severe flu combined with extreme psychological distress. Physically: severe muscle cramps and bone aches, goosebumps ("cold turkey" origin), sweating and chills, nausea, vomiting and diarrhoea, insomnia, yawning, watering eyes and nose, dilated pupils. Psychologically: intense anxiety, agitation, dysphoria, and overwhelming cravings.' },
]

const PHASES = [
  { time: '6–12 hours', label: 'Early', colour: '#d97706', symptoms: ['Anxiety and restlessness', 'Yawning', 'Watering eyes and runny nose', 'Sweating', 'Muscle aches beginning'] },
  { time: '12–36 hours', label: 'Building', colour: '#ea580c', symptoms: ['Severe muscle and bone pain', 'Goosebumps and chills', 'Nausea and vomiting', 'Diarrhoea and stomach cramps', 'Insomnia', 'Dilated pupils', 'Intense cravings'] },
  { time: '36–72 hours', label: 'Peak', colour: '#dc2626', symptoms: ['All above symptoms at maximum intensity', 'Extreme agitation and anxiety', 'Complete inability to sleep', 'Severe vomiting and diarrhoea', 'Profound psychological distress', 'Overwhelming cravings'] },
  { time: '5–7 days', label: 'Resolving', colour: '#16a34a', symptoms: ['Physical symptoms begin to ease', 'Appetite gradually returning', 'Sleep beginning to improve', 'Psychological symptoms may persist', 'PAWS (post-acute withdrawal) begins'] },
]

export default function HeroinWithdrawalPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '40px 20px' }}>
        <div className="container-wide" style={{ maxWidth: 720 }}>
          <div className="label" style={{ marginBottom: 12 }}>Heroin Withdrawal · Clinical Guide</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-0.02em' }}>Heroin Withdrawal Symptoms, Timeline & Treatment</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640 }}>
            Heroin withdrawal symptoms begin <strong>6–12 hours after the last dose</strong> and peak at 36–72 hours. They include severe muscle pain, nausea, vomiting, sweating, insomnia, and intense cravings. While rarely directly fatal, heroin withdrawal is severely uncomfortable and almost always leads to relapse without medical support. <strong>Free NHS heroin detox is available</strong> — call Frank on 0300 123 6600.
          </p>
        </div>
      </section>
      <div className="container-wide" style={{ padding: '40px 20px', maxWidth: 760 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Heroin withdrawal timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {PHASES.map((p, i) => (
            <div key={i} style={{ display: 'flex', overflow: 'hidden', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ width: 6, flexShrink: 0, background: p.colour }} />
              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{p.time}</span>
                  <span style={{ padding: '3px 10px', borderRadius: 20, background: p.colour, color: '#fff', fontSize: 12, fontWeight: 700 }}>{p.label}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {p.symptoms.map((s, j) => <li key={j} style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', gap: 8, lineHeight: 1.5 }}><span style={{ color: p.colour, flexShrink: 0, fontWeight: 700 }}>•</span>{s}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 20, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', marginBottom: 40, fontSize: 14, color: '#1e40af' }}>
          <strong>Get help now:</strong> Free NHS heroin detox — including buprenorphine medication — is available by calling Frank on <a href="tel:03001236600" style={{ color: '#1e40af', fontWeight: 700 }}>0300 123 6600</a>. The period after completing detox carries high overdose risk — ongoing treatment is essential.
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>{faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12 }}>+</span></summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}
        <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[['Heroin detox', '/heroin-detox/london'], ['Heroin addiction help', '/heroin-addiction/london'], ['What is methadone?', '/what-is-methadone'], ['Drug detox', '/drug-detox/london']].map(([l, h]) => (
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
