import { fetchSanity } from '@/lib/sanity';
import { VideoSchema, type Video } from '@/types/Sanity.types';
import type { ApiError } from '@/lib/sanity';

/**
 * Fetch the featured video for homepage
 * Returns the video marked as featured=true
 *
 * @returns Video data or ApiError
 *
 * @example
 * ```ts
 * const featuredVideo = await getFeaturedVideo();
 * if ('code' in featuredVideo) {
 *   // Handle error - no featured video
 *   console.error(featuredVideo.message);
 * } else {
 *   // Use validated video data
 *   <YouTubeEmbed videoId={featuredVideo.youtubeId} title={featuredVideo.title} />
 * }
 * ```
 */
export async function getFeaturedVideo(): Promise<Video | ApiError> {
  const query = `*[_type == "video" && featured == true][0] {
    _id,
    _type,
    title,
    youtubeId,
    description,
    publishedAt,
    featured
  }`;

  return fetchSanity(query, {}, VideoSchema);
}
