import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function GET(request: NextRequest) {
  if (request.headers.get('x-admin-pin') !== '7463') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('posts')
    .select('id, title, body, username, flag_count, is_hidden, created_at, categories(name)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
