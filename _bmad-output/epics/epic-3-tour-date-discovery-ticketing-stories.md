# Epic 3: Tour Date Discovery & Ticketing - Stories

## Story 3.1: BandsInTown API Integration with Caching & Error Handling

As a developer,
I want to integrate the BandsInTown API with proper caching and error handling,
So that tour dates are automatically synced and the site remains functional even when the API is unavailable.

**Acceptance Criteria:**

**Given** the BandsInTown API is configured
**When** the `/konserter` page loads
**Then** the system fetches upcoming tour dates from BandsInTown API
**And** API responses are cached for 1 hour (`revalidate: 3600`) per architecture requirements (NFR-P3)
**And** API client is implemented in `src/lib/bandsintown.ts` with TypeScript types
**And** response data is validated using Zod schema including:
  - venue name
  - location (city, country)
  - date/time
  - ticket URL
  - event status (upcoming, sold out, cancelled)
**And** if API request succeeds, tour dates are displayed and cached
**And** if API request fails (timeout > 5 seconds per NFR-P3):
  - Norwegian error message displays: "Kunne ikke laste inn konserter. Prøv igjen senere."
  - Cached tour dates from previous successful request are shown (if available)
  - Retry button in champagne gold appears
  - Error is logged for monitoring
**And** if API returns zero events, Norwegian message displays: "Ingen kommende konserter"
**And** while loading, warm brown skeleton cards are displayed (3 placeholder cards)
**And** API key/credentials are stored as environment variable `BANDSINTOWN_API_KEY`
**And** API errors are handled gracefully without breaking page layout (NFR-I2)
**And** system respects BandsInTown API rate limits to prevent service interruption (NFR-I1)
**And** all API responses include proper error typing with ApiError pattern from architecture

---

## Story 3.2: TourDateCard Component with Grid Layout

As a fan,
I want to view upcoming tour dates in an organized grid with clear venue, date, and location information,
So that I can quickly find shows in my area.

**Acceptance Criteria:**

**Given** I am on the `/konserter` page with available tour dates
**When** the tour dates load
**Then** I see tour dates displayed in a responsive grid:
  - Desktop (1024px+): 3 columns
  - Tablet (768px-1023px): 2 columns
  - Mobile (< 768px): 1 column (full width)
**And** each TourDateCard displays:
  - Date formatted in Norwegian: "15. FEB" in playful purple `#b589d6`, 32px bold
  - Venue name in warm white `#faf8f5`, 20px semi-bold
  - Location (city, country) in warm gray `#b8b0a8`, 14px
  - "Kjøp billetter" CTA button in champagne gold
  - Calendar icon button (44x44px touch target)
**And** cards have warm brown background `#3a2f28`
**And** cards have 2px transparent border by default
**And** on hover (desktop):
  - Border becomes vintage gold `#d4af37`
  - Warm amber glow appears: `box-shadow: 0 0 30px rgba(255, 159, 69, 0.3)`
  - Card lifts slightly: `translateY(-4px)`
  - Smooth transition: 0.3s ease
**And** cards have 8px border radius and 24px padding
**And** cards are spaced 24px apart in the grid
**And** if event is sold out:
  - Badge "Utsolgt" in playful purple appears
  - "Kjøp billetter" button is disabled with 0.5 opacity
**And** all interactive elements maintain 44x44px minimum touch targets
**And** cards are keyboard accessible with champagne gold focus indicators
**And** screen readers announce: "Konsert [venue] [date]"
**And** grid maintains Direction 1 centered layout with max-width 1200px

---

## Story 3.3: Calendar Export (.ics) & Ticket Purchase Links

As a fan,
I want to add tour dates to my personal calendar and purchase tickets,
So that I don't forget about shows and can secure my spot.

**Acceptance Criteria:**

**Given** I am viewing a tour date card
**When** I click the calendar icon button
**Then** an .ics calendar file is generated and downloaded with:
  - Event title: "Breizaas - [venue name]"
  - Location: [venue], [city], [country]
  - Start date/time from BandsInTown data
  - End time: start time + 3 hours (estimated concert duration)
  - Description: "Breizaas konsert" with ticket URL
  - URL: ticket purchase link from BandsInTown
