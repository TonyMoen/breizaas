import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface HeroProps {
  brandName: string
  headline: string
  subtitle?: string
  stat?: string
  backgroundImage?: {
    asset: unknown
    alt: string
  }
}

export function Hero({ brandName, headline, subtitle, stat, backgroundImage }: HeroProps) {
  const hasBackgroundImage = backgroundImage?.asset !== undefined

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-brown-dark to-brown-base px-6 md:px-12 lg:px-24"
      aria-label="Hero section with artist branding"
    >
      {hasBackgroundImage && backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(backgroundImage.asset as never).width(1920).height(1080).url()}
            alt={backgroundImage.alt}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/70 to-brown-base/90" />
        </div>
      ) : null}

      {/* Pink radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,110,0.1)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center space-y-6 text-center">
        {/* Brand signature "BREIZAAS" */}
        <h1
          className="font-tradewind text-4xl text-gold-champagne md:text-5xl lg:text-6xl"
          style={{
            textShadow: '-2px -2px 0 #d4a574, 2px -2px 0 #d4a574, -2px 2px 0 #d4a574, 2px 2px 0 #d4a574, 0 0 40px rgba(212, 165, 116, 0.6)'
          }}
        >
          {brandName}
        </h1>

        {/* Norwegian headline */}
        <p
          className="font-montserrat-bold text-3xl leading-tight text-gold-champagne md:text-4xl lg:text-5xl"
          style={{
            textShadow: '-2px -2px 0 #d4a574, 2px -2px 0 #d4a574, -2px 2px 0 #d4a574, 2px 2px 0 #d4a574, 0 0 40px rgba(212, 165, 116, 0.6)'
          }}
        >
          {headline}
        </p>

        {/* Subtitle (optional) */}
        {subtitle && (
          <p className="text-lg text-text-secondary md:text-xl">
            {subtitle}
          </p>
        )}

        {/* Listener stat (optional) */}
        {stat && (
          <p className="text-xl font-bold text-amber-warm md:text-2xl lg:text-3xl">
            {stat}
          </p>
        )}
      </div>
    </section>
  )
}
