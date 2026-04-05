import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

// POST /api/community/auth/signup
export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json()
  if (!username?.trim() || !email?.trim() || !password) {
    return NextResponse.json({ error: 'Username, email and password are required' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Check username not taken
  const { data: existing } = await admin
    .from('profiles')
    .select('id')
    .eq('username', username.trim().toLowerCase())
    .single()

  if (existing) return NextResponse.json({ error: 'Username already taken' }, { status: 409 })

  // Create auth user
  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
  })

  if (authError || !authData.user) {
    return NextResponse.json({ error: authError?.message || 'Signup failed' }, { status: 400 })
  }

  // Create profile
  const { error: profileError } = await admin.from('profiles').insert({
    id: authData.user.id,
    username: username.trim().toLowerCase(),
  })

  if (profileError) {
    await admin.auth.admin.deleteUser(authData.user.id).catch(() => {})
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, username: username.trim().toLowerCase() })
}
