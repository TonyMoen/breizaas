import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/hero'
import { FeaturedSingleBanner } from '@/components/featured-single-banner'
import { SpotifyEmbed } from '@/components/spotify-embed'
import { ProductCard } from '@/components/product-card'
import { TourDateCard } from '@/components/tour-date-card'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { MobileHome } from '@/components/mobile-home/mobile-home'
import { getHeroSection, getFeaturedSingle, getLatestSingles } from '@/lib/sanity'
import { getArtistInfo } from '@/lib/queries/artistInfo'
import { getBandsinownEvents, getPastBandsinownEvents } from '@/lib/bandsintown'
import { getProducts } from '@/lib/shopify'
import { getFeaturedVideo } from '@/lib/queries/video'
import { FEATURES } from '@/lib/features'
import { JsonLd } from '@/components/json-ld'
import {
  SITE_URL,
  SITE_NAME,
  SPOTIFY_ARTIST_ID,
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
  buildMusicGroupJsonLd,
  formatCount,
} from '@/lib/seo'

/** Revalidate every 5 minutes so new CMS content and concerts appear without a redeploy */
export const revalidate = 300

const HOME_TITLE = 'Breizaas - Festcountry, festmusikk og live band'

/**
 * Generate metadata. The listener count comes from Sanity so it never goes stale.
 */
export async function generateMetadata(): Promise<Metadata> {
  const artistInfo = await getArtistInfo()

  const description =
    'code' in artistInfo
      ? DEFAULT_DESCRIPTION
      : `Breizaas er et norsk countryband med festcountry og festmusikk laget for allsang. ${formatCount(artistInfo.monthlyListeners)}+ månedlige lyttere på Spotify. Book live band eller DJ til festival, bygdefest, bryllup og firmafest.`

  return {
    title: { absolute: HOME_TITLE },
    description,
    openGraph: {
      title: HOME_TITLE,
      description,
      url: SITE_URL,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      title: HOME_TITLE,
      description,
    },
    alternates: {
      canonical: SITE_URL,
    },
  }
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    heroData,
    artistInfoResult,
    eventsResult,
    productsResult,
    featuredVideoResult,
    featuredSingle,
    latestSingles,
    pastEventsResult,
  ] = await Promise.all([
    getHeroSection('home'),
    getArtistInfo(),
    getBandsinownEvents(),
    // Skip the Shopify request entirely while merch is disabled
    FEATURES.merch ? getProducts() : Promise.resolve([]),
    getFeaturedVideo(),
    getFeaturedSingle(),
    // Setlist and "Har spilt" on the mobile front page
    getLatestSingles(5),
    getPastBandsinownEvents(),
  ])

  // Handle error states gracefully with fallback data
  const hasArtistInfo = !('code' in artistInfoResult)
  const artistInfo = hasArtistInfo ? artistInfoResult : null

  const events = 'code' in eventsResult ? [] : eventsResult
  const pastEvents = 'code' in pastEventsResult ? [] : pastEventsResult
  const products = 'code' in productsResult ? [] : productsResult
  const featuredVideo = 'code' in featuredVideoResult ? null : featuredVideoResult

  // Extract Spotify Artist ID from URL
  const spotifyUrl = artistInfo?.socialMediaLinks?.spotify
  const spotifyArtistId = spotifyUrl?.match(/artist\/([a-zA-Z0-9]+)/)?.[1] || SPOTIFY_ARTIST_ID
  const spotifyArtistUrl = spotifyUrl || `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`

  // Fallback values if Sanity data not yet available
  const brandName = artistInfo?.artistName || 'BREIZAAS'
  const headline = heroData?.headline
  const subtitle = heroData?.subtitle
  const listenerCount = artistInfo ? formatCount(artistInfo.monthlyListeners) : null

  // Structured data (MusicGroup) shared with the about page via @id
  const structuredData = buildMusicGroupJsonLd(artistInfo)

  // Get first 5 concerts for left column
  const upcomingConcerts = events.slice(0, 5)

  // Get first 4 products for merch section
  const featuredProducts = FEATURES.merch ? products.slice(0, 4) : []

  return (
    <main id="main-content">
      {/* Phones and tablets: the "Tre scener" front page. Desktop (lg and up) keeps the sections below. */}
      <MobileHome
        className="lg:hidden"
        artistName={artistInfo?.artistName || SITE_NAME}
        spotifyArtistUrl={spotifyArtistUrl}
        events={events}
        pastEvents={pastEvents}
        featuredSingle={featuredSingle}
        latestSingles={latestSingles}
        featuredVideo={featuredVideo}
        now={new Date()}
      />

      {/* Hero Section - Featured Single Banner overlays on background, or regular Hero if no featured single */}
      <div className="hidden lg:block">
        {featuredSingle ? (
          <FeaturedSingleBanner
            single={featuredSingle}
            backgroundImage={heroData?.heroImage}
            desktopOnly
          />
        ) : (
          <Hero
            brandName={brandName}
            headline={headline}
            subtitle={subtitle}
            backgroundImage={heroData?.heroImage}
            desktopOnly
          />
        )}
      </div>

      {/* Intro Section - descriptive, crawlable copy about the band (all screen sizes) */}
      <section
        className="py-12 md:py-16 bg-brown-dark"
        aria-labelledby="intro-heading"
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2
            id="intro-heading"
            className="text-3xl md:text-4xl font-bold text-gold-champagne mb-6"
          >
            NORSK FESTCOUNTRY OG FESTMUSIKK
          </h2>
          <p className="text-lg md:text-xl text-white-warm leading-relaxed mb-4">
            {brandName} er et norsk countryband som lager festcountry og
            festmusikk laget for allsang.
            {listenerCount
              ? ` Med over ${listenerCount} månedlige lyttere på Spotify har låtene blitt lydsporet til bygdefester, festivaler og fester over hele landet.`
              : ' Låtene har blitt lydsporet til bygdefester, festivaler og fester over hele landet.'}
          </p>
          <p className="text-lg md:text-xl text-white-warm leading-relaxed mb-8">
            {brandName} kan bookes som live band eller DJ til festival,
            bygdefest, bryllup, firmafest og private arrangementer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="bg-gold-champagne text-brown-dark px-6 py-3 rounded-md font-bold hover:bg-gold-light transition-colors"
            >
              Book {brandName}
            </Link>
            <Link
              href="/arrangor"
              className="text-gold-champagne hover:text-gold-vintage transition-colors inline-flex items-center px-6 py-3 text-lg font-semibold"
            >
              For arrangører →
            </Link>
          </div>
        </div>
      </section>

      {/* Concerts & Spotify Section (desktop; phones have the Konserter and Musikk scenes) */}
      <section className="hidden lg:block py-12 md:py-16 bg-brown-warm">
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
        <section className="hidden lg:block py-12 md:py-16 bg-brown-dark">
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

      {/* Featured Video Section (desktop; phones have it in the Musikk scene) */}
      {featuredVideo && (
        <section className="hidden lg:block py-12 md:py-16 bg-brown-warm">
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
      <JsonLd data={structuredData} />
    </main>
  )
}
