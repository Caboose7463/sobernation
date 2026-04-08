/**
 * Shared template for all substance+location pages.
 * Used by all 8 substance route families.
 */
import Link from 'next/link'
import type { UKLocation } from '../lib/locations'
import { getRehabsForLocation } from '../lib/rehabs'
import { faqSchema, breadcrumbSchema, medicalWebPageSchema } from '../lib/seo'
import { getNHSAuthority } from '../lib/nhs-authorities'
import HelplinesSidebar from './HelplinesSidebar'
import FaqBlock from './FaqBlock'
import Breadcrumb from './Breadcrumb'
import NearestCentres from './NearestCentres'
import MedicalReviewBox from './MedicalReviewBox'

export interface SubstanceConfig {
  slug: string               // e.g. 'cocaine-addiction'
  name: string               // e.g. 'Cocaine'
  nameAdjective: string      // e.g. 'cocaine'
  type: 'drug' | 'alcohol'
  signs: string[]
  withdrawal: string[]
  treatment: string[]
  snippet: (loc: string) => string
  faqs: (loc: string) => Array<{ question: string; answer: string }>
}

interface SubstanceLocationPageProps {
  substance: SubstanceConfig
  loc: UKLocation
  locationSlug: string
}

export default function SubstanceLocationPage({
  substance, loc, locationSlug
}: SubstanceLocationPageProps) {
  const rehabsResult = getRehabsForLocation(locationSlug, loc.name)
  const faqs = substance.faqs(loc.name)
  const snippet = substance.snippet(loc.name)
  const nhsAuthority = getNHSAuthority(locationSlug, loc.admin2, loc.admin1)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: `${substance.name} Addiction`, href: `/${substance.slug}` },
    { name: loc.name, href: `/${substance.slug}/${locationSlug}` },
  ]

  const title = `${substance.name} Addiction Help in ${loc.name}`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: title,
      description: snippet,
      url: `https://www.sobernation.co.uk/${substance.slug}/${locationSlug}`,
      keywords: [
        `${substance.nameAdjective} addiction ${loc.name}`,
        `${substance.nameAdjective} treatment ${loc.name}`,
        `${substance.nameAdjective} rehab ${loc.name}`,
        `${substance.nameAdjective} help ${loc.name}`,
      ],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: `${substance.name} Addiction Services in ${loc.name}`,
      url: `https://www.sobernation.co.uk/${substance.slug}/${locationSlug}`,
      description: `Information about ${substance.nameAdjective} addiction treatment and support services in ${loc.name}, ${loc.admin2 || loc.admin1 || 'UK'}.`,
      audience: {
        '@type': 'MedicalAudience',
        audienceType: 'Patient',
        geographicArea: {
          '@type': 'AdministrativeArea',
          name: loc.name,
        },
      },
      about: {
        '@type': 'MedicalCondition',
        name: `${substance.name} Use Disorder`,
        code: { '@type': 'MedicalCode', codeSystem: 'ICD-10' },
      },
      publisher: {
        '@type': 'Organization',
        name: 'SoberNation',
        url: 'https://www.sobernation.co.uk',
      },
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      {/* Hero */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide">
          <div style={{ maxWidth: 680 }}>
            <div className="label" style={{ marginBottom: 12 }}>{loc.country} · {substance.name} Addiction</div>
            <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {title}
            </h1>
            {/* SNIPPET TARGET */}
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>
              {snippet}
            </p>
            {rehabsResult.centres.length > 0 ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#eaf4f1', border: '1px solid #c8e6df', borderRadius: 20, fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>
                ✓ {rehabsResult.centres.length} CQC-registered services{rehabsResult.isFallback ? ` near ${loc.name}` : ` in ${loc.name}`}
              </div>
            ) : (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                🔗 NHS & Frank services for {loc.name}
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <MedicalReviewBox compact />
            </div>
            <div style={{ marginBottom: 16, padding: '12px 16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#1e40af' }}>
              <strong>Local NHS service:</strong> {substance.name.toLowerCase()} addiction treatment in {loc.name} is commissioned by <strong>{nhsAuthority.name}</strong>.
              {' '}<a href={nhsAuthority.frankUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1e40af', fontWeight: 600 }}>Find local services →</a>
            </div>
            <div style={{ marginTop: 4, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#991b1b' }}>
              <strong>Need help now?</strong>{' '}
              <a href="tel:03001236600" style={{ color: '#991b1b', fontWeight: 700 }}>Call Frank free on 0300 123 6600</a> — confidential, available 24/7
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>

            {/* CQC centres — direct or nearest-city fallback */}
            <NearestCentres result={rehabsResult} locationName={loc.name} locationSlug={locationSlug} limit={6} />

            {/* Signs of addiction */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                Signs of {substance.nameAdjective} addiction
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 14 }}>
                {substance.name} addiction can develop gradually. Common signs include:
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                {substance.signs.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: '#dc2626', fontWeight: 700, flexShrink: 0 }}>•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Withdrawal */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                {substance.name} withdrawal symptoms
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 14 }}>
                Withdrawal from {substance.nameAdjective} should always be managed with medical support. Symptoms include:
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                {substance.withdrawal.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: '#d97706', fontWeight: 700, flexShrink: 0 }}>•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                Treatment for {substance.nameAdjective} addiction in {loc.name}
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                {substance.treatment.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related links — substance-aware */}
            <div style={{ marginBottom: 36 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>More help in {loc.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { label: `Rehab in ${loc.name}`, href: `/rehab/${locationSlug}` },
                  { label: `Drug treatment in ${loc.name}`, href: `/drug-treatment/${locationSlug}` },
                  // Alcohol-specific links
                  ...(substance.slug === 'alcohol-addiction' ? [
                    { label: `Alcohol detox in ${loc.name}`, href: `/alcohol-detox/${locationSlug}` },
                    { label: `Alcohol counselling in ${loc.name}`, href: `/alcohol-counselling/${locationSlug}` },
                    { label: 'Alcohol withdrawal symptoms', href: '/alcohol-withdrawal-symptoms' },
                    { label: 'How to stop drinking', href: '/how-to-stop-drinking' },
                    { label: 'Signs of alcoholism', href: '/signs-of-alcoholism' },
                    { label: `AA Meetings in ${loc.name}`, href: `/aa-meetings/${locationSlug}` },
                    { label: `Al-Anon in ${loc.name}`, href: `/al-anon/${locationSlug}` },
                  ] : []),
                  // Heroin-specific
                  ...(substance.slug === 'heroin-addiction' ? [
                    { label: `Heroin detox in ${loc.name}`, href: `/heroin-detox/${locationSlug}` },
                    { label: 'Heroin withdrawal symptoms', href: '/heroin-withdrawal-symptoms' },
                    { label: `Opioid substitution in ${loc.name}`, href: `/opioid-substitution/${locationSlug}` },
                    { label: 'What is methadone?', href: '/what-is-methadone' },
                    { label: `NA Meetings in ${loc.name}`, href: `/na-meetings/${locationSlug}` },
                  ] : []),
                  // Cocaine-specific
                  ...(substance.slug === 'cocaine-addiction' ? [
                    { label: `Cocaine Anonymous in ${loc.name}`, href: `/cocaine-anonymous/${locationSlug}` },
                    { label: `NA Meetings in ${loc.name}`, href: `/na-meetings/${locationSlug}` },
                  ] : []),
                  // Opiate / prescription drug pages
                  ...(['opiate-addiction','codeine-addiction','tramadol-addiction','fentanyl-addiction','diazepam-addiction','pregabalin-addiction','gabapentin-addiction','benzodiazepine-addiction'].includes(substance.slug) ? [
                    { label: `Opioid substitution in ${loc.name}`, href: `/opioid-substitution/${locationSlug}` },
                    { label: `Drug counselling in ${loc.name}`, href: `/drug-counselling/${locationSlug}` },
                    { label: 'What is methadone?', href: '/what-is-methadone' },
                  ] : []),
                  // Generic fallback for all others
                  ...(!['alcohol-addiction','heroin-addiction','cocaine-addiction','opiate-addiction','codeine-addiction','tramadol-addiction','fentanyl-addiction','diazepam-addiction','pregabalin-addiction','gabapentin-addiction','benzodiazepine-addiction'].includes(substance.slug) ? [
                    { label: `NA Meetings in ${loc.name}`, href: `/na-meetings/${locationSlug}` },
                  ] : []),
                  // Always include the hub
                  { label: `All addiction help in ${loc.name}`, href: `/help/${locationSlug}` },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about {substance.nameAdjective} addiction in {loc.name}
            </h2>
            <FaqBlock faqs={faqs} />
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation • UK addiction information resource</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['About', '/about'], ['Editorial policy', '/editorial-policy'], ['Privacy', '/privacy-policy'], ['Find rehab', `/rehab/${locationSlug}`]].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
