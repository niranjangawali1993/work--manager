import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const loginToken = request.cookies.has('loginToken');
  console.log('LOGIN TOKEN - ', loginToken);

  if (
    request.nextUrl.pathname == '/api/login' ||
    request.nextUrl.pathname == '/api/signup' ||
    request.nextUrl.pathname == '/api/users'
  ) {
    return;
  }

  const isPublicPaths = ['/login', '/signup'].includes(
    request.nextUrl.pathname
  );

  if (isPublicPaths) {
    // Accessing not secured route
    if (loginToken) {
      return NextResponse.redirect(new URL('/profile/user', request.url));
    }
  } else {
    // Accessing secured route
    console.log('When path is not public');
    console.log(loginToken);
    if (!loginToken) {
      if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.json(
          {
            message: 'Access Denied !!!',
            success: false,
          },
          {
            status: 401,
          }
        );
      }
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      // verify token
    }
  }
  //   return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/add-task',
    '/show-tasks',
    '/profile/:path*',
    '/api/:path*',
  ],
};
