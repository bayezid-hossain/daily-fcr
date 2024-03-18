import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './helpers/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';

  const verifiedtoken =
    token &&
    (await verifyAuth(token).catch((err: any) => {
      console.log(err);
    }));
  const path = request.nextUrl.pathname;
  console.log(path);
  const isPublicPath = path === '/login' || path === '/registration';

  if (isPublicPath && verifiedtoken && verifiedtoken.data?.isVerified) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isPublicPath && !verifiedtoken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  if (!isPublicPath && verifiedtoken && !verifiedtoken.data?.isVerified) {
    return NextResponse.redirect(new URL('/approval', request.nextUrl));
  }
  if (path === '/' && verifiedtoken) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/registration',
    '/verifyemail',
  ],
};
