import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminToken =
    request.cookies.get('admin_token')?.value ||
    request.cookies.get('admin_session')?.value;

  if (pathname === '/admin/login') {
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/tools', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};