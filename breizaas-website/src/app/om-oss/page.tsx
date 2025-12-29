import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Instagram, Facebook, Youtube } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Om Breizaas - AI møter norsk bygdemusikk',
  description:
    'Breizaas er en AI-generert artist som skaper autentisk norsk bygdemusikk og festmusikk. Med 125 000+ månedlige lyttere på Spotify beviser vi at AI kan skape musikk som berører hjerter.',
  openGraph: {
    title: 'Om Breizaas - AI møter norsk bygdemusikk',
    description: 'AI-generert bygdemusikk med 125k+ månedlige lyttere',
    type: 'profile',
    url: 'https://breizaas.no/om-oss',
  },
  alternates: {
    canonical: 'https://breizaas.no/om-oss',
  },
}

const socialLinks = [
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/...',
    label: 'Lytt på Spotify',
    icon: Music,
    color: 'spotify', // Spotify green background
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/breizaas',
    label: 'Følg på Instagram',
    icon: Instagram,
    color: 'gold',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@breizaas',
    label: 'Se på TikTok',
    icon: null, // Custom SVG below
    color: 'gold',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/breizaas',
    label: 'Besøk Facebook',
    icon: Facebook,
    color: 'gold',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@breizaas',
    label: 'Se videoer på YouTube',
    icon: Youtube,
    color: 'gold',
  },
]

// TikTok custom icon (simple music note)
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

export default function OmOssPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6 md:px-8">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
            Om Breizaas
          </h1>
          <p className="text-xl md:text-2xl text-gold-champagne font-semibold">
            AI møter norsk bygdemusikk
          </p>
        </section>

        {/* Main Bio Content */}
        <section className="mb-16 md:mb-24">
          <article className="prose prose-lg md:prose-xl prose-invert max-w-none">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
              Breizaas er en AI-generert artist som skaper autentisk norsk bygdemusikk og festmusikk.
              Med{' '}
              <span className="text-purple-playful font-bold text-2xl md:text-3xl">
                125 000+ månedlige lyttere
              </span>{' '}
              på Spotify beviser vi at kunstig intelligens kan skape musikk som berører hjerter og
              får folk til å danse.
            </p>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
              Prosjektet Breizaas representerer et banebrytende møte mellom moderne teknologi og norsk
              kulturarv. Gjennom avansert AI-teknologi skaper vi musikk som føles ekte, troverdig og
              dypt forankret i den norske bygdemusikktradisjonen - samtidig som vi utforsker nye
              kreative muligheter.
            </p>

            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-gold-champagne mt-12 mb-6">
              Musikalsk identitet
            </h2>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
              <strong className="text-text-primary">Bygdemusikk</strong> og{' '}
              <strong className="text-text-primary">festmusikk</strong> er hjørnesteiner i norsk
              kulturhistorie - en musikkstil som har samlet folk til fest, dans og fellesskap i
              generasjoner. Breizaas ærer denne tradisjonen ved å skape låter som fanger den samme
              energien, gleden og samhørigheten som kjennetegner den beste norske festmusikken.
            </p>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
              Musikken vår kombinerer tradisjonelle bygdemusikkelementer med moderne produksjon, og
              resultatet er låter som både føles kjente og friske. Fra opptempopartylåter til
              melankolske ballader - hver sang er designet for å skape følelser og minner.
            </p>

            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-gold-champagne mt-12 mb-6">
              Suksessen som beviser konseptet
            </h2>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
              Med over 125 000 månedlige lyttere på Spotify har Breizaas bevist at AI-generert musikk
              ikke bare er et teknisk eksperiment - det er musikk som folk virkelig ønsker å høre på.
              Lytterne våre strekker seg fra bygdefester i innlandet til storbyunge i Oslo, og musikken
              vår spilles på alt fra private fester til offentlige arrangementer.
            </p>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
              Dette er ikke bare tall - det er bevis på at teknologi og tradisjon kan forenes på
              meningsfulle måter. Hver avspilling representerer et øyeblikk der en lytter føler noe,
              danser til noe, eller deler noe med venner.
            </p>

            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-gold-champagne mt-12 mb-6">
              For arrangører
            </h2>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
              Breizaas er tilgjengelig for festivaler, konserter, bedriftsarrangementer og private
              fester. Musikken vår passer perfekt til norske arrangementer der gjestene ønsker ekte
              festmusikk med et moderne twist.
            </p>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Interessert i booking? Besøk vår{' '}
              <Link
                href="/arrangor"
                className="text-gold-champagne hover:opacity-80 transition-opacity underline decoration-2 underline-offset-4"
              >
                pressekit-side for arrangører
              </Link>
              , eller ta{' '}
              <Link
                href="/kontakt"
                className="text-gold-champagne hover:opacity-80 transition-opacity underline decoration-2 underline-offset-4"
              >
                kontakt direkte
              </Link>
              .
            </p>
          </article>
        </section>

        {/* Social Links Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-gold-champagne text-center mb-8">
            Følg Breizaas
          </h2>

          <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex items-center justify-center
                    w-11 h-11 rounded-full
                    transition-all duration-300
                    hover:scale-110 hover:shadow-lg
                    ${
                      link.color === 'spotify'
                        ? 'bg-[#1db954] text-white hover:bg-[#1ed760]'
                        : 'bg-gold-champagne text-brown-dark hover:bg-[#f4e4c1]'
                    }
                  `}
                  aria-label={`${link.label} (åpnes i ny fane)`}
                >
                  {link.name === 'TikTok' ? (
                    <TikTokIcon />
                  ) : Icon ? (
                    <Icon className="w-6 h-6" />
                  ) : null}
                </a>
              )
            })}
          </div>
        </section>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              name: 'Breizaas',
              genre: ['Bygdemusikk', 'Festmusikk', 'AI-generert musikk'],
              description: 'AI-generert artist som skaper autentisk norsk bygdemusikk',
              url: 'https://breizaas.no',
              sameAs: socialLinks.map((link) => link.href),
            }),
          }}
        />
      </div>
    </main>
  )
}
