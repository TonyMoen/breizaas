/**
 * Pure helpers for the mobile front page (the "Tre scener" layout).
 *
 * Dates are read straight from the ISO string instead of going through the
 * runtime timezone: Bandsintown sends venue-local times without an offset, so
 * the calendar date in the string is the date the audience sees on the poster.
 */
import type { BandsinownEvent } from '@/types/Bandsintown.types'
import type { Single } from '@/types/Single.types'

export interface EventDateParts {
  /** Day of month without padding, e.g. "5" */
  day: string
  /** Short Norwegian month, e.g. "sep" */
  month: string
  /** Norwegian weekday, e.g. "lørdag" */
  weekday: string
}

export interface EventLink {
  href: string
  label: 'Billettar' | 'Info' | 'Utsolgt'
  soldOut: boolean
}

export interface TickerItem {
  /** "05.09" */
  date: string
  /** City, or venue name when Bandsintown has no city */
  place: string
}

const MONTHS_SHORT = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
const MONTHS_LONG = [
  'januar', 'februar', 'mars', 'april', 'mai', 'juni',
  'juli', 'august', 'september', 'oktober', 'november', 'desember',
]
const WEEKDAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
const NUMBER_WORDS = [
  'null', 'én', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv',
]

interface CalendarDate {
  year: number
  month: number // 1-12
  day: number
}

/** Reads YYYY-MM-DD from the start of an ISO date or datetime string. */
function parseCalendarDate(iso: string): CalendarDate {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number)
  return { year, month, day }
}

export function formatTickerDate(datetime: string): string {
  const { month, day } = parseCalendarDate(datetime)
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}`
}

export function formatEventDateParts(datetime: string): EventDateParts {
  const { year, month, day } = parseCalendarDate(datetime)
  const weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  return {
    day: String(day),
    month: MONTHS_SHORT[month - 1],
    weekday: WEEKDAYS[weekdayIndex],
  }
}

/** "26. september 2025" */
export function formatReleaseDate(releaseDate: string): string {
  const { year, month, day } = parseCalendarDate(releaseDate)
  return `${day}. ${MONTHS_LONG[month - 1]} ${year}`
}

/** Season name plus the year(s) it belongs to; winter spans the year boundary. */
function seasonOf({ year, month }: CalendarDate): string {
  if (month >= 3 && month <= 5) return `Våren ${year}`
  if (month >= 6 && month <= 8) return `Sommeren ${year}`
  if (month >= 9 && month <= 11) return `Høsten ${year}`
  const startYear = month === 12 ? year : year - 1
  return `Vinteren ${startYear}/${String((startYear + 1) % 100).padStart(2, '0')}`
}

function countLabel(count: number): string {
  const number = NUMBER_WORDS[count] ?? String(count)
  return `${number} ${count === 1 ? 'fest' : 'fester'}`
}

/** Heading for the concert list, e.g. "Høsten 2026 · fire fester". Empty when there are no concerts. */
export function buildSeasonLabel(events: BandsinownEvent[]): string {
  if (events.length === 0) return ''

  const dates = events.map((event) => parseCalendarDate(event.datetime))
  const seasons = new Set(dates.map(seasonOf))
  const years = dates.map((date) => date.year)
  const firstYear = Math.min(...years)
  const lastYear = Math.max(...years)

  let period: string
  if (seasons.size === 1) {
    period = [...seasons][0]
  } else if (firstYear === lastYear) {
    period = String(firstYear)
  } else {
    period = `${firstYear}–${lastYear}`
  }

  return `${period} · ${countLabel(events.length)}`
}

/** Unique cities the band has played, most recent concert first. */
export function getPastCities(pastEvents: BandsinownEvent[], limit = 5): string[] {
  const cities: string[] = []
  const seen = new Set<string>()
  const newestFirst = [...pastEvents].sort((a, b) => b.datetime.localeCompare(a.datetime))

  for (const event of newestFirst) {
    const city = event.venue.city?.trim()
    if (!city || seen.has(city.toLowerCase())) continue
    seen.add(city.toLowerCase())
    cities.push(city)
    if (cities.length === limit) break
  }

  return cities
}

/** Featured single first, then the newest releases, without duplicates. */
export function buildSetlist(featured: Single | null, latest: Single[], limit = 5): Single[] {
  const rest = latest.filter((single) => single._id !== featured?._id)
  return (featured ? [featured, ...rest] : rest).slice(0, limit)
}

/** True when the release came out within the last `days` days (not in the future). */
export function isNewRelease(releaseDate: string, now: Date, days = 45): boolean {
  const { year, month, day } = parseCalendarDate(releaseDate)
  const ageInDays = (now.getTime() - Date.UTC(year, month - 1, day)) / (24 * 60 * 60 * 1000)
  return ageInDays >= 0 && ageInDays <= days
}

/** Where a concert row should lead: the ticket shop when there is one, otherwise the Bandsintown page. */
export function getEventLink(event: BandsinownEvent): EventLink {
  const soldOut = event.offers.length > 0 && event.offers.every((offer) => offer.status === 'sold out')
  if (soldOut) return { href: event.url, label: 'Utsolgt', soldOut: true }

  const ticketUrl = event.offers.find((offer) => offer.url)?.url
  if (ticketUrl) return { href: ticketUrl, label: 'Billettar', soldOut: false }

  return { href: event.url, label: 'Info', soldOut: false }
}

/**
 * Items for the scrolling concert line. A short tour is repeated in whole
 * rounds until there are at least `minItems`, so one pass of the line is
 * always wider than the screen and the order never breaks at the seam.
 */
export function buildTickerItems(events: BandsinownEvent[], minItems = 8): TickerItem[] {
  if (events.length === 0) return []

  const items = events.map((event) => ({
    date: formatTickerDate(event.datetime),
    place: event.venue.city?.trim() || event.venue.name,
  }))

  const rounds = Math.ceil(minItems / items.length)
  return Array.from({ length: rounds }, () => items).flat()
}
