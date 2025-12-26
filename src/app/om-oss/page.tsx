import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Om Breizaas',
  description: 'Møt artistene bak Breizaas. AI-generert bygdemusikk med norske røtter.',
  openGraph: {
    title: 'Om Breizaas',
    description: 'Møt artistene bak Breizaas',
    url: 'https://breizaas.no/om-oss',
    locale: 'nb_NO',
  },
}

export default function OmOssPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark text-text-primary">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gold-champagne mb-6">Om Breizaas</h1>
        <p className="text-lg text-text-secondary">
          Innhold for om-siden kommer i Story 1.5.
        </p>
      </div>
    </main>
  )
}
