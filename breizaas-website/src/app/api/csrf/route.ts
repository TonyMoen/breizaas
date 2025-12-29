import { NextResponse } from 'next/server';
import { createCSRFToken } from '@/lib/csrf';

/**
 * GET /api/csrf
 * Generate and return CSRF token for form submissions
 */
export async function GET() {
  try {
    const token = await createCSRFToken();

    return NextResponse.json(
      { token },
      { status: 200 }
    );
  } catch (error) {
    console.error('CSRF token generation error:', error);

    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
