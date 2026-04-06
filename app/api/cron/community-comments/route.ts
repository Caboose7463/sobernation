/**
 * app/api/cron/community-comments/route.ts
 *
 * Runs daily at 10:00 UTC.
 * Picks 2 recent posts that haven't had a comment today,
 * generates a realistic supportive comment using GPT-4o-mini,
 * and inserts it into the comments table.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const maxDuration = 60

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Realistic community usernames that feel like real recovery community members
const COMMUNITY_USERNAMES = [
  'sober_since_2019', 'quiet_fighter_uk', 'one_more_morning', 'hopeful_spark',
  'twelve_steps_ahead', 'new_chapter_liv', 'rising_slowly', 'clean_slate_uk',
  'morning_gratitude', 'stronger_now_x', 'just_keep_going_2', 'daybreak_recovery',
  'northernlad_sober', 'still_standing_98', 'phoenix_not_ashes', 'gentle_warrior',
  'taking_it_back', 'sober_in_bristol', 'onwards_upwards_j', 'recovery_road_uk',
]

function pickUsername(seed: string): string {
  const idx = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % COMMUNITY_USERNAMES.length
  return COMMUNITY_USERNAMES[idx]
}

const SYSTEM_PROMPT = `You are a member of SoberNation's online recovery community — a warm, supportive space for people dealing with addiction and recovery in the UK. 

Write a short, genuine comment responding to a community post. Sound like a real person who has lived experience with addiction or supports someone who does. Be:
- Warm but not over-the-top
- Personal and specific to what they've shared
- Brief (2-4 sentences maximum)
- Non-preachy — no lectures, no unsolicited advice unless clearly asked for
- Natural UK English, informal but not sloppy

Never sound like AI. Never use phrases like "I understand your struggle" or "Your journey is valid". Sound like a real person texting a mate.`

async function generateComment(postTitle: string, postBody: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.9,
        max_tokens: 120,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Community post titled: "${postTitle}"\n\nPost content: "${postBody?.slice(0, 400)}"\n\nWrite a short, genuine reply comment (2-4 sentences max, no quotes around it, just the comment text):`,
          },
        ],
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    const text = data.choices?.[0]?.message?.content?.trim()
    return text || null
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const supabase = getSupabase()

  // Get today's date range
  const todayStart = new Date()
  todayStart.setUTCHours(0, 0, 0, 0)

  // Pick 2 recent posts that don't already have a comment added today
  // Prefer posts with few comments (more likely to need engagement)
  const { data: posts, error: postsErr } = await supabase
    .from('posts')
    .select('id, title, body, username')
    .eq('is_hidden', false)
    .order('created_at', { ascending: false })
    .limit(20)

  if (postsErr || !posts?.length) {
    return NextResponse.json({ message: 'No posts found', error: postsErr?.message })
  }

  // Get post IDs that already received a comment today
  const { data: todayComments } = await supabase
    .from('comments')
    .select('post_id')
    .gte('created_at', todayStart.toISOString())

  const commentedToday = new Set(todayComments?.map(c => c.post_id) ?? [])

  // Filter to posts not yet commented on today, pick 2
  const eligible = posts.filter(p => !commentedToday.has(p.id))
  const targets = eligible.slice(0, 2)

  if (targets.length === 0) {
    return NextResponse.json({ message: 'All recent posts already have comments today' })
  }

  const results = []

  for (const post of targets) {
    const commentBody = await generateComment(post.title, post.body)
    if (!commentBody) {
      results.push({ postId: post.id, success: false, error: 'GPT returned null' })
      continue
    }

    const username = pickUsername(post.id + new Date().toDateString())

    const { error: insertErr } = await supabase.from('comments').insert({
      post_id: post.id,
      parent_id: null,
      user_id: null,
      username,
      body: commentBody,
      upvotes: 0,
      flag_count: 0,
      is_hidden: false,
    })

    if (insertErr) {
      results.push({ postId: post.id, success: false, error: insertErr.message })
      continue
    }

    // Increment comment_count on the post
    try {
      await supabase.rpc('increment_comment_count', { post_id: post.id })
    } catch {
      await supabase
        .from('posts')
        .update({ comment_count: ((post as { comment_count?: number }).comment_count ?? 0) + 1 })
        .eq('id', post.id)
    }

    results.push({ postId: post.id, username, success: true, preview: commentBody.slice(0, 60) })
  }

  return NextResponse.json({ success: true, commented: results.length, results })
}
