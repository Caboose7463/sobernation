import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import { locationMetadata, faqSchema, breadcrumbSchema, medicalWebPageSchema } from '../../../lib/seo'
import LocationHero from '../../../components/LocationHero'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'

export const dynamicParams = true

export async function generateStaticParams() {
  return getTopLocationSlugs().map(location => ({ location }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return locationMetadata('na-meetings', loc.name)
}

const MEETING_TYPES = [
  { type: 'Open meetings', desc: 'Open to anyone — addicts, family members, and people who are curious. No prior commitment is needed.' },
  { type: 'Closed meetings', desc: 'For people with a drug problem or who think they might have one. More personal and sharing-focused.' },
  { type: 'Speaker meetings', desc: 'One or more members share their story of addiction and recovery. Good entry point for newcomers.' },
  { type: 'Step meetings', desc: 'Focus on working through the 12 Steps of NA. Structured discussion for members in recovery.' },
  { type: 'Literature meetings', desc: 'Discussion based on NA approved texts like "Narcotics Anonymous" (the Basic Text). Good for deeper understanding.' },
  { type: 'Online meetings', desc: 'NA meetings via Zoom and phone, available 24/7 UK-wide. Accessible from home, perfect when in-person isn\'t possible.' },
]

function buildFaqs(name: string) {
  return [
    {
      question: `How do I find an NA meeting in ${name}?`,
      answer: `Find NA meetings in ${name} at ukna.org or call the NA helpline on 0300 999 1212 (10am–midnight). Meetings are listed by day, time, and location. Many areas around ${name} also offer online meetings via Zoom if in-person attendance is difficult.`,
    },
    {
      question: `Is NA only for heroin addicts?`,
      answer: `No. NA (Narcotics Anonymous) is for anyone with a problem with any drug — heroin, cocaine, cannabis, prescription drugs, MDMA, ketamine, alcohol, or any other substance. NA's message is about addiction as a whole, regardless of which specific substance you use.`,
    },
    {
      question: `What happens at a NA meeting?`,
      answer: `Most NA meetings open with a reading and a moment of reflection, followed by sharing from members. At open meetings, you can simply listen — you do not have to share. Closed meetings are for people who identify as addicts. Most meetings last 60–90 minutes and are followed by an informal opportunity to chat.`,
    },
    {
      question: `Is NA free to attend?`,
      answer: `Yes. NA meetings are always free to attend. There is usually an optional voluntary collection — typically around £1 — but this is never compulsory. NA accepts no outside funding and is fully self-supporting through member contributions.`,
    },
    {
      question: `How often should I go to NA meetings?`,
      answer: `Many people in early recovery aim for 90 meetings in 90 days — one per day for the first three months. Once stable, 1–3 meetings per week is typical. During difficult periods, more frequent attendance can help prevent relapse. There are no rules — attend as often as is helpful.`,
    },
    {
      question: `What is the difference between NA and AA?`,
      answer: `AA (Alcoholics Anonymous) specifically addresses alcohol addiction. NA (Narcotics Anonymous) covers all drugs, including alcohol. Both use the 12-step programme. People with combined alcohol and drug issues often attend both. NA tends to have a broader scope and welcomes anyone struggling with any substance.`,
    },
    {
      question: `Do I need to admit I am an addict to attend NA?`,
      answer: `At open meetings, no — you can attend without identifying yourself as an addict. At closed meetings, it helps to acknowledge a problem with drugs. The only requirement for NA membership is a desire to stop using drugs. No labels or declarations are required at your first meeting.`,
    },
    {
      question: `Are there NA meetings near ${name} I can attend tonight?`,
      answer: `Use the NA meeting finder at ukna.org to search by location and day, or call 0300 999 1212. Meetings take place every day of the week across the UK including evenings and weekends. Online meetings are also available tonight if you cannot travel.`,
    },
  ]
}

export default async function NAMeetingsPage(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()

  const faqs = buildFaqs(loc.name)
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'NA Meetings', href: '/na-meetings' },
    { name: loc.name, href: `/na-meetings/${location}` },
  ]

  const snippet = `NA (Narcotics Anonymous) meetings in ${loc.name} are free, confidential support groups for anyone struggling with drug addiction — any drug, not just heroin. Find open and closed NA meetings in ${loc.name} at ukna.org or call the NA helpline on 0300 999 1212 (10am–midnight, free).`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: `NA Meetings in ${loc.name}`,
      description: `Find Narcotics Anonymous NA meetings in ${loc.name}. Free drug recovery support groups for any addiction.`,
      url: `https://www.sobernation.co.uk/na-meetings/${location}`,
    }),
  ]

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
          <a href="tel:03009991212" style={{ fontSize: 13, background: 'var(--accent)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>
            NA helpline: 0300 999 1212
          </a>
        </div>
      </nav>

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <LocationHero
        title={`NA Meetings in ${loc.name}`}
        subtitle={`${loc.country} · Narcotics Anonymous`}
        snippet={snippet}
        locationName={loc.name}
        locationSlug={location}
        pageType="na-meetings"
        hasCqcData={false}
        centreCount={0}
      />

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            <div style={{ marginBottom: 32, padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                How to find NA meetings in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                The UK NA website lists all meetings across the country including {loc.name}, with day, time, venue, and meeting type. You can also filter for online meetings.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="https://ukna.org/find-a-meeting" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  Find NA meetings near {loc.name} ↗
                </a>
                <a href="tel:03009991212" style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  Call NA: 0300 999 1212
                </a>
              </div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                Types of NA meetings in {loc.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {MEETING_TYPES.map((mt, i) => (
                  <div key={i} style={{ padding: '14px 0', borderBottom: i < MEETING_TYPES.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{mt.type}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{mt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 40, padding: 20, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>NA is for all drugs — not just heroin</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                NA welcomes anyone with a problem with any drug: cocaine, cannabis, prescription medication, alcohol, MDMA, ketamine, or any other substance. The programme focuses on addiction itself, not any particular drug.
              </p>
            </div>

            <div style={{ marginBottom: 40 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Related resources in {loc.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { label: `AA Meetings in ${loc.name}`, href: `/aa-meetings/${location}` },
                  { label: `Drug Treatment in ${loc.name}`, href: `/drug-treatment/${location}` },
                  { label: `Rehab in ${loc.name}`, href: `/rehab/${location}` },
                  { label: 'AA vs NA — what\'s the difference?', href: '/aa-vs-smart-recovery' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about NA in {loc.name}
            </h2>
            <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
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
