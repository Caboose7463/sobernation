/**
 * app/articles/[slug]/page.tsx — Full article page
 */

import { getSupabase, formatDate } from '../../../lib/articles'
import type { Article } from '../../../lib/articles'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '../../../components/ArticleCard'
import AuthorBio from '../../../components/AuthorBio'
import MedicalReview from '../../../components/MedicalReview'
import NewsletterSignup from '../../../components/NewsletterSignup'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = getSupabase()
  const { data } = await supabase.from('articles').select('title, excerpt, hero_image_url').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: `${data.title} | SoberNation`,
    description: data.excerpt ?? undefined,
    openGraph: {
      title: data.title,
      description: data.excerpt ?? undefined,
      images: data.hero_image_url ? [data.hero_image_url] : [],
    },
  }
}

/** Convert markdown-ish content to HTML */
function markdownToHtml(md: string): string {
  return md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '')
    .replace(/^(.+)(?!<\/[hul]>)$/gm, (l) => l.startsWith('<') ? l : `<p>${l}</p>`)
    .replace(/<p><\/p>/g, '')
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) notFound()
  const a = article as Article

  // Related articles (same tags, different slug)
  const { data: related } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .neq('slug', slug)
    .overlaps('tags', a.tags ?? [])
    .order('published_at', { ascending: false })
    .limit(3)

  const htmlContent = markdownToHtml(a.content ?? '')

  // FAQ items extracted from content (between ## Frequently Asked Questions and end)
  const faqMatch = a.content?.match(/## Frequently Asked Questions\n\n([\s\S]+)$/)
  const hasFaq = !!faqMatch

  // JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    image: a.hero_image_url ?? undefined,
    author: { '@type': 'Person', name: a.author_name },
    publisher: {
      '@type': 'Organization',
      name: 'SoberNation',
      logo: { '@type': 'ImageObject', url: 'https://www.sobernation.co.uk/logo.png' },
    },
    datePublished: a.published_at,
    dateModified: a.published_at,
    mainEntityOfPage: `https://www.sobernation.co.uk/articles/${a.slug}`,
  }

  const authorInitials = a.author_name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <style>{`
        .ap-hero { position: relative; height: 420px; background: #0f1f1a; overflow: hidden; }
        @media (max-width: 640px) { .ap-hero { height: 280px; } }
        .ap-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%); z-index: 1; }
        .ap-hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 40px 20px; z-index: 2; max-width: 820px; margin: 0 auto; }
        .ap-bc { font-size: 12px; color: rgba(255,255,255,0.75); margin-bottom: 14px; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
        .ap-bc a { color: rgba(255,255,255,0.75) !important; text-decoration: none; }
        .ap-bc a:hover { color: #fff !important; }
        .ap-bc span { color: rgba(255,255,255,0.55); }
        .ap-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.15); color: #fff !important; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; backdrop-filter: blur(4px); }
        .ap-title { font-size: clamp(22px, 4vw, 38px); font-weight: 800; color: #fff !important; letter-spacing: -0.02em; line-height: 1.2; margin: 0; text-shadow: 0 2px 12px rgba(0,0,0,0.4); }
        .ap-no-image .ap-hero { background: linear-gradient(135deg, #0f1f1a 0%, #1a3d30 100%); }
        .ap-no-image .ap-hero-overlay { background: none; }
        .ap-no-image .ap-hero-content { position: absolute; }
        .ap-body { max-width: 820px; margin: 0 auto; padding: 40px 20px 80px; }
        .ap-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 36px; padding-bottom: 20px; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
        .ap-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .ap-meta-text { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
        .ap-meta-name { font-weight: 700; color: var(--text); }
        .ap-content h2 { font-size: 22px; font-weight: 700; color: var(--text); margin: 36px 0 14px; letter-spacing: -0.01em; padding-top: 8px; border-top: 1px solid var(--border); }
        .ap-content h3 { font-size: 18px; font-weight: 700; color: var(--text); margin: 28px 0 10px; }
        .ap-content p { font-size: 16px; color: #374151; line-height: 1.85; margin: 0 0 20px; }
        .ap-content ul { margin: 0 0 20px; padding-left: 24px; }
        .ap-content li { font-size: 16px; color: #374151; line-height: 1.75; margin-bottom: 8px; }
        .ap-content strong { color: var(--text); font-weight: 700; }
        .ap-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border); }
        .ap-tag-chip { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px; background: var(--accent-pale); color: var(--accent); text-decoration: none; }
        .ap-cta { margin-top: 40px; padding: 24px 28px; background: linear-gradient(135deg, #1a6b5a, #2d8a72); border-radius: 14px; color: #fff; }
        .ap-cta h3 { font-size: 20px; font-weight: 800; margin-bottom: 8px; color: #fff; }
        .ap-cta p { font-size: 14px; opacity: 0.9; margin-bottom: 16px; line-height: 1.6; color: #fff; }
        .ap-cta-btn { display: inline-block; background: #fff; color: #1a6b5a; font-size: 14px; font-weight: 700; padding: 10px 22px; border-radius: 8px; text-decoration: none; }
        .ap-related { margin-top: 56px; padding-top: 32px; border-top: 1px solid var(--border); }
        .ap-related-title { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 20px; }
        .ap-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        @media (max-width: 640px) { .ap-related-grid { grid-template-columns: 1fr; } .ap-body { padding: 24px 16px 60px; } }
      `}</style>

      {/* Hero */}
      <div className={`ap-hero${a.hero_image_url ? '' : ' ap-no-image'}`}>
        {a.hero_image_url && (
          <Image
            src={a.hero_image_url}
            alt={a.hero_image_alt ?? a.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        )}
        <div className="ap-hero-overlay" />
        <div className="ap-hero-content">
          <div className="ap-bc">
            <Link href="/">Home</Link> /
            <Link href="/articles">News & Guides</Link> /
            <span>{a.title.slice(0, 50)}{a.title.length > 50 ? '…' : ''}</span>
          </div>
          {a.tags?.[0] && <span className="ap-tag">{a.tags[0]}</span>}
          <h1 className="ap-title">{a.title}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="ap-body">
        {/* Author + meta */}
        <div className="ap-meta">
          <div className="ap-avatar">{authorInitials}</div>
          <div className="ap-meta-text">
            <div className="ap-meta-name">{a.author_name} · SoberNation</div>
            <div>{formatDate(a.published_at)} · {a.read_time_mins} min read</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <MedicalReview reviewer="Dr. Sarah Dawson" date={a.published_at} />
          </div>
        </div>

        {/* Article content */}
        <div
          className="ap-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {a.tags?.length > 0 && (
          <div className="ap-tags">
            {a.tags.map((t: string) => (
              <Link key={t} href={`/articles?tag=${t}`} className="ap-tag-chip">
                #{t}
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="ap-cta">
          <h3>Ready to take the first step?</h3>
          <p>Find CQC-registered rehab centres and verified addiction counsellors near you — free, confidential, no waiting list for information.</p>
          <Link href="/find-rehab" className="ap-cta-btn">Find help near you →</Link>
        </div>

        {/* Newsletter signup */}
        <div style={{ marginTop: 32 }}>
          <NewsletterSignup variant="inline" source="article" />
        </div>

        {/* Author bio */}
        <div style={{ marginTop: 32 }}>
          <AuthorBio author={a.author_name} date={a.published_at} />
        </div>

        {/* Related articles */}
        {related && related.length > 0 && (
          <div className="ap-related">
            <h2 className="ap-related-title">Related articles</h2>
            <div className="ap-related-grid">
              {(related as Article[]).map(r => (
                <ArticleCard key={r.id} article={r} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
