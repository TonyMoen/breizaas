import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merch - Breizaas',
  description: 'Kjøp offisiell Breizaas merchandise. T-skjorter, caps og mer.',
  openGraph: {
    title: 'Merch - Breizaas',
    description: 'Kjøp offisiell Breizaas merchandise',
    url: 'https://breizaas.no/merch',
    locale: 'nb_NO',
  },
}

export default function MerchPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gold-champagne mb-6">Merch</h1>
        <p className="text-lg text-text-secondary">
          Innhold for merch-siden kommer i Story 4.1-4.5.
        </p>
      </div>
    </main>
  )
}
