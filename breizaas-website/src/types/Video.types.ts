/**
 * Video document type - matches Sanity video schema
 * Represents a YouTube video embed with metadata
 */
export interface Video {
  /** Sanity document ID */
  _id: string;
  /** Norwegian video title for display and accessibility */
  title: string;
  /** 11-character YouTube video ID (e.g., "dQw4w9WgXcQ") */
  youtubeId: string;
  /** Optional Norwegian description */
  description?: string;
  /** ISO datetime string for when the video was published */
  publishedAt?: string;
}

/**
 * Props for the VideoGrid component
 */
export interface VideoGridProps {
  /** Array of video documents from Sanity */
  videos: Video[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for the VideoCard component
 */
export interface VideoCardProps {
  /** Single video document from Sanity */
  video: Video;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for the YouTubeEmbed component
 */
export interface YouTubeEmbedProps {
  /** YouTube video ID (11 characters) */
  videoId: string;
  /** Norwegian video title for accessibility (iframe title attribute) */
  title: string;
  /** Optional additional CSS classes */
  className?: string;
}
