import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/gxdgx')) {
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // These are the credentials you'll use to log in
      const validUser = 'admin';
      const validPass = '2020';

      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    }
    
    url.pathname = '/api/auth';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/gxdgx/:path*'],
};
