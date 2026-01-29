/**
 * TourDateCard Component
 * Displays a single tour date event card with venue, date, and ticket information
 *
 * Simplified design matching PARKBIOGRAFEN style:
 * - Venue name and city as heading
 * - Date with calendar icon
 * - Buy tickets button
 * - Border and clean layout
 */

import type { BandsinownEvent } from '@/types/Bandsintown.types';
import { Calendar } from 'lucide-react';

interface TourDateCardProps {
  event: BandsinownEvent;
  /** If true, hides interactive buttons and applies 0.7 opacity (for past events) */
  isPastEvent?: boolean;
  /** If true, applies featured styling with purple border accent */
  featured?: boolean;
}

/**
 * Format datetime string to Norwegian full date format
 * Example: "27. Mars 2026"
 *
 * @param datetime - ISO 8601 datetime string
 * @returns Formatted date string
 */
function formatNorwegianFullDate(datetime: string): string {
  const date = new Date(datetime);
  const day = date.getDate();
  const month = date.toLocaleDateString('nb-NO', { month: 'long' });
  const year = date.toLocaleDateString('nb-NO', { year: 'numeric' });

  // Capitalize first letter of month
  const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day}. ${monthCapitalized} ${year}`;
}

export function TourDateCard({ event, isPastEvent = false, featured = false }: TourDateCardProps) {
  // Format date in Norwegian full format
  const formattedDate = formatNorwegianFullDate(event.datetime);

  // Check if event is sold out (all offers must be sold out)
  const isSoldOut = event.offers.every((offer) => offer.status === 'sold out');

  // Get ticket URL
  const ticketUrl = event.offers.find((offer) => offer.url)?.url;

  // Use Bandsintown URL as fallback if no ticket URL
  const hasTickets = !!ticketUrl;
  const fallbackUrl = event.url;

  // Format venue and city
  const venueName = event.venue.name.toUpperCase();
  const city = event.venue.city?.toUpperCase() || '';
  const venueCity = city ? `${venueName} – ${city}` : venueName;

  return (
    <div
      className={`bg-brown-dark border-2 border-transparent rounded-xl p-6 transition-all duration-300 hover:border-purple-playful hover:shadow-[0_0_20px_rgba(216,150,255,0.5)]${isPastEvent ? ' opacity-70' : ''}`}
      style={{
        background: 'linear-gradient(135deg, rgba(31, 31, 46, 0.8), rgba(26, 26, 46, 0.9))'
      }}
      aria-label={`Konsert ${event.venue.name} ${formattedDate}`}
    >
      {/* Venue and City - clickable if no tickets available */}
      {!hasTickets && !isPastEvent ? (
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-3 hover:text-purple-playful transition-colors"
        >
          <h3
            className="text-purple-bright text-2xl font-bold break-words"
            style={{
              textShadow: '0 0 15px rgba(224, 163, 255, 0.4)'
            }}
          >
            {venueCity}
          </h3>
        </a>
      ) : (
        <h3
          className="text-purple-bright text-2xl font-bold mb-3 break-words"
          style={{
            textShadow: '0 0 15px rgba(224, 163, 255, 0.4)'
          }}
        >
          {venueCity}
        </h3>
      )}

      {/* Separator line */}
      <div className="border-b border-purple-playful/20 mb-4" />

      {/* Date and Button Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Date with icon */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-warm" />
          <span className="text-lg text-amber-warm font-semibold">{formattedDate}</span>
        </div>

        {/* Buy tickets button - only show for upcoming events */}
        {!isPastEvent && ticketUrl && (
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isSoldOut
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'border-2 border-purple-playful text-purple-playful bg-transparent hover:bg-purple-playful hover:text-brown-dark hover:shadow-[0_0_25px_rgba(216,150,255,0.6)]'
            }`}
            aria-label={isSoldOut ? 'Utsolgt' : `Kjøp billettar for ${event.venue.name}`}
            aria-disabled={isSoldOut}
            onClick={isSoldOut ? (e) => e.preventDefault() : undefined}
          >
            {isSoldOut ? 'Utsolgt' : 'Kjøp billettar'}
          </a>
        )}
      </div>
    </div>
  );
}
