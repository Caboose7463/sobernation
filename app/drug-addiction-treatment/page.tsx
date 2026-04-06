import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Drug Addiction Treatment UK | NHS & Private Options | SoberNation',
  description: 'Comprehensive guide to drug addiction treatment in the UK. NHS community services, private residential rehab, detox, counselling, medication-assisted treatment and mutual aid — explained.',
}

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Drug Addiction Treatment', href: '/drug-addiction-treatment' },
]

const faqs = [
  {
    question: 'What drug addiction treatment is available on the NHS?',
    answer: 'NHS drug treatment includes: community drug services (keyworking, group therapy, harm reduction), medically supervised detox at home or in hospital, medication-assisted treatment (methadone, buprenorphine, naltrexone), psychological therapy (CBT, motivational interviewing), and referral to residential rehabilitation. All NHS treatment is free. Call Frank on 0300 123 6600 or contact your GP to self-refer to local services.',
  },
  {
    question: 'How long does drug addiction treatment take?',
    answer: 'Treatment duration varies significantly by substance and severity. Physical detox typically takes 7–21 days depending on the drug. Residential rehabilitation programmes are typically 28 days to 12 weeks. Community treatment is often open-ended — many people engage with drug services for months to years. Recovery is a long-term process, and aftercare and mutual aid (NA, SMART Recovery) are ongoing.',
  },
  {
    question: 'What is the most effective treatment for drug addiction?',
    answer: 'According to NICE guidelines and addiction medicine research, the most effective approaches combine: medically supervised detox if physically dependent; medication-assisted treatment (MAT) for opioid addiction — methadone and buprenorphine have the strongest evidence base; psychological therapy, particularly cognitive behavioural therapy (CBT); and ongoing peer support through groups like NA or SMART Recovery. No single approach works for everyone — a personalised care plan is always recommended.',
  },
  {
    question: 'What is medication-assisted treatment (MAT)?',
    answer: 'Medication-assisted treatment (MAT) uses medications to reduce cravings and withdrawal symptoms, making it easier to stop using drugs. For opioid addiction, methadone and buprenorphine (Subutex) are prescribed by NHS drug services and significantly reduce overdose deaths. For alcohol, Acamprosate and Naltrexone are used. For cocaine and stimulant addiction, there is no approved medication — psychological therapy is the main treatment. MAT is always combined with counselling and support.',
  },
  {
    question: 'How do I access drug addiction treatment without a GP referral?',
    answer: 'You can self-refer directly to most NHS community drug and alcohol services without a GP referral. The easiest route is to call Frank on 0300 123 6600 (free, 24/7) and they will connect you to your nearest NHS drug service. You can also use the Frank service finder at talktofrank.com, or contact your local council\'s drug and alcohol service directly.',
  },
  {
    question: 'Is residential rehab better than community treatment?',
    answer: "Research shows both residential and community treatment can be effective, and the best option depends on your situation. Residential rehab provides an immersive, drug-free environment with 24/7 structured support — it works best for people without a stable home environment, with severe dependency, or who have not responded to community treatment. Community treatment is more accessible, free on the NHS, and allows people to maintain their family and work commitments. Many people benefit from a combination of both.",
  },
]

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Access Drug Addiction Treatment in the UK',
  description: 'Step-by-step guide to accessing drug addiction treatment through the NHS and private services in the UK.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Assess your needs', text: 'Determine whether you need medically supervised detox (if drug-dependent), community drug treatment, residential rehab, or a combination. If unsure, Frank can help assess this over the phone free of charge.' },
    { '@type': 'HowToStep', position: 2, name: 'Contact Frank or your GP', text: 'Call Frank on 0300 123 6600 to be connected to your nearest NHS drug service without a GP referral. Your GP can also assess your needs and refer to specialist services.' },
    { '@type': 'HowToStep', position: 3, name: 'Attend an initial assessment', text: 'NHS drug services will conduct a comprehensive assessment of your substance use, physical health, mental health, and social circumstances, then create a personalised care plan.' },
    { '@type': 'HowToStep', position: 4, name: 'Complete detox if required', text: 'If you are physically dependent on a drug, medically supervised detox with appropriate medication will be arranged first. Do not try to detox alone from opioids or benzodiazepines — it can be medically dangerous.' },
    { '@type': 'HowToStep', position: 5, name: 'Engage with ongoing treatment', text: 'After detox, psychological therapy (CBT), medication-assisted treatment, and peer support (NA, SMART Recovery) are the cornerstones of long-term recovery.' },
  ],
}

export default function DrugAddictionTreatmentPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f1f1a 0%, #1a3d30 100%)', padding: '60px 20px 48px', color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>
            Comprehensive UK Guide · Updated April 2025
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Drug Addiction Treatment: Your Complete UK Guide
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', margin: '0 0 24px', maxWidth: 620 }}>
            From NHS community services to private residential rehab — everything you need to know about getting drug addiction treatment in the UK.
          </p>
          <div style={{ display: 'inline-flex', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, fontSize: 12, color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
            ✚ Medically reviewed by Dr. Sarah Dawson · April 2025
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 20px' }}>
        <div style={{ display: 'grid', gap: '40px' }}>

          {/* Overview */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.01em' }}>Understanding drug addiction treatment</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.85, marginBottom: 12 }}>
              Drug addiction — clinically termed substance use disorder — is a complex medical condition affecting the brain's reward and decision-making systems. It is not a moral failing or a lack of willpower. Effective treatment is available, and recovery is possible for everyone.
            </p>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.85 }}>
              In the UK, drug addiction treatment is provided by NHS community drug services, GP practices, private residential rehabilitation centres, and mutual aid organisations. Most NHS treatment is completely free. Treatment is most effective when it addresses the physical, psychological, and social aspects of addiction.
            </p>
          </section>

          {/* NHS Options */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.01em' }}>NHS drug addiction treatment (free)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'Community drug services', desc: 'The main NHS pathway for drug addiction. Provides keyworking (a dedicated support worker), CBT, group therapy, harm reduction, and medication prescribing. Self-refer via Frank (0300 123 6600) without a GP referral.' },
                { title: 'Medically supervised detox', desc: 'For those physically dependent on opioids, benzodiazepines, or alcohol. Detox is provided in community settings (at home with daily nurse visits) or in hospital. Methadone or Subutex for opioids; chlordiazepoxide or diazepam for alcohol. Always free on the NHS.' },
                { title: 'Medication-assisted treatment (MAT)', desc: 'Methadone and buprenorphine (Subutex) are prescribed for opioid addiction. Both significantly reduce overdose deaths and improve recovery outcomes. Available long-term through NHS drug services. Naltrexone blocks opioid effects and is used post-detox.' },
                { title: 'Psychological therapy', desc: 'NHS drug services offer cognitive behavioural therapy (CBT), motivational interviewing, and contingency management. CBT is the most evidence-based psychological treatment for cocaine, cannabis, and stimulant addiction.' },
                { title: 'Residential rehabilitation (NHS-funded)', desc: 'For people with the most complex needs who have not responded to community treatment, NHS-funded residential rehab placements can be arranged. These are prioritised based on clinical need. Waiting times vary by area.' },
              ].map(item => (
                <div key={item.title} style={{ padding: '16px 18px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Private options */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.01em' }}>Private drug addiction treatment</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.85, marginBottom: 16 }}>
              Private residential rehabilitation offers intensive, immersive treatment in a dedicated facility. Programmes typically last 28 days to 12 weeks and include medically supervised detox, daily therapy, and structured aftercare.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
              {[
                { label: '28-day programme', cost: 'From £3,000–£8,000' },
                { label: '3-month programme', cost: 'From £9,000–£25,000+' },
                { label: 'Outpatient treatment', cost: 'From £1,500–£6,000' },
                { label: 'Online rehab', cost: 'From £800–£2,500' },
              ].map(item => (
                <div key={item.label} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.cost}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#1e40af' }}>
              All private rehab centres listed on SoberNation are CQC-registered and regulated.
              <Link href="/rehab/london" style={{ color: '#1e40af', fontWeight: 600, marginLeft: 6 }}>Find private rehab near you →</Link>
            </div>
          </section>

          {/* How to access */}
          <section style={{ padding: '28px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: '-0.01em' }}>How to access treatment: step by step</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: 1, title: 'Assess your needs', body: 'Physical dependence on opioids or benzodiazepines requires medical supervision. Call Frank (0300 123 6600) if unsure — they will help you understand your options.' },
                { n: 2, title: 'Contact Frank or your GP', body: 'Frank (0300 123 6600 — free, 24/7) can directly refer you to NHS drug services without a GP referral. Your GP can also assess and refer.' },
                { n: 3, title: 'Attend an initial assessment', body: 'Your local NHS drug service will assess your substance use, mental health, and social situation and create a personalised care plan.' },
                { n: 4, title: 'Complete detox if required', body: 'If physically dependent, medically supervised detox with appropriate medication comes first. Never detox alone from opioids or benzodiazepines.' },
                { n: 5, title: 'Engage with ongoing treatment', body: 'CBT, medication-assisted treatment, and peer support (NA, SMART Recovery) are the foundations of long-term recovery.' },
              ].map(step => (
                <div key={step.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{step.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 3 }}>{step.title}</div>
                    <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mutual aid */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.01em' }}>Mutual aid and peer support (free)</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.85, marginBottom: 16 }}>
              Mutual aid groups provide ongoing peer support from people with lived experience of addiction. Research consistently shows regular attendance improves long-term recovery outcomes.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'NA meetings', href: '/na-meetings/london', desc: 'Free, nationwide' },
                { label: 'SMART Recovery', href: '/smart-recovery/london', desc: 'Evidence-based, secular' },
                { label: 'AA meetings', href: '/aa-meetings/london', desc: 'Alcohol-focused' },
                { label: 'Cocaine Anonymous', href: '/cocaine-anonymous/london', desc: 'Cocaine & stimulants' },
              ].map(item => (
                <Link key={item.href} href={item.href} style={{ padding: '10px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{item.label} →</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: '-0.01em' }}>Frequently asked questions</h2>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
              </details>
            ))}
          </section>

          {/* CTA */}
          <div style={{ padding: '28px', background: 'linear-gradient(135deg, #1a6b5a, #2d8a72)', borderRadius: 'var(--radius-md)', color: '#fff' }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Find drug treatment near you</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', marginBottom: 18 }}>
              Use our location search to find CQC-registered drug treatment services in your town or city.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/drug-rehab/london" style={{ padding: '11px 20px', background: '#fff', color: '#1a6b5a', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Find drug rehab →</Link>
              <a href="tel:03001236600" style={{ padding: '11px 20px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Call Frank: 0300 123 6600</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
