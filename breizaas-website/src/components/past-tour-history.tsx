/**
 * PastTourHistory Component
 * Displays past tour events with expand/collapse functionality
 *
 * Story: 3.5 - Tour Page Layout with Social Sharing
 * Component Type: Client Component (uses useState for interactivity)
 *
 * Architecture Compliance:
 * - V11 Color System: Muted styling with opacity-60 and text-gray-400
 * - Client Component: Uses "use client" for expand/collapse interactivity
 * - Norwegian Localization: All text in Norwegian (nb-NO)
 * - WCAG 2.1 AA: Keyboard accessible, proper ARIA labels
 */

'use client';

import { useState } from 'react';
import type { BandsinownEvent } from '@/types/Bandsintown.types';
import { TourDateCard } from '@/components/tour-date-card';

interface PastTourHistoryProps {
  events: BandsinownEvent[];
  heading: string;
  showMoreText: string;
  showLessText: string;
}

/**
 * PastTourHistory Component
 * Displays past events in reverse chronological order with expand/collapse
 *
 * Features:
 * - Initially shows 5 past events
 * - "Show more" button expands to show all events
 * - Muted styling (lower opacity, gray color scheme)
 * - No ticket purchase links (isPastEvent prop)
 * - Client component for interactive expand/collapse
 *
 * @param events - Array of past Bandsintown events (sorted most recent first)
 * @param heading - Section heading text (Norwegian)
 * @param showMoreText - "Show more" button text (Norwegian)
 * @param showLessText - "Show less" button text (Norwegian)
 */
export function PastTourHistory({
  events,
  heading,
  showMoreText,
  showLessText,
}: PastTourHistoryProps) {
  const [showAll, setShowAll] = useState(false);

  // Don't render if no past events
  if (events.length === 0) {
    return null;
  }

  // Show 5 initially, or all if expanded
  const displayedEvents = showAll ? events : events.slice(0, 5);
  const hasMoreEvents = events.length > 5;

  return (
    <section className="py-12 md:py-16 bg-brown-medium">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gold-champagne mb-8">
          {heading}
        </h2>

        {/* Past events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <TourDateCard key={event.id} event={event} isPastEvent={true} />
          ))}
        </div>

        {/* Show more/less button */}
        {hasMoreEvents && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-gold-vintage text-brown-dark font-semibold px-8 py-3 rounded-full hover:bg-gold-champagne transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne focus:ring-offset-2 focus:ring-offset-brown-medium"
              aria-expanded={showAll}
              aria-label={
                showAll
                  ? `${showLessText} - Skjul ${events.length - 5} konserter`
                  : `${showMoreText} - Vis ${events.length - 5} flere konserter`
              }
            >
              {showAll ? showLessText : showMoreText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
