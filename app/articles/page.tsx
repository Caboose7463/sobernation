/**
 * app/articles/page.tsx — News & Articles index
 */

import { getSupabase } from '../../lib/articles'
import ArticleCard from '../../components/ArticleCard'
import type { Article } from '../../lib/articles'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Recovery News & Guides | SoberNation',
  description: 'Expert articles on addiction, recovery, UK rehab options, sobriety milestones and mental health — written by addiction specialists at SoberNation.',
}

const TAGS = ['All', 'Alcohol', 'Drugs', 'Recovery', 'Rehab', 'Location', 'Milestones', 'Guides']

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>
}) {
  const { tag, page } = await searchParams
  const currentTag = tag?.toLowerCase() ?? 'all'
  const currentPage = Math.max(1, parseInt(page ?? '1'))
  const pageSize = 12
  const offset = (currentPage - 1) * pageSize

  const supabase = getSupabase()

  let query = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (currentTag !== 'all') {
    query = query.contains('tags', [currentTag])
  }

  const { data: articles, count } = await query
  const totalPages = Math.ceil((count ?? 0) / pageSize)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <style>{`
        .ar-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 56px 20px 40px; text-align: center; }
        .ar-title { font-size: clamp(26px, 4vw, 40px); font-weight: 800; color: var(--text); letter-spacing: -0.03em; margin-bottom: 10px; }
        .ar-sub { font-size: 15px; color: var(--text-muted); max-width: 520px; margin: 0 auto 28px; line-height: 1.6; }
        .ar-tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .ar-tag { font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px; border: 1px solid var(--border); text-decoration: none; color: var(--text-muted); transition: all 0.12s; background: var(--white); }
        .ar-tag:hover, .ar-tag--active { background: var(--accent); color: #fff; border-color: var(--accent); }
        .ar-body { max-width: 1200px; margin: 0 auto; padding: 40px 20px 64px; }
        .ar-count { font-size: 13px; color: var(--text-muted); margin-bottom: 24px; }
        .ar-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        @media (max-width: 640px) { .ar-grid { grid-template-columns: 1fr; } }
        .ar-empty { text-align: center; padding: 60px 20px; color: var(--text-muted); }
        .ar-pagination { display: flex; gap: 8px; justify-content: center; margin-top: 40px; flex-wrap: wrap; }
        .ar-page-btn { font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border); text-decoration: none; color: var(--text-muted); background: var(--white); }
        .ar-page-btn--active { background: var(--accent); color: #fff; border-color: var(--accent); }
      `}</style>

      {/* Hero */}
      <div className="ar-hero">
        <h1 className="ar-title">Recovery News & Guides</h1>
        <p className="ar-sub">
          Expert articles on addiction, sobriety, UK rehab options and mental health — written by our specialist team.
        </p>
        <div className="ar-tags">
          {TAGS.map(t => (
            <Link
              key={t}
              href={t === 'All' ? '/articles' : `/articles?tag=${t.toLowerCase()}`}
              className={`ar-tag ${currentTag === t.toLowerCase() || (t === 'All' && currentTag === 'all') ? 'ar-tag--active' : ''}`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      <div className="ar-body">
        <p className="ar-count">{count ?? 0} articles</p>

        {articles && articles.length > 0 ? (
          <div className="ar-grid">
            {(articles as Article[]).map(a => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <div className="ar-empty">
            <p>No articles yet — check back soon.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="ar-pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Link
                key={p}
                href={`/articles?${currentTag !== 'all' ? `tag=${currentTag}&` : ''}page=${p}`}
                className={`ar-page-btn ${p === currentPage ? 'ar-page-btn--active' : ''}`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
