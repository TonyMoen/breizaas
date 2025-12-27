/**
 * Bandsintown API Client
 * Fetches tour dates from Bandsintown API with caching and error handling
 * API Documentation: https://help.artists.bandsintown.com/en/articles/9186477-api-documentation
 *
 * Architecture Compliance:
 * - Caching: 1 hour revalidation (revalidate: 3600) per NFR-P3
 * - Timeout: 5 seconds (AbortSignal.timeout(5000)) per NFR-P3
 * - Error Handling: ApiError pattern with Norwegian messages
 * - Validation: Zod schemas for runtime type safety
 */

import { z } from 'zod';
import type { BandsinownEvent, ApiError } from '@/types/Bandsintown.types';
import { MESSAGES } from './messages';

/**
 * Zod schema for Bandsintown venue object
 * Validates venue data from API response
 */
const BandsinownVenueSchema = z.object({
  name: z.string(),
  city: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

/**
 * Zod schema for ticket offer object
 * Validates ticket purchase links and availability
 */
const BandsinownOfferSchema = z.object({
  type: z.string(),
  url: z.string().url(),
  status: z.string(),
});

/**
 * Zod schema for Bandsintown event object
 * Validates complete event data including venue, lineup, and ticket info
 */
const BandsinownEventSchema = z.object({
  id: z.string(),
  datetime: z.string(), // ISO 8601 format
  venue: BandsinownVenueSchema,
  description: z.string().optional(),
  lineup: z.array(z.string()),
  offers: z.array(BandsinownOfferSchema),
  url: z.string().url(),
});

/**
 * Zod schema for Bandsintown API response
 * API returns an array of events (can be empty if no upcoming shows)
 */
const BandsinownEventsArraySchema = z.array(BandsinownEventSchema);

/**
 * Fetch upcoming tour dates from Bandsintown API
 *
 * Features:
 * - Automatic caching for 1 hour (revalidate: 3600)
 * - 5-second timeout to prevent hanging requests
 * - Zod validation for type safety
 * - Graceful error handling with Norwegian messages
 * - Fallback to cached data when API fails
 *
 * @returns Array of upcoming events or ApiError with fallback data
 *
 * @example
 * ```typescript
 * const result = await getBandsinownEvents();
 * if ('code' in result) {
 *   // Handle error - result is ApiError
 *   console.error(result.message); // Norwegian error message
 *   const cachedEvents = result.fallback || [];
 * } else {
 *   // Success - result is BandsinownEvent[]
 *   console.log(`Found ${result.length} upcoming events`);
 * }
 * ```
 */
export async function getBandsinownEvents(): Promise<BandsinownEvent[] | ApiError> {
  const artistName = process.env.NEXT_PUBLIC_BANDSINTOWN_ARTIST_NAME || 'Breizaas';
  const apiKey = process.env.BANDSINTOWN_API_KEY;

  // Check for missing API key
  if (!apiKey) {
    console.error('BANDSINTOWN_API_KEY environment variable not set');
    return {
      message: MESSAGES.bandsintown.fetchError,
      code: 'BANDSINTOWN_NO_API_KEY',
      fallback: await getCachedBandsinownEvents(),
      timestamp: new Date().toISOString(),
    };
  }

  // Build Bandsintown API URL
  const url = `https://rest.bandsintown.com/artists/${encodeURIComponent(artistName)}/events/?app_id=${apiKey}`;

  try {
    // Fetch with Next.js caching and timeout
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // 1 hour cache per NFR-P3
      signal: AbortSignal.timeout(5000), // 5 second timeout per NFR-P3
    });

    // Check HTTP status
    if (!response.ok) {
      throw new Error(`Bandsintown API returned ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();

    // Validate response with Zod schema
    const events = BandsinownEventsArraySchema.parse(data);

    return events;
  } catch (error) {
    // Determine error type for logging
    const code = error instanceof Error && error.name === 'AbortError'
      ? 'BANDSINTOWN_TIMEOUT'
      : error instanceof z.ZodError
      ? 'BANDSINTOWN_INVALID_DATA'
      : 'BANDSINTOWN_FETCH_ERROR';

    console.error(`Bandsintown API error (${code}):`, error);

    // Return ApiError with Norwegian message and fallback data
    return {
      message: MESSAGES.bandsintown.fetchError,
      code,
      fallback: await getCachedBandsinownEvents(),
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Fetch past tour dates from Bandsintown API
 *
 * Features:
 * - Fetches events with date=past parameter
 * - Automatic caching for 1 hour (revalidate: 3600)
 * - 5-second timeout to prevent hanging requests
 * - Zod validation for type safety
 * - Graceful error handling with Norwegian messages
 * - Events sorted by date descending (most recent first)
 *
 * @returns Array of past events sorted by date descending, or ApiError
 *
 * @example
 * ```typescript
 * const result = await getPastBandsinownEvents();
 * if ('code' in result) {
 *   // Handle error - result is ApiError
 *   console.error(result.message); // Norwegian error message
 * } else {
 *   // Success - result is BandsinownEvent[]
 *   console.log(`Found ${result.length} past events`);
 * }
 * ```
 */
export async function getPastBandsinownEvents(): Promise<BandsinownEvent[] | ApiError> {
  const artistName = process.env.NEXT_PUBLIC_BANDSINTOWN_ARTIST_NAME || 'Breizaas';
  const apiKey = process.env.BANDSINTOWN_API_KEY;

  // Check for missing API key
  if (!apiKey) {
    console.error('BANDSINTOWN_API_KEY environment variable not set');
    return {
      message: MESSAGES.bandsintown.pastEventsError,
      code: 'BANDSINTOWN_NO_API_KEY',
      fallback: null,
      timestamp: new Date().toISOString(),
    };
  }

  // Build Bandsintown API URL with date=past parameter
  const url = `https://rest.bandsintown.com/artists/${encodeURIComponent(artistName)}/events/?app_id=${apiKey}&date=past`;

  try {
    // Fetch with Next.js caching and timeout
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // 1 hour cache per NFR-P3
      signal: AbortSignal.timeout(5000), // 5 second timeout per NFR-P3
    });

    // Check HTTP status
    if (!response.ok) {
      throw new Error(`Bandsintown API returned ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();

    // Validate response with Zod schema
    const events = BandsinownEventsArraySchema.parse(data);

    // Sort by date descending (most recent first)
    const sortedEvents = events.sort((a, b) =>
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

    return sortedEvents;
  } catch (error) {
    // Determine error type for logging
    const code = error instanceof Error && error.name === 'AbortError'
      ? 'BANDSINTOWN_TIMEOUT'
      : error instanceof z.ZodError
      ? 'BANDSINTOWN_INVALID_DATA'
      : 'BANDSINTOWN_FETCH_ERROR';

    console.error(`Bandsintown API error (${code}):`, error);

    // Return ApiError with Norwegian message
    return {
      message: MESSAGES.bandsintown.pastEventsError,
      code,
      fallback: null,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Get cached Bandsintown events from Next.js fetch cache
 *
 * Note: Next.js App Router automatically caches fetch() responses.
 * This function attempts to read from that cache when the API fails.
 *
 * Implementation Note:
 * Next.js fetch cache is automatic and internal - there's no public API
 * to directly read cached responses in the current version (16.1.1).
 * This function returns null for now, providing graceful degradation.
 * Future versions may expose cache reading capabilities.
 *
 * @returns Cached events array or null if cache unavailable
 */
async function getCachedBandsinownEvents(): Promise<BandsinownEvent[] | null> {
  // Next.js fetch cache is automatic - no manual reading required
  // If this fails, return null (graceful degradation)
  // Future implementation could use unstable_cache or similar APIs
  return null;
}