**And** filename is formatted: `breizaas-[venue]-[date].ics`
**And** file uses MIME type: `text/calendar`
**And** file is compatible with Apple Calendar, Google Calendar, and Outlook
**And** calendar button shows:
  - Calendar glyph icon in warm gray `#b8b0a8`
  - On hover: icon turns champagne gold `#d4af37` with warm amber glow
  - Loading spinner appears while generating file
  - Brief success animation after download
**And** ARIA label in Norwegian: "Legg til [venue] [date] i kalender"
**And** when I click "Kjøp billetter" CTA:
  - Opens ticket provider URL from BandsInTown in new tab
  - Link has proper rel="noopener noreferrer" for security
  - CTA maintains champagne gold styling with white text
  - Hover shows warm amber glow effect
**And** both buttons are keyboard accessible (Enter/Space to trigger)
**And** if ticket URL is unavailable, "Kjøp billetter" button is hidden

---

## Story 3.4: Past Tour History Display

As a fan,
I want to see Breizaas's past tour dates and concert history,
So that I can see where the artist has performed before.

**Acceptance Criteria:**

**Given** I am on the `/konserter` page
**When** I scroll below the upcoming tour dates section
**Then** I see a section titled "Tidligere konserter" in Montserrat Bold, warm white
**And** past tour dates are displayed in the same grid layout as upcoming shows
**And** past tour date cards show:
  - Same format as upcoming cards (date, venue, location)
  - Reduced opacity: 0.7 to indicate past event
  - No "Kjøp billetter" button (past event)
  - Calendar button is hidden (cannot add past events)
**And** past dates are fetched from BandsInTown API past events endpoint
**And** past dates are cached for 1 hour same as upcoming dates
**And** past dates are sorted by date descending (most recent first)
**And** maximum 12 past events are displayed initially
**And** if more than 12 past events exist, "Se flere" (Show more) button appears in playful purple
**And** clicking "Se flere" loads next 12 events
**And** if no past events exist, section is hidden
**And** if API fails to load past events, section shows Norwegian message: "Kunne ikke laste tidligere konserter"
**And** past events section maintains V11 warm brown aesthetic
**And** section is fully responsive across all breakpoints

---

## Story 3.5: Tour Page Layout with Social Sharing

As a fan,
I want to share tour dates with friends on social media,
So that we can attend concerts together.

**Acceptance Criteria:**

**Given** I am on the `/konserter` page
**When** the page loads
**Then** I see a centered hero section with "Konserter" headline in Montserrat Bold, warm white
**And** page content is organized in sections:
  1. Hero with headline
  2. "Kommende Konserter" section with upcoming tour dates grid (Story 3.2)
  3. "Tidligere Konserter" section with past tour history (Story 3.4)
**And** each tour date card includes a share button (icon only, 44x44px) with:
  - Share icon in warm gray `#b8b0a8`
  - On hover: icon turns champagne gold with warm amber glow
  - ARIA label: "Del [venue] konsert"
**And** clicking share button opens native share dialog (if supported) or shows share options:
  - Facebook share with pre-filled Norwegian text: "Skal på Breizaas konsert! [venue], [date]"
  - Twitter/X share with pre-filled Norwegian text
  - Copy link to clipboard option
**And** share URLs include proper Open Graph metadata:
  - og:title: "Breizaas - [venue], [date]"
  - og:description: "Kommende konsert i [city]"
  - og:image: Breizaas artist image
**And** after sharing/copying, brief success message appears: "Lenke kopiert!" in champagne gold
**And** page has proper SEO metadata:
  - Title: "Konserter - Breizaas"
  - Description in Norwegian
  - Event structured data (schema.org) for upcoming shows (FR49)
**And** all sections have generous spacing (96px desktop, 64px mobile)
**And** content is centered with max-width 1200px
**And** page maintains V11 warm brown aesthetic
**And** page is fully responsive from 320px to 2560px
**And** page loads in < 2 seconds
**And** Lighthouse Performance score ≥ 90

---
