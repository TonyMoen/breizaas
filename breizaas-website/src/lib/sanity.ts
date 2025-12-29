import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { Album } from '@/types/Album.types';
import type { Video } from '@/types/Video.types';

/**
 * Sanity client for fetching CMS content
 * Configured with project ID and dataset from environment variables
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  useCdn: false, // Set to true for production caching
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
 * Fetch all albums from Sanity CMS
 * Ordered by release year (newest first)
 *
 * @returns Promise resolving to array of Album documents
 * @returns Empty array if fetch fails (graceful degradation)
 *
 * @example
 * ```ts
 * const albums = await getDiscography();
 * ```
 */
export async function getDiscography(): Promise<Album[]> {
  try {
    const query = `*[_type == "album"] | order(releaseYear desc) {
      _id,
      title,
      releaseYear,
      artwork,
      spotifyAlbumUrl,
      "tracks": tracks[] {
        _key,
        number,
        title,
        duration,
        spotifyTrackUrl
      }
    }`;

    const albums = await client.fetch<Album[]>(query);
    return albums;
  } catch (error) {
    console.error('Failed to fetch discography from Sanity:', error);
    return []; // Graceful degradation - return empty array if Sanity unavailable
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
