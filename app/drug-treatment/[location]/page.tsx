import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import { getRehabsForLocation } from '../../../lib/rehabs'
import { locationMetadata, faqSchema, breadcrumbSchema, medicalWebPageSchema } from '../../../lib/seo'
import LocationHero from '../../../components/LocationHero'
import NearestCentres from '../../../components/NearestCentres'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'

export const dynamicParams = true
export const revalidate = 604800

export async function generateStaticParams() {
  return getTopLocationSlugs().map(location => ({ location }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return locationMetadata('drug-treatment', loc.name)
}

const TREATMENT_TYPES = [
  {
    icon: '🏥',
    type: 'Residential detox',
    desc: 'A medically supervised stay (usually 5–10 days) to safely clear drugs or alcohol from your body. The safest option for severe dependency.',
    nhs: true,
  },
  {
    icon: '🏘️',
    type: 'Residential rehabilitation',
    desc: 'Living at a treatment centre (28–90 days) receiving intensive therapy, group work, and 12-step or SMART Recovery support.',
    nhs: true,
  },
  {
    icon: '🗓️',
    type: 'Community drug treatment',
    desc: 'Outpatient appointments with a drug worker, counsellor, or keyworker. Usually free via NHS self-referral. Most common form of treatment.',
    nhs: true,
  },
  {
    icon: '💊',
    type: 'Medication-assisted treatment (MAT)',
    desc: 'Prescribed medicines to manage withdrawal and reduce cravings. Includes methadone, buprenorphine (Subutex), Naltrexone, and Antabuse.',
    nhs: true,
  },
  {
    icon: '🧠',
    type: 'Psychological therapies',
    desc: 'CBT (cognitive behavioural therapy), motivational interviewing, and trauma-informed therapy to address the root causes of addiction.',
    nhs: true,
  },
  {
    icon: '📱',
    type: 'Online & telephone support',
    desc: 'Remote counselling, apps, and recovery communities available 24/7. Good as a supplement to in-person treatment or for rural areas.',
    nhs: false,
  },
]

function buildFaqs(name: string) {
  return [
    {
      question: `How do I access drug treatment in ${name}?`,
      answer: `You can self-refer to NHS drug treatment services in ${name} — you do not need a GP referral. Call Frank on 0300 123 6600 (free, 24/7) to be directed to your local service, or search the NHS service finder online. Your GP can also refer you and prescribe medication to manage withdrawal.`,
    },
    {
      question: `Is drug treatment free in ${name}?`,
      answer: `Yes. NHS drug treatment in ${name} is free at the point of use. Community drug and alcohol services, counselling, and medication-assisted treatment (methadone, subutex) are all available free of charge. Residential NHS rehab is also free, though it may involve a longer wait.`,
    },
    {
      question: `What drugs can NHS treatment help with in ${name}?`,
      answer: `NHS drug treatment services in ${name} treat all drug addictions including heroin, cocaine, crack cocaine, cannabis, prescription opioids, benzodiazepines, MDMA, ketamine, and alcohol. They treat addiction as a health condition, not a moral failing, and there is no judgement.`,
    },
    {
      question: `How long is the waiting list for drug treatment in ${name}?`,
      answer: `NHS community drug treatment in ${name} typically has a waiting time of 2–8 weeks from referral to first appointment, depending on local demand and the specific service. Medication-assisted treatment may begin more quickly for severe dependency. Private treatment can start within 24–72 hours.`,
    },
    {
      question: `What is the best drug treatment for heroin addiction?`,
      answer: `The most effective treatment for heroin addiction combines medication-assisted treatment (methadone or buprenorphine to manage withdrawal and cravings) with psychological support (CBT, key working, group therapy). Residential rehab followed by aftercare produces the best long-term outcomes. All are available via NHS services.`,
    },
    {
      question: `Can I get treatment for cocaine addiction on the NHS?`,
      answer: `Yes. Unlike opioid addiction, there is no licensed medication specifically for cocaine addiction — but NHS drug services provide intensive psychological therapy, CBT, motivational interviewing, and support groups for cocaine and crack cocaine addiction. Community treatment is free and effective for many people.`,
    },
    {
      question: `Can drug treatment be kept confidential from my employer?`,
      answer: `Yes. All drug treatment is fully confidential. Your employer cannot be told without your consent. Under the Equality Act 2010, addiction may be considered a disability, giving you legal protections at work. Many people access treatment while working — outpatient appointments can often be arranged flexibly.`,
    },
    {
      question: `What happens if I relapse during drug treatment?`,
      answer: `Relapse is a common part of the recovery process — not a failure. If you relapse during treatment in ${name}, contact your keyworker or drug service as soon as possible. Treatment will continue from where you are, not restart from zero. Many people need multiple attempts before achieving long-term recovery.`,
    },
  ]
}

export default async function DrugTreatmentPage(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  const rehabsResult = getRehabsForLocation(location, loc.name)
  const faqs = buildFaqs(loc.name)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Drug Treatment', href: '/drug-treatment' },
    { name: loc.name, href: `/drug-treatment/${location}` },
  ]

  const snippet = `NHS drug treatment in ${loc.name} is free and available without a GP referral. Services include community drug workers, medication-assisted treatment (methadone, subutex), detox, and residential rehabilitation. Call Frank on 0300 123 6600 (free, 24/7) to find local drug treatment in ${loc.name}.`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: `Drug Treatment in ${loc.name}`,
      description: `Find NHS and private drug treatment services in ${loc.name}. Community services, detox, rehab, and medication-assisted treatment.`,
      url: `https://www.sobernation.co.uk/drug-treatment/${location}`,
      keywords: [`drug treatment ${loc.name}`, `drug rehabilitation ${loc.name}`, `heroin treatment ${loc.name}`, `cocaine addiction ${loc.name}`],
    }),
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <LocationHero
        title={`Drug Treatment in ${loc.name}`}
        subtitle={`${loc.country} · NHS & Private Drug Services`}
        snippet={snippet}
        locationName={loc.name}
        locationSlug={location}
        pageType="drug-treatment"
        hasCqcData={rehabsResult.centres.length > 0}
        centreCount={rehabsResult.centres.length}
      />

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>

            {/* CQC centres */}
            <NearestCentres result={rehabsResult} locationName={loc.name} locationSlug={location} limit={6} />

            {/* Treatment types */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                Types of drug treatment available in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.7 }}>
                The right treatment depends on the drug, the severity of dependence, and personal circumstances. Most people start with community-based treatment, stepping up to detox or residential rehab if needed.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TREATMENT_TYPES.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: 16, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t.type}</span>
                        {t.nhs && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-pale)', padding: '2px 6px', borderRadius: 4 }}>NHS FREE</span>}
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NHS Self-referral CTA */}
            <div style={{ marginBottom: 40, padding: 24, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>
                You can self-refer for NHS drug treatment in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 14 }}>
                You do not need a GP referral to access NHS drug treatment. You can contact your local service directly or use Frank&apos;s service finder to find and contact the right team in {loc.name}.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="https://www.nhs.uk/service-search/drug-and-alcohol-support/find-drug-alcohol-addiction-support-services/" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  NHS service finder ↗
                </a>
                <a href="https://www.talktofrank.com/get-help" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  Frank service finder ↗
                </a>
              </div>
            </div>

            {/* Substance links */}
            <div style={{ marginBottom: 40 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Treatment by substance in {loc.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { label: 'Alcohol', href: `/alcohol-addiction/${location}` },
                  { label: 'Heroin', href: `/heroin-addiction/${location}` },
                  { label: 'Cocaine', href: `/cocaine-addiction/${location}` },
                  { label: 'Cannabis', href: `/cannabis-addiction/${location}` },
                  { label: 'Prescription drugs', href: `/prescription-drug-addiction/${location}` },
                  { label: 'Ketamine', href: `/ketamine-addiction/${location}` },
                  { label: 'Benzodiazepines', href: `/benzodiazepine-addiction/${location}` },
                ].map(s => (
                  <Link key={s.href} href={s.href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about drug treatment in {loc.name}
            </h2>
            <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation · CQC data: Open Government Licence</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy', '/privacy'], ['Contact', '/contact'], ['About', '/about']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
