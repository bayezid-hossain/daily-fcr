import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './helpers/auth';
import toast from 'react-hot-toast';

export async function middleware(request: NextRequest) {}

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
