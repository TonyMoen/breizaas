import type { BandsinownEvent } from '@/types/Bandsintown.types';

/**
 * Generate RFC 5545 compliant .ics file content for calendar import
 * Compatible with Apple Calendar, Google Calendar, Outlook
 *
 * @param event - BandsinownEvent from API containing tour date information
 * @returns Valid iCalendar format string ready for download
 *
 * @example
 * const icsContent = generateIcsFile(event);
 * const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
 */
export function generateIcsFile(event: BandsinownEvent): string {
  // Parse start date/time from ISO 8601
  const startDate = new Date(event.datetime);

  // Calculate end time (start + 3 hours for typical concert duration)
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

  // Format dates as YYYYMMDDTHHMMSSZ (UTC)
  const formatIcsDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const dtstart = formatIcsDate(startDate);
  const dtend = formatIcsDate(endDate);
  const dtstamp = formatIcsDate(new Date());

  // Format event details
  const summary = escapeIcsText(`Breizaas - ${event.venue.name}`);
  const location = escapeIcsText(
    [event.venue.name, event.venue.city, event.venue.country]
      .filter(Boolean)
      .join(', ') || 'Ukjent sted'
  );

  // Description with ticket URL
  const ticketUrl = event.offers.find(offer => offer.url)?.url;
  const description = escapeIcsText(
    ticketUrl
      ? `Breizaas konsert\\n\\nKjøp billetter: ${ticketUrl}`
      : 'Breizaas konsert'
  );

  // Unique identifier
  const uid = `${event.id}@breizaas.no`;

  // Build .ics content (RFC 5545 format)
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Breizaas//NONSGML Event Calendar//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    ticketUrl ? `URL:${ticketUrl}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean); // Remove empty lines

  return icsLines.join('\r\n');
}

/**
 * Escape special characters for .ics text fields per RFC 5545
 * Escapes: backslash, comma, semicolon, newline
 *
 * @param text - Raw text to escape
 * @returns Escaped text safe for .ics format
 */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')   // Backslash
    .replace(/,/g, '\\,')      // Comma
    .replace(/;/g, '\\;')      // Semicolon
    .replace(/\n/g, '\\n');    // Newline
}
