import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import { locationMetadata, faqSchema, breadcrumbSchema, medicalWebPageSchema } from '../../../lib/seo'
import LocationHero from '../../../components/LocationHero'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'
import { FirstMeeting, ListingCheck, MeetingSources } from '../../../components/MeetingTrust'
import { reviewedSchemaProps, FELLOWSHIPS } from '../../../lib/trust'

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
  { type: 'Open to All', desc: 'Anyone can attend, including family members and friends.' },
  { type: 'Open by Request', desc: 'Check with the group before bringing a family member or friend.' },
  { type: 'Addicts Only', desc: 'For addicts and people who think they may have a problem with drugs.' },
  { type: 'In person and online', desc: 'The UKNA meetings site lists face to face meetings and online meetings across the UK.' },
]

function buildFaqs(name: string) {
  return [
    {
      question: `How do I find an NA meeting in ${name}?`,
      answer: `Search the official UKNA meetings site at meetings.ukna.org for face to face meetings near ${name} or online meetings. You can also call the NA helpline on 0300 999 1212 (10am to midnight). For anonymity reasons UKNA does not publish local contacts online, but the helpline can ask someone local to call you back.`,
    },
    {
      question: `Do I have to be clean to go to an NA meeting?`,
      answer: `No. UKNA says you do not have to be drug free to attend, and you do not have to say anything if you do not want to.`,
    },
    {
      question: `What happens at an NA meeting?`,
      answer: `Members who have been where you are share their experience of getting and staying clean. At in person meetings there may be reading cards on the chairs; if you would rather not read aloud, sit where there is no card or pass it on. Online meetings usually explain at the start how the meeting runs and often have a newcomers section.`,
    },
    {
      question: `Is NA free to attend?`,
      answer: `Yes. UKNA says meetings are free, no appointment is needed and you can come as often as you like.`,
    },
    {
      question: `Can I bring a friend or family member to an NA meeting?`,
      answer: `Yes, to meetings marked Open to All. For Open by Request meetings, check with the group first. Addicts Only meetings are for people who have, or think they may have, a problem with drugs. The meetings site shows which type each meeting is.`,
    },
    {
      question: `What if I do not like the first meeting?`,
      answer: `UKNA notes that it is common to look for differences rather than similarities at first. No two meetings are the same, so it suggests trying another one.`,
    },
    {
      question: `What is the difference between NA and AA?`,
      answer: `Narcotics Anonymous is for people with a problem with drugs. Alcoholics Anonymous is for people who want to stop drinking. Both are free 12 step fellowships, and some people go to both.`,
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

  const na = FELLOWSHIPS['na-meetings']
  const snippet = `NA (Narcotics Anonymous) meetings in ${loc.name} are free support groups for anyone with a problem with drugs. No appointment is needed and you do not have to be drug free to attend. Find face to face and online meetings at meetings.ukna.org or call the NA helpline on ${na.helpline.number} (${na.helpline.hours}).`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: `NA Meetings in ${loc.name}`,
      description: `How to find Narcotics Anonymous meetings in ${loc.name}, with the official UKNA meeting finder, NA helpline and what to expect at a first meeting.`,
      url: `https://www.sobernation.co.uk/na-meetings/${location}`,
      extra: reviewedSchemaProps('na-meetings'),
    }),
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

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
                The official UKNA meetings site lists face to face meetings across the UK, including near {loc.name}, and online meetings you can join from home. If you have trouble finding one, call the NA helpline.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={na.finderUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  Find NA meetings near {loc.name} ↗
                </a>
                <a href={`tel:${na.helpline.tel}`} style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  Call NA: {na.helpline.number} ({na.helpline.hours})
                </a>
              </div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                Types of NA meetings in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.7 }}>
                UKNA lists three types of meeting. The meetings site shows which type each one is.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {MEETING_TYPES.map((mt, i) => (
                  <div key={i} style={{ padding: '14px 0', borderBottom: i < MEETING_TYPES.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{mt.type}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{mt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to expect: from UKNA's own newcomer page */}
            <FirstMeeting fellowship="na-meetings" location={loc.name} />

            {/* When the listing was checked, and how to report a mistake */}
            <ListingCheck fellowship="na-meetings" location={loc.name} path={`/na-meetings/${location}`} />

            <div style={{ marginBottom: 40 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Related resources in {loc.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { label: `AA Meetings in ${loc.name}`, href: `/aa-meetings/${location}` },
                  { label: `Drug Treatment in ${loc.name}`, href: `/drug-treatment/${location}` },
                  { label: `Rehab in ${loc.name}`, href: `/rehab/${location}` },
                  { label: `Cocaine Anonymous in ${loc.name}`, href: `/cocaine-anonymous/${location}` },
                  { label: `SMART Recovery in ${loc.name}`, href: `/smart-recovery/${location}` },
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
            <FaqBlock faqs={faqs} />

            <MeetingSources fellowship="na-meetings" />
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      {/* Global SiteFooter rendered by layout.tsx */}
    </div>
  )
}
