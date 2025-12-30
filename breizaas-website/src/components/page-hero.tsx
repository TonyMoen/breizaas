import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface PageHeroProps {
  headline: string
  subtitle?: string
  backgroundImage?: {
    asset: unknown
    alt: string
  }
}

export function PageHero({ headline, subtitle, backgroundImage }: PageHeroProps) {
  const hasBackgroundImage = backgroundImage?.asset !== undefined

  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {hasBackgroundImage && backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={urlFor(backgroundImage.asset as never).width(1920).height(1080).url()}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : (
        /* Fallback gradient background if no image */
        <div className="absolute inset-0 bg-gradient-to-b from-brown-dark to-brown-base" />
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold-champagne uppercase mb-4 tracking-wide"
          style={{
            textShadow: '-2px -2px 0 #d4a574, 2px -2px 0 #d4a574, -2px 2px 0 #d4a574, 2px 2px 0 #d4a574, 0 0 40px rgba(212, 165, 116, 0.6)'
          }}
        >
          {headline}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
