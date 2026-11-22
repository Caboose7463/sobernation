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
  return locationMetadata('aa-meetings', loc.name)
}

const MEETING_TYPES = [
  { type: 'Open meetings', desc: 'Open to anyone, including family and friends supporting someone. A good place to start if you are unsure about your drinking.' },
  { type: 'Closed meetings', desc: 'For alcoholics and people who think or know they have a problem with drinking.' },
  { type: 'In person and online', desc: 'The official meeting finder lets you search in person meetings by town or postcode, or choose online only meetings, and filter by day and time of day.' },
  { type: 'Access needs', desc: 'The finder can filter for wheelchair access, sign language and hearing aid loops.' },
]

function buildFaqs(name: string) {
  return [
    {
      question: `How do I find an AA meeting in ${name}?`,
      answer: `Search for ${name} on the official Alcoholics Anonymous Great Britain meeting finder at alcoholics-anonymous.org.uk/find-a-meeting. You can filter by day, time of day, in person or online, and access needs. You can also call the free AA helpline on 0800 917 7650 or email help@aamail.org.`,
    },
    {
      question: `What happens at my first AA meeting in ${name}?`,
      answer: `AA says you can just come and listen, or you can talk and share: it is up to you. Anyone with a desire to stop drinking is welcome, whatever your gender, sexual orientation, income, religion or race.`,
    },
    {
      question: `Do I have to be an alcoholic to attend AA meetings?`,
      answer: `The only requirement for AA membership is a desire to stop drinking. Open meetings are also open to non alcoholics, such as family and friends. Closed meetings are for alcoholics and people who think or know they have a problem with drinking.`,
    },
    {
      question: `Is AA free?`,
      answer: `Yes. AA says it is free to attend and there are no dues or fees for membership. Groups are self supporting through their own members' contributions.`,
    },
    {
      question: `What is the difference between AA and NA?`,
      answer: `Alcoholics Anonymous is for people who want to stop drinking. Narcotics Anonymous is for people with a problem with drugs. Both are free 12 step fellowships, and some people go to both.`,
    },
    {
      question: `Are there online AA meetings I can join from ${name}?`,
      answer: `Yes. The official AA meeting finder has an online only option that lists online meetings by day and time, so you can join from ${name} or anywhere else.`,
    },
    {
      question: `What if a meeting listed for ${name} has changed or stopped?`,
      answer: `Local groups update their own details with AA, so the official finder is the most up to date source. If you spot a mistake on this page, please use our report a mistake link and we will check it.`,
    },
  ]
}

export default async function AAMeetingsPage(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()

  const faqs = buildFaqs(loc.name)
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'AA Meetings', href: '/aa-meetings' },
    { name: loc.name, href: `/aa-meetings/${location}` },
  ]

  const aa = FELLOWSHIPS['aa-meetings']
  const snippet = `AA (Alcoholics Anonymous) meetings in ${loc.name} are free and open to anyone with a desire to stop drinking. Find open and closed meetings, in person or online, on the official AA meeting finder at alcoholics-anonymous.org.uk, or call the free AA helpline on ${aa.helpline.number}.`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: `AA Meetings in ${loc.name}`,
      description: `How to find Alcoholics Anonymous meetings in ${loc.name}, with the official meeting finder, AA helpline and what to expect at a first meeting.`,
      url: `https://www.sobernation.co.uk/aa-meetings/${location}`,
      extra: reviewedSchemaProps('aa-meetings'),
    }),
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <LocationHero
        title={`AA Meetings in ${loc.name}`}
        subtitle={`${loc.country} · Alcoholics Anonymous`}
        snippet={snippet}
        locationName={loc.name}
        locationSlug={location}
        pageType="aa-meetings"
        hasCqcData={false}
        centreCount={0}
      />

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>

            {/* Meeting finder CTA */}
            <div style={{ marginBottom: 32, padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                How to find AA meetings in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                The official Alcoholics Anonymous Great Britain meeting finder lists meetings run by local AA groups. Type {loc.name} or your postcode, then filter by day, time of day, in person or online.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={aa.finderUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  Find AA meetings near {loc.name} ↗
                </a>
                <a href={`tel:${aa.helpline.tel}`} style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  Call AA free: {aa.helpline.number}
                </a>
              </div>
            </div>

            {/* Meeting types */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                Types of AA meetings in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.7 }}>
                The official finder marks each meeting as open or closed. If you are not sure which to choose, an open meeting is a good place to start.
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

            {/* What to expect: from AA's own newcomer pages */}
            <FirstMeeting fellowship="aa-meetings" location={loc.name} />

            {/* When the listing was checked, and how to report a mistake */}
            <ListingCheck fellowship="aa-meetings" location={loc.name} path={`/aa-meetings/${location}`} />

            {/* Related links */}
            <div style={{ marginBottom: 40 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Related resources in {loc.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { label: `NA Meetings in ${loc.name}`, href: `/na-meetings/${location}` },
                  { label: `Rehab in ${loc.name}`, href: `/rehab/${location}` },
                  { label: `SMART Recovery in ${loc.name}`, href: `/smart-recovery/${location}` },
                  { label: `Al-Anon for families in ${loc.name}`, href: `/al-anon/${location}` },
                  { label: 'Alcohol addiction help', href: `/alcohol-addiction/${location}` },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about AA in {loc.name}
            </h2>
            <FaqBlock faqs={faqs} />

            <MeetingSources fellowship="aa-meetings" />
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      {/* Global crisis band and SiteFooter are rendered by layout.tsx */}
    </div>
  )
}
