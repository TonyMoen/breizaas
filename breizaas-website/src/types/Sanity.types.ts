import { z } from 'zod';

/**
 * Sanity CMS Content Types
 * TypeScript types and Zod schemas for all Sanity document types
 */

// ============================================================================
// ArtistInfo - Singleton document for artist information
// ============================================================================

export interface ArtistInfo {
  _id: string;
  _type: 'artistInfo';
  artistName: string;
  tagline: string;
  biography: unknown[]; // Portable Text blocks
  shortBio: string;
  monthlyListeners: number;
  totalStreams?: number;
  numberOfReleases?: number;
  notableAchievements?: string[];
  genreTags: string[];
  socialMediaLinks: {
    spotify?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    facebook?: string | null;
    youtube?: string | null;
  };
}

export const ArtistInfoSchema = z.object({
  _id: z.string(),
  _type: z.literal('artistInfo'),
  artistName: z.string(),
  tagline: z.string(),
  biography: z.array(z.any()),
  shortBio: z.string(),
  monthlyListeners: z.number(),
  totalStreams: z.number().optional(),
  numberOfReleases: z.number().optional(),
  notableAchievements: z.array(z.string()).optional(),
  genreTags: z.array(z.string()),
  socialMediaLinks: z.object({
    spotify: z.string().nullish(),
    instagram: z.string().nullish(),
    tiktok: z.string().nullish(),
    facebook: z.string().nullish(),
    youtube: z.string().nullish(),
  }),
});

// ============================================================================
// HeroSection - Reusable hero sections for all pages
// ============================================================================

export interface HeroSection {
  _id: string;
  _type: 'heroSection';
  pageName: 'home' | 'musikk' | 'om-oss' | 'konserter' | 'merch' | 'kontakt' | 'arrangor';
  heroImage: {
    asset: unknown;
    alt: string;
  };
  headline: string;
  subtitle?: string;
}

export const HeroSectionSchema = z.object({
  _id: z.string(),
  _type: z.literal('heroSection'),
  pageName: z.enum(['home', 'musikk', 'om-oss', 'konserter', 'merch', 'kontakt', 'arrangor']),
  heroImage: z.object({
    asset: z.any(),
    alt: z.string(),
  }),
  headline: z.string(),
  subtitle: z.string().optional(),
});

// ============================================================================
// BookingInfo - Singleton document for booking contact information
// ============================================================================

export interface BookingInfo {
  _id: string;
  _type: 'bookingInfo';
  companyName: string;
  email: string;
  phone: string;
  displayPhone: string;
}

export const BookingInfoSchema = z.object({
  _id: z.string(),
  _type: z.literal('bookingInfo'),
  companyName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  displayPhone: z.string(),
});

// ============================================================================
// PressKit - Document for press kit content (existing, for reference)
// ============================================================================

export interface PressKit {
  _id: string;
  _type: 'pressKit';
  heroImage: unknown;
  heroHeadline: string;
  heroSubtitle: string;
  technicalRiderDescription: string;
  technicalRiderPdf?: unknown;
  hospitalityRider: unknown[]; // Portable Text blocks
  pressKitDriveUrl?: string;
  pressKitDescription: string;
  shortBio: string;
  fullBio: unknown[]; // Portable Text blocks
  pressPhotos: Array<{
    _key: string;
    asset: unknown;
    alt: string;
    caption?: string;
  }>;
  logoFiles: Array<{
    _key: string;
    name: string;
    file: unknown;
  }>;
  bookingEmail: string;
  bookingPhone?: string;
}

export const PressKitSchema = z.object({
  _id: z.string(),
  _type: z.literal('pressKit'),
  heroImage: z.any(),
  heroHeadline: z.string(),
  heroSubtitle: z.string(),
  technicalRiderDescription: z.string(),
  technicalRiderPdf: z.any().optional(),
  hospitalityRider: z.array(z.any()),
  pressKitDriveUrl: z.string().optional(),
  pressKitDescription: z.string(),
  shortBio: z.string(),
  fullBio: z.array(z.any()),
  pressPhotos: z.array(
    z.object({
      _key: z.string(),
      asset: z.any(),
      alt: z.string(),
      caption: z.string().optional(),
    })
  ),
  logoFiles: z.array(
    z.object({
      _key: z.string(),
      name: z.string(),
      file: z.any(),
    })
  ),
  bookingEmail: z.string().email(),
  bookingPhone: z.string().optional(),
});

// ============================================================================
// Video - Document for YouTube videos (existing, for reference)
// ============================================================================

export interface Video {
  _id: string;
  _type: 'video';
  title: string;
  youtubeId: string;
  description?: string;
  publishedAt?: string;
  featured?: boolean;
}

export const VideoSchema = z.object({
  _id: z.string(),
  _type: z.literal('video'),
  title: z.string(),
  youtubeId: z.string().length(11),
  description: z.string().optional(),
  publishedAt: z.string().optional(),
  featured: z.boolean().optional(),
});
