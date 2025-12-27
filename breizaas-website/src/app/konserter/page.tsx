/**
 * Konserter Page (Tour Dates)
 * Displays upcoming tour dates in responsive grid layout
 *
 * Story: 3.2 - TourDateCard Component with Grid Layout
 * Story: 3.4 - Past Tour History Display (added PastTourDatesSection)
 * Epic: 3 - Tour Date Discovery & Ticketing
 *
 * Architecture Compliance:
 * - Server Component: Data fetching on server (no API key exposure)
 * - Caching: 1 hour revalidation from getBandsinownEvents
 * - Error Handling: ApiError with Norwegian messages and fallback
 * - Responsive Grid: Mobile (1 col) → Tablet (2 col) → Desktop (3 col)
 * - Norwegian Localization: All text in nb-NO
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getBandsinownEvents } from '@/lib/bandsintown';
import { TourDateCard } from '@/components/tour-date-card';
import { TourDatesSkeleton } from '@/components/tour-dates-skeleton';
import { PastTourDatesSection } from '@/components/past-tour-dates-section';

/**
 * Page Metadata
 * SEO optimized with Norwegian content and Open Graph tags
 */
export const metadata: Metadata = {
  title: 'Konserter - Breizaas',
  description:
    'Kommende konserter og turné for Breizaas. Kjøp billetter til neste konsert.',
  openGraph: {
    title: 'Konserter - Breizaas',
    description: 'Kommende konserter og turné for Breizaas',
    locale: 'nb_NO',
  },
  alternates: {
    canonical: 'https://breizaas.no/konserter',
  },
};

/**
 * TourDatesGrid Component
 * Fetches and displays tour dates in responsive grid
 * Handles error states and empty states with Norwegian messages
 */
async function TourDatesGrid() {
  const result = await getBandsinownEvents();

  // Handle API error with Norwegian message
  if ('code' in result) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-white-warm text-lg mb-4">{result.message}</p>
        {/* Retry button placeholder - Story 3.3 will make functional */}
        <button className="bg-gold-champagne text-white px-6 py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne focus:ring-offset-2 focus:ring-offset-brown-base">
          Prøv igjen
        </button>
      </div>
    );
  }

  // Handle empty state (no upcoming events)
  if (result.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-white-warm text-lg">Ingen kommende konserter</p>
      </div>
    );
  }

  // Display tour dates in responsive grid
  // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.map((event) => (
          <TourDateCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

/**
 * Konserter Page Component
 * Main tour dates page with hero section, upcoming events, and past events
 */
export default function KonserterPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brown-dark py-16">
      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white-warm mb-4">
          Konserter
        </h1>
        <p className="text-gray-light-warm text-lg">
          Kommende konserter og turné
        </p>
      </div>

      {/* Upcoming tour dates grid with loading skeleton */}
      <section className="mb-24">
        <Suspense fallback={<TourDatesSkeleton />}>
          <TourDatesGrid />
        </Suspense>
      </section>

      {/* Past tour dates section with loading skeleton */}
      <Suspense fallback={<TourDatesSkeleton />}>
        <PastTourDatesSection />
      </Suspense>
    </main>
  );
}
