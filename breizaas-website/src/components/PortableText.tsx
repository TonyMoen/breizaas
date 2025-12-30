import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from '@portabletext/react';

/**
 * Portable Text component configuration
 * Applies V11 styling and Norwegian character support
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold text-amber-warm mt-8 mb-4 font-montserrat">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-semibold text-purple-playful mt-6 mb-3 font-montserrat">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-white-warm leading-relaxed mb-4 font-inter">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-white-warm space-y-2 font-inter">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-white-warm space-y-2 font-inter">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gold-champagne">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline">{children}</u>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-purple-playful underline hover:text-purple-bright transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

interface PortableTextProps {
  value: never[];
  className?: string;
}

/**
 * Portable Text renderer for Sanity rich text content
 * Renders Sanity's Portable Text (biography, press kit content, etc.)
 * with V11-compliant styling and Norwegian character support
 *
 * @param value - Array of Portable Text blocks from Sanity
 * @param className - Optional additional CSS classes for wrapper div
 *
 * @example
 * ```tsx
 * <PortableText
 *   value={artistInfo.biography}
 *   className="prose prose-lg"
 * />
 * ```
 */
export function PortableText({ value, className = '' }: PortableTextProps) {
  return (
    <div className={className}>
      <PortableTextReact value={value as never} components={components} />
    </div>
  );
}
