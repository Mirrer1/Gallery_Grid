import { NextResponse, type NextRequest } from 'next/server';

const publicPages = ['/', '/post/:path*'];

const isBot = (userAgent: string | undefined) => {
  if (!userAgent) return false;
  return (
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('Twitterbot') ||
    userAgent.includes('Slackbot') ||
    userAgent.includes('WhatsApp') ||
    userAgent.includes('kakaotalk-scrap')
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('connect.sid')?.value;
  const userAgent = request.headers.get('user-agent') || undefined;

  const isPublicPage = publicPages.some(route => pathname.match(new RegExp(`^${route}$`)));

  if (isBot(userAgent)) {
    return NextResponse.next();
  }

  if (pathname === '/' && token) {
    const redirectUrl = new URL('/timeline', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!token && !isPublicPage) {
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/activity', '/auth', '/gallery', '/message', '/settings', '/timeline', '/user/:path*']
};
