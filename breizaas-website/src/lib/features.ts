/**
 * Feature flags for temporarily enabling/disabling site sections.
 *
 * merch: The Shopify-based merch store is disabled until a new system is in place.
 *        When false, the /merch route redirects to the homepage and all merch
 *        links, sections and sitemap entries are hidden.
 */
export const FEATURES = {
  merch: false,
  /** Press kit (riders, downloads, press photos, logos) is hidden until real content is in Sanity. */
  pressKit: false,
} as const;
