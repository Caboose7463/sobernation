import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ category: string }> }

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  daily: 'How are you doing today? Check in here every morning or whenever you need to.',
  milestones: 'Share your sobriety milestones here. Every day counts and every win deserves to be heard.',
  support: 'Struggling? Post here. You are not alone and this community is listening.',
  substances: 'A space to talk about specific substances, withdrawal, and what helped.',
  treatment: 'Questions about detox, rehab options, waiting times, and what to expect.',
  family: 'For people supporting a loved one with addiction. This space is for you too.',
  general: 'Anything that does not fit elsewhere. Recovery, life, everything.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const supabase = await createClient()
  const { data: cat } = await supabase.from('categories').select('name, description').eq('slug', category).single()
  if (!cat) return { title: 'SoberNation Community' }
  return {
    title: `${cat.name} | SoberNation Community`,
    description: cat.description,
  }
}

function timeAgo(iso: string) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const supabase = await createClient()

  const [{ data: cat }, { data: posts }] = await Promise.all([
    supabase.from('categories').select('*').eq('slug', category).single(),
    supabase
      .from('posts')
      .select('id, title, slug, body, username, upvotes, comment_count, is_pinned, created_at, categories(slug, name, icon)')
      .eq('is_hidden', false)
      .eq('categories.slug', category)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(50),
  ])

  if (!cat) return <div>Category not found</div>

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48, fontSize: 13 }}>
          <Link href="/community" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Community</Link>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>{cat.icon} {cat.name}</span>
        </div>
      </div>

      <div className="container-wide" style={{ padding: '24px 20px', maxWidth: 760 }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px 22px', marginBottom: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon}</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>{cat.name}</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
            {CATEGORY_DESCRIPTIONS[category] || cat.description}
          </p>
        </div>

        {!posts || posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>No posts here yet</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Be the first to start a conversation in this category</p>
            <Link href="/community" style={{ display: 'inline-block', marginTop: 16, padding: '10px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Go to community home
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {posts.map((post: {
              id: string; title: string; slug: string; body: string;
              username: string; upvotes: number; comment_count: number;
              is_pinned: boolean; created_at: string;
              categories: { slug: string; name: string; icon: string } | { slug: string; name: string; icon: string }[] | null;
            }) => {
              const cat2 = Array.isArray(post.categories) ? post.categories[0] : post.categories
              return (
                <Link key={post.id} href={`/community/${category}/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--white)', border: `1px solid ${post.is_pinned ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', padding: '16px 18px', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                    {post.is_pinned && <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>📌 Pinned</div>}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{post.username} &middot; {timeAgo(post.created_at)}</span>
                    </div>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.4 }}>{post.title}</h2>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>
                      {post.body}
                    </p>
                    <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--text-light)' }}>
                      <span>⬆️ {post.upvotes}</span>
                      <span>💬 {post.comment_count}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
