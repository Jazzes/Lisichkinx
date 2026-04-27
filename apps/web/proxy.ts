import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { defaultLocale, locales } from '@/shared/config/i18n';

const PUBLIC_FILE = /\.(.*)$/;

const isPublicPath = (pathname: string): boolean => {
  return pathname.startsWith('/_next') || pathname.startsWith('/api') || PUBLIC_FILE.test(pathname);
};

const isLocalePath = (pathname: string): boolean => {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
};

export const proxy = (request: NextRequest) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  if (isPublicPath(pathname) || isLocalePath(pathname)) {
    return NextResponse.next();
  }

  const rewriteUrl = nextUrl.clone();

  rewriteUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.rewrite(rewriteUrl);
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
