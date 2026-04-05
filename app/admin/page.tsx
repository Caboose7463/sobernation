'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Story } from '../../lib/stories'

type StoryTab = 'pending' | 'all'
type MainTab = 'stories' | 'community'

type FlaggedPost = {
  id: string
  title: string
  body: string
  username: string
  flag_count: number
  created_at: string
  categories: { name: string } | null
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).map(w => w[0]?.toUpperCase() ?? '').slice(0, 2).join('')
}

function excerptStory(story: string, chars = 180) {
  return story.length <= chars ? story : story.slice(0, chars).replace(/\s\S*$/, '') + '…'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminPage() {
  const [pin, setPin] = useState('')
  const [authed, setAuthed] = useState(false)
  const [pinError, setPinError] = useState('')
  const [mainTab, setMainTab] = useState<MainTab>('stories')

  // Stories state
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(false)
  const [storyTab, setStoryTab] = useState<StoryTab>('pending')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  // Community state
  const [flaggedPosts, setFlaggedPosts] = useState<FlaggedPost[]>([])
  const [allPosts, setAllPosts] = useState<FlaggedPost[]>([])
  const [communityLoading, setCommunityLoading] = useState(false)
  const [communityTab, setCommunityTab] = useState<'flagged' | 'all'>('flagged')

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin === '7463') {
      setAuthed(true)
      sessionStorage.setItem('admin_pin', pin)
    } else {
      setPinError('Incorrect PIN')
      setPin('')
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pin')
    if (saved === '7463') setAuthed(true)
  }, [])

  useEffect(() => {
    if (!authed) return
    if (mainTab === 'stories') loadStories()
    if (mainTab === 'community') loadCommunity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, mainTab, storyTab, communityTab])

  async function loadStories() {
    setLoading(true)
    try {
      const endpoint = storyTab === 'pending' ? '/api/stories/pending' : '/api/stories'
      const headers: Record<string, string> = storyTab === 'pending' ? { 'x-admin-pin': '7463' } : {}
      const res = await fetch(endpoint, { headers })
      const data = await res.json()
      setStories(Array.isArray(data) ? data : [])
    } catch {
      setStories([])
    } finally {
      setLoading(false)
    }
  }

  async function loadCommunity() {
    setCommunityLoading(true)
    try {
      const endpoint = communityTab === 'flagged'
        ? '/api/community/admin/flagged'
        : '/api/community/admin/posts'
      const res = await fetch(endpoint, { headers: { 'x-admin-pin': '7463' } })
      const data = await res.json()
      if (communityTab === 'flagged') setFlaggedPosts(Array.isArray(data) ? data : [])
      else setAllPosts(Array.isArray(data) ? data : [])
    } catch {
      if (communityTab === 'flagged') setFlaggedPosts([])
      else setAllPosts([])
    } finally {
      setCommunityLoading(false)
    }
  }

  async function handleStoryAction(id: string, status: 'approved' | 'rejected') {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/stories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, pin: '7463' }),
      })
      if (res.ok) {
        setStories(prev => prev.filter(s => s.id !== id))
        setToast(status === 'approved' ? '✓ Story approved and published' : '✗ Story rejected')
        setTimeout(() => setToast(''), 3000)
      }
    } finally {
      setActionLoading(null)
    }
  }

  async function handlePostAction(id: string, action: 'restore' | 'delete' | 'pin') {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/community/admin/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-pin': '7463' },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        setFlaggedPosts(prev => prev.filter(p => p.id !== id))
        setAllPosts(prev => prev.filter(p => p.id !== id))
        setToast(action === 'restore' ? '✓ Post restored' : action === 'delete' ? '✗ Post deleted' : '📌 Post pinned')
        setTimeout(() => setToast(''), 3000)
      }
    } finally {
      setActionLoading(null)
    }
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 360, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 20 }}>🔐</div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Admin Dashboard</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Enter your PIN to continue</p>
          </div>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError('') }}
              placeholder="Enter PIN"
              maxLength={8}
              autoFocus
              style={{ width: '100%', padding: '14px 16px', border: `1px solid ${pinError ? '#c0392b' : 'var(--border-mid)'}`, borderRadius: 'var(--radius-md)', fontSize: 20, textAlign: 'center', letterSpacing: '0.3em', outline: 'none', boxSizing: 'border-box', marginBottom: pinError ? 8 : 16 }}
            />
            {pinError && <div style={{ fontSize: 13, color: '#c0392b', textAlign: 'center', marginBottom: 14 }}>{pinError}</div>}
            <button type="submit" style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Unlock
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/" style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>Back to site</Link>
          </div>
        </div>
      </div>
    )
  }

  const communityPosts = communityTab === 'flagged' ? flaggedPosts : allPosts

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, background: 'var(--accent)', color: '#fff', padding: '12px 18px', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600, boxShadow: 'var(--shadow-md)' }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
              SoberNation
            </Link>
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>/ Admin</span>
          </div>
          <button onClick={() => { sessionStorage.removeItem('admin_pin'); setAuthed(false) }} style={{ fontSize: 12, color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}>
            Lock
          </button>
        </div>
      </div>

      {/* Main tab switcher */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', gap: 0 }}>
          {(['stories', 'community'] as MainTab[]).map(t => (
            <button
              key={t}
              onClick={() => setMainTab(t)}
              style={{
                padding: '14px 20px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: 'transparent', borderBottom: mainTab === t ? '2px solid var(--accent)' : '2px solid transparent',
                color: mainTab === t ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'all 0.15s', textTransform: 'capitalize',
              }}
            >
              {t === 'stories' ? '📝 Stories' : '💬 Community'}
            </button>
          ))}
        </div>
      </div>

      <div className="container-wide" style={{ padding: '32px 20px' }}>

        {/* ── STORIES TAB ──────────────────────────────────────────────────────── */}
        {mainTab === 'stories' && (
          <>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Story Submissions</h1>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Review and approve user-submitted sober stories</p>
            </div>

            <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4, width: 'fit-content' }}>
              {(['pending', 'all'] as StoryTab[]).map(t => (
                <button key={t} onClick={() => setStoryTab(t)} style={{ padding: '7px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: 'calc(var(--radius-md) - 2px)', background: storyTab === t ? 'var(--white)' : 'transparent', color: storyTab === t ? 'var(--text)' : 'var(--text-muted)', boxShadow: storyTab === t ? 'var(--shadow-sm)' : 'none', transition: 'all 0.15s' }}>
                  {t === 'pending' ? `Pending (${loading ? '…' : stories.length})` : 'Approved'}
                </button>
              ))}
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>Loading...</div>
            ) : stories.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                  {storyTab === 'pending' ? 'No pending stories' : 'No approved stories yet'}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {storyTab === 'pending' ? 'All caught up!' : 'Seed the stories to populate the site'}
                </p>
                {storyTab === 'all' && (
                  <button
                    onClick={async () => {
                      const res = await fetch('/api/stories/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin: '7463' }) })
                      const data = await res.json()
                      if (data.success) { setToast(`✓ ${data.count} stories seeded`); setTimeout(() => setToast(''), 3000); loadStories() }
                    }}
                    style={{ marginTop: 16, padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                  >
                    Seed 10 stories now
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {stories.map(story => (
                  <div key={story.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px 20px', display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 14, alignItems: 'start' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      {story.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={story.imageUrl} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700 }}>
                          {getInitials(story.name)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{story.name}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{story.location}</span>
                        <span style={{ fontSize: 11, background: 'var(--accent-pale)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{story.substance}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{story.daysSober} days sober</span>
                        <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{formatDate(story.submittedAt)}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{excerptStory(story.story)}</p>
                      {story.status === 'approved' && (
                        <div style={{ marginTop: 6 }}>
                          <Link href={`/sober-stories/${story.slug}`} target="_blank" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>View live</Link>
                        </div>
                      )}
                    </div>
                    {storyTab === 'pending' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <button onClick={() => handleStoryAction(story.id, 'approved')} disabled={actionLoading === story.id} style={{ padding: '8px 14px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          {actionLoading === story.id ? '...' : '✓ Approve'}
                        </button>
                        <button onClick={() => handleStoryAction(story.id, 'rejected')} disabled={actionLoading === story.id} style={{ padding: '8px 14px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                          ✗ Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── COMMUNITY TAB ────────────────────────────────────────────────────── */}
        {mainTab === 'community' && (
          <>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Community Moderation</h1>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Review flagged posts and manage community content</p>
            </div>

            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', flex: 1, minWidth: 140 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent)' }}>{flaggedPosts.length}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Posts needing review</div>
              </div>
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', flex: 1, minWidth: 140 }}>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <Link href="/community" target="_blank" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>View forum</Link>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <button
                    onClick={async () => {
                      const res = await fetch('/api/community/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin: '7463' }) })
                      const data = await res.json()
                      if (data.success) setToast(`✓ Seeded ${data.posts} posts, ${data.comments} comments`)
                      else setToast('Seed failed: ' + (data.error || 'check service role key'))
                      setTimeout(() => setToast(''), 4000)
                    }}
                    style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Seed posts
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4, width: 'fit-content' }}>
              {(['flagged', 'all'] as const).map(t => (
                <button key={t} onClick={() => setCommunityTab(t)} style={{ padding: '7px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: 'calc(var(--radius-md) - 2px)', background: communityTab === t ? 'var(--white)' : 'transparent', color: communityTab === t ? 'var(--text)' : 'var(--text-muted)', boxShadow: communityTab === t ? 'var(--shadow-sm)' : 'none', transition: 'all 0.15s' }}>
                  {t === 'flagged' ? '🚩 Flagged' : '📋 All Posts'}
                </button>
              ))}
            </div>

            {communityLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>Loading...</div>
            ) : communityPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{communityTab === 'flagged' ? '✓' : '💬'}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
                  {communityTab === 'flagged' ? 'No posts flagged' : 'No posts yet'}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
                  {communityTab === 'flagged' ? 'Community is clean.' : 'Use the Seed posts button above to populate the forum.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {communityPosts.map(post => (
                  <div key={post.id} style={{ background: 'var(--white)', border: `1px solid ${post.flag_count >= 3 ? '#fecaca' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', padding: '16px 18px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{post.title}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-light)' }}>by {post.username}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{post.categories?.name}</span>
                        {post.flag_count > 0 && (
                          <span style={{ fontSize: 11, background: '#fef2f2', color: '#c0392b', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                            🚩 {post.flag_count} {post.flag_count === 1 ? 'flag' : 'flags'}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{post.body.slice(0, 180)}{post.body.length > 180 ? '...' : ''}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button onClick={() => handlePostAction(post.id, 'restore')} disabled={actionLoading === post.id} style={{ padding: '7px 12px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {actionLoading === post.id ? '...' : '✓ Restore'}
                      </button>
                      <button onClick={() => handlePostAction(post.id, 'pin')} disabled={actionLoading === post.id} style={{ padding: '7px 12px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                        📌 Pin
                      </button>
                      <button onClick={() => handlePostAction(post.id, 'delete')} disabled={actionLoading === post.id} style={{ padding: '7px 12px', background: 'var(--white)', border: '1px solid #fecaca', color: '#c0392b', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                        ✗ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
