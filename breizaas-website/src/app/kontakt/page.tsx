import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
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

export default function KontaktPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-white-warm">
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

            <div className="bg-brown-medium p-8 rounded-lg">
              <h3 className="text-2xl font-heading text-white-warm mb-6">
                {MESSAGES.contact.bookingCompany}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-1">{MESSAGES.contact.bookingPhone}</p>
                  <a
                    href="tel:+4792891523"
                    className="text-xl text-gold-champagne hover:text-gold-vintage transition-colors"
                  >
                    928 91 523
                  </a>
                </div>

                <div>
                  <p className="text-gray-400 mb-1">{MESSAGES.contact.bookingEmail}</p>
                  <a
                    href="mailto:arne@aronsenbooking.no"
                    className="text-xl text-gold-champagne hover:text-gold-vintage transition-colors break-all"
                  >
                    arne@aronsenbooking.no
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
