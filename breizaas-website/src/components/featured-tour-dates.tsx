/**
 * FeaturedTourDates Component
 * Displays the next 3 upcoming tour dates with featured styling
 *
 * Story: 3.5 - Tour Page Layout with Social Sharing
 * Component Type: Server Component
 *
 * Architecture Compliance:
 * - V11 Color System: Uses semantic color names from globals.css
 * - Server Component First: No "use client" directive
 * - Responsive Grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Norwegian Localization: All text in Norwegian (nb-NO)
 */

import type { BandsinownEvent } from '@/types/Bandsintown.types';
import { TourDateCard } from '@/components/tour-date-card';

interface FeaturedTourDatesProps {
  events: BandsinownEvent[];
  heading: string;
}

/**
 * FeaturedTourDates Component
 * Displays featured upcoming events in a responsive grid layout
 *
 * Features:
 * - Takes next 3 upcoming events from events array
 * - Uses TourDateCard with featured={true} prop
 * - Responsive: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Empty state handling when no events available
 *
 * @param events - Array of Bandsintown events (will use first 3)
 * @param heading - Section heading text (Norwegian)
 */
export function FeaturedTourDates({ events, heading }: FeaturedTourDatesProps) {
  // Take only the next 3 events
  const featuredEvents = events.slice(0, 3);

  // Don't render if no events
  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gold-champagne mb-8">
          {heading}
        </h2>

        {/* Featured events grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <TourDateCard key={event.id} event={event} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
