/**
 * Shared SEO configuration and structured-data builders.
 *
 * Positioning: Breizaas is a Norwegian country band playing festcountry and
 * festmusikk, bookable as a live band or DJ.
 */
import type { ArtistInfo } from '@/types/Sanity.types';
import type { BandsinownEvent } from '@/types/Bandsintown.types';

export const SITE_URL = 'https://breizaas.no';
export const SITE_NAME = 'Breizaas';
export const FOUNDER_NAME = 'Gisle Knutsen';
export const SPOTIFY_ARTIST_ID = '3sMoefLp287FEWJF6Ue7oc';

export const DEFAULT_TITLE = 'Breizaas - Festcountry og festmusikk fra Norge';

export const DEFAULT_DESCRIPTION =
  'Breizaas er et norsk countryband med festcountry og festmusikk laget for allsang. Book live band eller DJ til festival, bygdefest, bryllup og firmafest.';

/** Target keywords, ordered by priority. */
export const SEO_KEYWORDS = [
  'Breizaas',
  'festcountry',
  'festmusikk',
  'live band',
  'countryband',
  'norsk country',
  'norsk countrymusikk',
  'partycountry',
  'countryfest',
  'partymusikk',
  'festlåter',
  'bygdemusikk',
  'bygdefest',
  'allsang',
  'allsanglåter',
  'russemusikk',
  'festband',
  'liveband til fest',
  'band til bryllup',
  'band til firmafest',
  'band til festival',
  'booke band',
  'Spell høgt spell Breizaas',
];

export const GENRES = ['Festcountry', 'Country', 'Festmusikk', 'Bygdemusikk', 'Partymusikk'];

export const OG_IMAGE = {
  url: '/images/og-image-default.jpg',
  width: 1200,
  height: 630,
  alt: 'Breizaas - norsk countryband med festcountry og festmusikk',
};

export const ARTIST_PHOTO_URL = `${SITE_URL}/images/artist-photo.jpg`;

const BAND_ID = `${SITE_URL}/#band`;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Formats a listener count for Norwegian copy, e.g. "120 000". */
export function formatCount(n: number): string {
  return n.toLocaleString('nb-NO');
}

function realSocialLinks(artistInfo: ArtistInfo | null): string[] {
  if (!artistInfo) return [];
  return Object.values(artistInfo.socialMediaLinks).filter(
    (url): url is string => typeof url === 'string' && url.startsWith('http') && !url.includes('...')
  );
}

/**
 * schema.org MusicGroup for the band. Used on the homepage and about page so
 * both refer to the same entity via @id.
 */
export function buildMusicGroupJsonLd(artistInfo: ArtistInfo | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': BAND_ID,
    name: artistInfo?.artistName || SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    genre: GENRES,
    url: SITE_URL,
    image: ARTIST_PHOTO_URL,
    foundingDate: '2025-02',
    foundingLocation: { '@type': 'Country', name: 'Norge' },
    founder: { '@type': 'Person', name: FOUNDER_NAME },
    inLanguage: 'nb-NO',
    sameAs: realSocialLinks(artistInfo),
  };
}

function venueToPlace(event: BandsinownEvent) {
  const { venue } = event;
  const hasGeo = venue.latitude && venue.longitude;
  return {
    '@type': 'MusicVenue',
    name: venue.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: venue.city,
      addressRegion: venue.region,
      addressCountry: venue.country,
    },
    ...(hasGeo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: Number(venue.latitude),
            longitude: Number(venue.longitude),
          },
        }
      : {}),
  };
}

/**
 * schema.org MusicEvent list for upcoming concerts (Bandsintown data).
 * Enables event rich results for searches like "Breizaas konsert <by>".
 */
export function buildMusicEventsJsonLd(events: BandsinownEvent[], artistName = SITE_NAME) {
  return {
    '@context': 'https://schema.org',
    '@graph': events.map((event) => ({
      '@type': 'MusicEvent',
      name: `${artistName} live - ${event.venue.name}${event.venue.city ? `, ${event.venue.city}` : ''}`,
      description: event.description || `${artistName} spiller festcountry og festmusikk live på ${event.venue.name}.`,
      startDate: event.datetime,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      url: event.url,
      image: ARTIST_PHOTO_URL,
      location: venueToPlace(event),
      performer: { '@type': 'MusicGroup', '@id': BAND_ID, name: artistName },
      organizer: { '@type': 'MusicGroup', '@id': BAND_ID, name: artistName },
      offers: event.offers.map((offer) => ({
        '@type': 'Offer',
        url: offer.url,
        availability:
          offer.status === 'available'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/SoldOut',
      })),
    })),
  };
}
