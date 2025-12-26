interface HeroProps {
  brandName: string
  headline: string
  stat: string
}

export function Hero({ brandName, headline, stat }: HeroProps) {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-brown-dark to-brown-base px-6 md:px-12 lg:px-24"
      aria-label="Hero section with artist branding"
    >
      {/* Amber radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,179,71,0.1)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center space-y-6 text-center">
        {/* Brand signature "BREIZAAS" */}
        <h1 className="font-tradewind text-4xl text-gold-champagne md:text-5xl lg:text-6xl">
          {brandName}
        </h1>

        {/* Norwegian headline */}
        <p className="font-montserrat-bold text-3xl leading-tight text-text-primary md:text-4xl lg:text-5xl">
          {headline}
        </p>

        {/* 125k listener stat */}
        <p className="text-xl font-bold text-purple-vibrant md:text-2xl lg:text-3xl">
          {stat}
        </p>
      </div>
    </section>
  )
}
