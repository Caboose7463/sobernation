/**
 * Shared template for support group location pages
 * Used by: Al-Anon, SMART Recovery, Cocaine Anonymous, Narcotics Anonymous (standalone)
 */
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../lib/seo'
import HelplinesSidebar from './HelplinesSidebar'
import FaqBlock from './FaqBlock'
import Breadcrumb from './Breadcrumb'

export interface SupportGroupConfig {
  slug: string                         // 'al-anon'
  name: string                         // 'Al-Anon'
  tagline: string                      // 'Support for families of alcoholics'
  type: 'family' | 'recovery' | 'mixed'
  intro: string                        // 2–3 sentence paragraph
  whoFor: string                       // who attends
  whatHappens: string                  // what happens at a meeting
  cost: string                         // 'Free'
  website: string
  phone?: string
  faqs: (location: string) => Array<{ question: string; answer: string }>
  relatedLinks: Array<{ label: string; href: string }>
}

export default function SupportGroupPage({
  config,
  location,
  locationSlug,
}: {
  config: SupportGroupConfig
  location: string
  locationSlug: string
}) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: config.name, href: `/${config.slug}/london` },
    { name: location, href: `/${config.slug}/${locationSlug}` },
  ]

  const faqs = config.faqs(location)
  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]

  const typeColour = config.type === 'family' ? '#6366f1' : config.type === 'recovery' ? 'var(--accent)' : '#0284c7'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide"><div style={{ maxWidth: 680 }}>
          <div className="label" style={{ marginBottom: 12 }}>Support Groups · {location}</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {config.name} Meetings in {location}
          </h1>
          {/* Snippet paragraph — featured snippet target */}
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>
            {config.intro.replace(/\[location\]/g, location)}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={config.website} target="_blank" rel="noopener noreferrer" style={{ padding: '11px 18px', background: typeColour, color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Find meetings at {config.website.replace('https://', '')} →
            </a>
            {config.phone && (
              <a href={`tel:${config.phone.replace(/\s/g, '')}`} style={{ padding: '11px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Call: {config.phone}
              </a>
            )}
          </div>
        </div></div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            {/* Key facts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12, marginBottom: 32 }}>
              {[
                { label: 'Cost', value: config.cost, icon: '💷' },
                { label: 'Who attends', value: config.whoFor, icon: '👥' },
                { label: 'Meetings', value: `Available in ${location}`, icon: '📍' },
                { label: 'Website', value: config.website.replace('https://', ''), icon: '🌐' },
              ].map((f, i) => (
                <div key={i} style={{ padding: 16, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{f.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* What happens */}
            <div style={{ marginBottom: 32, padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>What happens at a {config.name} meeting?</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>{config.whatHappens}</p>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about {config.name} in {location}
            </h2>
            <FaqBlock faqs={faqs} />

            {/* Related links */}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>More support in {location}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {config.relatedLinks.map(l => (
                  <Link key={l.href} href={l.href.replace('[location]', locationSlug)} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {l.label.replace('[Location]', location)} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Find rehab', '/rehab/london'], ['AA meetings', '/aa-meetings/london'], ['Get help', '/help/london']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
