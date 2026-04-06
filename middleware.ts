import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Protect /dashboard/* routes ──────────────────────────────────────────
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('sb-access-token')?.value
      ?? request.cookies.get('sb-clvhzvuhwjtyvrddoorm-auth-token')?.value

    if (!token) {
      const loginUrl = new URL('/verify/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verify the token with Supabase
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )
      const { error } = await supabase.auth.getUser(token)
      if (error) {
        const loginUrl = new URL('/verify/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }
    } catch {
      const loginUrl = new URL('/verify/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
