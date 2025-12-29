import { Download } from 'lucide-react'

interface TechnicalRiderProps {
  description: string
  pdfUrl: string
  buttonText: string
}

export function TechnicalRider({ description, pdfUrl, buttonText }: TechnicalRiderProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary uppercase mb-6 tracking-wide">
        TEKNISK RIDER
      </h2>

      <p className="text-lg text-text-secondary mb-8">
        {description}
      </p>

      <a
        href={pdfUrl}
        download
        className="inline-flex items-center gap-2 px-8 py-4 bg-gold-champagne hover:bg-gold-vintage text-brown-dark font-semibold rounded-lg transition-colors duration-200"
      >
        <Download className="w-5 h-5" />
        {buttonText}
      </a>
    </section>
  )
}
