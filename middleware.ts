import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security Middleware
 * Adds additional security headers and protection against common attacks
 * Also handles redirects for legacy URLs
 */
export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Clone the response
  const response = NextResponse.next();

  // Add security headers (complementary to next.config.ts)
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  // Add nonce to CSP for inline scripts (optional, for stricter CSP in future)
  response.headers.set('X-Request-ID', crypto.randomUUID());
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Protect against clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // Add cache control for sensitive pages
  if (pathname.startsWith('/join') || pathname.startsWith('/contact')) {
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, private'
    );
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (they have their own security)
     */
    '/((?!_next/static|_next/image|favicon.ico|assets|api|robots.txt|sitemap).*)',
  ],
};

