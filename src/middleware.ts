import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DISABLE_MIDDLEWARE = true;

export function middleware(request: NextRequest) {
  if (DISABLE_MIDDLEWARE) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;

  const isPublicPath = path.startsWith('/auth') ||
    path === '/' ||
    path.startsWith('/_next') ||
    path.startsWith('/api');

  const hasCookie = request.cookies.has('accessToken');

  if (!isPublicPath && !hasCookie) {
    const url = new URL('/auth/signin', request.url);
    return NextResponse.redirect(url);
  }

  if (isPublicPath && path.includes('/auth/signin') && hasCookie) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
