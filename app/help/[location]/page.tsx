import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import { getRehabsForLocation } from '../../../lib/rehabs'
import { locationMetadata, faqSchema, breadcrumbSchema, medicalWebPageSchema } from '../../../lib/seo'
import { BUILD_MONTH } from '../../../lib/build-info'
import LocationHero from '../../../components/LocationHero'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'
import NearestCentres from '../../../components/NearestCentres'
import LastReviewed from '../../../components/LastReviewed'
import CounsellorsSection from '../../../components/CounsellorsSection'

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
  return locationMetadata('help', loc.name)
}

const SERVICE_CATEGORIES = [
  {
    heading: 'Rehab & Detox',
    icon: '🏥',
    links: [
      { label: 'Find Rehab', href: (s: string) => `/rehab/${s}` },
      { label: 'Private Rehab', href: (s: string) => `/private-rehab/${s}` },
      { label: 'NHS Rehab', href: (s: string) => `/nhs-rehab/${s}` },
      { label: 'Residential Rehab', href: (s: string) => `/residential-rehab/${s}` },
      { label: 'Outpatient Rehab', href: (s: string) => `/outpatient-rehab/${s}` },
      { label: 'Online Rehab', href: (s: string) => `/online-rehab/${s}` },
      { label: 'Detox Centres', href: (s: string) => `/detox-centres/${s}` },
      { label: 'Alcohol Detox', href: (s: string) => `/alcohol-detox/${s}` },
      { label: 'Drug Detox', href: (s: string) => `/drug-detox/${s}` },
      { label: 'Heroin Detox', href: (s: string) => `/heroin-detox/${s}` },
      { label: 'Rehab Cost', href: (s: string) => `/rehab-cost/${s}` },
      { label: 'Sober Living', href: (s: string) => `/sober-living/${s}` },
    ],
  },
  {
    heading: 'Alcohol Help',
    icon: '🍺',
    links: [
      { label: 'Alcohol Addiction', href: (s: string) => `/alcohol-addiction/${s}` },
      { label: 'Alcohol Rehab', href: (s: string) => `/alcohol-rehab/${s}` },
      { label: 'Alcohol Detox', href: (s: string) => `/alcohol-detox/${s}` },
      { label: 'Alcohol Counselling', href: (s: string) => `/alcohol-counselling/${s}` },
      { label: 'Binge Drinking', href: (s: string) => `/binge-drinking/${s}` },
      { label: 'AA Meetings', href: (s: string) => `/aa-meetings/${s}` },
      { label: 'Al-Anon', href: (s: string) => `/al-anon/${s}` },
    ],
  },
  {
    heading: 'Drug Help',
    icon: '💊',
    links: [
      { label: 'Drug Treatment', href: (s: string) => `/drug-treatment/${s}` },
      { label: 'Drug Rehab', href: (s: string) => `/drug-rehab/${s}` },
      { label: 'Drug Detox', href: (s: string) => `/drug-detox/${s}` },
      { label: 'Drug Counselling', href: (s: string) => `/drug-counselling/${s}` },
      { label: 'NA Meetings', href: (s: string) => `/na-meetings/${s}` },
      { label: 'SMART Recovery', href: (s: string) => `/smart-recovery/${s}` },
      { label: 'Harm Reduction', href: (s: string) => `/harm-reduction/${s}` },
      { label: 'Naloxone', href: (s: string) => `/naloxone/${s}` },
      { label: 'Opioid Substitution', href: (s: string) => `/opioid-substitution/${s}` },
    ],
  },
  {
    heading: 'Substances',
    icon: '🔬',
    links: [
      { label: 'Heroin', href: (s: string) => `/heroin-addiction/${s}` },
      { label: 'Cocaine', href: (s: string) => `/cocaine-addiction/${s}` },
      { label: 'Crack Cocaine', href: (s: string) => `/crack-cocaine-addiction/${s}` },
      { label: 'Cannabis', href: (s: string) => `/cannabis-addiction/${s}` },
      { label: 'MDMA & Ecstasy', href: (s: string) => `/mdma-ecstasy-addiction/${s}` },
      { label: 'Amphetamine', href: (s: string) => `/amphetamine-addiction/${s}` },
      { label: 'Methamphetamine', href: (s: string) => `/methamphetamine-addiction/${s}` },
      { label: 'Ketamine', href: (s: string) => `/ketamine-addiction/${s}` },
      { label: 'Spice', href: (s: string) => `/spice-addiction/${s}` },
      { label: 'Nitrous Oxide', href: (s: string) => `/nitrous-oxide-addiction/${s}` },
      { label: 'Inhalants', href: (s: string) => `/inhalant-addiction/${s}` },
      { label: 'Gambling', href: (s: string) => `/gambling-addiction/${s}` },
    ],
  },
  {
    heading: 'Prescription Drugs',
    icon: '💊',
    links: [
      { label: 'Prescription Opioids', href: (s: string) => `/prescription-drug-addiction/${s}` },
      { label: 'Painkiller Addiction', href: (s: string) => `/painkiller-addiction/${s}` },
      { label: 'Opiate Addiction', href: (s: string) => `/opiate-addiction/${s}` },
      { label: 'Benzodiazepines', href: (s: string) => `/benzodiazepine-addiction/${s}` },
      { label: 'Codeine', href: (s: string) => `/codeine-addiction/${s}` },
      { label: 'Tramadol', href: (s: string) => `/tramadol-addiction/${s}` },
      { label: 'Diazepam', href: (s: string) => `/diazepam-addiction/${s}` },
      { label: 'Pregabalin', href: (s: string) => `/pregabalin-addiction/${s}` },
      { label: 'Gabapentin', href: (s: string) => `/gabapentin-addiction/${s}` },
      { label: 'Zopiclone', href: (s: string) => `/zopiclone-addiction/${s}` },
      { label: 'Sleeping Pills', href: (s: string) => `/sleeping-pill-addiction/${s}` },
      { label: 'Fentanyl', href: (s: string) => `/fentanyl-addiction/${s}` },
      { label: 'Antidepressants', href: (s: string) => `/antidepressant-addiction/${s}` },
    ],
  },
  {
    heading: 'Specialist Services',
    icon: '🎯',
    links: [
      { label: 'Dual Diagnosis', href: (s: string) => `/dual-diagnosis/${s}` },
      { label: "Women's Rehab", href: (s: string) => `/womens-rehab/${s}` },
      { label: 'Teen & Young People', href: (s: string) => `/teen-addiction/${s}` },
      { label: 'Workplace Support', href: (s: string) => `/workplace-addiction/${s}` },
      { label: 'How to Help Someone', href: (s: string) => `/how-to-help/${s}` },
      { label: 'Family Therapy', href: (s: string) => `/family-therapy/${s}` },
      { label: 'Chemsex Support', href: (s: string) => `/chemsex-support/${s}` },
      { label: 'Recovery Coaching', href: (s: string) => `/recovery-coaching/${s}` },
      { label: 'Aftercare', href: (s: string) => `/aftercare/${s}` },
      { label: 'Abstinence Rehab', href: (s: string) => `/abstinence-based-rehab/${s}` },
      { label: 'Non-12-Step Rehab', href: (s: string) => `/non-12-step-rehab/${s}` },
      { label: '12-Step Programmes', href: (s: string) => `/12-step-programme/${s}` },
      { label: 'Cocaine Anonymous', href: (s: string) => `/cocaine-anonymous/${s}` },
      { label: 'Eating Disorder & Addiction', href: (s: string) => `/eating-disorder-addiction/${s}` },
      { label: 'Opioid Substitution', href: (s: string) => `/opioid-substitution/${s}` },
    ],
  },
]

