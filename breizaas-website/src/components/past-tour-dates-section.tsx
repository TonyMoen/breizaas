/**
 * PastTourDatesSection Component
 * Displays past tour dates in a grid layout with "Se flere" pagination
 *
 * Story: 3.4 - Past Tour History Display
 * Component Type: Server Component (async data fetching)
 *
 * Architecture Compliance:
 * - Server Component First: Fetches data on server, no client-side state
 * - V11 Color System: Uses semantic color names from globals.css
 * - Caching: 1-hour revalidation via Bandsintown API client
 * - Error Handling: Graceful degradation with Norwegian messages
 * - Performance: Minimal client JavaScript (only "Se flere" button)
 * - WCAG 2.1 AA: Proper heading hierarchy, semantic HTML
 */

import { getPastBandsinownEvents } from '@/lib/bandsintown';
import { TourDateCard } from '@/components/tour-date-card';
import { ShowMoreButton } from '@/components/show-more-button';

/**
 * PastTourDatesSection Component
 * Fetches and displays past tour dates with client-side pagination
 *
 * Features:
 * - Server-side data fetching with 1-hour cache
 * - Initial display of 12 events
 * - "Se flere" button for loading more (client-side pagination)
 * - Error state with Norwegian message
 * - Empty state handling (hides section if no past events)
 * - Accessibility: Proper heading hierarchy, ARIA labels
 *
 * @returns Past tour dates section or null if no events
 */
export async function PastTourDatesSection() {
  const result = await getPastBandsinownEvents();

  // Handle API error
  if ('code' in result) {
    return (
      <section className="max-w-[1200px] mx-auto px-6 mt-24">
        <h2 className="text-white-warm text-3xl md:text-4xl font-bold mb-8">
          Tidligere konserter
        </h2>
        <p className="text-white-warm">{result.message}</p>
      </section>
    );
  }

  // Hide section if no past events
  if (result.length === 0) {
    return null;
  }

  // Display initial 12 events
  const initialEvents = result.slice(0, 12);
  const hasMore = result.length > 12;

  return (
    <section className="max-w-[1200px] mx-auto px-6 mt-24">
      <h2 className="text-white-warm text-3xl md:text-4xl font-bold mb-8">
        Tidligere konserter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialEvents.map((event) => (
          <TourDateCard key={event.id} event={event} isPastEvent={true} />
        ))}
      </div>

      {hasMore && (
        <ShowMoreButton
          allEvents={result}
          initialDisplayCount={12}
          incrementCount={12}
        />
      )}
    </section>
  );
}
