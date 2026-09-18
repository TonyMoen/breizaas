import type { BandsinownEvent } from '@/types/Bandsintown.types'
import { buildTickerItems } from '@/lib/mobile-home'

interface TourTickerProps {
  /** Upcoming concerts from Bandsintown */
  events: BandsinownEvent[]
}

/** Shown when no concerts are announced, so the pink line never disappears */
const SLOGAN_ITEMS = ['Spell høgt, spell Breizaas', 'Festcountry', 'Festmusikk', 'Book bandet']

/**
 * The pink concert line under the mobile top bar - Server Component
 *
 * Scrolls the upcoming dates with pure CSS (paused on hover/focus, off for
 * reduced motion). Screen readers get one plain sentence instead of the
 * repeated scrolling text. Pressing the line opens the concert scene.
 */
export function TourTicker({ events }: TourTickerProps) {
  const concerts = buildTickerItems(events)
  const hasConcerts = concerts.length > 0

  const items = hasConcerts
    ? concerts.map((item) => `${item.date} ${item.place}`)
    : [...SLOGAN_ITEMS, ...SLOGAN_ITEMS]

  const label = hasConcerts
    ? `Kommende konserter: ${buildTickerItems(events, 1)
        .map((item) => `${item.date} ${item.place}`)
        .join(', ')}`
    : SLOGAN_ITEMS[0]

  return (
    <a
      href="#konserter"
      aria-label={label}
      className="group block overflow-hidden bg-amber-warm py-2 text-white"
    >
      {/* Two identical halves: the animation moves one half-width, then loops seamlessly */}
      <div
        aria-hidden="true"
        className="animate-ticker flex w-max whitespace-nowrap font-montserrat text-xs font-black uppercase tracking-[0.14em] group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]"
        style={{ animationDuration: `${items.length * 3}s` }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {items.map((text, index) => (
              <span key={index} className="flex items-center">
                <span className="flex items-center px-[18px]">
                  <span>{text}</span>
                  {hasConcerts && (
                    <i className="ml-2 rounded-[3px] bg-white px-1.5 pb-px pt-0.5 text-[10px] not-italic leading-none tracking-[0.18em] text-amber-warm">
                      Live
                    </i>
                  )}
                </span>
                <span>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </a>
  )
}
