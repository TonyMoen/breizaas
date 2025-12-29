import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Ta kontakt med Breizaas for bookingforespørsler og generelle henvendelser.',
  alternates: {
    canonical: 'https://breizaas.no/kontakt',
  },
}

export default function KontaktPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gold-champagne mb-6">Kontakt</h1>
        <p className="text-lg text-text-secondary">
          Innhold for kontaktsiden kommer i Story 5.2-5.3.
        </p>
      </div>
    </main>
  )
}
