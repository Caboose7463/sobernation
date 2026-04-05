import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'How to Stop Drinking Alcohol | Free UK Guide | SoberNation',
  description: 'How to stop drinking alcohol: step-by-step guide for the UK. Safe withdrawal, NHS support, medication options, AA, SMART Recovery and long-term sobriety strategies.',
}

const faqs = [
  { question: 'Is it safe to stop drinking alcohol suddenly?', answer: 'If you drink heavily every day and are physically dependent on alcohol, stopping suddenly without medical supervision can cause life-threatening seizures (usually 24–48 hours after the last drink) and delirium tremens (DTs). Never attempt to stop cold turkey if you are physically dependent. Call your GP or Frank (0300 123 6600) first. For light to moderate drinkers who are not physically dependent, gradual reduction or stopping is generally safe.' },
  { question: 'What is the first step to stopping drinking?', answer: 'The first step is speaking to your GP or calling Frank (0300 123 6600, free, 24/7). A brief assessment will identify whether you need medically supervised detox, community alcohol treatment, or another form of support. You do not need to have "hit rock bottom" — help is available at any stage.' },
  { question: 'What NHS help is available to stop drinking?', answer: 'NHS support includes: medically supervised alcohol detox (free, at home or residential), community drug and alcohol treatment (keyworking, CBT, group therapy), medication to reduce cravings (Acamprosate/Campral, Naltrexone), brief alcohol interventions through your GP, and referral to mutual aid (AA, SMART Recovery).' },
  { question: 'What medication helps you stop drinking?', answer: 'Acamprosate (Campral) reduces the psychological craving for alcohol and is most effective when started immediately after detox. Naltrexone blocks the rewarding effects of alcohol and reduces the urge to drink. Disulfiram (Antabuse) causes unpleasant reactions if you drink and acts as a deterrent. All are available on NHS prescription.' },
  { question: 'Does AA work for stopping drinking?', answer: 'AA is one of the most effective peer-support approaches for maintaining sobriety after treatment. Research shows regular AA attendance significantly improves long-term abstinence rates. AA is free, available across the UK, and involves no professional registration. It is not suitable for everyone — SMART Recovery offers a secular, evidence-based alternative.' },
  { question: 'What are the benefits of stopping drinking?', answer: 'Within 24 hours: heart rate normalises. Within a week: sleep improves, hydration recovers. Within a month: liver function improves, skin clears, anxiety reduces. Within 3 months: liver begins to repair, blood pressure normalises. Within a year: cancer risk reduces significantly, mental health substantially improves. Long-term: dramatically reduced risk of liver disease, cancer, heart disease, and death.' },
]

const STEPS = [
  { n: 1, title: 'Decide whether you need medical detox first', body: 'If you drink daily and experience withdrawal symptoms (shakes, sweats, anxiety in the morning), you need medical supervision before stopping. Call your GP or Frank (0300 123 6600). Never try to stop cold turkey if physically dependent — alcohol withdrawal can cause fatal seizures.', urgent: true },
  { n: 2, title: 'Tell your GP or call Frank', body: 'Your GP can assess your dependency level and refer you to local alcohol services. Alternatively, call Frank on 0300 123 6600 (free, 24/7) to self-refer directly to your nearest NHS alcohol treatment service. You do not need a GP referral to access most services.', urgent: false },
  { n: 3, title: 'Complete a medically supervised detox (if needed)', body: 'NHS community detox (at home, with daily medical supervision and chlordiazepoxide medication) is free and available for most people who are physically dependent. Residential detox is available for those with severe dependency.', urgent: false },
  { n: 4, title: 'Access psychological support', body: 'After detox, CBT (Cognitive Behavioural Therapy) and motivational interviewing address the psychological reasons for drinking. Free through NHS alcohol services. Private alcohol counsellors are also available at £50–£120/session.', urgent: false },
  { n: 5, title: 'Consider medication to reduce cravings', body: 'Ask your GP or alcohol service about Acamprosate (Campral) or Naltrexone. Both are evidence-based medications that significantly reduce cravings and the risk of relapse. Available free on NHS prescription.', urgent: false },
  { n: 6, title: 'Join AA or SMART Recovery', body: 'AA meetings are free and available across the UK — search for local meetings at alcoholics-anonymous.org.uk. SMART Recovery offers a secular evidence-based alternative. Nalmefene (Selincro) can help moderate rather than stop completely for non-dependent drinkers.', urgent: false },
  { n: 7, title: 'Build a long-term aftercare plan', body: 'Recovery is ongoing. A good aftercare plan includes: regular counselling, regular AA or SMART meetings, medication review, sober social activities, connection to peers in recovery, and a relapse response plan. Most relapses occur in the first year.', urgent: false },
]

