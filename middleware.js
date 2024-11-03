import { NextRequest, NextResponse } from 'next/server';
import { updateSession, verifySession } from './app/lib/session';

const middleware = async (req = new NextRequest()) => {
  const protectedRoutes = ['/'];
  const currentPath = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(currentPath);

  if (isProtected) {
    const session = await verifySession();

    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    }

    if (session) {
      return NextResponse.next();
    }
  }

  await updateSession(req);
  return;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};

export default middleware;
