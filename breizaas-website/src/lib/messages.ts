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
  /**
   * Merch page related messages
   * Used for merchandise/shop functionality
   */
  merch: {
    /** Buy now button text */
    buyNow: 'Kjøp nå',
    /** Out of stock label */
    outOfStock: 'Utsolgt',
    /** Empty state when no products available */
    noProducts: 'Ingen produkter tilgjengelig for øyeblikket',
    /** Follow us message for empty state */
    followUs: 'Følg oss på sosiale medier:',
  },
  /**
   * Press kit page messages
   * Used for /arrangor press kit functionality
   */
  pressKit: {
    // Hero
    heroHeadline: 'FOR ARRANGØRER',
    heroSubtitle: 'Pressepakke og rider informasjon',

    // Technical Rider
    technicalRiderHeading: 'TEKNISK RIDER',
    downloadTechnicalRider: 'Last ned teknisk rider (PDF)',

    // Hospitality Rider
    hospitalityRiderHeading: 'HOSPITALITY RIDER',

    // Press Kit
    pressKitHeading: 'PRESSEPAKKE',
    openPressKit: 'Åpne pressepakke i Google Drive',

    // Bio
    bioHeading: 'Om Breizaas',
    shortBioLabel: 'KORT BIO',
    fullBioLabel: 'FULL BIO',

    // Practical Info
    practicalInfoHeading: 'PRAKTISK INFO',
    location: 'Sted:',
    doorsOpen: 'Dørene åpner:',
    concertStart: 'Konsertstart:',
    ageLimit: 'Aldersgrense:',
    tickets: 'Billetter:',
    spotifyPlaylist: 'Vors med Breizaas? Sjekk ut spillelista her:',

    // Press Photos
    pressPhotosHeading: 'Pressebilder',
    pressPhotosDescription: 'Høyoppløselige bilder for presse og markedsføring. Klikk for å laste ned.',
    downloadPhoto: 'Last ned',

    // Logo Files
    logoFilesHeading: 'Logofiler',
    logoFilesDescription: 'Bandlogo i ulike formater for bruk i trykk og digital markedsføring.',

    // Contact
    bookingContactHeading: 'KONTAKT FOR BOOKING',

    // Errors
    failedToLoadPressKit: 'Kunne ikke laste pressepakke. Prøv igjen senere.',
  },
  /**
   * Contact form messages
   * Used for general contact form on /kontakt page
   */
  contact: {
    // Page headings
    pageHeading: 'Kontakt oss',
    formHeading: 'Send oss en melding',
    formDescription: 'Fyll ut skjemaet så tar vi kontakt så snart som mulig.',
    bookingHeading: 'Booking',
    bookingDescription: 'For booking og forespørsler, kontakt vår bookingagent:',

    // Field labels
    name: 'Navn',
    email: 'Epost',
    subject: 'Emne',
    message: 'Skriv melding',

    // Placeholders
    namePlaceholder: 'Ditt navn',
    emailPlaceholder: 'Din epost',
    messagePlaceholder: 'Skriv melding',

    // Subject options
    subjectSelectDefault: 'Velg emne',
    subjectBooking: 'Booking',
    subjectPress: 'Presse',
    subjectGeneral: 'Generell henvendelse',
    subjectOther: 'Annet',

    // Validation errors
    invalidEmail: 'Vennligst oppgi en gyldig e-postadresse',
    messageTooShort: 'Meldingen må være minst 10 tegn',

    // Submit button
    submit: 'Send melding',
    submitting: 'Sender...',

    // Success/error messages
    success: 'Takk for din melding! Vi kontakter deg snart.',
    validationError: 'Sjekk feltene og prøv igjen.',
    serverError: 'Kunne ikke sende skjema. Prøv igjen senere.',
    networkError: 'Nettverksfeil. Sjekk tilkoblingen din.',
    rateLimitError: 'For mange forsøk. Vennligst prøv igjen om en time.',

    // Booking contact info
    bookingCompany: 'Aronsen Booking & Management',
    bookingPhone: 'Mobil:',
    bookingEmail: 'E-post:',
  },
  /**
   * Booking form messages (deprecated - replaced by simpler contact form)
   * Used for event organizer booking inquiry form
   */
  booking: {
    // Form section heading
    formHeading: 'Bookingforespørsel',

    // Field labels
    contactPerson: 'Kontaktperson',
    organization: 'Organisasjon',
    email: 'E-post',
    phone: 'Telefon',
    eventType: 'Arrangementtype',
    date: 'Dato',
    venue: 'Sted',
    city: 'By',
    budget: 'Budsjett',
    description: 'Beskrivelse',
    requestTechnicalRider: 'Ønsker teknisk rider',

    // Placeholders
    contactPersonPlaceholder: 'Ditt navn',
    organizationPlaceholder: 'Arrangør eller bedriftsnavn',
    emailPlaceholder: 'din@epost.no',
    phonePlaceholder: '+47 XXX XX XXX',
    venuePlaceholder: 'Konsertsted eller festivalnavn',
    cityPlaceholder: 'Oslo, Bergen, etc.',
    budgetPlaceholder: 'Valgfritt',
    descriptionPlaceholder: 'Fortell oss mer om arrangementet...',

    // Event types
    eventTypeFestival: 'Festival',
    eventTypeKonsert: 'Konsert',
    eventTypePrivat: 'Privat arrangement',
    eventTypeBedrift: 'Bedriftsarrangement',
    eventTypeAnnet: 'Annet',
    eventTypeSelectDefault: 'Velg arrangementtype',

    // Validation errors
    requiredField: 'Dette feltet er påkrevd',
    invalidEmail: 'Vennligst oppgi en gyldig e-postadresse',
    invalidPhone: 'Ugyldig telefonnummer',
    descriptionTooShort: 'Beskrivelsen må være minst 20 tegn',
    dateMustBeFuture: 'Dato må være i fremtiden',

    // Submit button
    submit: 'Send forespørsel',
    submitting: 'Sender...',

    // Success/error messages
    success: 'Takk for din forespørsel! Vi kontakter deg snart.',
    validationError: 'Sjekk feltene og prøv igjen.',
    serverError: 'Kunne ikke sende skjema. Prøv igjen senere.',
    networkError: 'Nettverksfeil. Sjekk tilkoblingen din.',
    rateLimitError: 'For mange forsøk. Vennligst prøv igjen om en time.',
  },
} as const;
