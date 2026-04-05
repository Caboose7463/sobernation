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
    <div className="container-wide" style={{ padding: '0 20px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: 16,
        padding: '28px 28px',
        margin: '48px 0',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 240, height: 240, background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '30%', width: 160, height: 160, background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>💬</span>
              <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>Join the SoberNation Community</div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 18 }}>
              Real people. Real stories. Real support. Completely anonymous.
            </div>

            {post && (
              <div style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 10,
                padding: '12px 14px',
                marginBottom: 20,
                borderLeft: '3px solid rgba(99,102,241,0.8)',
              }}>
                <p style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 5px', color: 'rgba(255,255,255,0.88)', fontStyle: 'italic' }}>
                  &ldquo;{post.body?.slice(0, 110)}{(post.body?.length ?? 0) > 110 ? '...' : ''}&rdquo;
                </p>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{post.username}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/community"
                style={{
                  padding: '11px 24px',
                  background: 'rgb(99,102,241)',
                  color: '#fff',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Join the conversation
              </Link>
              <Link href="/community/support" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                Need support now?
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
            {['Daily Check-in', 'Milestones and Wins', 'I Need Support', 'Treatment advice'].map((label, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(99,102,241,0.7)', flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
