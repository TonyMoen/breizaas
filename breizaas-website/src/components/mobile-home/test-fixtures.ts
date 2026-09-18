import type { BandsinownEvent } from '@/types/Bandsintown.types'
import type { Single } from '@/types/Single.types'

/** Builds a Sanity single for component tests; only the title is required. */
export function makeSingle(overrides: Partial<Single> & { title: string }): Single {
  return {
    _id: `single-${overrides.title.toLowerCase()}`,
    releaseDate: '2025-09-26',
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: 'image-abc123-1000x1000-jpg' },
      alt: `Singlecover for ${overrides.title}`,
    },
    ...overrides,
  }
}

export const liggi = makeSingle({
  title: 'Liggi',
  releaseDate: '2025-09-26',
  spotifyUrl: 'https://open.spotify.com/track/liggi',
  appleMusicUrl: 'https://music.apple.com/no/album/liggi',
  youtubeUrl: 'https://www.youtube.com/watch?v=24OqXqsJFpQ',
})

export const elgjakt = makeSingle({
  title: 'Elgjakt',
  releaseDate: '2026-09-01',
  spotifyUrl: 'https://open.spotify.com/track/elgjakt',
})

/** Builds a Bandsintown event for component tests; only the date is required. */
export function makeEvent(overrides: Partial<BandsinownEvent> & { datetime: string }): BandsinownEvent {
  return {
    id: overrides.datetime,
    venue: { name: 'Mariannes', city: 'Skien', country: 'Norway' },
    lineup: ['Breizaas'],
    offers: [],
    url: 'https://www.bandsintown.com/e/mariannes',
    ...overrides,
  }
}

export const skien = makeEvent({ datetime: '2026-09-05T21:00:00' })

export const seljord = makeEvent({
  datetime: '2026-10-10T21:00:00',
  venue: { name: 'Budeia', city: 'Seljord', country: 'Norway' },
  offers: [{ type: 'Tickets', url: 'https://tickets.example/budeia', status: 'available' }],
  url: 'https://www.bandsintown.com/e/budeia',
})
