'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { IconArrowUp, IconMessageCircle, IconFlag, IconAlertTriangle, CATEGORY_ICONS } from '@/components/icons'

type Comment = {
  id: string; post_id: string; parent_id: string | null
  username: string; body: string; upvotes: number
  created_at: string; is_hidden: boolean
}

type Post = {
  id: string; title: string; body: string; username: string
  upvotes: number; comment_count: number; is_pinned: boolean
  created_at: string; categories: { slug: string; name: string }
}

function timeAgo(iso: string) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return `${secs}s`
  if (secs < 3600) return `${Math.floor(secs / 60)}m`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h`
  return `${Math.floor(secs / 86400)}d`
}

export default function ThreadPage({ post, categorySlug }: { post: Post; categorySlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [flagging, setFlagging] = useState<string | null>(null)
  const [toast, setToast] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)) }, [supabase])

  const loadComments = useCallback(async () => {
    const res = await fetch(`/api/community/posts/${post.id}/comments`)
    const data = await res.json()
    if (Array.isArray(data)) setComments(data)
  }, [post.id])

  useEffect(() => { loadComments() }, [loadComments])

  useEffect(() => {
    const channel = supabase
      .channel(`post-${post.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${post.id}` }, (payload) => {
        setComments(prev => {
          if (prev.some(c => c.id === payload.new.id)) return prev
          return [...prev, payload.new as Comment]
        })
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [post.id, supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim() || submitting) return
    setSubmitting(true)
    const res = await fetch(`/api/community/posts/${post.id}/comments`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: newComment }),
    })
    if (res.ok) { setNewComment('') }
    else {
      const data = await res.json()
      setToast(data.error || 'Could not post comment')
      setTimeout(() => setToast(''), 3000)
    }
    setSubmitting(false)
  }

  async function handleFlag(commentId: string) {
    setFlagging(commentId)
    await fetch('/api/community/flag', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment_id: commentId, reason: 'Reported by user' }),
    })
    setToast('Comment reported')
    setTimeout(() => setToast(''), 2000)
    setFlagging(null)
  }

  const CatIcon = CATEGORY_ICONS[post.categories?.slug] ?? IconMessageCircle
  const topLevel = comments.filter(c => !c.parent_id)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, background: 'var(--accent)', color: '#fff', padding: '10px 16px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600 }}>
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 46, fontSize: 13 }}>
          <Link href="/community" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}>Community</Link>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <Link href={`/community/${categorySlug}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
            <CatIcon size={13} />
            {post.categories?.name}
          </Link>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <span style={{ color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</span>
        </div>
      </div>

      <div className="container-wide" style={{ padding: '20px 16px', maxWidth: 760 }}>
        {/* Post body */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, background: 'var(--accent-pale)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
              <CatIcon size={11} color="var(--accent)" />
              {post.categories?.name}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>{post.username} &middot; {timeAgo(post.created_at)}</span>
            {post.is_pinned && <span style={{ fontSize: 11, background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Pinned</span>}
          </div>
          <h1 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px', lineHeight: 1.35 }}>{post.title}</h1>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{post.body}</p>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-light)', alignItems: 'center' }}>
            <span className="icon-label"><IconArrowUp size={13} /> {post.upvotes}</span>
            <span className="icon-label"><IconMessageCircle size={13} /> {comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
          </div>
        </div>

        {/* Crisis banner */}
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconAlertTriangle size={14} color="#991b1b" />
          <span>In crisis? Call <strong>Samaritans: 116 123</strong> or <strong>FRANK: 0300 123 6600</strong></span>
        </div>

        {/* Comments */}
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          {topLevel.length} {topLevel.length === 1 ? 'reply' : 'replies'}
        </h2>

        {topLevel.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '28px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
            No replies yet. Be the first.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {topLevel.map(comment => (
              <div key={comment.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '13px 16px' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 7 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{comment.username}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-light)' }}>{timeAgo(comment.created_at)}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-wrap' }}>{comment.body}</p>
                <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 12, color: 'var(--text-light)', alignItems: 'center' }}>
                  <span className="icon-label"><IconArrowUp size={12} /> {comment.upvotes}</span>
                  {user && (
                    <button onClick={() => handleFlag(comment.id)} disabled={flagging === comment.id} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--text-light)', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <IconFlag size={12} /> Report
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={bottomRef} />

        {/* Reply box */}
        {user ? (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>Add a reply</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Write your reply here..."
                rows={4}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 14, resize: 'vertical', outline: 'none', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--bg)', lineHeight: 1.6, fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="submit" disabled={submitting || !newComment.trim()} style={{ padding: '10px 22px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, cursor: submitting ? 'not-allowed' : 'pointer', opacity: !newComment.trim() ? 0.6 : 1 }}>
                  {submitting ? 'Posting...' : 'Post reply'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 14 }}>Join the community to reply</p>
            <Link href="/community" style={{ padding: '10px 22px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
              Join for free
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
