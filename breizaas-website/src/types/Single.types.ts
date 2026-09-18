import type { SanityImageSource } from '@sanity/image-url';

/**
 * Single document type - matches Sanity single schema
 * Represents a music single with cover art and streaming links
 */
export interface Single {
  /** Sanity document ID */
  _id: string;
  /** Single title */
  title: string;
  /** Address of the song page (breizaas.no/<slug>). Falls back to a slug made from the title. */
  slug?: { current?: string } | null;
  /** Artist credit for collaborations, e.g. "Breizaas, Tommen" */
  artistLine?: string | null;
  /** Release date in ISO format (YYYY-MM-DD) */
  releaseDate: string;
  /** Sanity image reference for cover art */
  coverImage: SanityImageSource & {
    /** Norwegian alt text for accessibility */
    alt: string;
  };
  /** Optional short text about the song (Norwegian) */
  description?: string | null;
  /** Pre-save link shown until the release date */
  presaveUrl?: string | null;
  /** Spotify track/single URL */
  spotifyUrl?: string;
  /** Apple Music track/single URL */
  appleMusicUrl?: string;
  /** YouTube video/music URL */
  youtubeUrl?: string;
  /** Tidal track URL */
  tidalUrl?: string | null;
  /** Deezer track URL */
  deezerUrl?: string | null;
  /** Amazon Music track URL */
  amazonMusicUrl?: string | null;
  /** Whether this single is featured on homepage */
  featured?: boolean;
}
