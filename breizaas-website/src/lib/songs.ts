/**
 * Song pages: every single in Sanity gets its own page at breizaas.no/<slug>
 * with links to all streaming services. These helpers are shared by the page,
 * the cards that link to it, the sitemap and the share image.
 */
import type { Single } from '@/types/Single.types';

export type ServiceName =
  | 'spotify'
  | 'apple'
  | 'youtube'
  | 'youtubeMusic'
  | 'tidal'
  | 'deezer'
  | 'amazon';

export interface Service {
  key: ServiceName;
  label: string;
  /** "Lytt" or "Se", shown on the right side of the row */
  verb: string;
  url: string;
}

/** Top level routes the site owns. A song can never take one of these. */
const RESERVED_SLUGS = new Set([
  'musikk',
  'konserter',
  'om-oss',
  'arrangor',
  'kontakt',
  'merch',
  'studio',
  'api',
  'images',
]);

/** "Øl og Sigarett" -> "ol-og-sigarett", "Håkken e du?" -> "hakken-e-du" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' og ')
    .replace(/['’`´]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** The slug from Sanity, or one made from the title when the field is empty. */
export function songSlug(single: Pick<Single, 'title' | 'slug'>): string {
  const slug = single.slug?.current?.trim() || slugify(single.title);
  return RESERVED_SLUGS.has(slug) ? `${slug}-sang` : slug;
}

export function songPath(single: Pick<Single, 'title' | 'slug'>): string {
  return `/${songSlug(single)}`;
}

/** Finds the single that owns a slug. The newest one wins if two titles collide. */
export function findSingleBySlug(singles: Single[], slug: string): Single | undefined {
  return singles.find((single) => songSlug(single) === slug);
}

/** Today's date in Norway as YYYY-MM-DD. */
export function osloToday(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' }).format(new Date());
}

/** True until the release date arrives (Norwegian time). */
export function isUpcoming(single: Pick<Single, 'releaseDate'>, today = osloToday()): boolean {
  return single.releaseDate > today;
}

export function yearOf(single: Pick<Single, 'releaseDate'>): string {
  return single.releaseDate.slice(0, 4);
}

/** "26. september 2025" */
export function formatDato(iso: string): string {
  return new Intl.DateTimeFormat('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Oslo',
  }).format(new Date(`${iso}T12:00:00Z`));
}

/** ["Breizaas", "Tommen"]. Breizaas alone unless the single names collaborators. */
export function artistNames(single: Pick<Single, 'artistLine'>, bandName = 'Breizaas'): string[] {
  const names = (single.artistLine ?? '')
    .split(/,|·|&| og /)
    .map((name) => name.trim())
    .filter(Boolean);
  return names.length > 0 ? names : [bandName];
}

function joinNames(names: string[]): string {
  return names.length <= 1
    ? names.join('')
    : `${names.slice(0, -1).join(', ')} og ${names[names.length - 1]}`;
}

/**
 * The text under the title. Uses the description from Sanity when there is
 * one, otherwise a factual sentence built from the metadata, so nothing is
 * invented.
 */
export function songSummary(single: Single): string {
  const description = single.description?.trim();
  if (description) return description;
  const who = joinNames(artistNames(single));
  if (isUpcoming(single)) {
    return `«${single.title}» er en ny singel fra ${who} som slippes ${formatDato(single.releaseDate)}.`;
  }
  return `«${single.title}» er en singel fra ${who}, utgitt ${yearOf(single)}.`;
}

/** Video id from youtube.com/watch, music.youtube.com/watch, youtu.be and /shorts links. */
export function youtubeId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1) || null;
    const fromQuery = parsed.searchParams.get('v');
    if (fromQuery) return fromQuery;
    const match = parsed.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/** Streaming services with a link, Spotify first. Rows without a link are left out. */
export function services(single: Single): Service[] {
  const videoId = youtubeId(single.youtubeUrl);
  const youtube = videoId ? `https://www.youtube.com/watch?v=${videoId}` : single.youtubeUrl;
  const youtubeMusic = videoId ? `https://music.youtube.com/watch?v=${videoId}` : undefined;

  const all: Array<[ServiceName, string, string, string | null | undefined]> = [
    ['spotify', 'Spotify', 'Lytt', single.spotifyUrl],
    ['apple', 'Apple Music', 'Lytt', single.appleMusicUrl],
    ['youtube', 'YouTube', 'Se', youtube],
    ['youtubeMusic', 'YouTube Music', 'Lytt', youtubeMusic],
    ['tidal', 'Tidal', 'Lytt', single.tidalUrl],
    ['deezer', 'Deezer', 'Lytt', single.deezerUrl],
    ['amazon', 'Amazon Music', 'Lytt', single.amazonMusicUrl],
  ];

  return all.flatMap(([key, label, verb, url]) => (url ? [{ key, label, verb, url }] : []));
}
