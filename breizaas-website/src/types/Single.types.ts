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
  /** Release date in ISO format (YYYY-MM-DD) */
  releaseDate: string;
  /** Sanity image reference for cover art */
  coverImage: SanityImageSource & {
    /** Norwegian alt text for accessibility */
    alt: string;
  };
  /** Spotify track/single URL */
  spotifyUrl?: string;
  /** Apple Music track/single URL */
  appleMusicUrl?: string;
  /** YouTube video/music URL */
  youtubeUrl?: string;
  /** Whether this single is featured on homepage */
  featured?: boolean;
}
