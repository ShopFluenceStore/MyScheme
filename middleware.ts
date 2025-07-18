import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// List of public paths that don't require authentication
const publicPaths = [
  '/signin', 
  '/signup', 
  '/', 
  '/faq', 
  '/privacy-policy',
  '/about',
  '/contact',
  '/schemes',
  '/search',
  '/profile',
  '/disclaimer',
  '/terms-and-conditions',
  '/accessibility-statement',
  '/screen-reader'
];

// Admin-only paths
const adminPaths = ['/admin'];

// User/Admin paths (requires authentication)
const protectedPaths = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Allow static files and API routes (except admin API routes)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }
  
  // Check if path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );
  
  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (token && (pathname === '/signin' || pathname === '/signup' || pathname === '/auth')) {
    const url = new URL('/dashboard', req.url);
    return NextResponse.redirect(url);
  }
  
  // Allow public paths
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Check admin paths
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path));
  if (isAdminPath) {
    if (!token) {
      const signInUrl = new URL('/auth', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    if (token.role !== 'admin') {
      const url = new URL('/dashboard', req.url);
      return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
  }
  
  // Check protected paths (dashboard, etc.)
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  if (isProtectedPath) {
    if (!token) {
      const signInUrl = new URL('/auth', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    return NextResponse.next();
  }
  
  // Check admin API routes
  if (pathname.startsWith('/api/admin')) {
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (token.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    return NextResponse.next();
  }
  
  // Check protected API routes
  if (pathname.startsWith('/api/dashboard') || pathname.startsWith('/api/schemes')) {
    // Allow GET requests to schemes for public access
    if (pathname.startsWith('/api/schemes') && req.method === 'GET') {
      return NextResponse.next();
    }
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};