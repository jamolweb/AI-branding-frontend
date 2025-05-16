import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple flag to disable middleware during development if needed
const DISABLE_MIDDLEWARE = true;

export function middleware(request: NextRequest) {
  // If middleware is disabled, just continue with the request
  if (DISABLE_MIDDLEWARE) {
    return NextResponse.next();
  }

  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path is public (login, register, etc.)
  const isPublicPath = path.startsWith('/auth') ||
    path === '/' ||
    path.startsWith('/_next') ||
    path.startsWith('/api');

  // Check if user has a cookie (we'll assume they're authenticated if they have the cookie)
  const hasCookie = request.cookies.has('accessToken');

  // If the path requires authentication and the user doesn't have a cookie, redirect to login
  if (!isPublicPath && !hasCookie) {
    const url = new URL('/auth/signin', request.url);
    return NextResponse.redirect(url);
  }

  // If the user is already logged in (has cookie) and tries to access login page, redirect to dashboard
  if (isPublicPath && path.includes('/auth/signin') && hasCookie) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes
    // - Static files (e.g. favicon.ico)
    // - Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
