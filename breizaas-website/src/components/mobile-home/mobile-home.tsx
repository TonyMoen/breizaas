import type { BandsinownEvent } from '@/types/Bandsintown.types'
import type { Single } from '@/types/Single.types'
import type { Video } from '@/types/Video.types'
import { buildSetlist } from '@/lib/mobile-home'
import { SceneTabs } from './scene-tabs'
import { TourTicker } from './tour-ticker'
import { SceneNytt } from './scene-nytt'
import { SceneKonserter } from './scene-konserter'
import { SceneMusikk } from './scene-musikk'

export interface MobileHomeProps {
  /** Band name as written in running text, e.g. "Breizaas" */
  artistName: string
  /** Spotify artist page */
  spotifyArtistUrl: string
  /** Upcoming concerts from Bandsintown, soonest first */
  events: BandsinownEvent[]
  /** Past concerts from Bandsintown */
  pastEvents: BandsinownEvent[]
  /** Single marked as featured in Sanity, if any */
  featuredSingle: Single | null
  /** Newest releases, newest first */
  latestSingles: Single[]
  featuredVideo: Pick<Video, 'youtubeId' | 'title'> | null
  /** Render time, decides which releases count as new */
  now: Date
  /** Visibility classes from the page, e.g. "lg:hidden" */
  className?: string
}

const SETLIST_LENGTH = 5

/**
 * Mobile front page, "Tre scener" - Server Component
 *
 * Under the top bar: the pink concert line and a tab selector. One press
 * swaps between Nytt, Konserter and Musikk in place - no swiping and no
 * scrolling to find things. Only the tab selector runs on the client.
 */
export function MobileHome({
  artistName,
  spotifyArtistUrl,
  events,
  pastEvents,
  featuredSingle,
  latestSingles,
  featuredVideo,
  now,
  className = '',
}: MobileHomeProps) {
  const currentSingle = featuredSingle ?? latestSingles[0] ?? null
  const setlist = buildSetlist(featuredSingle, latestSingles, SETLIST_LENGTH)

  return (
    <div className={`bg-brown-dark text-cream-base ${className}`}>
      <h1 className="sr-only">{artistName} – norsk festcountry og festmusikk</h1>

      <SceneTabs
        ariaLabel="Forsiden"
        stickyHeader={<TourTicker events={events} />}
        tabs={[
          {
            id: 'nytt',
            label: 'Nytt',
            content: (
              <SceneNytt
                single={currentSingle}
                artistName={artistName}
                spotifyArtistUrl={spotifyArtistUrl}
                nextEvent={events[0]}
              />
            ),
          },
          {
            id: 'konserter',
            label: 'Konserter',
            content: <SceneKonserter events={events} pastEvents={pastEvents} />,
          },
          {
            id: 'musikk',
            label: 'Musikk',
            content: (
              <SceneMusikk
                setlist={setlist}
                featuredVideo={featuredVideo}
                spotifyArtistUrl={spotifyArtistUrl}
                now={now}
              />
            ),
          },
        ]}
      />
    </div>
  )
}
