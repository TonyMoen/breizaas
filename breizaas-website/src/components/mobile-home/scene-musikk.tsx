import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { formatReleaseDate, isNewRelease } from '@/lib/mobile-home'
import { SpotifyIcon } from '@/components/spotify-icon'
import { YouTubeEmbed } from '@/components/youtube-embed'
import type { Single } from '@/types/Single.types'
import type { Video } from '@/types/Video.types'

interface SceneMusikkProps {
  /** Featured single first, then the newest releases */
  setlist: Single[]
  featuredVideo: Pick<Video, 'youtubeId' | 'title'> | null
  /** Spotify artist page */
  spotifyArtistUrl: string
  /** Render time, decides which releases get the "Ny" mark */
  now: Date
}

const sectionLabel = 'font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-gold-vintage'

/**
 * "Musikk" scene on the mobile front page - Server Component
 *
 * A numbered setlist instead of a player, the music video, and the way on to
 * Spotify and the full catalogue.
 */
export function SceneMusikk({ setlist, featuredVideo, spotifyArtistUrl, now }: SceneMusikkProps) {
  return (
    <section aria-labelledby="scene-musikk-heading" className="pb-10">
      <h2 id="scene-musikk-heading" className="sr-only">
        Musikk
      </h2>

      {setlist.length > 0 && (
        <>
          <p className={`${sectionLabel} px-5 pt-3.5`}>
            Setliste · {setlist.length} {setlist.length === 1 ? 'låt' : 'låter'}
          </p>
          <ol className="px-5 pt-1.5">
            {setlist.map((single, index) => (
              <li key={single._id} className="border-b border-cream-base/15">
                <SetlistRow single={single} position={index + 1} isNew={isNewRelease(single.releaseDate, now)} />
              </li>
            ))}
          </ol>
        </>
      )}

      {featuredVideo && (
        <div className="px-5 pt-5">
          <p className={`${sectionLabel} mb-2.5`}>Musikkvideo · {featuredVideo.title}</p>
          <YouTubeEmbed videoId={featuredVideo.youtubeId} title={featuredVideo.title} />
        </div>
      )}

      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <a
          href={spotifyArtistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-spotify-green px-4 py-2.5 text-[13px] font-bold text-[#05230f] transition-opacity hover:opacity-90"
          aria-label="Hør alt på Spotify (åpnes i ny fane)"
        >
          <SpotifyIcon className="h-4 w-4" />
          Hør alt på Spotify
        </a>
        <Link href="/musikk" className="whitespace-nowrap text-xs font-bold text-purple-playful">
          Alle utgivelser <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

interface SetlistRowProps {
  single: Single
  /** 1-based position in the setlist */
  position: number
  isNew: boolean
}

function SetlistRow({ single, position, isNew }: SetlistRowProps) {
  const listenUrl = single.spotifyUrl || single.youtubeUrl || single.appleMusicUrl
  const rowClass = 'grid grid-cols-[26px_32px_minmax(0,1fr)_auto] items-center gap-3 py-2'

  const content = (
    <>
      <span className="font-montserrat text-xs font-black text-cream-base/45">
        {String(position).padStart(2, '0')}
      </span>
      <Image
        src={urlFor(single.coverImage).width(96).height(96).auto('format').url()}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 rounded"
      />
      <span className="min-w-0">
        <b className="block break-words text-sm">{single.title}</b>
        <small className="text-xs text-cream-base/60">{formatReleaseDate(single.releaseDate)}</small>
      </span>
      {isNew ? (
        <span className="rounded-[3px] bg-amber-warm px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.14em] text-white">
          Ny
        </span>
      ) : (
        listenUrl && <Play className="h-4 w-4 text-purple-playful" aria-hidden="true" />
      )}
    </>
  )

  if (!listenUrl) return <div className={rowClass}>{content}</div>

  return (
    <a href={listenUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
      {content}
      <span className="sr-only">(åpnes i ny fane)</span>
    </a>
  )
}
