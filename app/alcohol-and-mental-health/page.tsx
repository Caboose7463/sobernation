import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Alcohol & Mental Health | Depression, Anxiety & Addiction | SoberNation',
  description: 'The link between alcohol and mental health explained: depression, anxiety, PTSD, and dual diagnosis. How alcohol affects mental health and how to get help with both issues together.',
}

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Alcohol & Mental Health', href: '/alcohol-and-mental-health' },
]

const faqs = [
  {
    question: 'Does alcohol cause depression?',
    answer: 'Yes. Alcohol is a central nervous system depressant that depletes serotonin and dopamine — two neurotransmitters essential for mood. Regular heavy drinking biochemically causes depression and anxiety over time, making pre-existing mental health conditions significantly worse. Many people begin drinking to manage depression or anxiety (self-medication) but find that alcohol makes both conditions worse in the long run.',
  },
  {
    question: 'What is dual diagnosis?',
    answer: 'Dual diagnosis (also called co-occurring disorders or comorbidity) describes when a person experiences both a substance use disorder and a mental health condition simultaneously. Common combinations include alcohol addiction with depression, alcohol addiction with anxiety disorder, drug addiction with PTSD, and stimulant addiction with bipolar disorder. Dual diagnosis requires integrated treatment that addresses both conditions at the same time — treating only one is rarely effective.',
  },
  {
    question: 'How do I know if my mental health problems are caused by alcohol?',
    answer: 'A reliable way to assess this is to stop drinking for 4–8 weeks under medical supervision and see whether mental health symptoms improve. Many people find that depression and anxiety substantially improve after 4–8 weeks of abstinence as brain chemistry begins to normalise. If symptoms persist after a prolonged period of sobriety, an independent mental health diagnosis is recommended. Always speak to your GP about both issues simultaneously.',
  },
  {
    question: 'Can I get treatment for both addiction and mental health together?',
    answer: 'Yes — and this is actually the recommended approach. Dual diagnosis treatment addresses both conditions simultaneously through NHS community mental health and drug/alcohol services, specialist dual diagnosis teams, inpatient psychiatric units, and many private rehabilitation centres. Treating addiction without addressing mental health (or vice versa) results in much higher relapse rates. Ask your GP or Frank about dual diagnosis services in your area.',
  },
  {
    question: 'What happens to your brain when you stop drinking?',
    answer: 'During the first week of stopping, the brain begins to rebalance its neurotransmitter systems, particularly GABA and glutamate (which is why withdrawal can cause anxiety, tremors, and seizures in heavy drinkers). Over weeks to months, serotonin and dopamine systems begin to recover. Sleep improves, mood stabilises, anxiety reduces, and cognitive function sharpens. Brain volume lost through heavy drinking can partially recover within 6–12 months of sustained abstinence.',
  },
]

export default function AlcoholMentalHealthPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '60px 20px 48px', color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>
            Mental Health · Addiction · Dual Diagnosis
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Alcohol & Mental Health: The Link Explained
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', margin: '0 0 24px', maxWidth: 600 }}>
            How alcohol affects depression, anxiety, and mental health — and how to get help when they occur together.
          </p>
          <div style={{ display: 'inline-flex', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            ✚ Medically reviewed by Dr. Sarah Dawson · April 2025
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 20px' }}>
        <div style={{ display: 'grid', gap: '40px' }}>

          {/* Core link */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>The alcohol–mental health cycle</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.85, marginBottom: 14 }}>
              Alcohol and mental health are deeply intertwined. Around 85% of people seeking help for alcohol problems have a co-occurring mental health condition. The two conditions reinforce each other in a cycle that is difficult to escape without addressing both at the same time.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {[
                { title: 'Alcohol worsens mental health', body: 'Regular heavy drinking depletes serotonin (the mood-regulating neurotransmitter), worsening depression and anxiety. The \"hangover\" period (glutamate rebound) causes intense anxiety — often called \"hangxiety\".' },
                { title: 'Mental health drives drinking', body: 'Many people drink to self-medicate anxiety, depression, trauma, or stress. Alcohol provides short-term relief but worsens the underlying condition, creating dependency.' },
                { title: 'The cycle', body: 'Increased drinking worsens mental health → mental health distress triggers more drinking → dependency develops alongside worsening psychiatric symptoms.' },
              ].map(item => (
                <div key={item.title} style={{ padding: '16px 18px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dual diagnosis */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>Dual diagnosis: alcohol and mental health together</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.85, marginBottom: 14 }}>
              Dual diagnosis — the co-occurrence of addiction and a mental health condition — is extremely common and requires specialist integrated treatment. The most frequent combinations with alcohol include:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { condition: 'Alcohol + Depression', prev: '35–40% of alcohol-dependent people', note: 'Often under-diagnosed — depression symptoms can be masked by alcohol use. Stopping drinking often substantially improves depression.' },
                { condition: 'Alcohol + Anxiety disorders', prev: '~25% of people with alcohol use disorder', note: 'GAD, panic disorder, and social anxiety are all highly correlated with heavy drinking. Alcohol is frequently used to self-medicate.' },
                { condition: 'Alcohol + PTSD', prev: 'Up to 52% of people with PTSD misuse alcohol', note: 'Trauma frequently underlies alcohol dependency. Trauma-focused therapy is essential alongside addiction treatment.' },
                { condition: 'Alcohol + Bipolar disorder', prev: '50–60% of people with bipolar disorder', note: 'Alcohol dramatically destabilises mood in bipolar disorder and reduces the effectiveness of mood stabilisers.' },
              ].map(item => (
                <div key={item.condition} style={{ padding: '14px 18px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px 16px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{item.condition}</div>
                  <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap' }}>{item.prev}</div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0, gridColumn: '1/-1' }}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Getting help */}
          <section style={{ padding: '28px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Getting help for both issues</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { step: '1', title: 'Tell your GP about both', body: 'Inform your GP about both your alcohol use and your mental health symptoms. Treating them separately is rarely effective — ask about integrated dual diagnosis services.' },
                { step: '2', title: 'Contact Frank or a drug service', body: 'Frank (0300 123 6600) can refer you to dual diagnosis specialists in your area. Many NHS drug and alcohol services have embedded mental health supports.' },
                { step: '3', title: 'Consider residential rehab', body: 'Many private rehab centres now specialise in dual diagnosis, offering integrated psychiatric assessment, trauma therapy, addiction treatment, and CBT in one programme.' },
                { step: '4', title: 'Join a support group', body: 'AA, SMART Recovery, and mental health peer support groups (such as Rethink) all offer community support that complements clinical treatment.' },
              ].map(item => (
                <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#312e81', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{item.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 3 }}>{item.title}</div>
                    <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
              </details>
            ))}
          </section>

          {/* Related links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              ['Dual diagnosis treatment', '/dual-diagnosis/london'],
              ['Alcohol rehab near you', '/alcohol-rehab/london'],
              ['How to stop drinking', '/how-to-stop-drinking'],
              ['Signs of alcoholism', '/signs-of-alcoholism'],
              ['Alcohol withdrawal', '/alcohol-withdrawal-symptoms'],
              ['AA meetings', '/aa-meetings/london'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>
                {label} →
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
