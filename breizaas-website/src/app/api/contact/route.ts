import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/schemas/contact.schema';
import { sendContactMessage } from '@/lib/email';
import { MESSAGES } from '@/lib/messages';

/**
 * POST /api/contact
 * Handles general contact form submissions
 *
 * @param request - Next.js request object containing contact form data
 * @returns JSON response with success/error status
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES.contact.validationError,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Note: CSRF token validation and rate limiting are handled in middleware
    // See src/middleware.ts for security implementation

    // Sanitize text inputs
    const sanitizedData = {
      ...validatedData,
      name: sanitizeText(validatedData.name),
      message: sanitizeText(validatedData.message),
    };

    // Send notification email
    await sendContactMessage(sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message: MESSAGES.contact.success,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: MESSAGES.contact.serverError,
      },
      { status: 500 }
    );
  }
}

function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .trim();
}
