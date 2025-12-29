import type { Metadata } from 'next'
import { Hero } from '@/components/hero'

export const metadata: Metadata = {
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

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Breizaas',
  alternateName: 'Breizaas AI',
  genre: ['Bygdemusikk', 'Festmusikk', 'AI-generert musikk', 'Norsk musikk'],
  description:
    'AI-generert artist som skaper autentisk norsk bygdemusikk med 125 000+ månedlige lyttere',
  url: 'https://breizaas.no',
  image: 'https://breizaas.no/images/artist-photo.jpg',
  sameAs: [
    'https://open.spotify.com/artist/...',
    'https://instagram.com/breizaas',
    'https://tiktok.com/@breizaas',
    'https://facebook.com/breizaas',
    'https://youtube.com/@breizaas',
  ],
}

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero
        brandName="BREIZAAS"
        headline="AI Møter Bygdemusikk"
        stat="125 000 månedlige lyttere på Spotify"
      />

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
