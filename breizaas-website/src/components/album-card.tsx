'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { Album } from '@/types/Album.types';

interface AlbumCardProps {
  /** Album data from Sanity CMS */
  album: Album;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Album Card Component - Client Component
 * Displays an individual album with expandable track listing
 *
 * Features:
 * - Click to expand/collapse track listing
 * - Warm brown background with vintage gold border on hover
 * - Progressive image loading with blur placeholder
 * - Keyboard accessible (Enter/Space to toggle)
 * - ARIA attributes for screen readers
 *
 * @param album - Album document from Sanity CMS
 * @param className - Optional CSS classes for custom styling
 */
export function AlbumCard({ album, className }: AlbumCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate optimized image URLs from Sanity CDN
  const imageUrl = urlFor(album.artwork)
    .width(500)
    .height(500)
    .auto('format') // Automatic WebP conversion
    .url();

  const blurDataUrl = urlFor(album.artwork).width(20).blur(10).url();

  return (
    <div
      className={`bg-brown-dark rounded-2xl p-6 transition-all duration-300
                  hover:border-2 hover:border-gold-vintage hover:shadow-gold
                  cursor-pointer ${className || ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
    >
      {/* Album artwork */}
      <Image
        src={imageUrl}
        alt={album.artwork.alt}
        width={500}
        height={500}
        className="aspect-square rounded-lg mb-4 w-full"
        placeholder="blur"
        blurDataURL={blurDataUrl}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Album metadata */}
      <h3 className="text-white-warm font-semibold text-lg">{album.title}</h3>
      <p className="text-gray-light-warm text-sm">{album.releaseYear}</p>
      <p className="text-gray-light-warm text-sm">{album.tracks.length} spor</p>

      {/* Expanded track listing */}
      {isExpanded && (
        <div className="mt-4 space-y-2" aria-hidden={!isExpanded}>
          {album.tracks.map((track) => (
            <div key={track._key} className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-gray-light-warm text-sm mr-2">{track.number}.</span>
                <span className="text-white-warm truncate">{track.title}</span>
                <span className="text-gray-light-warm text-sm ml-2">{track.duration}</span>
              </div>
              <a
                href={track.spotifyTrackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-playful text-white-warm px-4 py-2 rounded-lg
                          hover:bg-purple-playful-hover transition-colors
                          min-w-[44px] min-h-[44px] flex items-center justify-center
                          flex-shrink-0"
                aria-label={`Lytt til ${track.title} på Spotify`}
                onClick={(e) => e.stopPropagation()} // Prevent card collapse on link click
              >
                Lytt
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
