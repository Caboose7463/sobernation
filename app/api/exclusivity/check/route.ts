import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ taken: false })

  try {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from('city_exclusivity')
      .select('centre_name, active')
      .eq('location_slug', slug)
      .eq('active', true)
      .single()

    if (!data) return NextResponse.json({ taken: false })
    return NextResponse.json({ taken: true, taken_by: data.centre_name })
  } catch {
    return NextResponse.json({ taken: false })
  }
}
