import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Instagram, Facebook, Youtube } from 'lucide-react'
import { getArtistInfo } from '@/lib/queries/artistInfo'
import { getHeroSection } from '@/lib/sanity'
import { PageHero } from '@/components/page-hero'
import { PortableText } from '@/components/PortableText'

/**
 * Generate dynamic metadata from Sanity CMS artist info
 */
export async function generateMetadata(): Promise<Metadata> {
  const artistInfo = await getArtistInfo()

  // Fallback metadata if Sanity fetch fails
  if ('code' in artistInfo) {
    return {
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
  }

  // Dynamic metadata from Sanity CMS
  return {
    title: `Om ${artistInfo.artistName} - ${artistInfo.tagline}`,
    description: artistInfo.shortBio,
    keywords: artistInfo.genreTags.join(', '),
    openGraph: {
      title: `Om ${artistInfo.artistName}`,
      description: artistInfo.shortBio,
      type: 'profile',
      url: 'https://breizaas.no/om-oss',
    },
    alternates: {
      canonical: 'https://breizaas.no/om-oss',
    },
  }
}

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

export default async function OmOssPage() {
  const [artistInfoResult, heroData] = await Promise.all([
    getArtistInfo(),
    getHeroSection('om-oss'),
  ])

  // Handle error state gracefully
  if ('code' in artistInfoResult) {
    return (
      <main id="main-content" className="min-h-screen bg-brown-dark py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6 md:px-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-text-secondary text-lg">
              Kunne ikke laste artistinformasjon. Prøv igjen senere.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const artistInfo = artistInfoResult

  // Build social links from Sanity data
  const socialLinksConfig = [
    {
      name: 'Spotify',
      href: artistInfo.socialMediaLinks.spotify,
      label: 'Lytt på Spotify',
      icon: Music,
      color: 'spotify',
    },
    {
      name: 'Instagram',
      href: artistInfo.socialMediaLinks.instagram,
      label: 'Følg på Instagram',
      icon: Instagram,
      color: 'gold',
    },
    {
      name: 'TikTok',
      href: artistInfo.socialMediaLinks.tiktok,
      label: 'Se på TikTok',
      icon: null,
      color: 'gold',
    },
    {
      name: 'Facebook',
      href: artistInfo.socialMediaLinks.facebook,
      label: 'Besøk Facebook',
      icon: Facebook,
      color: 'gold',
    },
    {
      name: 'YouTube',
      href: artistInfo.socialMediaLinks.youtube,
      label: 'Se videoer på YouTube',
      icon: Youtube,
      color: 'gold',
    },
  ].filter((link) => link.href) as Array<{
    name: string
    href: string
    label: string
    icon: any
    color: string
  }> // Only show links that exist

  return (
    <main id="main-content" className="min-h-screen bg-brown-dark">
      {/* Hero Section with Background Image */}
      <PageHero
        headline={heroData?.headline || `Om ${artistInfo.artistName}`}
        subtitle={heroData?.subtitle || artistInfo.tagline}
        backgroundImage={heroData?.heroImage}
      />

      <div className="container mx-auto max-w-4xl px-6 md:px-8 py-16 md:py-24">

        {/* Stats Panel */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-brown-base p-8 rounded-lg border-2 border-purple-playful/30">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-amber-warm mb-2 font-montserrat">
                {artistInfo.monthlyListeners.toLocaleString('nb-NO')}+
              </p>
              <p className="text-white-warm text-sm md:text-base">Månedlige lyttere</p>
            </div>
            {artistInfo.totalStreams && (
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-warm mb-2 font-montserrat">
                  {artistInfo.totalStreams.toLocaleString('nb-NO')}+
                </p>
                <p className="text-white-warm text-sm md:text-base">Totale avspillinger</p>
              </div>
            )}
            {artistInfo.numberOfReleases && (
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-warm mb-2 font-montserrat">
                  {artistInfo.numberOfReleases}
                </p>
                <p className="text-white-warm text-sm md:text-base">Utgivelser</p>
              </div>
            )}
          </div>
        </section>

        {/* Biography Section - Portable Text from Sanity */}
        <section className="mb-16 md:mb-24">
          <PortableText
            value={artistInfo.biography as never[]}
            className="prose prose-lg md:prose-xl prose-invert max-w-none"
          />
        </section>

        {/* Achievements Section */}
        {artistInfo.notableAchievements && artistInfo.notableAchievements.length > 0 && (
          <section className="mb-16 md:mb-24">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-amber-warm mb-8">
              Prestasjoner
            </h2>
            <ul className="space-y-4">
              {artistInfo.notableAchievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-purple-playful text-2xl mt-1 flex-shrink-0">✓</span>
                  <span className="text-white-warm text-lg leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Genre Tags Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-amber-warm mb-8">
            Sjanger
          </h2>
          <div className="flex flex-wrap gap-3">
            {artistInfo.genreTags.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-playful text-brown-dark px-5 py-2 rounded-full text-sm md:text-base font-medium font-inter hover:bg-purple-bright transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Booking CTA */}
        <section className="mb-16 md:mb-24 bg-brown-base p-8 md:p-12 rounded-lg border-2 border-purple-playful/30">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-amber-warm mb-6">
            For arrangører
          </h2>
          <p className="text-lg md:text-xl text-white-warm leading-relaxed mb-6">
            {artistInfo.artistName} er tilgjengelig for festivaler, konserter, bedriftsarrangementer
            og private fester. Musikken vår passer perfekt til norske arrangementer der gjestene
            ønsker ekte festmusikk med et moderne twist.
          </p>
          <p className="text-lg md:text-xl text-white-warm leading-relaxed">
            Interessert i booking? Besøk vår{' '}
            <Link
              href="/arrangor"
              className="text-purple-playful hover:text-purple-bright transition-colors underline decoration-2 underline-offset-4"
            >
              pressekit-side for arrangører
            </Link>
            , eller ta{' '}
            <Link
              href="/kontakt"
              className="text-purple-playful hover:text-purple-bright transition-colors underline decoration-2 underline-offset-4"
            >
              kontakt direkte
            </Link>
            .
          </p>
        </section>

        {/* Social Links Section */}
        {socialLinksConfig.length > 0 && (
          <section className="mb-16 md:mb-24">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-amber-warm text-center mb-8">
              Følg {artistInfo.artistName}
            </h2>

            <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
              {socialLinksConfig.map((link) => {
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
                      hover:scale-110
                      ${
                        link.color === 'spotify'
                          ? 'bg-[#1db954] text-white hover:bg-[#1ed760] hover:shadow-[0_0_20px_rgba(29,185,84,0.4)]'
                          : 'bg-purple-playful text-brown-dark hover:bg-purple-bright hover:shadow-[0_0_20px_rgba(216,150,255,0.6)]'
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
        )}

      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: artistInfo.artistName,
            description: artistInfo.shortBio,
            url: 'https://breizaas.no',
            genre: artistInfo.genreTags,
            sameAs: Object.values(artistInfo.socialMediaLinks).filter(Boolean),
            aggregateRating: artistInfo.monthlyListeners
              ? {
                  '@type': 'AggregateRating',
                  ratingCount: artistInfo.monthlyListeners,
                }
              : undefined,
          }),
        }}
      />
    </main>
  )
}
