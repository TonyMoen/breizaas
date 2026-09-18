import { describe, it, expect } from 'vitest'
import type { BandsinownEvent } from '@/types/Bandsintown.types'
import type { Single } from '@/types/Single.types'
import {
  formatTickerDate,
  formatEventDateParts,
  formatReleaseDate,
  buildSeasonLabel,
  getPastCities,
  buildSetlist,
  isNewRelease,
  getEventLink,
  buildTickerItems,
} from './mobile-home'

function makeEvent(overrides: Partial<BandsinownEvent> & { datetime: string }): BandsinownEvent {
  return {
    id: overrides.datetime,
    venue: { name: 'Mariannes', city: 'Skien', country: 'Norway' },
    lineup: ['Breizaas'],
    offers: [],
    url: 'https://www.bandsintown.com/e/1',
    ...overrides,
  }
}

function makeSingle(id: string, releaseDate: string): Single {
  return {
    _id: id,
    title: id,
    releaseDate,
    coverImage: { alt: `Singlecover for ${id}` } as Single['coverImage'],
  }
}

describe('formatTickerDate', () => {
  it('formats the concert date as zero-padded DD.MM', () => {
    expect(formatTickerDate('2026-09-05T21:00:00')).toBe('05.09')
  })

  it('keeps the venue-local date for late-night shows regardless of server timezone', () => {
    expect(formatTickerDate('2026-10-10T23:30:00')).toBe('10.10')
  })
})

describe('formatEventDateParts', () => {
  it('returns day without padding, short Norwegian month and weekday', () => {
    expect(formatEventDateParts('2026-09-05T21:00:00')).toEqual({
      day: '5',
      month: 'sep',
      weekday: 'lørdag',
    })
  })

  it('uses Norwegian month abbreviations that differ from English', () => {
    expect(formatEventDateParts('2026-10-17T20:00:00').month).toBe('okt')
    expect(formatEventDateParts('2026-05-17T12:00:00').month).toBe('mai')
    expect(formatEventDateParts('2026-12-31T22:00:00').month).toBe('des')
  })
})

describe('formatReleaseDate', () => {
  it('formats a Sanity release date as a full Norwegian date', () => {
    expect(formatReleaseDate('2025-09-26')).toBe('26. september 2025')
  })
})

describe('buildSeasonLabel', () => {
  it('names the season and spells out the number of concerts', () => {
    const events = [
      makeEvent({ datetime: '2026-09-05T21:00:00' }),
      makeEvent({ datetime: '2026-10-10T21:00:00' }),
      makeEvent({ datetime: '2026-10-17T21:00:00' }),
      makeEvent({ datetime: '2026-10-24T21:00:00' }),
    ]
    expect(buildSeasonLabel(events)).toBe('Høsten 2026 · fire fester')
  })

  it('uses singular for a single concert', () => {
    expect(buildSeasonLabel([makeEvent({ datetime: '2026-07-04T21:00:00' })])).toBe(
      'Sommeren 2026 · én fest'
    )
  })

  it('falls back to the year when concerts span several seasons', () => {
    const events = [
      makeEvent({ datetime: '2026-08-29T21:00:00' }),
      makeEvent({ datetime: '2026-10-10T21:00:00' }),
    ]
    expect(buildSeasonLabel(events)).toBe('2026 · to fester')
  })

  it('shows a year range when concerts cross into next year', () => {
    const events = [
      makeEvent({ datetime: '2026-10-10T21:00:00' }),
      makeEvent({ datetime: '2027-03-06T21:00:00' }),
    ]
    expect(buildSeasonLabel(events)).toBe('2026–2027 · to fester')
  })

  it('treats December to February as one winter across the year boundary', () => {
    const events = [
      makeEvent({ datetime: '2026-12-27T21:00:00' }),
      makeEvent({ datetime: '2027-01-16T21:00:00' }),
    ]
    expect(buildSeasonLabel(events)).toBe('Vinteren 2026/27 · to fester')
  })

  it('uses digits above twelve concerts', () => {
    const events = Array.from({ length: 13 }, (_, i) =>
      makeEvent({ datetime: `2026-09-${String(i + 1).padStart(2, '0')}T21:00:00` })
    )
    expect(buildSeasonLabel(events)).toBe('Høsten 2026 · 13 fester')
  })

  it('returns an empty label when there are no concerts', () => {
    expect(buildSeasonLabel([])).toBe('')
  })
})

