import { Download } from 'lucide-react'

interface LogoFile {
  name: string
  fileUrl: string
}

interface LogoFilesProps {
  logos: LogoFile[]
  description: string
}

export function LogoFiles({ logos, description }: LogoFilesProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
        Logofiler
      </h2>

      <p className="text-lg text-text-secondary mb-8">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logos.map((logo, index) => (
          <a
            key={index}
            href={logo.fileUrl}
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold-champagne hover:bg-gold-vintage text-brown-dark font-semibold rounded-lg transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            {logo.name}
          </a>
        ))}
      </div>
    </section>
  )
}
