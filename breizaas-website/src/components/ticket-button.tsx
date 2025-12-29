'use client';

import type { BandsinownEvent } from '@/types/Bandsintown.types';

interface TicketButtonProps {
  event: BandsinownEvent;
  isSoldOut: boolean;
  className?: string;
}

/**
 * Ticket purchase button for tour dates
 * Client Component - Opens ticket URL in new tab
 */
export function TicketButton({ event, isSoldOut, className = '' }: TicketButtonProps) {
  // Extract ticket URL from offers
  const ticketUrl = event.offers.find(offer => offer.url)?.url;

  // If no ticket URL, hide button (AC #9)
  if (!ticketUrl) {
    return null;
  }

  return (
    <a
      href={ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        block w-full bg-gold-champagne text-white font-semibold text-center
        px-6 py-3 rounded-lg
        hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
        transition-shadow duration-300
        focus:outline-none focus:ring-2 focus:ring-gold-champagne focus:ring-offset-2 focus:ring-offset-brown-dark
        ${isSoldOut ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
      aria-label={isSoldOut ? 'Utsolgt' : `Kjøp billetter til ${event.venue.name}`}
      {...(isSoldOut && { 'aria-disabled': 'true' })}
    >
      Kjøp billetter
    </a>
  );
}