describe('getPastCities', () => {
  it('lists unique cities with the most recent concert first', () => {
    const past = [
      makeEvent({ datetime: '2026-03-01T21:00:00', venue: { name: 'A', city: 'Ulefoss' } }),
      makeEvent({ datetime: '2026-06-01T21:00:00', venue: { name: 'B', city: 'Tønsberg' } }),
      makeEvent({ datetime: '2026-01-01T21:00:00', venue: { name: 'C', city: 'Tønsberg' } }),
    ]
    expect(getPastCities(past)).toEqual(['Tønsberg', 'Ulefoss'])
  })

  it('skips concerts without a city and respects the limit', () => {
    const past = [
      makeEvent({ datetime: '2026-06-01T21:00:00', venue: { name: 'A', city: 'Rjukan' } }),
      makeEvent({ datetime: '2026-05-01T21:00:00', venue: { name: 'B' } }),
      makeEvent({ datetime: '2026-04-01T21:00:00', venue: { name: 'C', city: 'Stathelle' } }),
      makeEvent({ datetime: '2026-03-01T21:00:00', venue: { name: 'D', city: 'Målselv' } }),
    ]
    expect(getPastCities(past, 2)).toEqual(['Rjukan', 'Stathelle'])
  })
})

describe('buildSetlist', () => {
  const latest = [
    makeSingle('elgjakt', '2026-09-01'),
    makeSingle('torst', '2026-08-11'),
    makeSingle('gigolo', '2026-07-23'),
  ]

  it('puts the featured single first, followed by the newest releases', () => {
    const featured = makeSingle('liggi', '2025-09-26')
    expect(buildSetlist(featured, latest, 3).map((s) => s._id)).toEqual(['liggi', 'elgjakt', 'torst'])
  })

  it('does not list the featured single twice when it is also among the newest', () => {
    const featured = makeSingle('torst', '2026-08-11')
    expect(buildSetlist(featured, latest, 5).map((s) => s._id)).toEqual(['torst', 'elgjakt', 'gigolo'])
  })

  it('works without a featured single', () => {
    expect(buildSetlist(null, latest, 2).map((s) => s._id)).toEqual(['elgjakt', 'torst'])
  })
})

describe('isNewRelease', () => {
  const now = new Date('2026-09-18T12:00:00Z')

  it('is true for a release from the last weeks', () => {
    expect(isNewRelease('2026-09-01', now)).toBe(true)
  })

  it('is false for an old release', () => {
    expect(isNewRelease('2025-09-26', now)).toBe(false)
  })

  it('is false for a release date in the future', () => {
    expect(isNewRelease('2026-10-01', now)).toBe(false)
  })
})

describe('getEventLink', () => {
  it('links to the ticket shop when tickets are available', () => {
    const event = makeEvent({
      datetime: '2026-10-10T21:00:00',
      offers: [{ type: 'Tickets', url: 'https://tickets.example/budeia', status: 'available' }],
    })
    expect(getEventLink(event)).toEqual({
      href: 'https://tickets.example/budeia',
      label: 'Billettar',
      soldOut: false,
    })
  })

  it('links to the Bandsintown event page when there is no ticket offer', () => {
    const event = makeEvent({ datetime: '2026-09-05T21:00:00', offers: [] })
    expect(getEventLink(event)).toEqual({
      href: 'https://www.bandsintown.com/e/1',
      label: 'Info',
      soldOut: false,
    })
  })

  it('marks the concert as sold out when every offer is sold out', () => {
    const event = makeEvent({
      datetime: '2026-10-10T21:00:00',
      offers: [{ type: 'Tickets', url: 'https://tickets.example/budeia', status: 'sold out' }],
    })
    expect(getEventLink(event)).toEqual({
      href: 'https://www.bandsintown.com/e/1',
      label: 'Utsolgt',
      soldOut: true,
    })
  })
})

describe('buildTickerItems', () => {
  it('shows date and city for each concert', () => {
    const items = buildTickerItems([makeEvent({ datetime: '2026-09-05T21:00:00' })], 1)
    expect(items).toEqual([{ date: '05.09', place: 'Skien' }])
  })

  it('falls back to the venue name when the city is missing', () => {
    const items = buildTickerItems(
      [makeEvent({ datetime: '2026-09-05T21:00:00', venue: { name: 'Mariannes' } })],
      1
    )
    expect(items[0].place).toBe('Mariannes')
  })

  it('repeats a short concert list so the line always fills the screen', () => {
    const events = [
      makeEvent({ datetime: '2026-09-05T21:00:00' }),
      makeEvent({ datetime: '2026-10-10T21:00:00', venue: { name: 'Budeia', city: 'Seljord' } }),
    ]
    const items = buildTickerItems(events, 8)
    expect(items).toHaveLength(8)
    expect(items.map((i) => i.place).slice(0, 4)).toEqual(['Skien', 'Seljord', 'Skien', 'Seljord'])
  })

  it('returns no items when there are no concerts', () => {
    expect(buildTickerItems([], 8)).toEqual([])
  })
})
