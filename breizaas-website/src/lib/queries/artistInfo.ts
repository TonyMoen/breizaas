import { fetchSanity, getSingletonQuery } from '@/lib/sanity';
import { ArtistInfoSchema, type ArtistInfo } from '@/types/Sanity.types';
import type { ApiError } from '@/lib/sanity';
import { z } from 'zod';

/**
 * Fetch complete artist information (singleton)
 * Returns all fields including biography, stats, and social links
 *
 * @returns ArtistInfo data or ApiError
 *
 * @example
 * ```ts
 * const artistInfo = await getArtistInfo();
 * if ('code' in artistInfo) {
 *   // Handle error with fallback
 *   console.error(artistInfo.message);
 * } else {
 *   // Use validated data
 *   console.log(artistInfo.biography);
 * }
 * ```
 */
export async function getArtistInfo(): Promise<ArtistInfo | ApiError> {
  const query =
    getSingletonQuery('artistInfo') +
    ` {
    _id,
    _type,
    artistName,
    tagline,
    biography,
    monthlyListeners,
    totalStreams,
    socialMediaLinks {
      spotify,
      instagram,
      tiktok,
      facebook,
      youtube
    }
  }`;

  return fetchSanity(query, {}, ArtistInfoSchema);
}

/**
 * Fetch only social media links for footer
 * Optimized query for global footer component
 *
 * @returns Social links object or ApiError
 *
 * @example
 * ```ts
 * const result = await getArtistSocialLinks();
 * if (!('code' in result)) {
 *   const { socialMediaLinks } = result;
 * }
 * ```
 */
export async function getArtistSocialLinks(): Promise<
  Pick<ArtistInfo, 'socialMediaLinks'> | ApiError
> {
  const query =
    getSingletonQuery('artistInfo') +
    ` {
    socialMediaLinks {
      spotify,
      instagram,
      tiktok,
      facebook,
      youtube
    }
  }`;

  const SocialLinksSchema = ArtistInfoSchema.pick({ socialMediaLinks: true });
  return fetchSanity(query, {}, SocialLinksSchema);
}
