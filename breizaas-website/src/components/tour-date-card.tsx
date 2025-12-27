/**
 * TourDateCard Component
 * Displays a single tour date event card with venue, date, and ticket information
 *
 * Story: 3.2 - TourDateCard Component with Grid Layout
 * Story: 3.3 - Calendar Export & Ticket Purchase Links (added CalendarButton and TicketButton)
 * Story: 3.4 - Past Tour History Display (added isPastEvent prop)
 * Component Type: Server Component with Client Component buttons for interactivity
 *
 * Architecture Compliance:
 * - V11 Color System: Uses semantic color names from globals.css
 * - Server Component First: No "use client" directive (only buttons are client components)
 * - WCAG 2.1 AA: Keyboard navigation, focus indicators, ARIA labels
 * - Norwegian Localization: All text in Norwegian (nb-NO)
 * - Touch Targets: 44x44px minimum for all interactive elements
 */

import type { BandsinownEvent } from '@/types/Bandsintown.types';
import { CalendarButton } from '@/components/calendar-button';
import { TicketButton } from '@/components/ticket-button';

interface TourDateCardProps {
  event: BandsinownEvent;
  /** If true, hides interactive buttons and applies 0.7 opacity (for past events) */
  isPastEvent?: boolean;
}

/**
 * Format datetime string to Norwegian date format
 * Returns day number and abbreviated month in uppercase
 * Example: "15. FEB"
 *
 * @param datetime - ISO 8601 datetime string
 * @returns Object with day and month strings
 */
function formatNorwegianDate(datetime: string): { day: string; month: string } {
  const date = new Date(datetime);
  const day = date.toLocaleDateString('nb-NO', { day: 'numeric' });
  const month = date
    .toLocaleDateString('nb-NO', { month: 'short' })
    .slice(0, 3)
    .toUpperCase();
  return { day, month };
}

/**
 * TourDateCard Component
 * Displays tour date information in a V11-styled card with hover effects
 *
 * Features:
 * - Norwegian date formatting ("15. FEB")
 * - Responsive card design with hover effects
 * - Sold-out badge and disabled button state
 * - Past event mode: hides buttons and applies 0.7 opacity
 * - Accessibility: WCAG 2.1 AA compliant
 * - Touch-optimized: 44x44px minimum touch targets
 *
 * @param event - Bandsintown event object from API
 * @param isPastEvent - If true, displays as past event (no buttons, reduced opacity)
 */
export function TourDateCard({ event, isPastEvent = false }: TourDateCardProps) {
  // Format date in Norwegian
  const { day, month } = formatNorwegianDate(event.datetime);

  // Check if event is sold out (all offers must be sold out)
  const isSoldOut = event.offers.every((offer) => offer.status === 'sold out');

  // Format location with fallback for missing city/country
  const location =
    [event.venue.city, event.venue.country].filter(Boolean).join(', ') ||
    'Ukjent sted';

  return (
    <div
      className={`relative bg-brown-dark border-2 border-transparent hover:border-gold-vintage rounded-2xl p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,159,69,0.3)]${isPastEvent ? ' opacity-70' : ''}`}
      aria-label={`Konsert ${event.venue.name} ${day}. ${month}`}
    >
      {/* Sold-out badge */}
      {isSoldOut && (
        <div className="absolute top-4 right-4 bg-purple-playful text-white text-sm font-semibold px-3 py-1 rounded-full">
          Utsolgt
        </div>
      )}

      {/* Date - Playful purple, 32px bold */}
      <div className="text-purple-playful text-[32px] font-bold leading-none mb-4">
        {day}. {month}
      </div>

      {/* Venue name with calendar button */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-white-warm text-xl font-semibold flex-1">
          {event.venue.name}
        </h3>
        {/* Only show calendar button for upcoming events */}
        {!isPastEvent && <CalendarButton event={event} />}
      </div>

      {/* Location - Warm gray, 14px */}
      <p className="text-gray-light-warm text-sm mb-4">{location}</p>

      {/* Only show ticket button for upcoming events */}
      {!isPastEvent && <TicketButton event={event} isSoldOut={isSoldOut} />}
    </div>
  );
}
