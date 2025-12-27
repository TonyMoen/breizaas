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
} as const;
