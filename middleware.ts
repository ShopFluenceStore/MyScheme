import { NextResponse, NextRequest } from 'next/server';

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
  '/screen-reader',
  '/auth'
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow static files and API routes (except admin API routes)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }
  
  // Allow all routes - no authentication required in demo mode
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