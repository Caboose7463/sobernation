import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// GET /api/community/posts?category=support&sort=hot&page=1
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const sort = searchParams.get('sort') || 'hot'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select(`
      id, title, slug, body, upvotes, comment_count, flag_count,
      is_pinned, is_hidden, created_at, username,
      categories(id, slug, name, icon)
    `)
    .eq('is_hidden', false)
    .range(offset, offset + limit - 1)

  if (category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (sort === 'hot') {
    query = query.order('is_pinned', { ascending: false }).order('upvotes', { ascending: false }).order('created_at', { ascending: false })
  } else if (sort === 'new') {
    query = query.order('is_pinned', { ascending: false }).order('created_at', { ascending: false })
  } else if (sort === 'top') {
    query = query.order('upvotes', { ascending: false })
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/community/posts — create a new post
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { title, body, category_slug } = await request.json()
  if (!title?.trim() || !body?.trim() || !category_slug) {
    return NextResponse.json({ error: 'Title, body and category are required' }, { status: 400 })
  }

  // Get profile for username
  const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 400 })

  // Get category
  const { data: category } = await supabase.from('categories').select('id').eq('slug', category_slug).single()
  if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 400 })

  // Generate slug from title
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').slice(0, 60)
  const slug = `${baseSlug}-${Date.now().toString(36)}`

  const { data: post, error } = await supabase.from('posts').insert({
    title: title.trim(),
    body: body.trim(),
    slug,
    category_id: category.id,
    user_id: user.id,
    username: profile.username,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(post, { status: 201 })
}
