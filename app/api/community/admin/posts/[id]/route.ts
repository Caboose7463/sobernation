import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (request.headers.get('x-admin-pin') !== '7463') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const { action } = await request.json()
  const admin = createAdminClient()

  if (action === 'restore') {
    await admin.from('posts').update({ is_hidden: false, flag_count: 0 }).eq('id', id)
  } else if (action === 'delete') {
    await admin.from('posts').delete().eq('id', id)
  } else if (action === 'pin') {
    await admin.from('posts').update({ is_pinned: true }).eq('id', id)
  } else if (action === 'hide') {
    await admin.from('posts').update({ is_hidden: true }).eq('id', id)
  }

  return NextResponse.json({ success: true })
}
