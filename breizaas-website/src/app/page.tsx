import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { getHeroSection, getArtistInfo } from '@/lib/sanity'

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

export default async function HomePage() {
  // Fetch hero section and artist info from Sanity CMS
  const heroData = await getHeroSection('home')
  const artistInfo = await getArtistInfo()

  // Fallback values if Sanity data not yet available
  const brandName = artistInfo?.artistName || 'BREIZAAS'
  const headline = heroData?.headline || 'AI Møter Bygdemusikk'
  const subtitle = heroData?.subtitle
  const monthlyListeners = artistInfo?.monthlyListeners
    ? `${artistInfo.monthlyListeners.toLocaleString('nb-NO')} månedlige lyttere på Spotify`
    : undefined

  return (
    <main id="main-content">
      <Hero
        brandName={brandName}
        headline={headline}
        subtitle={subtitle}
        stat={monthlyListeners}
        backgroundImage={heroData?.heroImage}
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
