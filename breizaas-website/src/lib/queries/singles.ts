import { client } from '@/lib/sanity';
import type { ApiError } from '@/lib/sanity';

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
    };
  }
}
