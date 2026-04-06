import type { Metadata } from 'next'
import Link from 'next/link'
import AlcoholicQuiz from '../../components/AlcoholicQuiz'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Am I an Alcoholic? | Free Online Alcohol Test (WHO AUDIT) | SoberNation',
  description: 'Am I an alcoholic? Take the free WHO AUDIT alcohol screening test. 10 questions, instant result, clinically validated. Find out if your drinking is low-risk, harmful, or dependent.',
  openGraph: {
    title: 'Am I an Alcoholic? Free Online Alcohol Test',
    description: 'Take the clinically validated WHO AUDIT alcohol test. 10 questions, instant result. Find out if your drinking may be a problem and where to get help.',
    images: [{ url: 'https://www.sobernation.co.uk/api/og?title=Am+I+an+Alcoholic%3F&subtitle=Free+WHO+AUDIT+Screening+Test&type=tool', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Am I an Alcoholic? Free WHO AUDIT Test', description: 'Take the free clinically validated alcohol screening test. Instant result.' },
}

const faqs = [
  { question: 'What is the AUDIT test?', answer: 'The AUDIT (Alcohol Use Disorders Identification Test) was developed by the World Health Organization (WHO) and is the gold-standard screening tool used by GPs and healthcare professionals worldwide to identify harmful alcohol use. It consists of 10 questions covering frequency, quantity, and consequences of drinking. A score of 8 or above suggests harmful or hazardous drinking.' },
  { question: 'What is the difference between an alcoholic and someone with alcohol use disorder?', answer: 'The term "alcoholic" is no longer used clinically — it has been replaced by "Alcohol Use Disorder" (AUD). AUD is a medical condition that exists on a spectrum from mild to severe. You do not need to drink every day, drink in the morning, or have hit "rock bottom" to have an alcohol problem — harmful drinking that affects your life or health qualifies.' },
  { question: 'What score on the AUDIT test is concerning?', answer: 'AUDIT scores are interpreted as follows: 0–7 = low-risk drinking; 8–15 = hazardous drinking (risk of harm); 16–19 = harmful drinking (harm is likely occurring); 20–40 = possible alcohol dependency. However, the test is a screening tool, not a clinical diagnosis — any score that concerns you is worth discussing with your GP.' },
  { question: 'Can I be an alcoholic if I only drink at weekends?', answer: 'Yes. Alcohol use disorder is not defined by the time of day or which days of the week you drink — it is defined by the impact drinking has on your life, your inability to control intake, and physical dependence symptoms. Many people with alcohol problems only drink at weekends but drink to the level of physical dependence or serious harm.' },
  { question: 'What should I do if my AUDIT score is high?', answer: 'Speak to your GP or call Frank (0300 123 6600, free, 24/7) for a confidential conversation about your drinking. NHS alcohol services are free, non-judgemental, and highly effective. If you score in the dependency range, do not stop drinking suddenly without speaking to a doctor first — alcohol withdrawal can be medically dangerous.' },
  { question: 'Is it dangerous to stop drinking suddenly?', answer: 'For light to moderate drinkers, stopping suddenly is generally safe. For people with physical alcohol dependency (daily or near-daily heavy drinking, or withdrawal symptoms like shakes, sweats, or anxiety when not drinking), stopping suddenly can cause potentially fatal seizures. Always speak to a doctor before attempting to stop if you are physically dependent.' },
]

export default function AmIAnAlcoholicPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <style>{`
        .audit-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 40px 20px 32px; }
        .audit-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
          align-items: start;
          padding: 40px 20px 64px;
          max-width: 1060px;
          margin: 0 auto;
        }
        .audit-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .audit-faqs { max-width: 720px; margin: 0 auto; padding: 0 20px 64px; }
        @media (max-width: 768px) {
          .audit-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 24px 16px 48px;
          }
          .audit-sidebar { order: 2; }
          .audit-quiz-col { order: 1; }
          .audit-faqs { padding: 0 16px 48px; }
        }
      `}</style>

      {/* Hero */}
      <section className="audit-hero">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>Alcohol Screening Test · WHO AUDIT</div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Am I an Alcoholic?
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 600 }}>
            Take the free <strong>WHO AUDIT</strong> — the clinically validated 10-question screening tool used by GPs worldwide. Instant result, private, and free. Takes about 2 minutes.
          </p>
          <div style={{ marginTop: 12, padding: '10px 14px', background: '#fef3c7', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#92400e', display: 'inline-block' }}>
            Note: If you drink daily and want to stop, <strong>speak to a doctor first</strong> — stopping suddenly can be dangerous.
          </div>
        </div>
      </section>

      {/* Main grid */}
      <div className="audit-grid">
        <div className="audit-quiz-col">
          <AlcoholicQuiz />
        </div>

        <aside className="audit-sidebar">
          <div style={{ padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>AUDIT score guide</h3>
            {[
              { score: '0–7',   level: 'Low risk',            colour: '#16a34a' },
              { score: '8–15',  level: 'Hazardous drinking',  colour: '#d97706' },
              { score: '16–19', level: 'Harmful drinking',    colour: '#ea580c' },
              { score: '20–40', level: 'Possible dependency', colour: '#dc2626' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.colour, flexShrink: 0 }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', minWidth: 44 }}>{r.score}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{r.level}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Related tools & resources</h3>
            {[
              ['Alcohol units calculator',    '/alcohol-units-calculator'],
              ['Sobriety counter',            '/sobriety-counter'],
              ['Withdrawal timeline',         '/withdrawal-timeline'],
              ['Signs of alcoholism',         '/signs-of-alcoholism'],
              ['How to stop drinking',        '/how-to-stop-drinking'],
              ['Alcohol withdrawal symptoms', '/alcohol-withdrawal-symptoms'],
              ['Find alcohol rehab',          '/alcohol-rehab/london'],
              ['AA meetings near you',        '/aa-meetings/london'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'var(--accent)', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>

          <div style={{ padding: 16, background: 'var(--crisis)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Need to talk now?</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 12, lineHeight: 1.6 }}>Frank is free, confidential and available 24/7.</div>
            <a href="tel:03001236600" style={{ display: 'block', textAlign: 'center', padding: '10px 16px', background: '#fff', color: 'var(--crisis)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Call 0300 123 6600
            </a>
          </div>
        </aside>
      </div>

      {/* FAQs */}
      <div className="audit-faqs">
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
