import { Metadata } from 'next'
import { getPressKit } from '@/lib/sanity-press-kit'
import { MESSAGES } from '@/lib/messages'
import { PressKitHero } from '@/components/press-kit-hero'
import { TechnicalRider } from '@/components/technical-rider'
import { HospitalityRider } from '@/components/hospitality-rider'
import { PressKitDownload } from '@/components/press-kit-download'
import { ArtistBio } from '@/components/artist-bio'
import { PressPhotosGrid } from '@/components/press-photos-grid'
import { LogoFiles } from '@/components/logo-files'
import { BookingContact } from '@/components/booking-contact'

export const metadata: Metadata = {
  title: 'For Arrangører - Breizaas Pressepakke',
  description: 'Pressepakke, teknisk rider og bookinginfo for Breizaas. Høyoppløselige bilder, logoer og rider informasjon for arrangører.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://breizaas.no/arrangor',
  },
}

export default async function ArrangorPage() {
  const pressKit = await getPressKit()

  if (!pressKit) {
    return (
      <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
        <div className="container mx-auto px-6 py-24">
          <h1 className="text-4xl font-bold text-gold-champagne mb-6">
            {MESSAGES.pressKit.heroHeadline}
          </h1>
          <p className="text-lg text-text-secondary">
            {MESSAGES.pressKit.failedToLoadPressKit}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      {/* Hero Section */}
      <PressKitHero
        heroImage={pressKit.heroImage.asset.url}
        heroHeadline={pressKit.heroHeadline}
        heroSubtitle={pressKit.heroSubtitle}
      />

      {/* Technical Rider Section */}
      {pressKit.technicalRiderPdf && (
        <TechnicalRider
          description={pressKit.technicalRiderDescription}
          pdfUrl={pressKit.technicalRiderPdf.asset.url}
          buttonText={MESSAGES.pressKit.downloadTechnicalRider}
        />
      )}

      {/* Hospitality Rider Section */}
      {pressKit.hospitalityRider && pressKit.hospitalityRider.length > 0 && (
        <HospitalityRider content={pressKit.hospitalityRider} />
      )}

      {/* Press Kit Download Section */}
      {pressKit.pressKitDriveUrl && (
        <PressKitDownload
          description={pressKit.pressKitDescription}
          driveUrl={pressKit.pressKitDriveUrl}
          buttonText={MESSAGES.pressKit.openPressKit}
        />
      )}

      {/* Artist Bio Section */}
      <ArtistBio shortBio={pressKit.shortBio} fullBio={pressKit.fullBio} />

      {/* Press Photos Grid */}
      {pressKit.pressPhotos && pressKit.pressPhotos.length > 0 && (
        <PressPhotosGrid
          photos={pressKit.pressPhotos.map((photo) => ({
            imageUrl: photo.asset.url,
            alt: photo.alt,
            caption: photo.caption ?? undefined,
          }))}
          description={MESSAGES.pressKit.pressPhotosDescription}
        />
      )}

      {/* Logo Files Section */}
      {pressKit.logoFiles && pressKit.logoFiles.length > 0 && (
        <LogoFiles
          logos={pressKit.logoFiles.map((logo) => ({
            name: logo.name,
            fileUrl: logo.file.asset.url,
          }))}
          description={MESSAGES.pressKit.logoFilesDescription}
        />
      )}

      {/* Booking Contact Section */}
      <BookingContact
        email={pressKit.bookingEmail}
        phone={pressKit.bookingPhone ?? undefined}
      />
    </main>
  )
}
