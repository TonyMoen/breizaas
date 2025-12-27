import { Metadata } from 'next'
import { SpotifyEmbed } from '@/components/spotify-embed'

export const metadata: Metadata = {
  title: 'Musikk',
  description: 'Lytt til Breizaas sin musikk på Spotify, YouTube og andre plattformer.',
  alternates: {
    canonical: 'https://breizaas.no/musikk',
  },
}

export default function MusikkPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gold-champagne mb-8 text-center">
          Musikk
        </h1>
        <p className="text-lg text-text-secondary mb-12 text-center max-w-2xl mx-auto">
          Lytt til Breizaas sin musikk på Spotify. Opplev norsk AI-generert bygdemusikk med over 125 000 månedlige lyttere.
        </p>

        <SpotifyEmbed
          artistId="3sMoefLp287FEWJF6Ue7oc"
          theme="dark"
          lazyLoad={false}
        />
      </div>
    </main>
  )
}
