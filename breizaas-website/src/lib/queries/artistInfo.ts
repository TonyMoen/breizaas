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
    shortBio,
    monthlyListeners,
    totalStreams,
    numberOfReleases,
    notableAchievements,
    genreTags,
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

/**
 * Fetch only artist stats for homepage hero
 * Optimized query for hero component stat display
 *
 * @returns Stats object or ApiError
 *
 * @example
 * ```ts
 * const result = await getArtistStats();
 * if (!('code' in result)) {
 *   console.log(`${result.monthlyListeners} monthly listeners`);
 * }
 * ```
 */
export async function getArtistStats(): Promise<
  Pick<ArtistInfo, 'monthlyListeners' | 'totalStreams' | 'numberOfReleases'> | ApiError
> {
  const query =
    getSingletonQuery('artistInfo') +
    ` {
    monthlyListeners,
    totalStreams,
    numberOfReleases
  }`;

  const StatsSchema = ArtistInfoSchema.pick({
    monthlyListeners: true,
    totalStreams: true,
    numberOfReleases: true,
  });
  return fetchSanity(query, {}, StatsSchema);
}

/**
 * Fetch tagline and short bio for SEO meta tags
 * Optimized query for metadata generation
 *
 * @returns SEO data object or ApiError
 *
 * @example
 * ```ts
 * const result = await getArtistSeoData();
 * if (!('code' in result)) {
 *   return {
 *     title: result.tagline,
 *     description: result.shortBio,
 *   };
 * }
 * ```
 */
export async function getArtistSeoData(): Promise<
  Pick<ArtistInfo, 'tagline' | 'shortBio' | 'genreTags'> | ApiError
> {
  const query =
    getSingletonQuery('artistInfo') +
    ` {
    tagline,
    shortBio,
    genreTags
  }`;

  const SeoDataSchema = ArtistInfoSchema.pick({
    tagline: true,
    shortBio: true,
    genreTags: true,
  });
  return fetchSanity(query, {}, SeoDataSchema);
}
