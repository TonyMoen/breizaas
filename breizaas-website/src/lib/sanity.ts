import { createClient, type QueryParams } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { Single } from '@/types/Single.types';
import type { Video } from '@/types/Video.types';
import type { HeroSection, ArtistInfo } from '@/types/Sanity.types';
import { HeroSectionSchema, ArtistInfoSchema } from '@/types/Sanity.types';
import { z } from 'zod';
import { apiVersion, dataset, projectId } from '../sanity/env';
import { MESSAGES } from './messages';

/**
 * ApiError type from architecture requirements
 * All API clients must return this type for consistent error handling
 */
export type ApiError = {
  message: string; // Norwegian user-facing message
  code: string; // Error code for logging (e.g., 'SANITY_TIMEOUT')
  fallback?: unknown; // Cached data if available
  timestamp: string; // ISO 8601 timestamp
};

/**
 * Read client for public data fetching
 * Uses fresh data (useCdn: false) for webhook-triggered ISR
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Use fresh data (webhook-triggered ISR handles caching)
});

/**
 * Write client for server-side mutations
 * Requires SANITY_API_TOKEN environment variable
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Server-only token
});

/**
 * Image URL builder for Sanity images
 * Enables automatic image optimization and transformations
 */
const builder = createImageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image reference
 *
 * @param source - Sanity image reference from CMS
 * @returns Image URL builder instance for chaining transformations
 *
 * @example
 * ```ts
 * const imageUrl = urlFor(album.artwork)
 *   .width(500)
 *   .height(500)
 *   .auto('format')
 *   .url();
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Fields every single query returns. The song pages (/<slug>) need the same
 * shape as the cards, so the projection lives in one place.
 */
export const SINGLE_PROJECTION = `{
  _id,
  title,
  slug,
  artistLine,
  releaseDate,
  coverImage,
  description,
  presaveUrl,
  spotifyUrl,
  appleMusicUrl,
  youtubeUrl,
  tidalUrl,
  deezerUrl,
  amazonMusicUrl,
  featured
}`;

/**
 * Fetch all singles from Sanity CMS
 * Ordered by release date (newest first)
 *
 * @returns Promise resolving to array of Single documents
 * @returns Empty array if fetch fails (graceful degradation)
 *
 * @example
 * ```ts
 * const singles = await getSingles();
 * ```
 */
export async function getSingles(): Promise<Single[]> {
  try {
    const query = `*[_type == "single"] | order(releaseDate desc) ${SINGLE_PROJECTION}`;

    const singles = await client.fetch<Single[]>(query);
    return singles;
  } catch (error) {
    console.error('Failed to fetch singles from Sanity:', error);
    return []; // Graceful degradation - return empty array if Sanity unavailable
  }
}

/**
 * Fetch the newest singles from Sanity CMS
 * Ordered by release date (newest first)
 *
 * @param limit - Number of singles to return
 * @returns Promise resolving to array of Single documents
 * @returns Empty array if fetch fails (graceful degradation)
 *
 * @example
 * ```ts
 * const latest = await getLatestSingles(5);
 * ```
 */
export async function getLatestSingles(limit: number): Promise<Single[]> {
  try {
    const query = `*[_type == "single"] | order(releaseDate desc)[0...$limit] ${SINGLE_PROJECTION}`;

    const singles = await client.fetch<Single[]>(query, { limit });
    return singles;
  } catch (error) {
    console.error('Failed to fetch latest singles from Sanity:', error);
    return []; // Graceful degradation
  }
}

/**
 * Fetch the featured single from Sanity CMS
 * Returns the first single with featured=true
 *
 * @returns Promise resolving to Single or null if no featured single
 * @returns null if fetch fails (graceful degradation)
 *
 * @example
 * ```ts
 * const featuredSingle = await getFeaturedSingle();
 * ```
 */
export async function getFeaturedSingle(): Promise<Single | null> {
  try {
    const query = `*[_type == "single" && featured == true][0] ${SINGLE_PROJECTION}`;

    const single = await client.fetch<Single | null>(query);
    return single;
  } catch (error) {
    console.error('Failed to fetch featured single from Sanity:', error);
    return null; // Graceful degradation
  }
}

/**
 * Fetch all videos from Sanity CMS
 * Ordered by published date (newest first)
 *
 * @returns Promise resolving to array of Video documents
 * @returns Empty array if fetch fails (graceful degradation)
 *
 * @example
 * ```ts
 * const videos = await getVideos();
 * ```
 */
export async function getVideos(): Promise<Video[]> {
  try {
    const query = `*[_type == "video"] | order(publishedAt desc) {
      _id,
      title,
      youtubeId,
      description,
      publishedAt
    }`;

    const videos = await client.fetch<Video[]>(query);
    return videos;
  } catch (error) {
    console.error('Failed to fetch videos from Sanity:', error);
    return []; // Graceful degradation - return empty array if Sanity unavailable
  }
}

/**
 * Fetch data from Sanity with timeout, error handling, and validation
 * Architecture-compliant implementation with 5s timeout per NFR-P3
 *
 * @param query GROQ query string
 * @param params Query parameters
 * @param schema Zod schema for validation
 * @returns Validated data or ApiError
 *
 * @example
 * ```ts
 * const result = await fetchSanity(
 *   '*[_type == "artistInfo"][0]',
 *   {},
 *   ArtistInfoSchema
 * );
 * if ('code' in result) {
 *   // Handle error
 *   console.error(result.message);
 * } else {
 *   // Use validated data
 *   console.log(result.artistName);
 * }
 * ```
 */
export async function fetchSanity<T>(
  query: string,
  params: QueryParams = {},
  schema: z.ZodSchema<T>
): Promise<T | ApiError> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout per NFR-P3

    const data = await client.fetch(query, params, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Validate with Zod
    const validated = schema.parse(data);
    return validated;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          message: MESSAGES.errors.apiTimeout,
          code: 'SANITY_TIMEOUT',
          fallback: undefined,
          timestamp: new Date().toISOString(),
        };
      }

      if (error instanceof z.ZodError) {
        return {
          message: MESSAGES.sanity.fetchError,
          code: 'SANITY_VALIDATION_ERROR',
          fallback: undefined,
          timestamp: new Date().toISOString(),
        };
      }

      return {
        message: MESSAGES.sanity.noContent,
        code: 'SANITY_FETCH_ERROR',
        fallback: undefined,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      message: MESSAGES.sanity.noContent,
      code: 'SANITY_UNKNOWN_ERROR',
      fallback: undefined,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * GROQ utility: Get all documents of a type
 */
export function getAllQuery(type: string): string {
  return `*[_type == "${type}"]`;
}

/**
 * GROQ utility: Get single document by ID
 */
export function getByIdQuery(type: string, id: string): string {
  return `*[_type == "${type}" && _id == "${id}"][0]`;
}

/**
 * GROQ utility: Get singleton document (e.g., artistInfo, bookingInfo)
 */
export function getSingletonQuery(type: string): string {
  return `*[_type == "${type}"][0]`;
}

/**
 * GROQ utility: Get document by field value
 */
export function getByFieldQuery(
  type: string,
  field: string,
  value: string
): string {
  return `*[_type == "${type}" && ${field} == "${value}"][0]`;
}

/**
 * Fetch hero section by page name
 * Returns hero content for specific page (home, musikk, om-oss, etc.)
 *
 * @param pageName - Page identifier (e.g., 'home', 'musikk')
 * @returns Promise resolving to HeroSection or null if not found
 *
 * @example
 * ```ts
 * const hero = await getHeroSection('home');
 * if (hero) {
 *   console.log(hero.headline);
 * }
 * ```
 */
export async function getHeroSection(
  pageName: string
): Promise<HeroSection | null> {
  try {
    const query = `*[_type == "heroSection" && pageName == $pageName][0] {
      _id,
      _type,
      pageName,
      heroImage {
        asset,
        alt
      },
      headline,
      subtitle
    }`;

    const hero = await client.fetch<HeroSection | null>(query, { pageName });
    return hero;
  } catch (error) {
    console.error(`Failed to fetch hero section for ${pageName}:`, error);
    return null;
  }
}

/**
 * @deprecated Use getArtistInfo from @/lib/queries/artistInfo instead
 * This function is kept for backward compatibility but will be removed
 */
