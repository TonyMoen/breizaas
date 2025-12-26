import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Konserter - Breizaas',
  description: 'Se kommende konserter og tourdatoer for Breizaas. Kjøp billetter til neste show.',
  openGraph: {
    title: 'Konserter - Breizaas',
    description: 'Se kommende konserter og tourdatoer for Breizaas',
    url: 'https://breizaas.no/konserter',
    locale: 'nb_NO',
  },
}

export default function KonserterPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gold-champagne mb-6">Konserter</h1>
        <p className="text-lg text-text-secondary">
          Innhold for konsertesiden kommer i Story 3.1-3.5.
        </p>
      </div>
    </main>
  )
}
