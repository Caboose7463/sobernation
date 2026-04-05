'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import {
  IconSun, IconTrophy, IconHeart, IconPill, IconBuilding,
  IconUsers, IconMessageCircle, IconTrendingUp, IconClock,
  IconArrowUp, IconAlertTriangle, IconLock
} from '@/components/icons'

const CATEGORIES = [
  { slug: 'daily',      name: 'Daily Check-in',        Icon: IconSun         },
  { slug: 'milestones', name: 'Milestones and Wins',    Icon: IconTrophy      },
  { slug: 'support',    name: 'I Need Support',         Icon: IconHeart       },
  { slug: 'substances', name: 'Substances',             Icon: IconPill        },
  { slug: 'treatment',  name: 'Treatment and Rehab',    Icon: IconBuilding    },
  { slug: 'family',     name: 'Family and Loved Ones',  Icon: IconUsers       },
  { slug: 'general',    name: 'General',                Icon: IconMessageCircle },
]

type Post = {
  id: string
  title: string
  slug: string
  body: string
  username: string
  upvotes: number
  comment_count: number
  created_at: string
  categories: { slug: string; name: string }
}

function timeAgo(iso: string) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<'hot' | 'new' | 'top'>('hot')
  const [user, setUser] = useState<User | null>(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [supabase])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/community/posts?sort=${sort}`)
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sort])

  const SORT_OPTIONS = [
    { key: 'hot' as const,  label: 'Top',    Icon: IconTrendingUp },
    { key: 'new' as const,  label: 'New',    Icon: IconClock      },
    { key: 'top' as const,  label: 'All time', Icon: IconArrowUp  },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
              SoberNation
            </Link>
            <span style={{ color: 'var(--text-light)', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Community</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user ? (
              <>
                <Link href="/community/submit" style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                  New post
                </Link>
                <button onClick={() => supabase.auth.signOut().then(() => setUser(null))} style={{ fontSize: 12, color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setShowSignIn(true)} style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>Sign in</button>
                <button onClick={() => setShowSignUp(true)} style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Join</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ padding: '20px 20px' }}>

        {/* Mobile category scroll */}
        <div className="community-mobile-cats" style={{ display: 'none', marginBottom: 16 }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/community/${cat.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', padding: '7px 12px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, fontWeight: 500, color: 'var(--text)', textDecoration: 'none', flexShrink: 0 }}>
              <cat.Icon size={13} color="var(--accent)" />
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="community-layout">
          {/* Main feed */}
          <div>
            {/* Crisis notice */}
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconAlertTriangle size={14} color="#991b1b" />
              <span>In crisis? Call <strong>Samaritans: 116 123</strong> or <strong>FRANK: 0300 123 6600</strong></span>
            </div>

            {/* Sort tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4, width: 'fit-content' }}>
              {SORT_OPTIONS.map(({ key, label, Icon }) => (
                <button key={key} onClick={() => setSort(key)} style={{ padding: '6px 14px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: 'calc(var(--radius-md) - 2px)', background: sort === key ? 'var(--white)' : 'transparent', color: sort === key ? 'var(--text)' : 'var(--text-muted)', boxShadow: sort === key ? 'var(--shadow-sm)' : 'none', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[...Array(5)].map((_, i) => <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', height: 96, opacity: 0.5 }} />)}
              </div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <IconMessageCircle size={32} color="var(--text-light)" />
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: '12px 0 6px' }}>No posts yet</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Be the first to start a conversation</p>
                <button onClick={() => setShowSignUp(true)} style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                  Join and post
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {posts.map(post => <PostCard key={post.id} post={post} />)}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="community-sidebar">
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <IconMessageCircle size={18} color="var(--accent)" />
              </div>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>SoberNation Community</h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14 }}>Share your story, ask questions and support others in recovery. Anonymous. No judgement.</p>
              {user ? (
                <Link href="/community/submit" style={{ display: 'block', width: '100%', padding: '10px 0', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, textAlign: 'center', textDecoration: 'none' }}>
                  Create post
                </Link>
              ) : (
                <button onClick={() => setShowSignUp(true)} style={{ width: '100%', padding: '10px 0', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                  Join for free
                </button>
              )}
            </div>

            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 18 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Categories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {CATEGORIES.map(cat => (
                  <Link key={cat.slug} href={`/community/${cat.slug}`} className="community-cat-link" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--text)', fontSize: 13, transition: 'background 0.1s' }}>
                    <cat.Icon size={14} color="var(--text-muted)" />
                    <span style={{ fontWeight: 500 }}>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} onSuccess={(u) => { setUser(u); setShowSignIn(false) }} onSwitchToSignUp={() => { setShowSignIn(false); setShowSignUp(true) }} supabase={supabase} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} onSuccess={(u) => { setUser(u); setShowSignUp(false) }} onSwitchToSignIn={() => { setShowSignUp(false); setShowSignIn(true) }} />}
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  const CatIcon = CATEGORIES.find(c => c.slug === post.categories?.slug)?.Icon ?? IconMessageCircle
  return (
    <Link href={`/community/${post.categories?.slug}/${post.slug}`} style={{ textDecoration: 'none' }}>
      <div className="post-card-hover" style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', cursor: 'pointer', transition: 'border-color 0.15s' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, background: 'var(--accent-pale)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
            <CatIcon size={11} color="var(--accent)" />
            {post.categories?.name}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{post.username} &middot; {timeAgo(post.created_at)}</span>
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: '0 0 5px', lineHeight: 1.4 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>
          {post.body}
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 12, color: 'var(--text-light)', alignItems: 'center' }}>
          <span className="icon-label"><IconArrowUp size={12} /> {post.upvotes}</span>
          <span className="icon-label"><IconMessageCircle size={12} /> {post.comment_count}</span>
        </div>
      </div>
    </Link>
  )
}

// ── Auth modals ───────────────────────────────────────────────────────────────

function SignInModal({ onClose, onSuccess, onSwitchToSignUp, supabase }: {
  onClose: () => void; onSuccess: (u: User) => void; onSwitchToSignUp: () => void; supabase: ReturnType<typeof createClient>
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false); return }
    if (data.user) onSuccess(data.user)
  }

  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <IconLock size={18} color="var(--accent)" />
        <h2 style={{ fontSize: 17, fontWeight: 700 }}>Sign in</h2>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Welcome back to SoberNation</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        {error && <div style={{ fontSize: 13, color: '#c0392b' }}>{error}</div>}
        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <p style={{ fontSize: 13, textAlign: 'center', marginTop: 16, color: 'var(--text-muted)' }}>
        No account? <button onClick={onSwitchToSignUp} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Join for free</button>
      </p>
    </Modal>
  )
}

function SignUpModal({ onClose, onSuccess, onSwitchToSignIn }: {
  onClose: () => void; onSuccess: (u: User) => void; onSwitchToSignIn: () => void
}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/community/auth/signup', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError || !signInData.user) { setError('Account created. Please sign in.'); setLoading(false); return }
    onSuccess(signInData.user)
  }

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Join SoberNation</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Your username is the only thing others see. Your email stays private.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="text" placeholder="Username (e.g. quiet_storm_42)" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} required minLength={3} maxLength={20} style={inputStyle} />
        <input type="email" placeholder="Email (kept private)" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password (min 8 characters)" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} style={inputStyle} />
        {error && <div style={{ fontSize: 13, color: '#c0392b' }}>{error}</div>}
        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Creating account...' : 'Join for free'}</button>
      </form>
      <p style={{ fontSize: 13, textAlign: 'center', marginTop: 16, color: 'var(--text-muted)' }}>
        Already a member? <button onClick={onSwitchToSignIn} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Sign in</button>
      </p>
    </Modal>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: 28, width: '100%', maxWidth: 400, boxShadow: 'var(--shadow-md)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--text-light)', lineHeight: 1 }}>x</button>
        {children}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)',
  fontSize: 14, outline: 'none', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--bg)',
}
const btnStyle: React.CSSProperties = {
  width: '100%', padding: '12px', background: 'var(--accent)', color: '#fff', border: 'none',
  borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, cursor: 'pointer',
}
