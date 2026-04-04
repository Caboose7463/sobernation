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
  },
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
        <div className="container-wide" style={{ maxWidth: 720 }}>
          <div className="label" style={{ marginBottom: 12 }}>Alcohol Screening Test · WHO AUDIT</div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Am I an Alcoholic?
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 600 }}>
            Take the free <strong>WHO AUDIT</strong> (Alcohol Use Disorders Identification Test) — the clinically validated 10-question screening tool used by GPs and healthcare professionals worldwide. Your result is instant, private, and free. It takes about 2 minutes.
          </p>
          <div style={{ marginTop: 12, padding: '10px 14px', background: '#fef3c7', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#92400e', display: 'inline-block' }}>
            ⚠️ If you drink daily and want to stop, <strong>speak to a doctor first</strong> — stopping suddenly can be dangerous.
          </div>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(260px, 320px)', gap: 40, alignItems: 'start' }}>
          <AlcoholicQuiz />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>AUDIT score guide</h3>
              {[
                { score: '0–7', level: 'Low risk', colour: '#16a34a' },
                { score: '8–15', level: 'Hazardous drinking', colour: '#d97706' },
                { score: '16–19', level: 'Harmful drinking', colour: '#ea580c' },
                { score: '20–40', level: 'Possible dependency', colour: '#dc2626' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.colour, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', minWidth: 40 }}>{r.score}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{r.level}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Related tools & resources</h3>
              {[
                ['Alcohol units calculator', '/alcohol-units-calculator'],
                ['Sobriety counter', '/sobriety-counter'],
                ['Alcohol withdrawal timeline', '/withdrawal-timeline'],
                ['Signs of alcoholism', '/signs-of-alcoholism'],
                ['Find alcohol rehab', '/alcohol-rehab/london'],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'var(--accent)', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  {label} →
                </Link>
              ))}
            </div>

            <div style={{ padding: 16, background: 'var(--crisis)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Need to talk?</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 12, lineHeight: 1.6 }}>Frank's helpline is free, confidential, and available 24 hours a day.</div>
              <a href="tel:03001236600" style={{ display: 'block', textAlign: 'center', padding: '10px 16px', background: '#fff', color: 'var(--crisis)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                0300 123 6600
              </a>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 720, marginTop: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
          {faqs.map((faq, i) => (
            <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
              <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12 }}>+</span>
              </summary>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Alcohol help', '/alcohol-addiction/london'], ['Alcohol rehab', '/alcohol-rehab/london'], ['Units calculator', '/alcohol-units-calculator']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
