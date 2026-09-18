import Image from 'next/image'
import { Play } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { formatEventDateParts, formatReleaseDate } from '@/lib/mobile-home'
import { SpotifyIcon } from '@/components/spotify-icon'
import type { Single } from '@/types/Single.types'
import type { BandsinownEvent } from '@/types/Bandsintown.types'

interface SceneNyttProps {
  /** The single to present: the featured one, or the newest release */
  single: Single | null
  /** Band name shown with the release date */
  artistName: string
  /** Spotify artist page, used when there is no single to show */
  spotifyArtistUrl: string
  /** Soonest upcoming concert, shown as a teaser that opens the concert scene */
  nextEvent?: BandsinownEvent
}

const streamingButton =
  'flex items-center justify-center gap-2 rounded-full p-3 text-sm font-extrabold transition-opacity hover:opacity-90'

/**
 * "Nytt" scene on the mobile front page - Server Component
 *
 * The new single as a poster: cover in full width, big title, the three
 * streaming services, and the next concert on one line at the bottom.
 */
export function SceneNytt({ single, artistName, spotifyArtistUrl, nextEvent }: SceneNyttProps) {
  return (
    <section aria-labelledby="scene-nytt-heading" className="pb-10">
      {single ? (
        <>
          <div className="relative h-[300px] sm:h-[380px]">
            {/* Hidden on desktop, so "1px" keeps the desktop preload down to the smallest image */}
            <Image
              src={urlFor(single.coverImage).width(1200).height(1200).auto('format').url()}
              alt={single.coverImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 1px, 100vw"
              // Favour the top of the cover: titles usually sit there, and the bottom fades into the page anyway
              className="object-cover object-[center_12%]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-brown-dark"
              aria-hidden="true"
            />
          </div>

          <div className="relative -mt-9 px-5">
            <span className="inline-block rounded-md bg-amber-warm px-2 py-1 font-montserrat text-[10px] font-black uppercase tracking-[0.16em] text-white">
              Ute nå
            </span>
            <h2
              id="scene-nytt-heading"
              className="mt-1.5 break-words font-montserrat text-4xl font-black uppercase leading-none"
            >
              {single.title}
            </h2>
            <p className="mb-3 mt-1 text-[13px] text-cream-base/70">
              {artistName} · {formatReleaseDate(single.releaseDate)}
            </p>

            {single.spotifyUrl && (
              <a
                href={single.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${streamingButton} mb-2 bg-spotify-green text-[#05230f]`}
                aria-label={`Lytt til ${single.title} på Spotify (åpnes i ny fane)`}
              >
                <SpotifyIcon className="h-4 w-4" />
                Lytt på Spotify
              </a>
            )}

            {(single.appleMusicUrl || single.youtubeUrl) && (
              <div className="grid auto-cols-fr grid-flow-col gap-2">
                {single.appleMusicUrl && (
                  <a
                    href={single.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${streamingButton} bg-[#fa243c] text-white`}
                    aria-label={`Lytt til ${single.title} på Apple Music (åpnes i ny fane)`}
                  >
                    Apple Music
                  </a>
                )}
                {single.youtubeUrl && (
                  <a
                    href={single.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${streamingButton} bg-[#ff0000] text-white`}
                    aria-label={`Se ${single.title} på YouTube (åpnes i ny fane)`}
                  >
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    YouTube
                  </a>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="px-5 pt-10 text-center">
          <h2
            id="scene-nytt-heading"
            className="font-montserrat text-3xl font-black uppercase leading-[0.95]"
          >
            Spell høgt,{' '}
            <span className="block text-amber-warm">spell {artistName}</span>
          </h2>
          <a
            href={spotifyArtistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${streamingButton} mt-6 bg-spotify-green text-[#05230f]`}
            aria-label={`Lytt til ${artistName} på Spotify (åpnes i ny fane)`}
          >
            <SpotifyIcon className="h-4 w-4" />
            Lytt på Spotify
          </a>
        </div>
      )}

      {nextEvent && <NextConcertLine event={nextEvent} />}
    </section>
  )
}

/** One-line teaser for the soonest concert; opens the "Konserter" scene */
function NextConcertLine({ event }: { event: BandsinownEvent }) {
  const { day, month } = formatEventDateParts(event.datetime)
  const place = [event.venue.name, event.venue.city].filter(Boolean).join(', ')

  return (
    <a
      href="#konserter"
      className="mx-5 mt-3.5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-cream-base/15 pt-3 text-xs"
    >
      <b className="font-montserrat text-[22px] font-black leading-none">
        {day}. {month}
      </b>
      <span className="min-w-0">
        Neste konsert: <b className="break-words">{place}</b>
      </span>
      <span className="whitespace-nowrap font-bold text-purple-playful">
        Mer info <span aria-hidden="true">→</span>
      </span>
    </a>
  )
}
