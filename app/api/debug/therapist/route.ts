import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') ?? 'aneta-bugajna-bournemouth'

  const checks: Record<string, unknown> = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Missing env vars', checks }, { status: 500 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase
      .from('counsellors')
      .select('id, name, title, location_name, location_slug, specialisms, profile_slug')
      .eq('profile_slug', slug)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message, checks }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ found: false, slug, checks })
    }

    // Test initials
    const initials = data.name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '??'

    // Test related
    const { data: related, error: e2 } = await supabase
      .from('counsellors')
      .select('id, name, profile_slug')
      .eq('location_slug', data.location_slug ?? '')
      .neq('id', data.id)
      .limit(4)

    const relatedDetails = related?.map(r => ({
      name: r.name,
      initials: r.name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '??',
    }))

    return NextResponse.json({
      found: true,
      data: { ...data, specialisms: data.specialisms },
      initials,
      related: relatedDetails,
      relatedError: e2?.message,
      checks,
    })
  } catch (err: unknown) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack?.split('\n').slice(0, 5) : undefined,
      checks,
    }, { status: 500 })
  }
}
