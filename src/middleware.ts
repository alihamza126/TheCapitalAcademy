import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import authOptions from './lib/auth'
import { publicPages } from './utils/publicpath'

// Middleware for next-auth with custom logic
const authMiddleware = withAuth(
  (req) => {
    const token = req.nextauth?.token
    const url = req.nextUrl
    const pathname = url.pathname

    // Role-based route protection
    if (pathname.includes('/admin') && token?.role !== 'admin') {
      return NextResponse.rewrite(new URL('/unauthorized', req.url))
    }

    return NextResponse.next()
  },
  {
    jwt: { decode: authOptions.jwt?.decode },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow public pages without authentication
        if (
          publicPages.some(
            (path) =>
              path.includes(pathname) || pathname.startsWith(path + '/'),
          )
        ) {
          return true
        }

        // Require authentication for all other routes
        return !!token
      },
    },
    pages: {
      signIn: '/signin',
    },
  }
)

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const publicPathnameRegex = RegExp(
    `^(${publicPages
      .flatMap((p) => {
        if (p === '/') return ['', '/']
        if (p.includes(':path*')) {
          const base = p.replace(':path*', '')
          return [`${base}.*`, `${base}[^/]+.*`]
        }
        return p
      })
      .join('|')})/?$`,
    'i'
  )

  const isPublicPage = publicPathnameRegex.test(pathname)

  if (isPublicPage) {
    return NextResponse.next()
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
  unstable_allowDynamic: ['**/node_modules/mongoose/dist/browser.umd.js'],
}