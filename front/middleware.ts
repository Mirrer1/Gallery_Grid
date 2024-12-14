import { NextResponse, type NextRequest } from 'next/server';
import botDetector from 'utils/botDetector';

const publicPages = ['/', '/post/:path*'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('connect.sid')?.value;
  const userAgent = request.headers.get('user-agent') || undefined;

  const isBot = botDetector(userAgent);
  const isPublicPage = publicPages.some(route => pathname.match(new RegExp(`^${route}$`)));
  if (isPublicPage || isBot) {
    return NextResponse.next();
  }

  if (!token) {
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/activity', '/auth', '/gallery', '/message', '/settings', '/timeline', '/user/:path*']
};
