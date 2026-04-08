/**
 * Shared component for "How long does [drug] stay in your system?" pages
 */
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../lib/seo'
import HelplinesSidebar from './HelplinesSidebar'
import FaqBlock from './FaqBlock'
import Breadcrumb from './Breadcrumb'

export interface DetectionRow {
  method: string
  icon: string
  window: string
  note: string
}

export interface DetectionConfig {
  drug: string                    // "Cannabis"
  drugAdj: string                 // "cannabis"
  slug: string                    // "cannabis"
  headline: string                // "How Long Does Cannabis Stay in Your System?"
  snippet: string                 // 40-60 word answer para (featured snippet target)
  rows: DetectionRow[]
  warning?: string
  relatedSlug: string             // e.g. "cannabis-addiction"
  faqs: Array<{ question: string; answer: string }>
}

const ALL_DRUGS: Array<{ label: string; slug: string }> = [
  { label: 'Cocaine', slug: 'cocaine' },
  { label: 'Heroin', slug: 'heroin' },
  { label: 'Cannabis', slug: 'cannabis' },
  { label: 'MDMA (ecstasy)', slug: 'mdma' },
  { label: 'Ketamine', slug: 'ketamine' },
  { label: 'Alcohol', slug: 'alcohol' },
  { label: 'Diazepam', slug: 'diazepam' },
  { label: 'Tramadol', slug: 'tramadol' },
  { label: 'Amphetamines', slug: 'amphetamine' },
  { label: 'Methamphetamine', slug: 'methamphetamine' },
]

export default function DrugDetectionPage({ config }: { config: DetectionConfig }) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Drug detection times', href: '/how-long-does-cocaine-stay-in-your-system' },
    { name: config.drug, href: `/how-long-does-${config.slug}-stay-in-your-system` },
  ]

  const schemas = [faqSchema(config.faqs), breadcrumbSchema(breadcrumbs)]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide"><div style={{ maxWidth: 680 }}>
          <div className="label" style={{ marginBottom: 12 }}>Drug Information · Detection Times</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {config.headline}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>
            {config.snippet}
          </p>
          {config.warning && (
            <div style={{ display: 'inline-flex', gap: 6, padding: '6px 12px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 20, fontSize: 12, color: '#92400e', fontWeight: 600, marginBottom: 20 }}>
              ⚠️ {config.warning}
            </div>
          )}
        </div></div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                {config.drug} detection windows by test type
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr 1.2fr', background: 'var(--bg-subtle)', padding: '10px 16px', fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <div>Test type</div><div>Detection window</div><div>Notes</div>
                </div>
                {config.rows.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr 1.2fr', padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--bg-subtle)', borderTop: '1px solid var(--border)', alignItems: 'start' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}><span>{row.icon}</span>{row.method}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{row.window}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-light)', lineHeight: 1.5 }}>{row.note}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 8 }}>Estimates only. Individual results vary based on metabolism, body weight, hydration, and frequency of use.</p>
            </div>

            {/* Other drug detection pages */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Detection times for other substances</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ALL_DRUGS.filter(d => d.slug !== config.slug).map(d => (
                  <Link key={d.slug} href={`/how-long-does-${d.slug}-stay-in-your-system`} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {d.label} →
                  </Link>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Frequently asked questions</h2>
            <FaqBlock faqs={config.faqs} />

            <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href={`/${config.relatedSlug}/london`} style={{ padding: '12px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                {config.drug} addiction help →
              </Link>
              <Link href="/withdrawal-timeline" style={{ padding: '12px 20px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                {config.drug} withdrawal timeline →
              </Link>
            </div>
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Withdrawal timeline', '/withdrawal-timeline'], ['Find treatment', '/drug-treatment/london'], ['Get help', '/help/london']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
