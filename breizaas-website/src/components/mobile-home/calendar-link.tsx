'use client'

import { CalendarDays } from 'lucide-react'
import type { BandsinownEvent } from '@/types/Bandsintown.types'
import { generateIcsFile } from '@/lib/ics'
import { downloadFile, sanitizeFilename, formatDateForFilename } from '@/lib/file-download'

interface CalendarLinkProps {
  /** The next upcoming concert */
  event: BandsinownEvent
}

/**
 * Text button that saves the next concert as an .ics calendar file - Client Component
 */
export function CalendarLink({ event }: CalendarLinkProps) {
  const handleClick = () => {
    try {
      const filename = `breizaas-${sanitizeFilename(event.venue.name)}-${formatDateForFilename(event.datetime)}.ics`
      downloadFile(generateIcsFile(event), filename, 'text/calendar;charset=utf-8')
    } catch (error) {
      console.error('Calendar download error:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mx-auto mt-1 flex min-h-11 items-center justify-center gap-1.5 px-5 text-xs text-cream-base/60 transition-colors hover:text-cream-base"
    >
      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
      Legg neste konsert i kalenderen
    </button>
  )
}