export default function HowToQuitAlcoholPage() {
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
      <div style={{ background: '#fef3c7', padding: '10px 20px', textAlign: 'center', fontSize: 14, color: '#92400e', borderBottom: '1px solid #fde68a' }}>
        ⚠️ If you drink heavily every day — <strong>do not stop suddenly without medical advice.</strong> Call your GP or Frank (0300 123 6600) first.
      </div>
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '40px 20px' }}>
        <div className="container-wide" style={{ maxWidth: 720 }}>
          <div className="label" style={{ marginBottom: 12 }}>Step-by-step guide · UK</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-0.02em' }}>How to Stop Drinking Alcohol</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640 }}>
            The safest way to stop drinking depends on how much you drink and whether your body is physically dependent. <strong>If you drink daily, you may need a medically supervised detox</strong> — stopping suddenly can be dangerous. This guide walks you through the steps to stop drinking safely in the UK, with all the free resources available.
          </p>
        </div>
      </section>
      <div className="container-wide" style={{ padding: '40px 20px', maxWidth: 760 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--white)', border: `1px solid ${s.urgent ? '#fecaca' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${s.urgent ? '#dc2626' : 'var(--accent)'}` }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.urgent ? '#dc2626' : 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{s.n}</div>
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>UK free resources for stopping drinking</h3>
          {[
            ['Frank helpline (free, 24/7)', '0300 123 6600', 'tel:03001236600'],
            ['Alcoholics Anonymous UK', 'alcoholics-anonymous.org.uk', 'https://www.alcoholics-anonymous.org.uk'],
            ['SMART Recovery UK', 'smartrecovery.org.uk', 'https://www.smartrecovery.org.uk'],
            ['Drinkaware tools', 'drinkaware.co.uk', 'https://www.drinkaware.co.uk'],
            ['Al-Anon (for families)', 'al-anonuk.org.uk', 'https://www.al-anonuk.org.uk'],
          ].map(([label, display, href]) => (
            <div key={href} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
              <a href={href} target={href.startsWith('tel') ? undefined : '_blank'} rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>{display}</a>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>{faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12 }}>+</span></summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}
        <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[['Alcohol detox', '/alcohol-detox/london'], ['Am I an alcoholic?', '/am-i-an-alcoholic'], ['Signs of alcoholism', '/signs-of-alcoholism'], ['Alcohol withdrawal', '/alcohol-withdrawal-symptoms'], ['Alcohol rehab', '/alcohol-rehab/london'], ['AA meetings', '/aa-meetings/london'], ['Al-Anon (for families)', '/al-anon/london']].map(([l, h]) => (
            <Link key={h} href={h} style={{ padding: '9px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, color: 'var(--text)', textDecoration: 'none' }}>{l} →</Link>
          ))}
        </div>

        {/* Sobriety counter CTA */}
        <div style={{ marginTop: 32, padding: 24, background: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Track your sobriety from day one</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
            Once you have stopped drinking, use our free sobriety calculator to count your days, weeks, and months alcohol-free.
          </div>
          <Link href="/sobriety-counter" style={{ display: 'inline-block', padding: '10px 18px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Start counting →
          </Link>
        </div>
      </div>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 20px', background: 'var(--white)', marginTop: 24 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[['Alcohol rehab', '/alcohol-rehab/london'], ['AA meetings', '/aa-meetings/london'], ['About', '/about'], ['Editorial policy', '/editorial-policy'], ['Privacy', '/privacy-policy']].map(([l, h]) => <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>)}
          </div>
        </div>
      </footer>
    </div>
  )
}
