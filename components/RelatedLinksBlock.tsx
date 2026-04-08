/**
 * RelatedLinksBlock
 *
 * Reusable internal linking section. Renders a themed grid of contextual
 * links to prevent orphan pages and improve crawl flow between deep pages.
 *
 * Use it at the bottom of any major page template.
 */
import Link from 'next/link'

export interface RelatedLink {
  label: string
  href: string
  description?: string
}

interface Props {
  title?: string
  links: RelatedLink[]
  /** Optional accent colour class or style override */
  compact?: boolean
}

export default function RelatedLinksBlock({ title = 'Related resources', links, compact = false }: Props) {
  if (!links.length) return null

  if (compact) {
    return (
      <div style={{
        marginTop: 32,
        padding: '18px 20px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: 12,
        }}>
          {title}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: 'inline-block',
                padding: '7px 14px',
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                fontSize: 13,
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'border-color 0.12s, color 0.12s',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section style={{ marginTop: 40 }}>
      <h2 style={{
        fontSize: 16, fontWeight: 700, color: 'var(--text)',
        marginBottom: 14, letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 10,
      }}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              display: 'flex', flexDirection: 'column', gap: 3,
              padding: '13px 15px',
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              transition: 'border-color 0.12s, box-shadow 0.12s',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
              {l.label}
            </span>
            {l.description && (
              <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {l.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
