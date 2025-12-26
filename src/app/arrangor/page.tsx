import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pressekit for Arrangører - Breizaas',
  description: 'Pressemateriell og booking-informasjon for arrangører. Last ned høyoppløselige bilder og teknisk rider.',
  openGraph: {
    title: 'Pressekit for Arrangører - Breizaas',
    description: 'Pressemateriell og booking-informasjon for arrangører',
    url: 'https://breizaas.no/arrangor',
    locale: 'nb_NO',
  },
}

export default function ArrangorPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gold-champagne mb-6">Pressekit for Arrangører</h1>
        <p className="text-lg text-text-secondary">
          Innhold for arrangørsiden kommer i Story 5.1.
        </p>
      </div>
    </main>
  )
}
