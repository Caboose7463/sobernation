import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

// POST /api/community/vote — upvote a post or comment
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { post_id, comment_id } = await request.json()
  if (!post_id && !comment_id) return NextResponse.json({ error: 'post_id or comment_id required' }, { status: 400 })

  const admin = createAdminClient()

  // Check if already voted
  const existingQuery = admin.from('votes').select('id')
  if (post_id) existingQuery.eq('post_id', post_id)
  if (comment_id) existingQuery.eq('comment_id', comment_id)
  const { data: existing } = await existingQuery.eq('user_id', user.id).single()

  if (existing) {
    // Remove vote (toggle off)
    await admin.from('votes').delete().eq('id', existing.id)
    if (post_id) await admin.from('posts').update({ upvotes: admin.from('posts') }).eq('id', post_id)
    // Decrement via raw SQL
    if (post_id) await admin.rpc('decrement_post_votes', { post_id }).catch(() => {})
    if (comment_id) await admin.rpc('decrement_comment_votes', { comment_id }).catch(() => {})
    return NextResponse.json({ voted: false })
  }

  // Insert vote
  const voteData = post_id
    ? { user_id: user.id, post_id }
    : { user_id: user.id, comment_id }

  await admin.from('votes').insert(voteData)
  if (post_id) await admin.rpc('increment_post_votes', { post_id }).catch(() => {})
  if (comment_id) await admin.rpc('increment_comment_votes', { comment_id }).catch(() => {})

  return NextResponse.json({ voted: true })
}
