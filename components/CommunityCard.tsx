import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

async function getLatestPost() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('title, body, username, slug, categories(slug)')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return data
  } catch {
    return null
  }
}

export default async function CommunityCard() {
  const post = await getLatestPost()

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: 'var(--radius-lg, 16px)',
      padding: '28px 24px',
      margin: '40px 0',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 22 }}>💬</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>Join the SoberNation Community</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Real people. Real stories. Real support.</div>
          </div>
        </div>

        {post && (
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 10,
            padding: '14px 16px',
            marginBottom: 18,
            borderLeft: '3px solid rgba(99,102,241,0.7)',
          }}>
            <p style={{ fontSize: 13, lineHeight: 1.55, margin: '0 0 6px', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
              &ldquo;{post.body?.slice(0, 120)}{(post.body?.length ?? 0) > 120 ? '...' : ''}&rdquo;
            </p>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{post.username}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/community"
            style={{
              padding: '10px 22px',
              background: 'rgba(99,102,241,1)',
              color: '#fff',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'opacity 0.15s',
            }}
          >
            Join the conversation
          </Link>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Completely anonymous</span>
        </div>
      </div>
    </div>
  )
}
