import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken && process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }

    if (!sessionToken) {
      
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};