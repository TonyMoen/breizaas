import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/lib/csrf';
import { checkRateLimit } from '@/lib/rate-limiter';
import { MESSAGES } from '@/lib/messages';

/**
 * Middleware for form security (CSRF protection + rate limiting)
 * Runs before API route handlers for /api/contact and /api/booking
 */
export async function middleware(request: NextRequest) {
  // Only apply to form submission API routes
  if (!request.nextUrl.pathname.match(/^\/api\/(contact|booking)$/)) {
    return NextResponse.next();
  }

  // Only apply to POST requests
  if (request.method !== 'POST') {
    return NextResponse.next();
  }

  // Extract client IP (Vercel provides x-forwarded-for header)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  // Check rate limit first (faster check)
  const rateLimitResult = checkRateLimit(ip);
  if (!rateLimitResult.allowed) {
    console.error(`Rate limit exceeded for IP: ${ip}`);
    return NextResponse.json(
      {
        success: false,
        message: MESSAGES.security.rateLimitError,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)),
        }
      }
    );
  }

  // Validate CSRF token
  const csrfToken = request.headers.get('x-csrf-token');
  const isValidToken = await validateCSRFToken(csrfToken);

  if (!isValidToken) {
    console.error(`CSRF validation failed for IP: ${ip}, Token: ${csrfToken ? 'present' : 'missing'}`);
    return NextResponse.json(
      {
        success: false,
        message: MESSAGES.security.csrfError,
      },
      { status: 403 }
    );
  }

  // All checks passed - proceed to API route
  return NextResponse.next();
}

/**
 * Configure which routes this middleware applies to
 */
export const config = {
  matcher: ['/api/contact', '/api/booking'],
};
