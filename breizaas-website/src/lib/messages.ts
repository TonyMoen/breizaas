/**
 * Centralized Norwegian language messages for the Breizaas website
 * All user-facing text should be defined here for consistency and easy translation
 */

export const MESSAGES = {
  /**
   * Bandsintown API related messages
   * Used for tour dates, events, and concert information
   */
  bandsintown: {
    /** Generic fetch error message */
    fetchError: "Kunne ikke laste inn konserter. Prøv igjen senere.",
    /** Message when no upcoming events are found */
    noEvents: "Ingen kommende konserter",
    /** Timeout error message (5+ seconds) */
    timeout: "Kunne ikke laste inn konserter. Prøv igjen senere.",
    /** Network connectivity error */
    networkError: "Nettverksfeil. Sjekk tilkoblingen din.",
    /** Error loading past events */
    pastEventsError: "Kunne ikke laste tidligere konserter",
  },
  /**
   * Tour page related messages
   * Used for the comprehensive tour page layout
   */
  tour: {
    /** Page title */
    pageTitle: 'Konserter',
    /** Featured shows section heading */
    featuredHeading: 'Kommende Høydepunkter',
    /** All upcoming events section heading */
    allUpcomingHeading: 'Alle Kommende Konserter',
    /** Past tour history section heading */
    pastHistoryHeading: 'Tidligere Konserter',
    /** Show more past events button */
    showMorePast: 'Se alle tidligere konserter',
    /** Show less past events button */
    showLessPast: 'Vis færre',
    /** Empty state message when no upcoming events */
    noUpcoming: 'Ingen kommende konserter akkurat nå. Følg oss på sosiale medier for oppdateringer!',
    /** Social share section heading */
    shareHeading: 'Del denne siden',
    /** Facebook share button label */
    shareOnFacebook: 'Del på Facebook',
    /** Twitter share button label */
    shareOnTwitter: 'Del på Twitter',
    /** Native share button label */
    shareNative: 'Del',
  },
} as const;
