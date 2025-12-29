/**
 * TypeScript type definitions for Bandsintown API
 * API Documentation: https://help.artists.bandsintown.com/en/articles/9186477-api-documentation
 */

/**
 * Venue information from Bandsintown API
 * Fields may be optional depending on venue data availability
 */
export interface BandsinownVenue {
  /** Venue name (e.g., "Rockefeller Music Hall") */
  name: string;
  /** City name (e.g., "Oslo") */
  city?: string;
  /** Country name (e.g., "Norway") */
  country?: string;
  /** Region/state (e.g., "Oslo") */
  region?: string;
  /** Latitude coordinate as string */
  latitude?: string;
  /** Longitude coordinate as string */
  longitude?: string;
}

/**
 * Ticket offer information
 * Represents a ticketing link or purchase option
 */
export interface BandsinownOffer {
  /** Offer type (e.g., "Tickets") */
  type: string;
  /** Ticket purchase URL */
  url: string;
  /** Ticket availability status (e.g., "available", "sold out") */
  status: string;
}

/**
 * Concert event from Bandsintown API
 * Represents a single tour date/show
 */
export interface BandsinownEvent {
  /** Unique event identifier */
  id: string;
  /** Event date and time in ISO 8601 format */
  datetime: string;
  /** Venue information */
  venue: BandsinownVenue;
  /** Event description (optional) */
  description?: string;
  /** Array of artist names performing */
  lineup: string[];
  /** Array of ticket purchase options */
  offers: BandsinownOffer[];
  /** Bandsintown event page URL */
  url: string;
}

/**
 * API Error response format
 * Standardized error structure from architecture.md (Lines 766-799)
 * Used when API requests fail to provide graceful degradation
 */
export interface ApiError {
  /** Norwegian user-facing error message */
  message: string;
  /** Error code for logging (e.g., 'BANDSINTOWN_TIMEOUT') */
  code: string;
  /** Cached data if available (fallback for degraded experience) */
  fallback?: BandsinownEvent[] | null;
  /** ISO 8601 timestamp of when error occurred */
  timestamp: string;
}
