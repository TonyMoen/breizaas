import type { VideoCardProps } from '@/types/Video.types';
import { YouTubeEmbed } from './youtube-embed';

/**
 * Video Card Component (Server Component)
 *
 * Displays a single YouTube video embed with title and optional description
 * Uses YouTubeEmbed component for lazy loading and accessibility
 *
 * @param video - Video document from Sanity
 * @param className - Optional additional CSS classes
 */
export function VideoCard({ video, className = '' }: VideoCardProps) {
  return (
    <div className={className}>
      <YouTubeEmbed videoId={video.youtubeId} title={video.title} />
      <h3 className="text-white-warm text-lg font-semibold mt-4">{video.title}</h3>
      {video.description && (
        <p className="text-gray-light-warm text-sm mt-2">{video.description}</p>
      )}
    </div>
  );
}
