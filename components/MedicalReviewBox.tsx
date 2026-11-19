import Link from 'next/link'

interface Props {
  lastReviewed?: string
  compact?: boolean
}

/** Byline box for guide pages. Pages are written by the editorial team and are not medically reviewed. */
export default function MedicalReviewBox({ lastReviewed = 'April 2026', compact = false }: Props) {
  if (compact) {
    return (
      <div style={{
        padding: '10px 14px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        fontSize: 12,
        color: 'var(--text-muted)',
      }}>
        Written by the Sober Nation editorial team · Updated {lastReviewed} · Not medical advice ·{' '}
        <Link href="/editorial-policy" style={{ textDecoration: 'underline' }}>Editorial policy</Link>
      </div>
    )
  }

  return (
    <div style={{
      padding: '16px 20px',
      background: 'var(--bg-subtle)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.6,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>
        Written by the Sober Nation editorial team · Updated {lastReviewed}
      </div>
      We research our guides from public sources such as the{' '}
      <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer">NHS</a>,{' '}
      <a href="https://www.nice.org.uk" target="_blank" rel="noopener noreferrer">NICE</a> and the{' '}
      <a href="https://www.cqc.org.uk" target="_blank" rel="noopener noreferrer">CQC</a> register. We are not doctors, and this page is not medical advice:
      always speak to a qualified healthcare professional.{' '}
      <Link href="/editorial-policy" style={{ fontWeight: 600 }}>Our editorial policy</Link>
    </div>
  )
}
