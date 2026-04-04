import Link from 'next/link'
import type { Metadata } from 'next'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'
import HelplinesSidebar from '../../components/HelplinesSidebar'
import FaqBlock from '../../components/FaqBlock'
import Breadcrumb from '../../components/Breadcrumb'

export const metadata: Metadata = {
  title: 'How Long Does Cocaine Stay in Your System? | Detection Times UK',
  description: 'Cocaine stays in urine for 2–4 days (up to 10 days for heavy users). Blood: 12 hours. Hair: 90 days. Full UK guide to cocaine detection windows and drug testing.',
  openGraph: { title: 'How Long Does Cocaine Stay in Your System?', description: 'Complete guide to cocaine detection times: urine, blood, hair, saliva. UK drug testing explained.' },
}

const faqs = [
  { question: 'How long does cocaine stay in your urine?', answer: 'Cocaine metabolites are typically detectable in urine for 2–4 days after a single use. For heavy or chronic cocaine users, urine can test positive for up to 10 days or longer. Urine testing is the most common form of drug testing in the UK.' },
  { question: 'How long does cocaine stay in your blood?', answer: 'Cocaine itself clears from the blood very quickly — typically within 4–12 hours of use. However, cocaine metabolites (particularly benzoylecgonine) can be detected in blood for up to 48 hours in heavy users. Blood tests are most useful for detecting very recent use.' },
  { question: 'How long does cocaine stay in your hair?', answer: 'Hair follicle testing can detect cocaine use for up to 90 days (3 months). A standard hair sample tested is approximately 3.9 cm (1.5 inches), which corresponds to roughly 90 days of growth. Hair tests cannot detect very recent use (within the last 5–7 days).' },
  { question: 'How long does cocaine stay in your saliva?', answer: 'Cocaine is detectable in saliva (oral fluid) for approximately 1–2 days after use. Roadside drug tests used by UK police typically use saliva swabs and can detect cocaine for up to 24–48 hours after use.' },
  { question: 'What factors affect how long cocaine stays in your system?', answer: 'Key factors include: frequency of use (occasional vs daily), quantity used per session, method of use (snorting, smoking crack, injecting), individual metabolism, body mass, hydration levels, and kidney and liver function. Heavy users will always retain detectable metabolites for longer.' },
  { question: 'Can you speed up cocaine leaving your system?', answer: 'No proven method significantly accelerates cocaine clearance. Staying well hydrated, eating nutritious food, and resting all support your body\'s natural metabolism. "Detox" drinks and products sold for this purpose are not clinically proven to work and may be dangerous. The only reliable method is time.' },
  { question: 'What does a UK roadside cocaine test detect?', answer: 'UK Police use the Dräger DrugTest 5000 device, which tests saliva for cocaine (and other drugs) at the roadside. It can detect cocaine within minutes and can identify use within the last 24–48 hours. If positive, a blood sample will be taken for laboratory confirmation.' },
  { question: 'What is the legal limit for cocaine when driving?', answer: 'In England and Wales, the legal limit for cocaine (benzoylecgonine) when driving is 50 micrograms per litre of blood — effectively zero tolerance. Scotland has a stricter regime. Driving with cocaine in your system is a criminal offence carrying a minimum 12-month driving ban and up to 6 months in prison.' },
]

const DETECTION_TIMES = [
  { method: 'Urine', window: '2–4 days (up to 10 days for heavy users)', icon: '💧', note: 'Most common UK workplace drug test' },
  { method: 'Blood', window: '4–12 hours (up to 48 hours for heavy users)', icon: '🩸', note: 'Used for confirmed roadside or A&E tests' },
  { method: 'Saliva', window: '1–2 days', icon: '🦷', note: 'UK roadside police drug testing' },
  { method: 'Hair', window: 'Up to 90 days', icon: '💇', note: 'Cannot detect use within last 5–7 days' },
  { method: 'Sweat', window: 'Up to 14 days', icon: '💦', note: 'Less common; used in some probation testing' },
]

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Drug detection times', href: '/how-long-does-cocaine-stay-in-your-system' },
  { name: 'Cocaine', href: '/how-long-does-cocaine-stay-in-your-system' },
]