function buildFaqs(name: string, hasCqc: boolean) {
  return [
    {
      question: `How do I find addiction help in ${name}?`,
      answer: `The fastest route to addiction help in ${name} is to call Frank free on 0300 123 6600 (24/7) or speak to your GP. Your GP can refer you to local NHS drug and alcohol services free of charge. Private rehab can usually be accessed within days without a referral.`,
    },
    {
      question: `Is there free addiction treatment in ${name}?`,
      answer: `Yes. NHS drug and alcohol services in ${name} are free at the point of use. You can self-refer or be referred by a GP. Waiting times vary — typically 2–8 weeks for community services. Residential NHS rehab can take longer. Charities like Turning Point also offer free support.`,
    },
    {
      question: `How much does private rehab cost in ${name}?`,
      answer: `Private residential rehab near ${name} typically costs £3,000–£15,000 for a 28-day programme, depending on the facility and level of care. Some centres offer payment plans or sliding scale fees. Many people fund treatment through savings, family support, or insurance.`,
    },
    {
      question: `What types of addiction treatment are available in ${name}?`,
      answer: `${name} has access to several treatment types: community drug and alcohol services (free, NHS), residential rehab (NHS or private), outpatient programmes, medication-assisted treatment (methadone, subutex, naltrexone), AA and NA 12-step meetings, and online or telephone support.`,
    },
    {
      question: `Can I get addiction treatment without telling my employer?`,
      answer: `Yes. All NHS and private addiction treatment is confidential. Your GP cannot share your medical information with your employer without your consent. You may need to take sick leave, but "substance use disorder" is a protected medical condition under the Equality Act 2010.`,
    },
    {
      question: `What is the difference between detox and rehab?`,
      answer: `Detox is the medically supervised process of clearing a substance from your body — usually 5–10 days. Rehab is the longer therapeutic programme that follows, addressing the psychological causes of addiction through counselling, group work, and relapse prevention. Detox alone is rarely sufficient for long-term recovery.`,
    },
    {
      question: `Are there NA meetings in ${name}?`,
      answer: `Narcotics Anonymous (NA) meetings are available across the UK, including most towns and cities. You can find meeting times and locations at ukna.org or by calling the NA helpline on 0300 999 1212. Many areas also offer online meetings if in-person isn't possible.`,
    },
    {
      question: `How do I help a family member with addiction?`,
      answer: `Start by calling Frank (0300 123 6600) or Al-Anon (0800 0086 811) for guidance. Avoid enabling behaviours, set clear boundaries, and encourage professional help. Family members can also access counselling and support through local services and charities independently of their loved one.`,
    },
  ]
}

