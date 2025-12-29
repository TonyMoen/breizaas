'use client';

import { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import type { BandsinownEvent } from '@/types/Bandsintown.types';
import { generateIcsFile } from '@/lib/ics';
import { downloadFile, sanitizeFilename, formatDateForFilename } from '@/lib/file-download';

interface CalendarButtonProps {
  event: BandsinownEvent;
  className?: string;
}

/**
 * Calendar download button for tour dates
 * Client Component - Downloads .ics file when clicked
 */
export function CalendarButton({ event, className = '' }: CalendarButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = () => {
    try {
      setIsDownloading(true);

      // Generate .ics content
      const icsContent = generateIcsFile(event);

      // Format filename: breizaas-[venue]-[date].ics
      const venueName = sanitizeFilename(event.venue.name);
      const eventDate = formatDateForFilename(event.datetime);
      const filename = `breizaas-${venueName}-${eventDate}.ics`;

      // Trigger download
      downloadFile(icsContent, filename, 'text/calendar;charset=utf-8');

      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    } catch (error) {
      console.error('Calendar download error:', error);
      // TODO: Show user-friendly error message (future enhancement)
    } finally {
      setIsDownloading(false);
    }
  };

  // Format Norwegian date for ARIA label
  const date = new Date(event.datetime);
  const day = date.toLocaleDateString('nb-NO', { day: 'numeric' });
  const month = date.toLocaleDateString('nb-NO', { month: 'short' }).slice(0, 3).toUpperCase();

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        w-11 h-11 flex items-center justify-center rounded-lg
        text-gray-light-warm hover:text-gold-champagne
        hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-gold-champagne focus:ring-offset-2 focus:ring-offset-brown-dark
        disabled:opacity-50 disabled:cursor-not-allowed
        ${showSuccess ? 'animate-pulse scale-110 text-gold-champagne' : ''}
        ${className}
      `}
      aria-label={`Legg til ${event.venue.name} ${day}. ${month} i kalender`}
    >
      {isDownloading ? (
        <div className="w-5 h-5 border-2 border-purple-playful border-t-transparent rounded-full animate-spin" />
      ) : (
        <CalendarIcon className="w-6 h-6" />
      )}
    </button>
  );
}
