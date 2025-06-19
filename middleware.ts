import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPaymentProtected = createRouteMatcher(['/success', '/cancel']);
const isAuthProtected = createRouteMatcher(['/dashboard']);

export default clerkMiddleware(async (auth, req) => {
  if (isAuthProtected(req)) {
    await auth.protect();
  }

  if(isPaymentProtected(req)) {
    const status = req.nextUrl.searchParams.get('payment');
    if(status !==  'success') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});