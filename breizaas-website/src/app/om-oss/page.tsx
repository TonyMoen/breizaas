import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Instagram, Facebook, Youtube } from 'lucide-react'
import { getArtistInfo } from '@/lib/queries/artistInfo'
import { getSinglesCount } from '@/lib/queries/singles'
import { getSpotifyFollowers } from '@/lib/spotify'
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
    description: artistInfo.tagline,
    openGraph: {
      title: `Om ${artistInfo.artistName}`,
      description: artistInfo.tagline,
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
  const [artistInfoResult, heroData, singlesCountResult, spotifyFollowersResult] = await Promise.all([
    getArtistInfo(),
    getHeroSection('om-oss'),
    getSinglesCount(),
    // Extract Spotify artist ID from artist info social links
    getArtistInfo().then(async (info) => {
      if ('code' in info) return { code: 'SPOTIFY_ERROR' as const, message: 'No artist info' };
      const spotifyUrl = info.socialMediaLinks.spotify;
      const artistId = spotifyUrl?.match(/artist\/([a-zA-Z0-9]+)/)?.[1];
      if (!artistId) return { code: 'SPOTIFY_ERROR' as const, message: 'No artist ID' };
      return getSpotifyFollowers(artistId);
    }),
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

  // Handle stats data
  const singlesCount = typeof singlesCountResult === 'number' ? singlesCountResult : 0;
  // Temporary hardcoded fallback: 100k followers (remove when Spotify API credentials are added)
  const spotifyFollowers = typeof spotifyFollowersResult === 'number' ? spotifyFollowersResult : 100000;

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brown-base p-8 rounded-lg border-2 border-purple-playful/30">
            {spotifyFollowers > 0 && (
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-warm mb-2 font-montserrat">
                  {spotifyFollowers >= 1000
                    ? `${Math.floor(spotifyFollowers / 1000)}k+`
                    : spotifyFollowers.toLocaleString('nb-NO')}
                </p>
                <p className="text-white-warm text-sm md:text-base">Følgere på Spotify</p>
              </div>
            )}
            {singlesCount > 0 && (
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-warm mb-2 font-montserrat">
                  {singlesCount}
                </p>
                <p className="text-white-warm text-sm md:text-base">Singler</p>
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

            <div className="flex flex-row items-center justify-center gap-2">
              {socialLinksConfig.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted"
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
            description: artistInfo.tagline,
            url: 'https://breizaas.no',
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
