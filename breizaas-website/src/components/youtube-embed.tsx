'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { YouTubeEmbedProps } from '@/types/Video.types';

/**
 * YouTube Video Embed with Lazy Loading
 *
 * Client Component that uses Intersection Observer to lazy load YouTube iframes
 * Shows thumbnail placeholder with play button until video is near viewport
 *
 * Features:
 * - Lazy loading: Videos load 200px before entering viewport
 * - Performance: Prevents ~272KB iframe from blocking initial page load
 * - Accessibility: Keyboard navigation (Tab, Enter/Space), ARIA labels
 * - Error handling: Norwegian error message if video fails to load
 * - V11 Aesthetic: Warm brown background, vintage gold border
 *
 * @param videoId - 11-character YouTube video ID
 * @param title - Norwegian video title for accessibility
 * @param className - Optional additional CSS classes
 */
export function YouTubeEmbed({ videoId, title, className = '' }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoaded) {
          setIsLoaded(true);
        }
      },
      { rootMargin: '200px' } // Load 200px before visible for smooth UX
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoaded]);

  const handlePlaceholderClick = () => {
    setIsLoaded(true);
  };

  const handlePlaceholderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsLoaded(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`aspect-video bg-brown-dark rounded-2xl border-2 border-gold-vintage
                  overflow-hidden transition-all duration-300 hover:shadow-gold ${className}`}
    >
      {!isLoaded ? (
        // Placeholder with YouTube thumbnail and play button overlay
        <div
          className="relative w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-vintage"
          onClick={handlePlaceholderClick}
          onKeyDown={handlePlaceholderKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`Spill av ${title}`}
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`Videominiatyr for ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-brown-dark bg-opacity-10 hover:bg-opacity-0 transition-all">
            <div className="w-16 h-16 bg-gold-champagne rounded-full flex items-center justify-center
                          hover:bg-opacity-90 transition-all shadow-lg">
              <svg className="w-8 h-8 text-brown-dark ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : hasError ? (
        // Error state with Norwegian message
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white-warm text-center">Kunne ikke laste video</p>
        </div>
      ) : (
        // YouTube iframe embed
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
