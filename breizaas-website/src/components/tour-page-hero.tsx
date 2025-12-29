import Link from 'next/link';

interface TourPageHeroProps {
  title: string;
}

export function TourPageHero({ title }: TourPageHeroProps) {
  return (
    <section className="relative bg-brown-dark py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb navigation */}
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-gold-champagne/70">
            <li>
              <Link href="/" className="hover:text-gold-champagne transition-colors">
                Hjem
              </Link>
            </li>
            <li aria-hidden="true" className="text-gold-champagne/50">
              &gt;
            </li>
            <li aria-current="page" className="text-gold-champagne">
              {title}
            </li>
          </ol>
        </nav>

        {/* Hero heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold-champagne">
          {title}
        </h1>
      </div>
    </section>
  );
}
