import type { SanityImageSource } from '@sanity/image-url';

/**
 * Track object type - matches Sanity track schema
 * Represents a single track within an album
 */
export interface Track {
  /** Sanity-generated unique key for this track object */
  _key: string;
  /** Track number (1-indexed) */
  number: number;
  /** Track title */
  title: string;
  /** Track duration in MM:SS format (e.g., "3:45") */
  duration: string;
  /** Spotify track URL (https://open.spotify.com/track/{id}) */
  spotifyTrackUrl: string;
}

/**
 * Album document type - matches Sanity album schema
 * Represents a complete music album with artwork and tracks
 */
export interface Album {
  /** Sanity document ID */
  _id: string;
  /** Album title */
  title: string;
  /** Year the album was released */
  releaseYear: number;
  /** Sanity image reference for album artwork */
  artwork: SanityImageSource & {
    /** Norwegian alt text for accessibility */
    alt: string;
  };
  /** Spotify album URL (https://open.spotify.com/album/{id}) */
  spotifyAlbumUrl: string;
  /** Array of tracks in this album */
  tracks: Track[];
}
