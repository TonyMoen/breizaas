import Image from 'next/image'

interface PressKitHeroProps {
  heroImage: string
  heroHeadline: string
  heroSubtitle: string
}

export function PressKitHero({ heroImage, heroHeadline, heroSubtitle }: PressKitHeroProps) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary uppercase mb-4 tracking-wide">
          {heroHeadline}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary">
          {heroSubtitle}
        </p>
      </div>
    </section>
  )
}
