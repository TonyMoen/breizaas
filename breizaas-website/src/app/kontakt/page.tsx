import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { getHeroSection } from '@/lib/sanity'
import { getBookingInfo } from '@/lib/queries/bookingInfo'
import { PageHero } from '@/components/page-hero'
import { MESSAGES } from '@/lib/messages'

export const metadata: Metadata = {
  title: 'Kontakt - Breizaas',
  description: 'Kontakt Breizaas for bookingforespørsler, mediaspørsmål eller generelle henvendelser.',
  alternates: {
    canonical: 'https://breizaas.no/kontakt',
  },
  openGraph: {
    title: 'Kontakt - Breizaas',
    description: 'Kontakt Breizaas for bookingforespørsler, mediaspørsmål eller generelle henvendelser.',
    url: 'https://breizaas.no/kontakt',
    siteName: 'Breizaas',
    locale: 'nb_NO',
    type: 'website',
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
