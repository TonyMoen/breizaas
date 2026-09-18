import { cache } from 'react';
import { client, SINGLE_PROJECTION } from '@/lib/sanity';
import type { ApiError } from '@/lib/sanity';
import type { Single } from '@/types/Single.types';

/**
 * Get total count of published singles in Sanity
 * Auto-updates when singles are added/removed from CMS
 *
 * @returns Number of singles or ApiError
 *
 * @example
 * ```ts
 * const result = await getSinglesCount();
 * if ('code' in result) {
 *   console.error(result.message);
 * } else {
 *   console.log(`${result} singles`);
 * }
 * ```
 */
export async function getSinglesCount(): Promise<number | ApiError> {
  try {
    const query = `count(*[_type == "single"])`;

    const count = await client.fetch<number>(query, {}, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    return count;
  } catch (error) {
    console.error('Error fetching singles count:', error);
    return {
      code: 'SANITY_FETCH_ERROR',
      message: 'Kunne ikke hente antall singler',
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * All singles for the song pages (/<slug>), newest first.
 *
 * Unlike getSingles this one throws when Sanity is unreachable. A song page
 * that cannot load its data must fail the revalidation, so the last good
 * version stays online instead of being replaced by a 404.
 * Wrapped in cache() so metadata, page and share image share one request.
 */
export const getSinglesForSongPages = cache(async (): Promise<Single[]> => {
  const query = `*[_type == "single"] | order(releaseDate desc) ${SINGLE_PROJECTION}`;
  return client.fetch<Single[]>(query, {}, { next: { revalidate: 300, tags: ['singles'] } });
});
