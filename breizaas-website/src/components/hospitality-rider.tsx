import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react'

interface HospitalityRiderProps {
  content: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-text-primary uppercase mb-4 mt-8">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p className="text-lg text-text-secondary mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside text-lg text-text-secondary mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside text-lg text-text-secondary mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
}

export function HospitalityRider({ content }: HospitalityRiderProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary uppercase mb-6 tracking-wide">
        HOSPITALITY RIDER
      </h2>

      <div className="prose prose-invert max-w-none">
        <PortableText value={content} components={components} />
      </div>
    </section>
  )
}
