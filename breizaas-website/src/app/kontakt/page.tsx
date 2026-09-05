import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { getHeroSection } from '@/lib/sanity'
import { getBookingInfo } from '@/lib/queries/bookingInfo'
import { PageHero } from '@/components/page-hero'
import { MESSAGES } from '@/lib/messages'
import { SITE_URL, OG_IMAGE } from '@/lib/seo'

/** Revalidate every 5 minutes so new CMS content and concerts appear without a redeploy */
export const revalidate = 300

const KONTAKT_TITLE = 'Kontakt og booking'
const KONTAKT_DESCRIPTION =
  'Kontakt Breizaas for booking av live band eller DJ til festival, bryllup, firmafest og bygdefest, samt mediehenvendelser og andre spørsmål.'

export const metadata: Metadata = {
  title: KONTAKT_TITLE,
  description: KONTAKT_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/kontakt`,
  },
  openGraph: {
    title: `${KONTAKT_TITLE} | Breizaas`,
    description: KONTAKT_DESCRIPTION,
    url: `${SITE_URL}/kontakt`,
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    title: `${KONTAKT_TITLE} | Breizaas`,
    description: KONTAKT_DESCRIPTION,
  },
}

export default async function KontaktPage() {
  const [heroData, bookingInfoResult] = await Promise.all([
    getHeroSection('kontakt'),
    getBookingInfo(),
  ]);

  const hasBookingInfo = !('code' in bookingInfoResult);
  const bookingInfo = hasBookingInfo ? bookingInfoResult : null;

  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-white-warm">
      {/* Hero Section with Background Image */}
      <PageHero
        headline={heroData?.headline}
        subtitle={heroData?.subtitle}
        backgroundImage={heroData?.heroImage}
      />

      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left column: Contact form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading text-white-warm mb-4">
              {MESSAGES.contact.formHeading}
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              {MESSAGES.contact.formDescription}
            </p>

            <div className="bg-brown-medium p-8 rounded-lg">
              <h3 className="text-2xl font-heading text-white-warm mb-6">
                {MESSAGES.contact.pageHeading}
              </h3>
              <ContactForm />
            </div>
          </div>

          {/* Right column: Booking contact info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading text-white-warm mb-4">
              {MESSAGES.contact.bookingHeading}
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              {MESSAGES.contact.bookingDescription}
            </p>

            {hasBookingInfo && bookingInfo ? (
              <div className="bg-brown-medium p-8 rounded-lg">
                <h3 className="text-2xl font-heading text-white-warm mb-6">
                  {bookingInfo.companyName}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 mb-1">{MESSAGES.contact.bookingPhone}</p>
                    <a
                      href={`tel:${bookingInfo.phone}`}
                      className="text-xl text-gold-champagne hover:text-gold-vintage transition-colors"
                    >
                      {bookingInfo.displayPhone}
                    </a>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-1">{MESSAGES.contact.bookingEmail}</p>
                    <a
                      href={`mailto:${bookingInfo.email}`}
                      className="text-xl text-gold-champagne hover:text-gold-vintage transition-colors break-all"
                    >
                      {bookingInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-brown-medium p-8 rounded-lg">
                <p className="text-text-secondary text-lg">
                  Kunne ikke laste bookinginfo. Prøv igjen senere.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
