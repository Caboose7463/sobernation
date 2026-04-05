/**
 * Shared template for rehab/service type location pages  
 * Used by: private-rehab, nhs-rehab, rehab-cost, dual-diagnosis, sober-living, detox-centres
 */
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../lib/seo'
import { getNHSAuthority } from '../lib/nhs-authorities'
import { getONSStats } from '../lib/ons-stats'
import { getRehabsForLocation } from '../lib/rehabs'
import { BUILD_MONTH } from '../lib/build-info'
import type { UKLocation } from '../lib/locations'
import HelplinesSidebar from './HelplinesSidebar'
import FaqBlock from './FaqBlock'
import Breadcrumb from './Breadcrumb'
import MedicalReviewBox from './MedicalReviewBox'
import NearestCentres from './NearestCentres'
import LastReviewed from './LastReviewed'

export interface RehabTypeConfig {
  slug: string
  name: string                         // 'Private Rehab'
  tagline: string
  intro: string                        // snippet paragraph — use [location]
  keyFacts: Array<{ label: string; value: string; icon: string }>
  bodyParagraphs: Array<string>        // use [location]
  faqs: (location: string) => Array<{ question: string; answer: string }>
  ctaLabel: string
  ctaHref: string                      // use [location] for dynamic
  secondaryCta?: { label: string; href: string }
}

export default function RehabTypePage({
  config,
  location,
  locationSlug,
  loc,
}: {
  config: RehabTypeConfig
  location: string
  locationSlug: string
  loc?: UKLocation
}) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: config.name, href: `/${config.slug}/london` },
    { name: location, href: `/${config.slug}/${locationSlug}` },
  ]

  const faqs = config.faqs(location)
  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]
  const nhsAuthority = loc ? getNHSAuthority(locationSlug, loc.admin2, loc.admin1) : null
  const onsStats = loc ? getONSStats(loc.admin1, loc.admin2) : null
  const rehabsResult = getRehabsForLocation(locationSlug, location)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide"><div style={{ maxWidth: 720 }}>
          <div className="label" style={{ marginBottom: 12 }}>{config.tagline} · {location}</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {config.name} in {location}
          </h1>
          {/* Featured snippet paragraph */}
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 640 }}>
            {config.intro.replace(/\[location\]/g, location)}
          </p>
          <div style={{ marginBottom: 20 }}>
            <MedicalReviewBox compact />
          </div>
          {nhsAuthority && (
            <div style={{ marginBottom: 20, padding: '12px 16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#1e40af' }}>
              <strong>Local NHS service:</strong> Drug and alcohol treatment in {location} is commissioned by{' '}
              <strong>{nhsAuthority.name}</strong>.
              {' '}<a href={nhsAuthority.frankUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1e40af', fontWeight: 600 }}>Find your local service →</a>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="tel:03001236600" style={{ padding: '12px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              {config.ctaLabel}
            </a>
            {config.secondaryCta && (
              <Link href={config.secondaryCta.href.replace('[location]', locationSlug)} style={{ padding: '12px 20px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                {config.secondaryCta.label.replace('[Location]', location)}
              </Link>
            )}
          </div>
        </div></div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            {/* Freshness badge */}
            <LastReviewed dataDate={BUILD_MONTH} />

            {/* CQC-registered centres — direct for this location or nearest fallback */}
            <NearestCentres result={rehabsResult} locationName={location} locationSlug={locationSlug} limit={6} />

            {/* Key facts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12, marginBottom: 32 }}>
              {config.keyFacts.map((f, i) => (
                <div key={i} style={{ padding: 16, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* Body paragraphs */}
            {config.bodyParagraphs.map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
                {para.replace(/\[location\]/g, location)}
              </p>
            ))}

            {/* ONS regional statistics — unique government data per region */}
            {onsStats && (
              <div style={{ margin: '28px 0', padding: '20px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 12 }}>📊 Regional addiction statistics — {onsStats.region}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 14 }}>
                  <div style={{ padding: '12px', background: 'var(--white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600, marginBottom: 4 }}>Drug-related deaths (2022)</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{onsStats.drugDeaths2022.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{onsStats.ratePerHundredK} per 100,000 pop.</div>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600, marginBottom: 4 }}>Alcohol hospital admissions</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{onsStats.alcoholHospAdmissions.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-light)' }}>per 100,000 population</div>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600, marginBottom: 4 }}>Rate trend</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: onsStats.trend === 'rising' ? '#dc2626' : onsStats.trend === 'falling' ? '#16a34a' : 'var(--text)' }}>
                      {onsStats.trend === 'rising' ? '↑ Rising' : onsStats.trend === 'falling' ? '↓ Falling' : '→ Stable'}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-light)' }}>2020–2022 direction</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-light)', margin: 0, lineHeight: 1.6 }}>
                  Source: {onsStats.source}. Data covers {onsStats.region} — the NHS region serving {location}.
                  Drug-related deaths are defined as deaths related to drug poisoning, drug misuse and dependence.
                </p>
              </div>
            )}

            <div style={{ marginTop: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                Frequently asked questions about {config.name.toLowerCase()} in {location}
              </h2>
              <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />
            </div>

            {/* Cross-links: more services in this location */}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>More addiction services in {location}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  ['All services', `/help/${locationSlug}`],
                  ['Find rehab', `/rehab/${locationSlug}`],
                  ['Alcohol detox', `/alcohol-detox/${locationSlug}`],
                  ['Drug detox', `/drug-detox/${locationSlug}`],
                  ['AA meetings', `/aa-meetings/${locationSlug}`],
                  ['NA meetings', `/na-meetings/${locationSlug}`],
                  ['Dual diagnosis', `/dual-diagnosis/${locationSlug}`],
                  ['Family therapy', `/family-therapy/${locationSlug}`],
                  ['Harm reduction', `/harm-reduction/${locationSlug}`],
                  ['Recovery coaching', `/recovery-coaching/${locationSlug}`],
                ].map(([label, href]) => (
                  <Link key={href} href={href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {label} →
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
            {[['About', '/about'], ['Editorial policy', '/editorial-policy'], ['Privacy', '/privacy-policy'], ['Find rehab', `/rehab/${locationSlug}`]].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
