import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Return 410 Gone for old WordPress URLs ────────────────────────────────
  // 410 = "permanently gone" — tells Google to deindex faster than 404
  const WORDPRESS_PATHS = [
    '/sample-page', '/wp-admin', '/wp-login.php', '/wp-content',
    '/wp-includes', '/xmlrpc.php', '/feed',
  ]
  const WORDPRESS_PATTERNS = [/^\/2024\//, /^\/2025\/\d{2}\/\d{2}\//]
  const isWordPressUrl =
    WORDPRESS_PATHS.some(p => pathname === p || pathname.startsWith(p + '/')) ||
    WORDPRESS_PATTERNS.some(re => re.test(pathname))

  if (isWordPressUrl) {
    return new NextResponse('Gone', {
      status: 410,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

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
  matcher: [
    '/dashboard/:path*',
    '/sample-page/:path*',
    '/sample-page',
    '/2024/:path*',
    '/wp-admin/:path*',
    '/wp-login.php',
    '/wp-content/:path*',
    '/wp-includes/:path*',
    '/xmlrpc.php',
    '/feed',
    '/feed/:path*',
  ],
}
