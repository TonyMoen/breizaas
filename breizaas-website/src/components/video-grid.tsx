import type { VideoGridProps } from '@/types/Video.types';
import { VideoCard } from './video-card';

/**
 * Video Grid Component (Server Component)
 *
 * Displays a responsive grid of YouTube video embeds
 * Layout: 2 columns desktop/tablet, 1 column mobile
 *
 * @param videos - Array of Video documents from Sanity
 * @param className - Optional additional CSS classes
 */
export function VideoGrid({ videos, className = '' }: VideoGridProps) {
  if (videos.length === 0) {
    return null; // Don't render section if no videos
  }

  return (
    <section className={className}>
      <h2 className="text-white-warm font-montserrat font-bold text-3xl mb-8">
        Videoer
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
}
