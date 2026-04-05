import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

const FLAG_THRESHOLD = 3

// POST /api/community/flag
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { post_id, comment_id, reason } = await request.json()
  if (!reason) return NextResponse.json({ error: 'Reason required' }, { status: 400 })
  if (!post_id && !comment_id) return NextResponse.json({ error: 'post_id or comment_id required' }, { status: 400 })

  const admin = createAdminClient()

  // Insert flag
  await admin.from('flags').insert({ user_id: user.id, post_id: post_id || null, comment_id: comment_id || null, reason })

  // Count flags on this content
  const flagQuery = admin.from('flags').select('id', { count: 'exact' })
  if (post_id) flagQuery.eq('post_id', post_id)
  if (comment_id) flagQuery.eq('comment_id', comment_id)
  const { count } = await flagQuery

  // Auto-hide if threshold reached
  if (count && count >= FLAG_THRESHOLD) {
    if (post_id) await admin.from('posts').update({ is_hidden: true, flag_count: count }).eq('id', post_id)
    if (comment_id) await admin.from('comments').update({ is_hidden: true, flag_count: count }).eq('id', comment_id)
  } else {
    if (post_id) await admin.from('posts').update({ flag_count: count ?? 0 }).eq('id', post_id)
    if (comment_id) await admin.from('comments').update({ flag_count: count ?? 0 }).eq('id', comment_id)
  }

  return NextResponse.json({ flagged: true, hidden: (count ?? 0) >= FLAG_THRESHOLD })
}
