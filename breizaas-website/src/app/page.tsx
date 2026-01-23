import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/hero'
import { FeaturedSingleBanner } from '@/components/featured-single-banner'
import { SpotifyEmbed } from '@/components/spotify-embed'
import { ProductCard } from '@/components/product-card'
import { TourDateCard } from '@/components/tour-date-card'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { getHeroSection, getFeaturedSingle } from '@/lib/sanity'
import { getArtistInfo } from '@/lib/queries/artistInfo'
import { getBandsinownEvents } from '@/lib/bandsintown'
import { getProducts } from '@/lib/shopify'
import { getFeaturedVideo } from '@/lib/queries/video'

/**
 * Generate dynamic metadata from Sanity CMS artist info
 */
export async function generateMetadata(): Promise<Metadata> {
  const artistInfo = await getArtistInfo()

  // Fallback metadata if Sanity fetch fails
  if ('code' in artistInfo) {
    return {
      title: 'Breizaas - AI møter norsk bygdemusikk | 125k+ lyttere',
      description:
        'Opplev Breizaas - den AI-genererte artisten som beviser at kunstig intelligens kan skape autentisk norsk bygdemusikk. Med 125 000+ månedlige lyttere på Spotify.',
      openGraph: {
        title: 'Breizaas - AI møter norsk bygdemusikk',
        description: 'AI-generert bygdemusikk med 125k+ månedlige lyttere',
        url: 'https://breizaas.no',
        type: 'website',
      },
      alternates: {
        canonical: 'https://breizaas.no',
      },
    }
  }

  // Dynamic metadata from Sanity CMS
  return {
    title: `Breizaas - ${artistInfo.tagline}`,
    description: artistInfo.tagline,
    openGraph: {
      title: `Breizaas - ${artistInfo.tagline}`,
      description: artistInfo.tagline,
      url: 'https://breizaas.no',
      type: 'website',
    },
    alternates: {
      canonical: 'https://breizaas.no',
    },
  }
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [heroData, artistInfoResult, eventsResult, productsResult, featuredVideoResult, featuredSingle] =
    await Promise.all([
      getHeroSection('home'),
      getArtistInfo(),
      getBandsinownEvents(),
      getProducts(),
      getFeaturedVideo(),
      getFeaturedSingle(),
    ])

  // Handle error states gracefully with fallback data
  const hasArtistInfo = !('code' in artistInfoResult)
  const artistInfo = hasArtistInfo ? artistInfoResult : null

  const events = 'code' in eventsResult ? [] : eventsResult
  const products = 'code' in productsResult ? [] : productsResult
  const featuredVideo = 'code' in featuredVideoResult ? null : featuredVideoResult

  // Extract Spotify Artist ID from URL
  const spotifyUrl = artistInfo?.socialMediaLinks?.spotify
  const spotifyArtistId = spotifyUrl?.match(/artist\/([a-zA-Z0-9]+)/)?.[1] || '3sMoefLp287FEWJF6Ue7oc'

  // Fallback values if Sanity data not yet available
  const brandName = artistInfo?.artistName || 'BREIZAAS'
  const headline = heroData?.headline || 'AI Møter Bygdemusikk'
  const subtitle = heroData?.subtitle

  // Dynamic structured data from Sanity
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: artistInfo?.artistName || 'Breizaas',
    alternateName: 'Breizaas AI',
    genre: [
      'Bygdemusikk',
      'Festmusikk',
      'AI-generert musikk',
      'Norsk musikk',
    ],
    description:
      artistInfo?.tagline ||
      'AI møter norsk bygdemusikk',
    url: 'https://breizaas.no',
    image: 'https://breizaas.no/images/artist-photo.jpg',
    sameAs: artistInfo?.socialMediaLinks
      ? Object.values(artistInfo.socialMediaLinks).filter(Boolean)
      : [
          'https://open.spotify.com/artist/...',
          'https://instagram.com/breizaas',
          'https://tiktok.com/@breizaas',
          'https://facebook.com/breizaas',
          'https://youtube.com/@breizaas',
        ],
  }

  // Get first 5 concerts for left column
  const upcomingConcerts = events.slice(0, 5)

  // Get first 4 products for merch section
  const featuredProducts = products.slice(0, 4)

  return (
    <main id="main-content">
      {/* Hero Section - Featured Single Banner overlays on background, or regular Hero if no featured single */}
      {featuredSingle ? (
        <FeaturedSingleBanner
          single={featuredSingle}
          backgroundImage={heroData?.heroImage}
        />
      ) : (
        <Hero
          brandName={brandName}
          headline={headline}
          subtitle={subtitle}
          backgroundImage={heroData?.heroImage}
        />
      )}

      {/* Concerts & Spotify Section */}
      <section className="py-12 md:py-16 bg-brown-warm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gold-champagne mb-8 text-center">
            SPELL HØGT, SPELL BREIZAAS
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left: Upcoming Concerts */}
            <div>
              {upcomingConcerts.length > 0 ? (
                <div className="space-y-4">
                  {upcomingConcerts.map((event) => (
                    <TourDateCard key={event.id} event={event} featured={false} />
                  ))}
                  <div className="text-center mt-6">
                    <Link
                      href="/konserter"
                      className="text-gold-champagne hover:text-gold-vintage transition-colors inline-flex items-center gap-2 text-lg font-semibold"
                    >
                      Se alle konserter →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-brown-light rounded-2xl border-2 border-gold-vintage p-8 text-center">
                  <p className="text-white-warm text-lg mb-4">Ingen kommende konserter</p>
                  <p className="text-text-secondary">
                    Følg oss på Bandsintown for å få beskjed når nye konserter legges ut
                  </p>
                </div>
              )}
            </div>

            {/* Right: Spotify Player */}
            <div className="w-full flex items-center justify-center">
              <SpotifyEmbed artistId={spotifyArtistId} height={380} lazyLoad={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Merch Section */}
      {featuredProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-brown-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-champagne mb-8 text-center">
              OFFISIELL BREIZAAS MERCH
            </h2>

            {/* 4-column grid on desktop, 1-column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 2} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/merch"
                className="text-gold-champagne hover:text-gold-vintage transition-colors inline-flex items-center gap-2 text-lg font-semibold"
              >
                Se alt →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Video Section */}
      {featuredVideo && (
        <section className="py-12 md:py-16 bg-brown-warm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-champagne mb-8 text-center">
              MUSIKKVIDEO
            </h2>

            <div className="max-w-4xl mx-auto">
              <YouTubeEmbed
                videoId={featuredVideo.youtubeId}
                title={featuredVideo.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </main>
  )
}
