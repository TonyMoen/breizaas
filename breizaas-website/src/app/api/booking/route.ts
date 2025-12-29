import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/schemas/booking.schema';
import { sendBookingConfirmation, sendBookingNotification } from '@/lib/email';
import { MESSAGES } from '@/lib/messages';

/**
 * POST /api/booking
 * Handles event organizer booking inquiry form submissions
 *
 * @param request - Next.js request object containing booking form data
 * @returns JSON response with success/error status
 *
 * Response codes:
 * - 200: Success - emails sent
 * - 400: Bad request - validation error
 * - 429: Too many requests - rate limit exceeded (Story 5.5)
 * - 500: Server error - email sending failed
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request body with Zod schema
    const validationResult = bookingSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES.booking.validationError,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Note: CSRF token validation and rate limiting are handled in middleware
    // See src/middleware.ts for security implementation

    // Sanitize text inputs to prevent XSS
    const sanitizedData = {
      ...validatedData,
      contactPerson: sanitizeText(validatedData.contactPerson),
      organization: sanitizeText(validatedData.organization),
      venue: sanitizeText(validatedData.venue),
      city: sanitizeText(validatedData.city),
      budget: validatedData.budget ? sanitizeText(validatedData.budget) : undefined,
      description: sanitizeText(validatedData.description),
    };

    // Send emails in parallel for better performance
    await Promise.all([
      sendBookingConfirmation(sanitizedData),
      sendBookingNotification(sanitizedData),
    ]);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: MESSAGES.booking.success,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Booking form error:', error);

    // Check if it's a validation error
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES.booking.validationError,
        },
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      {
        success: false,
        message: MESSAGES.booking.serverError,
      },
      { status: 500 }
    );
  }
}

/**
 * Basic text sanitization to prevent XSS attacks
 * Removes HTML tags and trims whitespace
 *
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();
}
