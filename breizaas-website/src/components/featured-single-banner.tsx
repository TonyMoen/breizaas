import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { Single } from '@/types/Single.types';

interface FeaturedSingleBannerProps {
  /** Featured single from Sanity CMS */
  single: Single;
  /** Optional background image to display behind the banner */
  backgroundImage?: {
    asset: unknown;
    alt: string;
  };
}

/**
 * Featured Single Banner Component - Server Component
 * Displays a prominent featured single banner overlaid on hero background
 *
 * Features:
 * - Large polaroid-style cover image
 * - Title with "UTE NÅ!" (Out Now!) announcement
 * - Listen button linking to primary streaming service
 * - Overlays on hero background image
 *
 * @param single - Featured Single document from Sanity CMS
 * @param backgroundImage - Optional hero background image
 */
export function FeaturedSingleBanner({ single, backgroundImage }: FeaturedSingleBannerProps) {
  // Generate optimized image URL from Sanity CDN
  const imageUrl = urlFor(single.coverImage)
    .width(800)
    .height(800)
    .auto('format')
    .url();

  // Get primary streaming URL (prefer Spotify, fallback to Apple Music, then YouTube)
  const listenUrl = single.spotifyUrl || single.appleMusicUrl || single.youtubeUrl;

  const hasBackgroundImage = backgroundImage?.asset !== undefined;

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      aria-label="Featured single banner"
    >
      {/* Background Image */}
      {hasBackgroundImage && backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(backgroundImage.asset as never).width(1920).height(1080).url()}
            alt={backgroundImage.alt}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-brown-dark/80 to-black/90" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-brown-dark to-black" />
      )}

      {/* Pink radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,110,0.1)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* Title announcement */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold uppercase mb-8 tracking-wide text-gold-champagne"
          style={{
            textShadow: '-2px -2px 0 #d4a574, 2px -2px 0 #d4a574, -2px 2px 0 #d4a574, 2px 2px 0 #d4a574, 0 0 40px rgba(212, 165, 116, 0.6)'
          }}
        >
          {single.title} - <span className="text-amber-warm">UTE NÅ!</span>
        </h1>

        {/* Cover image */}
        <div className="shadow-2xl transform hover:scale-105 transition-transform duration-300 max-w-md w-full">
          <Image
            src={imageUrl}
            alt={single.coverImage.alt}
            width={800}
            height={800}
            className="w-full aspect-square object-cover rounded-lg"
            priority
          />
        </div>

        {/* Listen button */}
        {listenUrl && (
          <a
            href={listenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 border-2 border-purple-playful text-purple-playful bg-transparent hover:bg-purple-playful hover:text-brown-dark font-bold text-lg md:text-xl
                      py-4 px-8 rounded-lg transition-all duration-300
                      flex items-center gap-3 shadow-lg hover:shadow-[0_0_30px_rgba(216,150,255,0.6)]"
            aria-label={`Lytt til ${single.title} nå`}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
            Lytt nå
          </a>
        )}
      </div>
    </section>
  );
}
