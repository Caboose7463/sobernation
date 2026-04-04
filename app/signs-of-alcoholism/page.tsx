import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Signs of Alcoholism | 15 Warning Signs of Alcohol Addiction | SoberNation',
  description: 'What are the signs of alcoholism? 15 clinical warning signs of alcohol addiction explained. Find out how to recognise alcohol use disorder in yourself or a loved one.',
}

const SIGNS = [
  { n: 1, sign: 'Drinking more than intended', detail: 'Starting with "just one or two" but consistently drinking much more. An inability to stop at a planned amount is one of the clearest signs of loss of control over drinking.' },
  { n: 2, sign: 'Repeated failed attempts to cut down', detail: 'Saying you will cut back, making rules about drinking ("only weekends", "never before 6pm"), and repeatedly breaking them despite genuine efforts to stop or reduce.' },
  { n: 3, sign: 'Spending a lot of time obtaining, drinking, or recovering from alcohol', detail: 'Significant parts of the day are spent thinking about alcohol, drinking, or recovering from its effects. Work, relationships, and hobbies are increasingly pushed aside.' },
  { n: 4, sign: 'Strong cravings or urges to drink', detail: 'An intense preoccupation with alcohol, particularly when sober. Thinking about drinking to avoid thinking about something else. Feeling unable to relax or socialise without alcohol.' },
  { n: 5, sign: 'Failing to fulfil major responsibilities', detail: 'Alcohol causing problems at work (lateness, poor performance, absence), at home (neglecting children, household responsibilities), or in education. Prioritising drinking over obligations.' },
  { n: 6, sign: 'Continuing to drink despite relationship problems', detail: 'Drinking despite arguments, separation threats, or explicit concerns from family members. Choosing alcohol over important relationships — even knowing the consequences.' },
  { n: 7, sign: 'Giving up activities you once enjoyed', detail: 'Withdrawing from hobbies, sports, social activities, or friendships because they interfere with drinking, or because alcohol has reduced capacity for interest in other things.' },
  { n: 8, sign: 'Drinking in physically dangerous situations', detail: 'Driving while over the limit, drinking while caring for children, drinking with medication that carries warnings against alcohol, or drinking despite a medical condition made worse by alcohol.' },
  { n: 9, sign: 'Continuing despite knowing alcohol is causing health problems', detail: 'Awareness that drinking is damaging physical or mental health, yet being unable to stop. Continuing to drink after a diagnosis of liver disease, pancreatitis, depression, or other alcohol-related conditions.' },
  { n: 10, sign: 'Tolerance — needing more alcohol to get the same effect', detail: 'Needing significantly more alcohol than you did previously to feel drunk, or finding that your previous amount no longer has the same effect. Tolerance is a key sign of physical adaptation to alcohol.' },
  { n: 11, sign: 'Withdrawal symptoms when not drinking', detail: 'Experiencing physical or psychological symptoms when not drinking or after cutting down: tremors/shakes, sweating, nausea, anxiety, insomnia, headaches, or in severe cases, seizures. These indicate physical dependency.' },
  { n: 12, sign: 'Drinking first thing in the morning', detail: 'Needing alcohol in the morning to feel normal, stop shaking, or function. This is a sign of significant physical dependency and usually requires medically supervised detox.' },
  { n: 13, sign: 'Blackouts — memory loss when drinking', detail: 'Regularly experiencing periods of memory loss (blackouts) during or after drinking, not remembering conversations, events, or how you got home. Blackouts indicate very high blood alcohol levels and significant brain impact.' },
  { n: 14, sign: 'Hiding drinking or lying about amounts', detail: 'Concealing how much you drink from partners, family, or doctors. Hiding bottles, drinking before social events to disguise how much you drink there, or significantly downplaying your intake when asked.' },
  { n: 15, sign: 'Using alcohol to cope with emotions or stress', detail: 'Routinely drinking to manage anxiety, depression, stress, loneliness, boredom, or trauma. While this provides temporary relief, it reinforces the dependency cycle and often worsens the underlying emotional problems.' },
]

const faqs = [
  { question: 'What are the early signs of alcoholism?', answer: 'Early signs of alcoholism include: regularly drinking more than planned, thinking about alcohol frequently, using alcohol to cope with stress or emotions, needing more alcohol to get the same effect (tolerance), and feeling irritable or anxious when you haven\'t had a drink. At this stage, the dependency may not be physical, but the psychological patterns are forming.' },
  { question: 'What is the difference between problem drinking and alcoholism?', answer: 'Problem drinking (harmful or hazardous drinking) causes harm but may not involve physical dependency. Alcoholism (severe alcohol use disorder) involves physical dependency — the body needs alcohol to function normally, and withdrawal causes physical symptoms. Both are treatable, and both deserve support. You don\'t need to be physically addicted for your drinking to be a problem.' },
  { question: 'Can someone be a high-functioning alcoholic?', answer: 'Yes. Many people with serious alcohol problems maintain careers, family lives, and social appearances while drinking heavily. "High-functioning alcoholism" often means the consequences are not yet externally visible — but the internal physical, psychological, and relationship damage still accumulates. Many people in this category have very high tolerance, masking how much they actually drink.' },
  { question: 'How do I know if I need medical help with alcohol?', answer: 'If you experience physical withdrawal symptoms when not drinking (shakes, sweats, anxiety, nausea), it is essential to seek medical help before trying to stop. Severe alcohol withdrawal can cause seizures and is potentially fatal. Call Frank (0300 123 6600) or your GP immediately. Do not try to stop cold turkey if you are physically dependent.' },
]

export default function SignsOfAlcoholismPage() {
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
          <div className="label" style={{ marginBottom: 12 }}>Alcohol Addiction · Warning Signs</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Signs of Alcoholism: 15 Warning Signs of Alcohol Addiction
          </h1>
          {/* Featured snippet paragraph */}
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640 }}>
            The key signs of alcoholism (alcohol use disorder) include: drinking more than intended, failed attempts to cut down, drinking despite health or relationship consequences, physical withdrawal symptoms when not drinking, and needing a drink in the morning. If you recognise these signs in yourself or someone you love, free help is available across the UK — call Frank on <strong>0300 123 6600</strong> (free, 24/7).
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <Link href="/am-i-an-alcoholic" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Take the alcoholism test →
            </Link>
            <a href="tel:03001236600" style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Call Frank free: 0300 123 6600
            </a>
          </div>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px', maxWidth: 760 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {SIGNS.map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 16, padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                {s.n}
              </div>
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.sign}</h2>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: 24, background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', marginBottom: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#92400e', marginBottom: 10 }}>⚠️ Do not stop drinking suddenly without medical advice</h3>
          <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
            If you drink heavily daily and are physically dependent on alcohol, stopping suddenly can cause life-threatening seizures. Always speak to your GP or call Frank (0300 123 6600) before attempting to stop. A medically supervised detox is available free on the NHS.
          </p>
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

        <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[['Find alcohol rehab near you', '/alcohol-rehab/london'], ['Am I an alcoholic? Take the test', '/am-i-an-alcoholic'], ['Al-Anon for families', '/al-anon/london'], ['Alcohol units calculator', '/alcohol-units-calculator']].map(([l, h]) => (
            <Link key={h} href={h} style={{ padding: '10px 16px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 20, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{l} →</Link>
          ))}
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
        </div>
      </footer>
    </div>
  )
}
