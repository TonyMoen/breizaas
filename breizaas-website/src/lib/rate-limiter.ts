/**
 * Simple in-memory rate limiter using Map
 * For production with multiple instances, consider Vercel KV or Redis
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (shared across requests in same instance)
const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_MAX = 5; // Maximum submissions per window
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

/**
 * Check if IP address has exceeded rate limit
 * @param ip - Client IP address
 * @returns Object with allowed status and remaining submissions
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  // Clean up expired entries periodically
  cleanupExpiredEntries();

  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // No existing entry - allow request
  if (!entry) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW };
  }

  // Existing entry - check if window expired
  if (now > entry.resetAt) {
    // Window expired - reset counter
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW };
  }

  // Within window - check count
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  // Increment counter
  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count, resetAt: entry.resetAt };
}

/**
 * Clean up expired rate limit entries to prevent memory leak
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(ip);
    }
  }
}

/**
 * Reset rate limit for an IP (for testing purposes)
 */
export function resetRateLimit(ip: string): void {
  rateLimitStore.delete(ip);
}
