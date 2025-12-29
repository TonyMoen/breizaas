import { cookies } from 'next/headers';

const CSRF_TOKEN_NAME = 'csrf_token';
const CSRF_TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds

export interface CSRFTokenData {
  token: string;
  expiresAt: number;
}

/**
 * Generate a cryptographically secure CSRF token using Web Crypto API
 * (Edge Runtime compatible)
 * @returns Token string (64 character hex)
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create CSRF token and store in HTTP-only cookie
 * @returns Token string to be included in form
 */
export async function createCSRFToken(): Promise<string> {
  const token = generateCSRFToken();
  const expiresAt = Date.now() + CSRF_TOKEN_EXPIRY;

  const cookieStore = await cookies();

  // Store token in secure, HTTP-only cookie
  cookieStore.set(CSRF_TOKEN_NAME, JSON.stringify({ token, expiresAt }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: CSRF_TOKEN_EXPIRY / 1000, // Convert to seconds
  });

  return token;
}

/**
 * Constant-time string comparison to prevent timing attacks
 * (Edge Runtime compatible - no Buffer or crypto.timingSafeEqual)
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Validate CSRF token from request against stored cookie
 * @param submittedToken - Token from form submission
 * @returns True if valid, false otherwise
 */
export async function validateCSRFToken(submittedToken: string | null): Promise<boolean> {
  if (!submittedToken) {
    return false;
  }

  const cookieStore = await cookies();
  const cookieData = cookieStore.get(CSRF_TOKEN_NAME);

  if (!cookieData?.value) {
    return false;
  }

  try {
    const { token, expiresAt } = JSON.parse(cookieData.value) as CSRFTokenData;

    // Check if token is expired
    if (Date.now() > expiresAt) {
      return false;
    }

    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(token, submittedToken);
  } catch {
    return false;
  }
}
