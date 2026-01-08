/**
 * Tour Page (Konserter)
 * Comprehensive tour page with featured shows, all upcoming events, past history, and social sharing
 *
 * Story: 3.5 - Tour Page Layout with Social Sharing
 * Route: /konserter
 * Component Type: Server Component
 *
 * Architecture Compliance:
 * - Server Component: Fetches all data server-side with ISR caching
 * - SEO Optimized: Metadata export with Open Graph and Twitter Cards
 * - Norwegian Localization: All content in Norwegian (nb-NO)
 * - Performance: Parallel data fetching with Promise.all()
 * - Error Handling: Graceful degradation with ApiError fallback
 */

import type { Metadata } from 'next';
import { getBandsinownEvents, getPastBandsinownEvents } from '@/lib/bandsintown';
import { getHeroSection } from '@/lib/sanity';
import { MESSAGES } from '@/lib/messages';
import { PageHero } from '@/components/page-hero';
import { FeaturedTourDates } from '@/components/featured-tour-dates';
import { TourDateCard } from '@/components/tour-date-card';
import { PastTourHistory } from '@/components/past-tour-history';

/**
 * Metadata for SEO and social sharing
 * Includes Open Graph and Twitter Card tags for rich social previews
 */
export const metadata: Metadata = {
  title: 'Breizaas Konserter - Kommende og Tidligere Show | Breizaas',
  description:
    'Se alle kommende Breizaas konserter og tidligere show. Finn billetter, datoer, og steder for Norges AI-genererte bygdemusikk artist.',
  openGraph: {
    title: 'Breizaas Konserter - Alle Show',
    description:
      'Se alle kommende Breizaas konserter og tidligere show. Finn billetter, datoer, og steder for Norges AI-genererte bygdemusikk artist.',
    url: 'https://breizaas.com/konserter',
    images: [
      {
        url: '/images/tour-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Breizaas Konserter',
      },
    ],
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breizaas Konserter - Alle Show',
    description:
      'Se alle kommende Breizaas konserter og tidligere show. Finn billetter, datoer, og steder for Norges AI-genererte bygdemusikk artist.',
    images: ['/images/tour-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://breizaas.com/konserter',
  },
};

/**
 * Tour Page Component
 * Renders comprehensive tour page with all sections
 *
 * Layout Structure:
 * 1. Tour Page Hero
 * 2. Featured Shows (next 3 events)
 * 3. All Upcoming Tour Dates
 * 4. Past Tour History (collapsible)
 * 5. Social Share Buttons
 *
 * Features:
 * - Parallel data fetching for upcoming and past events
 * - Empty state handling when no upcoming events
 * - Error handling with Norwegian messages
 * - Social sharing with Open Graph data
 */
export default async function KonserterPage() {
  // Fetch upcoming events, past events, and hero data in parallel
  const [upcomingEventsResult, pastEventsResult, heroData] = await Promise.all([
    getBandsinownEvents(),
    getPastBandsinownEvents(),
    getHeroSection('konserter'),
  ]);

  // Handle API errors for upcoming events
  const upcomingEvents = 'code' in upcomingEventsResult ? [] : upcomingEventsResult;
  const hasUpcomingError = 'code' in upcomingEventsResult;

  // Handle API errors for past events
  const pastEvents = 'code' in pastEventsResult ? [] : pastEventsResult;

  return (
    <div className="min-h-screen bg-brown-medium">
      {/* Tour Page Hero with Background Image */}
      <PageHero
        headline={heroData?.headline || MESSAGES.tour.pageTitle}
        subtitle={heroData?.subtitle}
        backgroundImage={heroData?.heroImage}
      />

      {/* Error message if API failed */}
      {hasUpcomingError && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-purple-playful/20 border-2 border-purple-playful rounded-xl p-6 text-center">
            <p className="text-white-warm text-lg">
              {upcomingEventsResult.message}
            </p>
          </div>
        </div>
      )}

      {/* Featured Shows Section - Next 3 events */}
      {!hasUpcomingError && upcomingEvents.length >= 3 && (
        <FeaturedTourDates
          events={upcomingEvents}
          heading={MESSAGES.tour.featuredHeading}
        />
      )}

      {/* All Upcoming Tour Dates Section */}
      {!hasUpcomingError && upcomingEvents.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-champagne mb-8">
              {MESSAGES.tour.allUpcomingHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <TourDateCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State - No Upcoming Events */}
      {!hasUpcomingError && upcomingEvents.length === 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-xl text-gray-light-warm mb-6">
                {MESSAGES.tour.noUpcoming}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="https://open.spotify.com/artist/YOUR_ARTIST_ID"
                  className="bg-gold-vintage text-brown-dark font-semibold px-6 py-3 rounded-full hover:bg-gold-champagne transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </a>
                <a
                  href="https://www.instagram.com/breizaas"
                  className="bg-gold-vintage text-brown-dark font-semibold px-6 py-3 rounded-full hover:bg-gold-champagne transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/breizaas"
                  className="bg-gold-vintage text-brown-dark font-semibold px-6 py-3 rounded-full hover:bg-gold-champagne transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past Tour History Section */}
      <PastTourHistory
        events={pastEvents}
        heading={MESSAGES.tour.pastHistoryHeading}
        showMoreText={MESSAGES.tour.showMorePast}
        showLessText={MESSAGES.tour.showLessPast}
      />
    </div>
  );
}
