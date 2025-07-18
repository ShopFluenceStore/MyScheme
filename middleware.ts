import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// List of public paths that don't require authentication
const publicPaths = ['/signin', '/signup', '/', '/faq', '/privacy-policy'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Allow public paths and static files
  if (
    publicPaths.some(path => pathname.startsWith(path)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    // If user is logged in and tries to access auth pages, redirect to home
    if (token && (pathname === '/signin' || pathname === '/signup')) {
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Redirect to signin if not authenticated
  if (!token) {
    const signInUrl = new URL('/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) except /api/auth/*
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - static files
     */
    '/((?!api/(?!auth/)|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};