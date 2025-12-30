import { Metadata } from 'next'
import { SpotifyEmbed } from '@/components/spotify-embed'
import { SingleGrid } from '@/components/single-grid'
import { VideoGrid } from '@/components/video-grid'
import { SpotifyCtaButton } from '@/components/spotify-cta-button'
import { PageHero } from '@/components/page-hero'
import { getSingles, getVideos, getHeroSection } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Musikk - Breizaas',
  description: 'Lytt til Breizaas sin musikk på Spotify med over 125 000 månedlige lyttere. Opplev norsk AI-generert bygdemusikk, se diskografi og videoer.',
  openGraph: {
    title: 'Musikk - Breizaas',
    description: 'Lytt til Breizaas sin musikk på Spotify med over 125 000 månedlige lyttere. Opplev norsk AI-generert bygdemusikk, se diskografi og videoer.',
    url: 'https://breizaas.no/musikk',
    siteName: 'Breizaas',
    locale: 'nb_NO',
    type: 'music.song',
  },
  alternates: {
    canonical: 'https://breizaas.no/musikk',
  },
}

export default async function MusikkPage() {
  // Fetch singles, videos, and hero data from Sanity CMS
  const [singles, videos, heroData] = await Promise.all([
    getSingles(),
    getVideos(),
    getHeroSection('musikk'),
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      {/* Hero Section with Background Image */}
      <PageHero
        headline={heroData?.headline || 'Musikk'}
        subtitle={heroData?.subtitle}
        backgroundImage={heroData?.heroImage}
      />

      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <p className="text-xl font-semibold text-purple-playful text-center mb-12">
          125 000+ månedlige lyttere på Spotify
        </p>

        {/* Spotify Embed (Story 2.1) */}
        <div className="mt-12">
          <SpotifyEmbed
            artistId="3sMoefLp287FEWJF6Ue7oc"
            theme="dark"
            lazyLoad={false}
          />
        </div>

        {/* "Lytt på Spotify" CTA (Story 2.4) */}
        <div className="flex justify-center mt-12 mb-16">
          <SpotifyCtaButton artistId="3sMoefLp287FEWJF6Ue7oc" />
        </div>

        {/* Singles Section (Story 2.2) */}
        <SingleGrid singles={singles} className="mt-16" />

        {/* YouTube Videos Section (Story 2.3) */}
        <VideoGrid videos={videos} className="mt-24" />
      </div>
    </main>
  )
}
