import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// GET /api/community/posts/[id]/comments
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('comments')
    .select('id, body, upvotes, flag_count, is_hidden, created_at, username, parent_id')
    .eq('post_id', id)
    .eq('is_hidden', false)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/community/posts/[id]/comments
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: postId } = await params
  const supabase = await createClient()
  const adminSupabase = createAdminClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { body, parent_id } = await request.json()
  if (!body?.trim()) return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 })

  const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 400 })

  // Insert comment
  const { data: comment, error } = await supabase.from('comments').insert({
    post_id: postId,
    parent_id: parent_id || null,
    user_id: user.id,
    username: profile.username,
    body: body.trim(),
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Update comment count on post
  await adminSupabase.rpc('increment_comment_count', { post_id: postId }).catch(() => {})

  // Get post details for notification
  const { data: post } = await adminSupabase
    .from('posts')
    .select('id, title, slug, user_id, username, categories(slug)')
    .eq('id', postId)
    .single()

  if (post && post.user_id && post.user_id !== user.id) {
    // Send in-app notification
    await adminSupabase.from('notifications').insert({
      user_id: post.user_id,
      type: 'reply_to_post',
      post_id: postId,
      comment_id: comment.id,
      actor_username: profile.username,
    }).catch(() => {})

    // Send email notification via Resend
    const { data: postOwner } = await adminSupabase.auth.admin.getUserById(post.user_id)
    const email = postOwner?.user?.email
    if (email) {
      const categorySlug = (post.categories as unknown as { slug: string })?.slug
      const postUrl = `https://sobernation.com/community/${categorySlug}/${post.slug}`
      await resend.emails.send({
        from: 'SoberNation Community <community@sobernation.com>',
        to: email,
        subject: `${profile.username} replied to your post`,
        html: `
          <p>Hi ${post.username},</p>
          <p><strong>${profile.username}</strong> replied to your post <em>"${post.title}"</em>:</p>
          <blockquote style="border-left:3px solid #e2e8f0;padding-left:12px;color:#555">${body.trim().slice(0, 200)}${body.length > 200 ? '...' : ''}</blockquote>
          <p><a href="${postUrl}" style="color:#2563eb">View the conversation</a></p>
          <p style="font-size:12px;color:#999">You are receiving this because someone replied to your post. <a href="${postUrl}">Manage notifications</a></p>
        `,
      }).catch(() => {})
    }
  }

  return NextResponse.json(comment, { status: 201 })
}
