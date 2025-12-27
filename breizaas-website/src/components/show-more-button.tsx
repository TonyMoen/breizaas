/**
 * ShowMoreButton Component
 * Client-side pagination button for revealing more past events
 *
 * Story: 3.4 - Past Tour History Display
 * Component Type: Client Component (uses React state)
 *
 * Architecture Compliance:
 * - Client Component: Needed for state management (displayCount)
 * - V11 Color System: Playful purple background, champagne gold hover
 * - Performance: Client-side pagination (no additional API calls)
 * - WCAG 2.1 AA: 44x44px touch target, keyboard accessible, focus indicators
 * - Norwegian Localization: Button text in Norwegian
 */

'use client';

import { useState } from 'react';
import type { BandsinownEvent } from '@/types/Bandsintown.types';
import { TourDateCard } from '@/components/tour-date-card';

interface ShowMoreButtonProps {
  /** All events from API (already fetched on server) */
  allEvents: BandsinownEvent[];
  /** Number of events displayed initially (default: 12) */
  initialDisplayCount: number;
  /** Number of events to load when clicking "Se flere" (default: 12) */
  incrementCount: number;
}

/**
 * ShowMoreButton Component
 * Reveals additional past events when clicked (client-side pagination)
 *
 * Features:
 * - Client-side state management for display count
 * - Smooth reveal of hidden events (no network requests)
 * - Shows remaining event count in button text
 * - Hides button when all events are displayed
 * - Accessibility: Keyboard accessible, ARIA label, focus indicators
 *
 * @param allEvents - Complete array of events from server
 * @param initialDisplayCount - Events shown initially (e.g., 12)
 * @param incrementCount - Events to reveal per click (e.g., 12)
 */
export function ShowMoreButton({
  allEvents,
  initialDisplayCount,
  incrementCount,
}: ShowMoreButtonProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount((prev) => Math.min(prev + incrementCount, allEvents.length));
  };

  const remainingCount = allEvents.length - displayCount;
  const hasMore = remainingCount > 0;

  // Hide button when all events are displayed
  if (!hasMore) return null;

  // Get events to display (beyond initial display count)
  const additionalEvents = allEvents.slice(initialDisplayCount, displayCount);

  return (
    <>
      {/* Additional events grid (only shown after clicking "Se flere") */}
      {additionalEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {additionalEvents.map((event) => (
            <TourDateCard key={event.id} event={event} isPastEvent={true} />
          ))}
        </div>
      )}

      {/* "Se flere" button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleShowMore}
          className="bg-purple-playful text-white font-semibold px-8 py-4 rounded-lg min-h-[44px] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-purple-playful focus:ring-offset-2 focus:ring-offset-brown-dark"
          aria-label={`Vis flere tidligere konserter (${remainingCount} gjenstår)`}
        >
          Se flere ({remainingCount} gjenstår)
        </button>
      </div>
    </>
  );
}
