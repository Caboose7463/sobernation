/**
 * components/ArticleCard.tsx
 * Reusable article card for grids, location pages, sidebars.
 */

import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '../lib/articles'
import { formatDate } from '../lib/articles'

interface Props {
  article: Article
  compact?: boolean
}

export default function ArticleCard({ article, compact = false }: Props) {
  const tag = article.tags?.[0]

  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'box-shadow 0.15s, transform 0.15s',
      }}
      className="article-card"
    >
      {/* Hero image */}
      {article.hero_image_url && !compact && (
        <div style={{ position: 'relative', height: 180, flexShrink: 0, background: '#f1f5f9' }}>
          <Image
            src={article.hero_image_url}
            alt={article.hero_image_alt ?? article.title}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Body */}
      <div style={{ padding: compact ? '14px 16px' : '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Tag chip */}
        {tag && (
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-pale)',
            padding: '3px 8px', borderRadius: 20, alignSelf: 'flex-start',
          }}>
            {tag.replace(/-/g, ' ')}
          </span>
        )}

        {/* Title */}
        <h3 style={{
          fontSize: compact ? 14 : 16, fontWeight: 700, color: 'var(--text)',
          lineHeight: 1.35, margin: 0, letterSpacing: '-0.01em',
        }}>
          {article.title}
        </h3>

        {/* Excerpt */}
        {!compact && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, flex: 1 }}>
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11, color: 'var(--text-light)', marginTop: compact ? 0 : 4, gap: 8,
        }}>
          <span>{article.author_name} · {formatDate(article.published_at)}</span>
          <span style={{ whiteSpace: 'nowrap' }}>{article.read_time_mins} min read</span>
        </div>
      </div>

      <style>{`
        .article-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
      `}</style>
    </Link>
  )
}
