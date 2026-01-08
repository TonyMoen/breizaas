import { fetchSanity, getSingletonQuery } from '@/lib/sanity';
import { BookingInfoSchema, type BookingInfo } from '@/types/Sanity.types';
import type { ApiError } from '@/lib/sanity';

/**
 * Fetch booking contact information (singleton)
 * Returns company name, email, phone, and display phone
 *
 * @returns BookingInfo data or ApiError
 *
 * @example
 * ```ts
 * const bookingInfo = await getBookingInfo();
 * if ('code' in bookingInfo) {
 *   // Handle error with fallback
 *   console.error(bookingInfo.message);
 * } else {
 *   // Use validated data
 *   console.log(bookingInfo.companyName);
 * }
 * ```
 */
export async function getBookingInfo(): Promise<BookingInfo | ApiError> {
  const query =
    getSingletonQuery('bookingInfo') +
    ` {
    _id,
    _type,
    companyName,
    email,
    phone,
    displayPhone
  }`;

  return fetchSanity(query, {}, BookingInfoSchema);
}
