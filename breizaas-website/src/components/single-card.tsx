'use client';

import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { Single } from '@/types/Single.types';

interface SingleCardProps {
  /** Single data from Sanity CMS */
  single: Single;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Single Card Component - Client Component
 * Displays a music single with cover art and streaming platform links
 *
 * Features:
 * - Square cover art with optimized loading
 * - Title and release date display
 * - Streaming platform buttons (Spotify, Apple Music, YouTube)
 * - Dark theme with gold hover effects
 *
 * @param single - Single document from Sanity CMS
 * @param className - Optional CSS classes for custom styling
 */
export function SingleCard({ single, className }: SingleCardProps) {
  // Generate optimized image URLs from Sanity CDN
  const imageUrl = urlFor(single.coverImage)
    .width(500)
    .height(500)
    .auto('format') // Automatic WebP conversion
    .url();

  const blurDataUrl = urlFor(single.coverImage).width(20).blur(10).url();

  // Format date to Norwegian locale (e.g., "4. juli 2025")
  const formattedDate = new Date(single.releaseDate).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className={`bg-brown-dark rounded-2xl overflow-hidden transition-all duration-300
                  border-2 border-transparent
                  hover:border-purple-playful hover:shadow-[0_0_20px_rgba(216,150,255,0.5)]
                  ${className || ''}`}
    >
      {/* Cover Image */}
      <Image
        src={imageUrl}
        alt={single.coverImage.alt}
        width={500}
        height={500}
        className="aspect-square w-full object-cover"
        placeholder="blur"
        blurDataURL={blurDataUrl}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-purple-bright font-montserrat font-bold text-xl mb-2">
          {single.title}
        </h3>

        {/* Release Date */}
        <p className="text-gray-light-warm text-sm mb-4">
          {formattedDate}
        </p>

        {/* Streaming Buttons */}
        <div className="flex gap-2">
          {single.spotifyUrl && (
            <a
              href={single.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#1DB954] text-white font-semibold text-sm py-2 px-3 rounded-lg
                        hover:bg-[#1ed760] transition-colors text-center
                        min-h-[44px] flex items-center justify-center"
              aria-label={`Lytt til ${single.title} på Spotify`}
            >
              Spotify
            </a>
          )}
          {single.appleMusicUrl && (
            <a
              href={single.appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#FA243C] text-white font-semibold text-sm py-2 px-3 rounded-lg
                        hover:bg-[#ff3d54] transition-colors text-center
                        min-h-[44px] flex items-center justify-center"
              aria-label={`Lytt til ${single.title} på Apple Music`}
            >
              Apple Music
            </a>
          )}
          {single.youtubeUrl && (
            <a
              href={single.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#FF0000] text-white font-semibold text-sm py-2 px-3 rounded-lg
                        hover:bg-[#ff1a1a] transition-colors text-center
                        min-h-[44px] flex items-center justify-center"
              aria-label={`Se ${single.title} på YouTube`}
            >
              YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
