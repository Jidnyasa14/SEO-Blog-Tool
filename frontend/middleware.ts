import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
//import { jwtVerify } from 'jose'; // Recommended for Next.js Edge runtime compatibility

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Intercept requests heading into secure admin areas
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    // If no session cookie exists, redirect immediately to login
    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Optional: You can do lightweight JWT verify logic here if needed
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, clear session cookie and redirect
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // 2. Allow all other public routes (like /about, /blog, etc.) to pass through uninterrupted
  return NextResponse.next();
}

// 3. Configure the matcher array to restrict where this middleware executes
export const config = {
  matcher: ['/admin/:path*'],
};