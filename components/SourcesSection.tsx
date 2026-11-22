/**
 * components/SourcesSection.tsx
 *
 * "Sources" block for advice and meeting pages, fed by the per page lists in lib/trust.ts.
 * Shows the official sources, the last reviewed date, and links to the editorial
 * policy and the report a mistake form.
 *
 * Pass `path` to also emit WebPage JSON-LD with lastReviewed, dateModified and citations.
 * Leave it out when the page already emits a MedicalWebPage that includes
 * reviewedSchemaProps() (so the page does not describe itself twice).
 */
import Link from 'next/link'
import { getSources, citationSchema, REVIEWED_ISO, REPORT_MISTAKE_HREF, SITE_URL } from '../lib/trust'

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

interface Props {
  pageKey: string
  path?: string
  reviewedIso?: string
  /** What the review covered, shown under the date. */
  reviewNote?: string
}

export default function SourcesSection({ pageKey, path, reviewedIso = REVIEWED_ISO, reviewNote }: Props) {
  const sources = getSources(pageKey)
  if (!sources.length) return null

  const schema = path
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: `${SITE_URL}${path}`,
        lastReviewed: reviewedIso,
        dateModified: reviewedIso,
        citation: citationSchema(sources),
        publisher: { '@type': 'Organization', name: 'SoberNation', url: SITE_URL },
      }
    : null

  return (
    <section
      aria-labelledby={`sources-${pageKey}`}
      style={{
        marginTop: 40,
        padding: '22px 22px 18px',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <h2 id={`sources-${pageKey}`} style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>
        Sources
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 12px' }}>
        This page is based on information from these official sources. Follow the links for the full guidance.
      </p>
      <ul style={{ margin: '0 0 16px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sources.map(s => (
          <li key={s.url} style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              {s.title}
            </a>{' '}
            <span style={{ fontSize: 12 }}>({s.publisher})</span>
          </li>
        ))}
      </ul>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        <div>
          <strong style={{ color: 'var(--text)' }}>Last reviewed:</strong>{' '}
          <time dateTime={reviewedIso}>{fmt(reviewedIso)}</time> by the Sober Nation editorial team.
        </div>
        <div style={{ marginTop: 4 }}>
          {reviewNote ?? 'On this date we checked that the sources above are current and relevant, and that the helpline numbers on this page match the services’ own websites.'}
        </div>
        <div style={{ marginTop: 8 }}>
          This page is general information, not medical advice. Read{' '}
          <Link href="/editorial-policy" style={{ color: 'var(--accent)' }}>how we research and check our pages</Link>, or{' '}
          <Link href={REPORT_MISTAKE_HREF} style={{ color: 'var(--accent)' }}>report a mistake</Link>.
        </div>
      </div>
    </section>
  )
}
