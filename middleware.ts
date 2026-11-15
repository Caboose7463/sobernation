import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Broken phone links: /any/path/tel:0300... or /any/path/tel%3A0300... ──
  // Some crawlers/old cached pages resolve tel: links as relative paths.
  // Send them to the real tel: URL (mobile dials, desktop ignores) instead of erroring.
  const telMatch = decodeURIComponent(pathname).match(/\/tel:\+?([0-9]{3,15})\/?$/i)
  if (telMatch) {
    return NextResponse.redirect(`tel:${telMatch[1]}`, 301)
  }

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
    '/:path*/tel%3A:num',
    '/:path*/tel%3a:num',
    '/:path*/tel\\::num',
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
