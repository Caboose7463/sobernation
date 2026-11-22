/**
 * components/AuthorBio.tsx
 * Byline for guides and articles. Every page is credited to the Sober Nation editorial team.
 * The `author` prop is accepted for older call sites but is ignored.
 */
import Link from 'next/link'

export const EDITORIAL_TEAM = 'the Sober Nation editorial team'

interface Props {
  author?: string
  date?: string
  compact?: boolean
}

const fmt = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function AuthorBio({ date, compact = false }: Props) {
  if (compact) {
    return (
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Written by {EDITORIAL_TEAM}{date ? ` · Updated ${fmt(date)}` : ''}
      </div>
    )
  }

  return (
    <div style={{
      padding: '20px',
      background: 'var(--bg-subtle)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 4 }}>
        Written by
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>The Sober Nation editorial team</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>
        We research our guides from public sources such as the NHS, NICE, FRANK and UK recovery charities. We are not doctors or counsellors, and this page is not medical advice. If you need help, speak to your GP or call FRANK on 0300 123 6600 (24 hours). <Link href="/editorial-policy">How we write our guides</Link>.
      </div>
      {date && (
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-light)' }}>
          Updated {fmt(date)}
        </div>
      )}
    </div>
  )
}
