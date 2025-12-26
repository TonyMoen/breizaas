import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Musikk - Breizaas',
  description: 'Utforsk Breizaas sin diskografi, Spotify-spilleliste og YouTube-videoer. AI møter bygdemusikk.',
  openGraph: {
    title: 'Musikk - Breizaas',
    description: 'Utforsk Breizaas sin diskografi og musikk',
    url: 'https://breizaas.no/musikk',
    locale: 'nb_NO',
  },
}

export default function MusikkPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gold-champagne mb-6">Musikk</h1>
        <p className="text-lg text-text-secondary">
          Innhold for musikksiden kommer i Story 2.1-2.4.
        </p>
      </div>
    </main>
  )
}
