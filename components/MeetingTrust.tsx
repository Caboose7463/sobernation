/**
 * components/MeetingTrust.tsx
 *
 * Trust block for meeting pages (AA, NA, CA, Al-Anon by town):
 *   - what to expect at a first meeting, from the fellowship's own newcomer page
 *   - when the listing details were checked, and a clear report a mistake link
 *   - the Sources section (official meeting finder and newcomer pages)
 */
import Link from 'next/link'
import { FELLOWSHIPS, REVIEWED_ISO, REVIEWED_LABEL, REPORT_MISTAKE_HREF, type Fellowship } from '../lib/trust'
import SourcesSection from './SourcesSection'

export function FirstMeeting({ fellowship, location }: { fellowship: Fellowship['key']; location: string }) {
  const f = FELLOWSHIPS[fellowship]
  return (
    <section style={{ marginBottom: 36, padding: 24, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)' }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px' }}>
        What to expect at your first {f.name} meeting in {location}
      </h2>
      <ul style={{ margin: '0 0 12px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {f.firstMeeting.map(point => (
          <li key={point} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{point}</li>
        ))}
      </ul>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
        Summarised from{' '}
        <a href={f.firstMeetingSource.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          {f.firstMeetingSource.title}
        </a>{' '}
        on the {f.officialName} website.
      </p>
    </section>
  )
}

export function ListingCheck({ fellowship, location, path }: { fellowship: Fellowship['key']; location: string; path: string }) {
  const f = FELLOWSHIPS[fellowship]
  return (
    <section style={{ marginBottom: 36, padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px' }}>About this listing</h2>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 8px' }}>
        <strong style={{ color: 'var(--text)' }}>Last checked:</strong> <time dateTime={REVIEWED_ISO}>{REVIEWED_LABEL}</time>. On that date we checked the meeting finder link, the helpline number ({f.helpline.number}, {f.helpline.hours.toLowerCase()}) and the newcomer information on this page against the {f.officialName} website.
      </p>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 10px' }}>
        We do not run or list individual meetings. Meeting times and venues in {location} are set by local groups and can change at short notice, so always confirm on the{' '}
        <a href={f.finderUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>official {f.name} meeting finder</a> before you travel.
      </p>
      <Link
        href={REPORT_MISTAKE_HREF}
        style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)', padding: '8px 14px', textDecoration: 'none' }}
      >
        Report a mistake in this listing
      </Link>
      <span style={{ display: 'block', fontSize: 12, color: 'var(--text-light)', marginTop: 6 }}>
        Choose &quot;Correction request&quot; and include this page address: sobernation.co.uk{path}
      </span>
    </section>
  )
}

/** Pass `path` when the page has no MedicalWebPage schema of its own, to emit WebPage JSON-LD. */
export function MeetingSources({ fellowship, path }: { fellowship: Fellowship['key']; path?: string }) {
  return (
    <SourcesSection
      pageKey={fellowship}
      path={path}
      reviewNote="On this date we checked the meeting finder link, helpline number and newcomer information on this page against the fellowship's own website."
    />
  )
}
