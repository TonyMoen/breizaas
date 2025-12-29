import { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product-card';
import { ProductGridSkeleton } from '@/components/product-skeleton';
import { MESSAGES } from '@/lib/messages';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Merch - Breizaas',
  description:
    'Kjøp offisiell Breizaas merchandise. T-skjorter, hettegensere og mer fra den norske AI-genererte bygdemusikkartisten.',
  alternates: {
    canonical: 'https://breizaas.no/merch',
  },
  openGraph: {
    title: 'Merch - Breizaas',
    description:
      'Kjøp offisiell Breizaas merchandise. T-skjorter, hettegensere og mer.',
    type: 'website',
  },
};

/**
 * ProductGrid Component - Server Component that fetches and displays products
 */
async function ProductGrid() {
  const result = await getProducts();

  // Handle API error
  if ('code' in result) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4">
        <p className="text-gold-champagne text-xl mb-4">{result.message}</p>
        <a
          href="/merch"
          className="bg-gold-champagne text-brown-dark px-6 py-3 rounded-md font-bold hover:bg-gold-light transition-colors"
        >
          Prøv igjen
        </a>
      </div>
    );
  }

  const products = result;

  // Handle empty catalog
  if (products.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4">
        <p className="text-white-warm text-xl mb-6">
          {MESSAGES.merch.noProducts}
        </p>
        <p className="text-white-warm mb-4">{MESSAGES.merch.followUs}</p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/breizaasofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-champagne hover:text-gold-light transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/breizaasofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-champagne hover:text-gold-light transition-colors"
          >
            Facebook
          </a>
        </div>
      </div>
    );
  }

  // Display products in grid with max-width 1200px centered
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 3}
        />
      ))}
    </div>
  );
}

/**
 * Merch Page - Server Component
 */
export default function MerchPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-brown-dark py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white-warm mb-4">
            Merch
          </h1>
          <p className="text-white-warm text-xl">
            Støtt Breizaas med offisiell merchandise
          </p>
        </div>

        {/* Product grid with loading state */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