export default async function HelpLocationPage(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()

  const rehabsResult = getRehabsForLocation(location, loc.name)
  const faqs = buildFaqs(loc.name, rehabsResult.centres.length > 0)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Find Help', href: '/help' },
    { name: loc.name, href: `/help/${location}` },
  ]

  const snippet = `${loc.name} has access to NHS drug and alcohol services, private rehab centres, AA and NA meetings, and community support programmes. Whether you need help with alcohol, drugs, or prescription medication, free support is available in ${loc.name} — call Frank on 0300 123 6600 (24/7) to get started.`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: `Addiction Help in ${loc.name}`,
      description: `Find drug and alcohol addiction help in ${loc.name}. Local rehab centres, AA meetings, NA meetings, and NHS services.`,
      url: `https://www.sobernation.co.uk/help/${location}`,
      keywords: [`addiction help ${loc.name}`, `rehab ${loc.name}`, `drug treatment ${loc.name}`, `alcohol help ${loc.name}`],
    }),
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Shared schemas */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <a href="tel:03001236600" style={{ fontSize: 13, background: 'var(--crisis)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>
            Help now: 0300 123 6600
          </a>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container-wide">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Hero */}
      <LocationHero
        title={`Addiction Help in ${loc.name}`}
        subtitle={`${loc.country} · Drug & Alcohol Recovery`}
        snippet={snippet}
        locationName={loc.name}
        locationSlug={location}
        pageType="help"
        hasCqcData={rehabsResult.centres.length > 0}
        centreCount={rehabsResult.centres.length}
      />

      {/* Main content */}
      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">

          {/* Left column */}
          <div>

            {/* Freshness badge */}
            <LastReviewed dataDate={BUILD_MONTH} />

            {/* CQC centres — direct, borough-aggregated, or nearest fallback */}
            <NearestCentres result={rehabsResult} locationName={loc.name} limit={8} />

            {/* Counsellors — below treatment centres */}
            <CounsellorsSection locationSlug={location} locationName={loc.name} />


            {/* Full service directory — all 65+ route families */}
            {SERVICE_CATEGORIES.map(cat => (
              <div key={cat.heading} style={{ marginBottom: 36 }}>
                <div className="section-label" style={{ marginBottom: 10 }}>{cat.icon} {cat.heading} in {loc.name}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cat.links.map(l => (
                    <Link key={l.label} href={l.href(location)} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)', fontWeight: 500 }}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}


            {/* FAQ */}
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                Frequently asked questions about addiction help in {loc.name}
              </h2>
              <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />
            </div>

          </div>

          {/* Right column — helplines */}
          <HelplinesSidebar />

        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>
            © {new Date().getFullYear()} SoberNation · CQC data: Open Government Licence
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['About', '/about'], ['Editorial policy', '/editorial-policy'], ['Privacy', '/privacy-policy']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
