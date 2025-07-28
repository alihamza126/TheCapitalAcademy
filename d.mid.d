import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import authOptions from './lib/auth';
import { publicPages } from './utils/publicpath';

// Middleware for next-auth with custom logic
const authMiddleware = withAuth(
  (req) => {
    const token = req.nextauth?.token;
    const url = req.nextUrl;
    const pathname = url?.pathname;

    // Ensure pathname is defined
    if (!pathname) {
      console.error('Pathname is undefined', { url: req.url });
      return NextResponse.redirect(new URL('/error', req.url));
    }

    // Role-based route protection for admin routes
    if (pathname.includes('/admin') && token?.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    jwt: { decode: authOptions.jwt?.decode },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Ensure pathname is defined
        if (!pathname) {
          console.error('Pathname is undefined in authorized callback', { url: req.url });
          return false;
        }

        // Allow public pages without authentication
        if (
          publicPages.some(
            (path) =>
              path && (path === pathname || pathname.startsWith(path + '/')),
          )
        ) {
          return true;
        }

        // Require authentication for all other routes
        return !!token;
      },
    },
    pages: {
      signIn: '/signin',
      error: '/error',
      newUser: '/signup',
    },
  }
);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!pathname) {
    console.error('Pathname is undefined in middleware', { url: req.url });
    return NextResponse.redirect(new URL('/error', req.url));
  }

  // const publicPathnameRegex = RegExp(
  //   `^(${publicPages
  //     .filter((p) => p) // Remove undefined/null paths
  //     .flatMap((p) => {
  //       if (p === '/') return ['', '/'];
  //       if (p.includes(':path*')) {
  //         const base = p.replace(':path*', '');
  //         return [`${base}.*`, `${base}[^/]+.*`];
  //       }
  //       return p;
  //     })
  //     .join('|')})/?$`,
  //   'i'
  // );

  // const isPublicPage = publicPathnameRegex.test(pathname);

  return NextResponse.next();
  // if (isPublicPage) {
  // } else {
  //   return (authMiddleware as any)(req);
  // }
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
  unstable_allowDynamic: ['**/node_modules/mongoose/dist/browser.umd.js'],
};