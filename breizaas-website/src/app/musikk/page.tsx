import { Metadata } from 'next'
import { SpotifyEmbed } from '@/components/spotify-embed'
import { AlbumGrid } from '@/components/album-grid'
import { VideoGrid } from '@/components/video-grid'
import { SpotifyCtaButton } from '@/components/spotify-cta-button'
import { getDiscography, getVideos } from '@/lib/sanity'

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
  // Fetch discography and videos data from Sanity CMS
  const albums = await getDiscography();
  const videos = await getVideos();

  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-5xl font-bold text-gold-champagne mb-8 text-center">
          Musikk
        </h1>
        <p className="text-lg text-text-secondary mb-4 text-center max-w-2xl mx-auto">
          Lytt til Breizaas sin musikk på Spotify. Opplev norsk AI-generert bygdemusikk.
        </p>
        <p className="text-xl font-semibold text-purple-playful text-center">
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

        {/* Discography Section (Story 2.2) */}
        <AlbumGrid albums={albums} className="mt-16" />

        {/* YouTube Videos Section (Story 2.3) */}
        <VideoGrid videos={videos} className="mt-24" />
      </div>
    </main>
  )
}
