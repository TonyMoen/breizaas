import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react'

interface ArtistBioProps {
  shortBio: string
  fullBio: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-lg text-text-secondary mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside text-lg text-text-secondary mb-4 space-y-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
  },
}

export function ArtistBio({ shortBio, fullBio }: ArtistBioProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
        Om Breizaas
      </h2>

      <div className="space-y-8">
        {/* Short Bio */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gold-champagne uppercase mb-4 tracking-wide">
            KORT BIO
          </h3>
          <p className="text-lg text-text-secondary leading-relaxed">
            {shortBio}
          </p>
        </div>

        {/* Full Bio */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gold-champagne uppercase mb-4 tracking-wide">
            FULL BIO
          </h3>
          <div className="prose prose-invert max-w-none">
            <PortableText value={fullBio} components={components} />
          </div>
        </div>
      </div>
    </section>
  )
}
