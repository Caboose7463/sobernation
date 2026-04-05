import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { IconMessageCircle, IconArrowUp } from '@/components/icons'

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
  } catch { return null }
}

export default async function CommunityCard() {
  const post = await getLatestPost()

  return (
    <div className="container-wide" style={{ padding: '0 20px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: 16,
        padding: '28px',
        margin: '48px 0',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 240, height: 240, background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconMessageCircle size={16} color="rgba(255,255,255,0.9)" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>SoberNation Community</div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>
              Real people. Real stories. Real support. Completely anonymous.
            </div>

            {post && (
              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '12px 14px', marginBottom: 20, borderLeft: '3px solid rgba(99,102,241,0.7)' }}>
                <p style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 5px', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
                  &ldquo;{post.body?.slice(0, 110)}{(post.body?.length ?? 0) > 110 ? '...' : ''}&rdquo;
                </p>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{post.username}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/community" style={{ padding: '10px 22px', background: 'rgb(99,102,241)', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
                Join the conversation
              </Link>
              <Link href="/community/support" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                Need support now?
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
            {[
              { label: 'Daily Check-in',     href: '/community/daily'      },
              { label: 'Milestones',         href: '/community/milestones'  },
              { label: 'I Need Support',     href: '/community/support'     },
              { label: 'Treatment and Rehab', href: '/community/treatment'  },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(99,102,241,0.6)', flexShrink: 0 }} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
