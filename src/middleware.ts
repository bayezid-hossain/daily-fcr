import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './helpers/auth';

export async function middleware(request: NextRequest) {
  const user_info_cookie = request.cookies.get('user_info_cookie')?.value || '';

  const verifieduser_info_cookie =
    user_info_cookie &&
    (await verifyAuth(user_info_cookie).catch((err: any) => {
      console.log(err);
    }));
  const path = request.nextUrl.pathname;
  console.log(path);
  const isPublicPath = path === '/login' || path === '/registration';

  if (
    isPublicPath &&
    verifieduser_info_cookie &&
    verifieduser_info_cookie.data?.isVerified
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isPublicPath && !verifieduser_info_cookie) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  if (
    !isPublicPath &&
    verifieduser_info_cookie &&
    !verifieduser_info_cookie.data?.isVerified
  ) {
    return NextResponse.redirect(new URL('/approval', request.nextUrl));
  }
  if (path === '/' && verifieduser_info_cookie) {
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
