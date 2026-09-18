import Link from 'next/link'
import { Mic } from 'lucide-react'
import type { BandsinownEvent } from '@/types/Bandsintown.types'
import { buildSeasonLabel, formatEventDateParts, getEventLink, getPastCities } from '@/lib/mobile-home'
import { CalendarLink } from './calendar-link'

interface SceneKonserterProps {
  /** Upcoming concerts from Bandsintown, soonest first */
  events: BandsinownEvent[]
  /** Past concerts, used for the "Har spilt" line */
  pastEvents: BandsinownEvent[]
  /** Longer tours are cut here and link on to /konserter */
  maxEvents?: number
}

/**
 * "Konserter" scene on the mobile front page - Server Component
 *
 * A plain text list with thin rules instead of cards: big date, venue,
 * city and weekday. The whole row is the link, so it is easy to hit with a thumb.
 */
export function SceneKonserter({ events, pastEvents, maxEvents = 8 }: SceneKonserterProps) {
  const shownEvents = events.slice(0, maxEvents)
  const pastCities = getPastCities(pastEvents)
  const nextEvent = events[0]

  return (
    <section aria-labelledby="scene-konserter-heading" className="pb-10">
      <h2 id="scene-konserter-heading" className="sr-only">
        Konserter
      </h2>

      {shownEvents.length > 0 ? (
        <>
          <p className="px-5 pt-3.5 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-gold-vintage">
            {buildSeasonLabel(events)}
          </p>

          <ul className="px-5 pt-1.5">
            {shownEvents.map((event) => {
              const { day, month, weekday } = formatEventDateParts(event.datetime)
              const link = getEventLink(event)
              const cityAndDay = [event.venue.city, weekday].filter(Boolean).join(' · ')

              return (
                <li key={event.id} className="border-b border-cream-base/15">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[66px_minmax(0,1fr)_auto] items-center gap-3 py-[13px]"
                  >
                    <span className="font-montserrat text-3xl font-black leading-[0.95]">
                      {day}
                      <small className="mt-[3px] block text-[10px] font-bold uppercase tracking-[0.18em] text-purple-playful">
                        {month}
                      </small>
                    </span>
                    <span className="min-w-0">
                      <b className="block break-words text-[15px]">{event.venue.name}</b>
                      <small className="text-xs text-cream-base/60">{cityAndDay}</small>
                    </span>
                    <span
                      className={`whitespace-nowrap text-xs font-bold ${
                        link.soldOut ? 'text-cream-base/50' : 'text-purple-playful'
                      }`}
                    >
                      {link.label}
                      {!link.soldOut && <span aria-hidden="true"> →</span>}
                    </span>
                    <span className="sr-only">(åpnes i ny fane)</span>
                  </a>
                </li>
              )
            })}
          </ul>

          {events.length > shownEvents.length && (
            <p className="px-5 pt-3 text-right">
              <Link href="/konserter" className="text-xs font-bold text-purple-playful">
                Se alle {events.length} konserter
                <span aria-hidden="true"> →</span>
              </Link>
            </p>
          )}
        </>
      ) : (
        <div className="px-5 pt-8 text-center">
          <p className="font-montserrat text-lg font-black uppercase leading-tight">
            Ingen kommende konserter akkurat nå
          </p>
          <p className="mt-2 text-[13px] text-cream-base/60">
            Nye datoer legges ut her så snart de er klare.
          </p>
        </div>
      )}

      {pastCities.length > 0 && (
        <p className="px-5 pt-3 text-xs text-cream-base/50">
          Har spilt: {pastCities.join(' · ')} ·{' '}
          <Link
            href="/konserter"
            aria-label="Alle tidligere konserter"
            className="whitespace-nowrap font-bold text-purple-playful"
          >
            alle →
          </Link>
        </p>
      )}

      <Link
        href="/kontakt"
        className="mx-5 mt-3.5 flex items-center justify-center gap-2 rounded-full border-2 border-amber-warm py-[11px] text-[13px] font-extrabold text-amber-warm transition-colors hover:bg-amber-warm hover:text-white"
      >
        <Mic className="h-4 w-4" aria-hidden="true" />
        Book bandet til din fest
      </Link>

      {nextEvent && <CalendarLink event={nextEvent} />}
    </section>
  )
}
