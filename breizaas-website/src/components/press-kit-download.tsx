import { ExternalLink } from 'lucide-react'

interface PressKitDownloadProps {
  description: string
  driveUrl: string
  buttonText: string
}

export function PressKitDownload({ description, driveUrl, buttonText }: PressKitDownloadProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary uppercase mb-6 tracking-wide">
        PRESSEPAKKE
      </h2>

      <div className="border-2 border-gold-champagne rounded-lg p-8 md:p-12 bg-brown-warm">
        <p className="text-lg text-text-secondary mb-6">
          {description}
        </p>

        <a
          href={driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold-champagne hover:bg-gold-vintage text-brown-dark font-semibold rounded-lg transition-colors duration-200"
        >
          {buttonText}
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
