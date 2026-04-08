import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation, getTopLocationSlugs } from '../../../lib/locations'
import { getNearbyLocations } from '../../../lib/nearby-locations'
import { getRehabsForLocation } from '../../../lib/rehabs'
import { locationMetadata, faqSchema, breadcrumbSchema, medicalWebPageSchema } from '../../../lib/seo'
import { BUILD_MONTH, CQC_ATTRIBUTION } from '../../../lib/build-info'
import LocationHero from '../../../components/LocationHero'
import NearestCentres from '../../../components/NearestCentres'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'
import LastReviewed from '../../../components/LastReviewed'
import CounsellorsSection from '../../../components/CounsellorsSection'
import ArticleCard from '../../../components/ArticleCard'
import RelatedLinksBlock from '../../../components/RelatedLinksBlock'
import { getSupabase } from '../../../lib/articles'
import type { Article } from '../../../lib/articles'

export const dynamicParams = true
export const revalidate = 604800 // ISR: regenerate after 7 days

export async function generateStaticParams() {
  return getTopLocationSlugs().map(location => ({ location }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return locationMetadata('rehab', loc.name)
}

function buildFaqs(name: string) {
  return [
    {
      question: `How do I find a rehab centre in ${name}?`,
      answer: `To find rehab in ${name}, speak to your GP for an NHS referral, call Frank (0300 123 6600) to be directed to local services, or contact a private rehab centre directly. Private rehab can often be accessed within 24–72 hours without a referral.`,
    },
    {
      question: `How much does rehab in ${name} cost?`,
      answer: `NHS rehab in ${name} is free but may have a waiting list of several weeks. Private residential rehab near ${name} typically costs £3,000–£15,000 for a 28-day programme. Day programmes (outpatient) are usually £1,000–£5,000. Many private centres offer payment plans.`,
    },
    {
      question: `What is the difference between residential and outpatient rehab?`,
      answer: `Residential rehab means you live at the treatment centre, typically for 28–90 days, receiving intensive therapy and 24/7 support. Outpatient rehab lets you live at home while attending daily or weekly sessions. Residential rehab has higher success rates for severe addiction but is more expensive.`,
    },
    {
      question: `How long does rehab take?`,
      answer: `Most residential rehab programmes last 28 days, though 60 or 90-day stays produce better outcomes. NHS community programmes typically run for 3–6 months of regular appointments. Detox alone usually takes 5–10 days. Recovery is a long-term process that continues after formal treatment ends.`,
    },
    {
      question: `Can I get rehab on the NHS in ${name}?`,
      answer: `Yes. NHS-funded rehab is available in ${name} through your local drug and alcohol service. Speak to your GP or self-refer to the local service to start the process. NHS residential rehab is also available for more severe cases, though waiting times can be several months.`,
    },
    {
      question: `What happens in rehab?`,
      answer: `Rehab typically begins with a medical detox to safely clear the substance from your body. This is followed by therapeutic work — individual counselling, group therapy, CBT (cognitive behavioural therapy), 12-step meetings, and relapse prevention planning. Aftercare support follows when you leave.`,
    },
    {
      question: `Do I need a referral for private rehab near ${name}?`,
      answer: `No. Private rehab centres accept self-referrals directly. You can call any private centre and they will carry out an initial assessment — often the same day. Some will arrange transport to the facility for you. Treatment can start within 24–72 hours.`,
    },
    {
      question: `Is rehab confidential?`,
      answer: `Yes. All rehab treatment — NHS and private — is fully confidential. Your employer cannot be told about your treatment without your consent. Medical records are protected. The only exception is if a clinician believes you or someone else is at immediate risk of serious harm.`,
    },
  ]
}

const COST_TABLE = [
  { type: 'NHS community programme', cost: 'Free', duration: '3–6 months', notes: 'GP referral or self-referral' },
  { type: 'NHS residential rehab', cost: 'Free', duration: '28–90 days', notes: 'Waiting list may apply' },
  { type: 'Private outpatient', cost: '£1,000–£5,000', duration: '4–12 weeks', notes: 'Live at home' },
  { type: 'Private residential (standard)', cost: '£3,000–£8,000', duration: '28 days', notes: 'All inclusive' },
  { type: 'Private residential (premium)', cost: '£8,000–£20,000+', duration: '28–90 days', notes: 'Luxury facilities' },
]

export default async function RehabLocationPage(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  const rehabsResult = getRehabsForLocation(location, loc.name)
  const faqs = buildFaqs(loc.name)

  // Fetch articles tagged with this location
  const supabase = getSupabase()
  const { data: locationArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .contains('location_slugs', [location])
    .order('published_at', { ascending: false })
    .limit(3)
  const articles = (locationArticles ?? []) as Article[]

  // Nearby locations for internal linking
  const nearbyLocations = getNearbyLocations(location, 8, 40)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Rehab', href: '/rehab' },
    { name: loc.name, href: `/rehab/${location}` },
  ]

  const snippet = `${loc.name} has both NHS-funded and private rehab centres for alcohol and drug addiction. NHS rehab is free via GP referral, while private residential rehab near ${loc.name} typically costs £3,000–£15,000 for a 28-day programme. Call Frank free on 0300 123 6600 for immediate guidance.`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: `Rehab Centres in ${loc.name}`,
      description: `Find NHS and private drug and alcohol rehabilitation centres in ${loc.name}.`,
      url: `https://www.sobernation.co.uk/rehab/${location}`,
      keywords: [`rehab ${loc.name}`, `rehab centres ${loc.name}`, `drug rehabilitation ${loc.name}`, `alcohol rehab ${loc.name}`],
    }),
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide">
        <Breadcrumb items={breadcrumbs} />
      </div>

      <LocationHero
        title={`Rehab Centres in ${loc.name}`}
        subtitle={`${loc.country} · Drug & Alcohol Rehabilitation`}
        snippet={snippet}
        locationName={loc.name}
        locationSlug={location}
        pageType="rehab"
        hasCqcData={rehabsResult.centres.length > 0}
        centreCount={rehabsResult.centres.length}
      />

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>

            {/* Freshness badge — updates every deploy */}
            <LastReviewed dataDate={BUILD_MONTH} />

            {/* Counsellors — shown below centres, comment updated */}

            {/* CQC centres — direct, borough-aggregated, or nearest-city fallback */}
            <NearestCentres result={rehabsResult} locationName={loc.name} locationSlug={location} limit={6} />

            {/* Counsellors below treatment centres */}
            <CounsellorsSection locationSlug={location} locationName={loc.name} />

            {/* Cost comparison table */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                How much does rehab cost in {loc.name}?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.7 }}>
                Rehab costs in {loc.name} vary significantly depending on whether you use NHS or private services. NHS treatment is free but may involve a waiting list. Private rehab can begin within days.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-subtle)' }}>
                      {['Type', 'Cost', 'Duration', 'Notes'].map(h => (
                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--text)', borderBottom: '2px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COST_TABLE.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--white)' : 'var(--bg-subtle)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)' }}>{row.type}</td>
                        <td style={{ padding: '10px 14px', color: row.cost === 'Free' ? 'var(--accent)' : 'var(--text)', fontWeight: row.cost === 'Free' ? 700 : 400 }}>{row.cost}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{row.duration}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to get referred — HowTo schema target */}
            <div style={{ marginBottom: 40, padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
                How to access rehab in {loc.name}
              </h2>
              <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { step: 'Call Frank or your GP', desc: 'Frank (0300 123 6600) can advise on local options and referral routes. Your GP can refer you to NHS services.' },
                  { step: 'Get assessed', desc: 'A drug and alcohol worker will carry out an assessment to understand your needs and recommend the right level of care.' },
                  { step: 'Choose NHS or private', desc: 'NHS is free but may have waiting times. Private rehab can begin within 24–72 hours and some centres offer payment plans.' },
                  { step: 'Begin treatment', desc: 'Treatment typically starts with a medical detox, followed by residential or community-based therapeutic work.' },
                  { step: 'Plan your aftercare', desc: 'Good rehab includes an aftercare plan — follow-up appointments, 12-step meetings, sober living, or outpatient support.' },
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 2 }}>{item.step}</strong>
                    {item.desc}
                  </li>
                ))}
              </ol>
            </div>

            {/* Related guides */}
            <div style={{ marginBottom: 40, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { label: 'NHS rehab (free)', href: `/nhs-rehab/${location}` },
                { label: 'Private rehab', href: `/private-rehab/${location}` },
                { label: 'Residential rehab', href: `/residential-rehab/${location}` },
                { label: 'Outpatient rehab', href: `/outpatient-rehab/${location}` },
                { label: 'Alcohol detox', href: `/alcohol-detox/${location}` },
                { label: 'Drug detox', href: `/drug-detox/${location}` },
                { label: 'How much does rehab cost?', href: `/rehab-cost/${location}` },
                { label: 'Sober living', href: `/sober-living/${location}` },
              ].map(g => (
                <Link key={g.href} href={g.href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                  {g.label} →
                </Link>
              ))}
            </div>

            {/* Location articles */}
            {articles.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                    Latest guides for {loc.name}
                  </h2>
                  <Link href={`/articles?tag=${location}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
                    See all →
                  </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {articles.map(a => (
                    <ArticleCard key={a.id} article={a} compact />
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about rehab in {loc.name}
            </h2>
            <FaqBlock faqs={faqs} />

          </div>
          <HelplinesSidebar />
        </div>
      </div>

      {/* Global SiteFooter rendered by layout.tsx */}

      {/* ── Nearby towns ── */}
      {nearbyLocations.length > 0 && (
        <div className="container-wide" style={{ paddingBottom: 48 }}>
          <RelatedLinksBlock
            title={`Rehab and addiction help near ${loc.name}`}
            links={nearbyLocations.map(n => ({
              label: `Rehab in ${n.name}`,
              href: `/rehab/${n.slug}`,
              description: `${Math.round(n.distanceKm)} km away`,
            }))}
          />
        </div>
      )}
    </div>
  )
}