export default function CocaineDetectionPage() {
  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <a href="tel:03001236600" style={{ fontSize: 13, background: 'var(--crisis)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>Help: 0300 123 6600</a>
        </div>
      </nav>
      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide"><div style={{ maxWidth: 680 }}>
          <div className="label" style={{ marginBottom: 12 }}>Drug Information · Detection Times</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            How Long Does Cocaine Stay in Your System?
          </h1>
          {/* SNIPPET TARGET */}
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>
            Cocaine stays in urine for <strong>2–4 days</strong> after a single use (up to 10 days for heavy users). In blood, cocaine clears within <strong>4–12 hours</strong>. Saliva tests detect cocaine for <strong>1–2 days</strong>, and hair follicle tests can identify use for up to <strong>90 days</strong>. These windows vary significantly based on individual metabolism and frequency of use.
          </p>
          <div style={{ display: 'inline-flex', gap: 6, padding: '6px 12px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 20, fontSize: 12, color: '#92400e', fontWeight: 600, marginBottom: 20 }}>
            ⚠️ Driving with cocaine in your system is a criminal offence in the UK
          </div>
        </div></div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            {/* Detection time table */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Cocaine detection windows by test type</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: 0, background: 'var(--bg-subtle)', padding: '10px 16px', fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <div>Test type</div><div>Detection window</div><div>Notes</div>
                </div>
                {DETECTION_TIMES.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: 0, padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--bg-subtle)', borderTop: '1px solid var(--border)', alignItems: 'start' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}><span>{row.icon}</span>{row.method}</div>
                    <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 700 }}>{row.window}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-light)', lineHeight: 1.5 }}>{row.note}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 8 }}>Detection windows are estimates. Individual results vary based on metabolism, body weight, hydration, and frequency of use.</p>
            </div>

            {/* Factors section */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>What affects how long cocaine stays in your system?</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {[
                  { label: 'Frequency of use', detail: 'Occasional users clear cocaine faster; daily users build up metabolites', icon: '📅' },
                  { label: 'Amount used', detail: 'Higher doses take longer to metabolise fully', icon: '⚖️' },
                  { label: 'Method of use', detail: 'Injecting or smoking (crack) delivers higher blood levels', icon: '💉' },
                  { label: 'Metabolism', detail: 'Faster metabolisms clear cocaine more quickly', icon: '⚡' },
                  { label: 'Body composition', detail: 'Higher body fat may retain metabolites longer', icon: '🧬' },
                  { label: 'Liver & kidney health', detail: 'These organs process and excrete cocaine metabolites', icon: '🫀' },
                ].map((f, i) => (
                  <div key={i} style={{ padding: 14, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: 18, marginBottom: 6 }}>{f.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related detection pages */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Detection times for other substances</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  ['Heroin', '/how-long-does-heroin-stay-in-your-system'],
                  ['Cannabis', '/how-long-does-cannabis-stay-in-your-system'],
                  ['MDMA (ecstasy)', '/how-long-does-mdma-stay-in-your-system'],
                  ['Ketamine', '/how-long-does-ketamine-stay-in-your-system'],
                  ['Alcohol', '/how-long-does-alcohol-stay-in-your-system'],
                  ['Diazepam', '/how-long-does-diazepam-stay-in-your-system'],
                  ['Tramadol', '/how-long-does-tramadol-stay-in-your-system'],
                  ['Amphetamines', '/how-long-does-amphetamine-stay-in-your-system'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>{label} →</Link>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Frequently asked questions</h2>
            <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />

            <div style={{ marginTop: 28 }}>
              <Link href="/cocaine-addiction/london" style={{ display: 'inline-block', padding: '12px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none', marginRight: 10 }}>Cocaine addiction help →</Link>
              <Link href="/drug-treatment/london" style={{ display: 'inline-block', padding: '12px 20px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Find drug treatment →</Link>
            </div>
          </div>
          <HelplinesSidebar />
        </div>
      </div>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Withdrawal timeline', '/withdrawal-timeline'], ['Cocaine help', '/cocaine-addiction/london'], ['Find rehab', '/rehab/london']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
