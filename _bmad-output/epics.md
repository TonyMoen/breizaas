---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/prd.md
  - _bmad-output/architecture.md
  - _bmad-output/ux-design-specification.md
currentStep: completed
workflowCompleted: true
---

# Breizaas - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Breizaas, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Music Discovery & Showcase (FR1-FR5):**

- FR1: Visitors can view the artist's complete discography with album artwork and track listings
- FR2: Visitors can play music samples directly through Spotify integration
- FR3: Visitors can see current monthly Spotify listener statistics (125k+ listeners)
- FR4: Visitors can navigate to the artist's Spotify profile for full listening experience
- FR5: Visitors can watch embedded YouTube videos showcasing music and creative process

**Tour & Event Information (FR6-FR9):**

- FR6: Fans can view upcoming tour dates with venue, location, and date information
- FR7: Fans can access ticket purchase links for upcoming shows through Bandsintown integration
- FR8: Fans can see past tour history and concert information
- FR9: Fans can add tour dates to their personal calendars

**Merchandise Management (FR10-FR15):**

- FR10: Fans can browse available merchandise with product images, descriptions, and prices
- FR11: Fans can view product variants (sizes, colors) where applicable
- FR12: Fans can add merchandise items to a shopping cart
- FR13: Fans can complete merchandise purchases through Shopify checkout
- FR14: Fans can check merchandise inventory availability
- FR15: Fans can view shipping and return information for merchandise

**Artist Information & Bio (FR16-FR20):**

- FR16: Visitors can read the artist biography explaining the AI meets bygdemusikk concept
- FR17: Visitors can understand the artist's musical genre (Norwegian bygdemusikk/festmusikk)
- FR18: Visitors can learn about the artist's success metrics and achievements
- FR19: Visitors can see the artist's origin story and creative approach
- FR20: Visitors can access the artist's social media links and external platforms

**Booking & Contact Management (FR21-FR25):**

- FR21: Event organizers can submit booking inquiries through a contact form
- FR22: Event organizers can provide event details (date, venue, budget) in booking requests
- FR23: Event organizers can receive confirmation of inquiry submission
- FR24: General visitors can contact the artist for non-booking inquiries
- FR25: Contact form submissions can be delivered to the artist management

**Press Kit & Media Resources (FR26-FR31):**

- FR26: Event organizers can access the hidden press kit page at `/arrangor`
- FR27: Event organizers can download high-resolution artist photos for promotional use
- FR28: Event organizers can read detailed artist bio optimized for event promotion
- FR29: Event organizers can access technical rider information for live performances
- FR30: Event organizers can view booking contact information and procedures
- FR31: Event organizers can download press materials in various formats

**Content Management (FR32-FR40):**

- FR32: Artist can log into Sanity CMS backend to manage website content
- FR33: Artist can update artist bio and description text
- FR34: Artist can update listener statistics and achievement metrics
- FR35: Artist can add or update tour date information
- FR36: Artist can add or update YouTube video embeds
- FR37: Artist can publish news and announcements
- FR38: Artist can update press kit materials and information
- FR39: Artist can see content changes reflected on the live website immediately after publishing
- FR40: Artist can preview content changes before publishing

**Navigation & Site Structure (FR41-FR46):**

- FR41: Visitors can navigate to all main pages through consistent site navigation (Home, `/musikk`, `/konserter`, `/merch`, `/om-oss`, `/kontakt`)
- FR42: Visitors can access the website from mobile devices, tablets, and desktop computers
- FR43: Visitors can find the website through Norwegian search queries (Breizaas, bygdemusikk, AI artist, AI musikk)
- FR44: Visitors can share pages on social media with proper preview images and descriptions
- FR45: Visitors can navigate the site using keyboard-only controls
- FR46: Screen reader users can navigate and consume website content effectively

**Discovery & SEO (FR47-FR51):**

- FR47: Search engines can index all public pages with Norwegian content
- FR48: Search engines can understand the artist's profile through structured data (MusicGroup schema)
- FR49: Search engines can display tour dates as rich snippets (Event schema)
- FR50: Search engines can display merchandise as product rich snippets (Product schema)
- FR51: Visitors can discover the website through organic search for artist name and genre keywords

### NonFunctional Requirements

**Performance (NFR-P1 to NFR-P4):**

- NFR-P1: Page Load Performance
  - Initial page load must complete in < 2 seconds on 3G mobile connection
  - Time to Interactive (TTI) must be < 3 seconds
  - Client-side page transitions must complete in < 500ms

- NFR-P2: Core Web Vitals Compliance
  - Largest Contentful Paint (LCP) < 2.5 seconds
  - First Input Delay (FID) < 100 milliseconds
  - Cumulative Layout Shift (CLS) < 0.1
  - Overall PageSpeed score ≥ 90 on both mobile and desktop

- NFR-P3: API Response Handling
  - Spotify API responses cached for minimum 1 hour to minimize API calls
  - Bandsintown API responses cached appropriately for tour date freshness
  - API failures must degrade gracefully with fallback content or error messages
  - Maximum API response wait time of 5 seconds before timeout

- NFR-P4: Build Performance
  - Static site generation build time < 5 minutes for full site rebuild
  - Incremental Static Regeneration (ISR) updates complete within 30 seconds of Sanity CMS content publish

**Security (NFR-S1 to NFR-S4):**

- NFR-S1: Data Transmission
  - All pages must be served over HTTPS/TLS with valid SSL certificate
  - All form submissions (contact, booking) must be transmitted securely over HTTPS

- NFR-S2: API Key Protection
  - All API keys (Spotify, Bandsintown, Shopify, Sanity, YouTube) must be stored as environment variables
  - No API keys, secrets, or credentials exposed in client-side code or browser
  - Content Security Policy (CSP) headers implemented to restrict script sources

- NFR-S3: Form Security
  - Contact and booking forms must include CSRF protection
  - Form inputs must be validated and sanitized server-side
  - Rate limiting on form submissions to prevent abuse (max 5 submissions per IP per hour)

- NFR-S4: Third-Party Integration Security
  - Shopify checkout handles all payment processing (PCI DSS compliance delegated to Shopify)
  - No sensitive payment or user data stored on Breizaas infrastructure
  - Sanity CMS access restricted to authorized artist admin only

**Accessibility (NFR-A1 to NFR-A5):**

- NFR-A1: WCAG 2.1 AA Compliance
  - All pages must meet WCAG 2.1 Level AA standards
  - Automated accessibility testing (axe, Lighthouse) must pass with zero critical violations

- NFR-A2: Perceivable Content
  - All images must have descriptive alt text
  - Color contrast must meet minimum 4.5:1 ratio for normal text and 3:1 for large text
  - Text alternatives provided for all non-text content

- NFR-A3: Operable Interface
  - All interactive elements must be keyboard accessible
  - Focus indicators visible on all focusable elements
  - No keyboard traps - users can navigate in and out of all interactive components
  - Skip to main content link available on all pages

- NFR-A4: Understandable Content
  - Norwegian language specified in HTML lang attribute (nb-NO)
  - Clear, consistent navigation across all pages
  - Form validation errors displayed with clear, actionable error messages
  - Consistent use of navigation patterns and interaction behaviors

- NFR-A5: Screen Reader Compatibility
  - Site must be fully navigable using screen readers (VoiceOver, NVDA, JAWS)
  - Semantic HTML5 elements used throughout
  - ARIA labels applied where needed for dynamic content
  - Logical heading hierarchy (H1 → H2 → H3) maintained

**Integration Reliability (NFR-I1 to NFR-I5):**

- NFR-I1: Spotify Integration
  - Spotify API integration must display artist profile, discography, and listener stats
  - Graceful degradation if Spotify API unavailable (show cached data or fallback message)
  - API rate limits respected to prevent service interruption
  - Error states handled with user-friendly messaging

- NFR-I2: Bandsintown Integration
  - Tour dates must update within 1 hour of changes made in Bandsintown
  - Integration must handle zero upcoming shows gracefully ("No upcoming tour dates")
  - Past tour history accessible even if Bandsintown service temporarily unavailable (cached)

- NFR-I3: Shopify Headless Integration
  - Product catalog must sync with Shopify inventory in real-time or near-real-time
  - Out-of-stock items clearly indicated
  - Checkout process redirects to Shopify hosted checkout seamlessly
  - Shopping cart state maintained during session

- NFR-I4: YouTube Integration
  - Video embeds must lazy load to prevent initial page weight impact
  - Failed video loads handled gracefully without breaking page layout
  - Video player responsive across all device sizes

- NFR-I5: Sanity CMS Integration
  - Content updates published in Sanity must trigger site rebuild within 30 seconds
  - CMS webhook integration must be resilient to temporary network failures (retry mechanism)
  - Preview mode available for content editors to review changes before publishing

**Availability & Reliability (NFR-R1 to NFR-R4):**

- NFR-R1: Uptime
  - Website must maintain 99.9% uptime (< 8.76 hours downtime per year)
  - Planned maintenance windows communicated in advance and scheduled during low-traffic periods

- NFR-R2: Error Handling
  - All error states must display user-friendly error messages in Norwegian
  - 404 errors must provide navigation back to main site sections
  - API failures must not cause complete page failures (graceful degradation)

- NFR-R3: Browser Compatibility
  - Site must function correctly on latest versions of Chrome, Firefox, Safari, and Edge (desktop and mobile)
  - Progressive enhancement ensures core functionality works even if JavaScript fails to load

- NFR-R4: Monitoring & Recovery
  - Production errors logged and monitored (optional Sentry or similar)
  - Performance metrics tracked (Vercel Analytics or similar)
  - Automated alerts for critical failures (site down, build failures)

**Usability (NFR-U1 to NFR-U2):**

- NFR-U1: Mobile Responsiveness
  - All pages must be fully functional and visually correct on viewport widths from 320px to 2560px
  - Touch targets minimum 44x44px for mobile interaction
  - Mobile-first responsive design approach

- NFR-U2: Norwegian Language Quality
  - All user-facing content must be in Norwegian (Bokmål)
  - UI text, labels, error messages, and navigation in Norwegian
  - Proper Norwegian characters (æ, ø, å) displayed correctly across all browsers

### Additional Requirements

**From Architecture Document:**

**Starter Template Requirement:**
- Architecture specifies `create-next-app` starter template with Next.js 15, TypeScript, Tailwind CSS, App Router, and shadcn/ui initialization for Epic 1 Story 1

**Technical Implementation Requirements:**
- Next.js 15 with App Router and Server Components as primary framework
- TypeScript 5+ with strict mode enabled
- Tailwind CSS v4 for styling
- shadcn/ui component library for accessible UI components
- React 19 with Server Components support

**API Integration Architecture:**
- Widget-based integrations for Spotify and YouTube (no API keys required)
- API client implementations for Bandsintown, Shopify Storefront, and Sanity CMS
- Zod for data validation across all API responses and form submissions
- Centralized error handling with ApiError type pattern

**Caching Strategy:**
- Next.js built-in fetch caching with `revalidate` option
- Bandsintown API: 1 hour cache (`revalidate: 3600`)
- Shopify API: 5 minute cache (`revalidate: 300`)
- Sanity CMS: ISR triggered by webhook (on-demand revalidation)

**State Management:**
- React Server Components with minimal client state
- React Hook Form for form handling
- localStorage for Shopify cart persistence
- No global state management library unless complexity grows

**Security Implementation:**
- Vercel Edge Middleware for CSRF protection and rate limiting
- Environment variables following Next.js conventions (`NEXT_PUBLIC_*` for client-safe)
- Content Security Policy (CSP) headers via `next.config.js`

**Deployment & Monitoring:**
- Vercel hosting with auto-deploy on git push
- Vercel Analytics for Core Web Vitals monitoring
- Optional Sentry for error tracking (post-launch consideration)

**Project Structure Requirements:**
- Norwegian URL folder structure (`musikk/`, `konserter/`, `merch/`, `om-oss/`, `kontakt/`, `arrangor/`)
- Component organization: `src/components/ui/` for shadcn/ui, root for feature components
- API clients in `src/lib/` directory
- Shared types in `src/types/` directory
- Centralized Norwegian messages in `src/lib/messages.ts`

**Naming Conventions:**
- PascalCase for React components
- camelCase for functions and variables
- kebab-case for Norwegian route folders
- Norwegian content via constants/props, English code identifiers

**From UX Design Document:**

**DESIGN DIRECTION CHOSEN: V11 Warm Brown + Clean Vintage**

**Color Palette (V11):**
- **Backgrounds**: Warm brown `#2a1f1a` (primary), `#3a2f28` (cards/elevated), `#4a3f35` (lighter contrast)
- **Text**: Warm white `#faf8f5` (primary), warm light gray `#e8e4df` (secondary), warm gray `#b8b0a8` (tertiary)
- **Accents**:
  - Champagne gold `#d4af37` (primary accent, brand signature)
  - Vintage gold `#f4e4c1` (lighter gold highlights)
  - Playful purple `#b589d6` (softer purple, less neon)
  - Purple accent `#8b6fb0` (deeper purple for depth)
  - Amber glow `#ff9f45` (warm orange lighting effects)
  - Spotify green `#1db954` (music-specific actions)

**Typography System:**
- **Tradewind** (brand signature): Champagne gold, 64px desktop / 48px tablet / 36px mobile - "BREIZAAS" only
- **Montserrat Bold/Poppins Bold** (headlines): Warm white or champagne gold, 72px (h1) / 48px (h2) / 32px (h3)
- **Inter/DM Sans** (body/UI): Warm light gray `#e8e4df`, 18px desktop / 17px tablet / 16px mobile
- **Stats/Numbers**: Playful purple `#b589d6`, bold, variable sizes for emphasis (125k stat)
- **CTAs**: Champagne gold (professional), playful purple (energetic), Spotify green (music actions)

**Layout Direction: Direction 1 (Centered Hero + Grid Cards)**
- Centered hero with all content vertically stacked and centered
- Symmetrical composition for balanced, premium feel
- Responsive grid for tour dates (3 columns desktop, 2 tablet, 1 mobile)
- Max-width 1200px containers centered on page
- Min-height 100vh hero for immersive first impression

**Visual Aesthetic:**
- Warm vintage nightclub rather than cold futuristic club
- Golden hour lighting feel - warm sunset/evening glow atmosphere
- Velvet and polished wood material suggestions (not chrome/neon)
- Norwegian cabin warmth meets sophisticated lounge
- Accessible and welcoming while maintaining premium feel

**Interaction Design:**
- Warm amber glow hover effects (not harsh neon flash)
- Smooth scroll animations with fade-in and slide-up effects
- Vintage gold borders on interactive cards
- Playful purple accents on hover states
- Dark modals with warm brown background and gold/amber accents

**Hero Section:**
- Warm brown gradient background (#2a1f1a → #3a2f28)
- Amber overlay radial gradient for golden hour feel
- "BREIZAAS" in Tradewind, champagne gold
- Large warm white headline in Norwegian
- 125k stat in playful purple - prominently displayed
- All content centered with auto margins

**Card Design:**
- Warm brown backgrounds `#3a2f28`
- Warm white text for high contrast
- Vintage gold borders on hover `#d4af37`
- Warm amber glow on hover `rgba(255, 159, 69, 0.3)`
- Champagne gold "Kjøp billetter" CTAs

**Navigation:**
- Dark warm brown background `rgba(42, 31, 26, 0.95)` with backdrop blur
- Champagne gold logo in Tradewind
- Warm white navigation links → champagne gold on hover
- Active page: Champagne gold with 2px bottom border
- Mobile: Full-screen warm brown overlay hamburger menu

**Component Requirements:**
- **TourDateCard**: BandsInTown API integration, calendar download (.ics), warm brown styling
- **Hero**: Centered Direction 1 layout, warm gradient, amber glow overlay
- **SpotifyEmbed**: Iframe wrapper with vintage gold border, Norwegian error messages
- **CalendarButton**: .ics file generation for tour dates
- **APIErrorMessage**: Norwegian error messages with warm brown/amber styling
- **WarmBrownSkeleton**: V11-styled loading placeholders with pulsing animation
- **Navigation**: Sticky warm brown header with champagne gold accents
- **Button**: Primary (champagne gold), Secondary (playful purple), Tertiary (outline)

**Accessibility Requirements (WCAG 2.1 AA):**
- Warm white (#faf8f5) on warm brown (#2a1f1a): 15.8:1 contrast ✅
- Champagne gold (#d4af37) on warm brown: 5.2:1 contrast (large text) ✅
- Playful purple (#b589d6) on warm brown: 4.8:1 contrast (large text) ✅
- All interactive elements keyboard accessible
- Focus indicators: 2px champagne gold outline
- Skip navigation link in Norwegian: "Hopp til hovedinnhold"
- Minimum 44x44px touch targets
- ARIA labels in Norwegian
- Screen reader compatible (VoiceOver, NVDA, JAWS)

**Responsive Breakpoints:**
- **Mobile (320px-767px)**: Single column, hamburger nav, full-width cards
- **Tablet (768px-1023px)**: 2-column grid, possible horizontal nav
- **Desktop (1024px+)**: 3-column grid, full horizontal nav, max-width 1200px
- **Large Desktop (1280px+)**: Maintain 1200px max-width (no further expansion)

**User Journey Flows:**
- **Flow 1 (Tour Discovery)**: Homepage → Scroll to tour grid → BandsInTown API data → Calendar/tickets
- **Flow 2 (Booking)**: Homepage → See 125k stat → Navigate to /arrangor → Download press materials → Booking inquiry
- **Flow 3 (Discovery)**: Social link → Homepage → V11 aesthetic impact → Spotify embed → Follow on Spotify
- **Flow 4 (CMS Management)**: Sanity login → Update bio/videos/press kit → Publish → ISR rebuild < 30s

**BandsInTown API Integration:**
- Tour dates automatically synced from BandsInTown API (not manual CMS entry)
- Loading state: Warm brown skeleton cards (3 placeholders)
- Error handling: Norwegian message "Kunne ikke laste inn konserter" with retry button
- Caching: 1 hour cache, show cached data if API fails
- Real-time: New tour dates appear automatically without manual updates

**Performance Requirements:**
- < 2 second page load on 3G mobile connection
- Smooth animations at 60fps (GPU-accelerated transforms)
- Lazy loading for Spotify/YouTube embeds
- WebP images with JPG fallbacks
- Optimized warm brown skeleton states (no white flashes)

**Emotional Design Goals:**
- Warm, inviting vintage nightclub (not cold futuristic)
- Norwegian cabin warmth meets sophisticated lounge
- "AI meets tradition" visual bridge through warm brown (tradition) + purple (innovation)
- Instant credibility through 125k stat in playful purple
- Professional enough for event organizers, welcoming for fans

### FR Coverage Map

**Epic 1: Foundation & Brand Presence**
- FR16: Visitors can read the artist biography explaining the AI meets bygdemusikk concept
- FR17: Visitors can understand the artist's musical genre (Norwegian bygdemusikk/festmusikk)
- FR18: Visitors can learn about the artist's success metrics and achievements
- FR19: Visitors can see the artist's origin story and creative approach
- FR20: Visitors can access the artist's social media links and external platforms
- FR41: Visitors can navigate to all main pages through consistent site navigation
- FR42: Visitors can access the website from mobile devices, tablets, and desktop computers
- FR43: Visitors can find the website through Norwegian search queries
- FR44: Visitors can share pages on social media with proper preview images and descriptions
- FR45: Visitors can navigate the site using keyboard-only controls
- FR46: Screen reader users can navigate and consume website content effectively
- FR47: Search engines can index all public pages with Norwegian content
- FR48: Search engines can understand the artist's profile through structured data (MusicGroup schema)
- FR49: Search engines can display tour dates as rich snippets (Event schema)
- FR50: Search engines can display merchandise as product rich snippets (Product schema)
- FR51: Visitors can discover the website through organic search for artist name and genre keywords

**Epic 2: Music Discovery & Listening**
- FR1: Visitors can view the artist's complete discography with album artwork and track listings
- FR2: Visitors can play music samples directly through Spotify integration
- FR3: Visitors can see current monthly Spotify listener statistics (125k+ listeners)
- FR4: Visitors can navigate to the artist's Spotify profile for full listening experience
- FR5: Visitors can watch embedded YouTube videos showcasing music and creative process

**Epic 3: Tour Date Discovery & Ticketing**
- FR6: Fans can view upcoming tour dates with venue, location, and date information
- FR7: Fans can access ticket purchase links for upcoming shows through Bandsintown integration
- FR8: Fans can see past tour history and concert information
- FR9: Fans can add tour dates to their personal calendars

**Epic 4: Merchandise Browsing & Purchase**
- FR10: Fans can browse available merchandise with product images, descriptions, and prices
- FR11: Fans can view product variants (sizes, colors) where applicable
- FR12: Fans can add merchandise items to a shopping cart
- FR13: Fans can complete merchandise purchases through Shopify checkout
- FR14: Fans can check merchandise inventory availability
- FR15: Fans can view shipping and return information for merchandise

**Epic 5: Professional Booking & Press Kit**
- FR21: Event organizers can submit booking inquiries through a contact form
- FR22: Event organizers can provide event details (date, venue, budget) in booking requests
- FR23: Event organizers can receive confirmation of inquiry submission
- FR24: General visitors can contact the artist for non-booking inquiries
- FR25: Contact form submissions can be delivered to the artist management
- FR26: Event organizers can access the hidden press kit page at `/arrangor`
- FR27: Event organizers can download high-resolution artist photos for promotional use
- FR28: Event organizers can read detailed artist bio optimized for event promotion
- FR29: Event organizers can access technical rider information for live performances
- FR30: Event organizers can view booking contact information and procedures
- FR31: Event organizers can download press materials in various formats

**Epic 6: Content Management System**
- FR32: Artist can log into Sanity CMS backend to manage website content
- FR33: Artist can update artist bio and description text
- FR34: Artist can update listener statistics and achievement metrics
- FR35: Artist can add or update tour date information
- FR36: Artist can add or update YouTube video embeds
- FR37: Artist can publish news and announcements
- FR38: Artist can update press kit materials and information
- FR39: Artist can see content changes reflected on the live website immediately after publishing
- FR40: Artist can preview content changes before publishing

**Coverage Summary:**
- ✅ Epic 1: 16 FRs (Foundation & Brand Presence)
- ✅ Epic 2: 5 FRs (Music Discovery & Listening)
- ✅ Epic 3: 4 FRs (Tour Date Discovery & Ticketing)
- ✅ Epic 4: 6 FRs (Merchandise Browsing & Purchase)
- ✅ Epic 5: 11 FRs (Professional Booking & Press Kit)
- ✅ Epic 6: 9 FRs (Content Management System)
- **Total: 51 FRs - All requirements covered ✅**

## Epic List

### Epic 1: Foundation & Brand Presence

**User Outcome:** Visitors can discover Breizaas through a premium, accessible, and fast-loading Norwegian artist website with brand identity established.

**FRs Covered:** FR16-FR20, FR41-FR51

**Key Deliverables:**
- Next.js 15 project initialized with TypeScript, Tailwind v4, shadcn/ui
- V11 warm brown + vintage aesthetic implemented (color system, typography)
- Centered hero layout (Direction 1) with "BREIZAAS" brand signature
- 125k listener stat prominently displayed in playful purple
- Norwegian navigation structure (`/`, `/musikk`, `/konserter`, `/merch`, `/om-oss`, `/kontakt`)
- Responsive design (mobile/tablet/desktop breakpoints)
- SEO foundation (Norwegian metadata, structured data for MusicGroup)
- WCAG 2.1 AA accessibility compliance
- < 2 second page load performance

**Why Standalone:** Users can visit the website, learn about Breizaas, navigate pages, and see the brand identity. Enables all future epics by providing the foundation.

### Epic 2: Music Discovery & Listening

**User Outcome:** Visitors can discover Breizaas's music, view discography, see listener stats, play Spotify samples, and navigate to full Spotify experience.

**FRs Covered:** FR1-FR5

**Key Deliverables:**
- Spotify widget integration (no API key required per architecture)
- Discography display with album artwork and track listings
- Embedded Spotify player with dark theme and V11 vintage gold border
- "Lytt på Spotify" CTA linking to artist profile
- YouTube video embeds with lazy loading
- 125k monthly listener stat integrated into hero
- Norwegian content and labels

**Why Standalone:** Visitors can experience the music independently. Builds on Epic 1's foundation (navigation, brand) but doesn't require future epics.

### Epic 3: Tour Date Discovery & Ticketing

**User Outcome:** Fans can find upcoming tour dates, buy tickets, add shows to their calendar, and share events with friends.

**FRs Covered:** FR6-FR9

**Key Deliverables:**
- BandsInTown API integration (1-hour cache per architecture)
- Tour date grid display (3 columns desktop, 2 tablet, 1 mobile)
- TourDateCard component with warm brown styling
- "Kjøp billetter" CTA linking to ticket providers
- Calendar export (.ics file generation)
- Social sharing functionality
- Warm brown skeleton loading states
- Norwegian error handling ("Kunne ikke laste inn konserter")
- Graceful API failure with cached data fallback

**Why Standalone:** Fans can discover and purchase tickets independently. Builds on Epic 1 (navigation, brand) but complete functionality without Epic 4 or 5.

### Epic 4: Merchandise Browsing & Purchase

**User Outcome:** Fans can browse merchandise, view product details, add items to cart, and complete purchases through Shopify checkout.

**FRs Covered:** FR10-FR15

**Key Deliverables:**
- Shopify Storefront API integration (5-minute cache per architecture)
- Product catalog display in responsive grid
- Product variant selection (sizes, colors)
- Shopping cart with localStorage persistence
- Inventory availability display
- Shopify checkout integration (headless commerce)
- Shipping and return information page
- Product card styling with pink hover states (V11)
- Norwegian product descriptions and UI

**Why Standalone:** Fans can browse and buy merch independently. Uses Epic 1 foundation (navigation, components) but complete e-commerce flow.

### Epic 5: Professional Booking & Press Kit

**User Outcome:** Event organizers can evaluate artist credibility, access press materials, download high-res photos, review technical rider, and submit booking inquiries.

**FRs Covered:** FR21-FR31

**Key Deliverables:**
- `/arrangor` hidden press kit page (not in main navigation)
- High-resolution artist photo downloads with metadata
- Detailed artist bio optimized for event promotion
- Technical rider document access
- Booking inquiry form with Norwegian validation (Zod schemas)
- Contact form for general inquiries
- CSRF protection and rate limiting (5 submissions/hour per architecture)
- Form submission confirmation emails
- Champagne gold CTAs for professional actions
- Norwegian form labels and error messages

**Why Standalone:** Event organizers can complete booking evaluation and inquiry independently. Uses Epic 1 (navigation, forms) but provides complete professional workflow.

### Epic 6: Content Management System

**User Outcome:** Artist/management can independently update website content (bio, stats, videos, press materials) without developer involvement, with changes reflected live within 30 seconds.

**FRs Covered:** FR32-FR40

**Key Deliverables:**
- Sanity CMS integration with studio setup
- Content types: Artist Info, Videos, Press Kit, News
- WYSIWYG editor for bio and descriptions
- Image upload and management for press photos
- YouTube video URL management
- Listener statistics update fields
- Preview mode before publishing
- Webhook-triggered ISR (Incremental Static Regeneration)
- < 30 second publish-to-live time
- Norwegian CMS interface labels
- Restricted access (artist admin only per security requirements)

**Why Standalone:** Artist can manage content independently. Uses all previous epics' content but provides complete self-service CMS capability.

---

## Epic 1: Foundation & Brand Presence - Stories

### Story 1.1: Next.js Project Initialization with V11 Design System

As a developer,
I want to initialize a Next.js 15 project with TypeScript, Tailwind v4, and shadcn/ui configured with the V11 warm brown color palette,
So that the foundation is ready for building the Breizaas website with the approved design system.

**Acceptance Criteria:**

**Given** I am starting the Breizaas project
**When** I run `create-next-app` with the specified configuration
**Then** the project is initialized with Next.js 15, TypeScript, Tailwind CSS v4, App Router, and src directory structure
**And** shadcn/ui is installed and configured
**And** Tailwind config includes V11 warm brown color palette:
  - Background colors: `#2a1f1a`, `#3a2f28`, `#4a3f35`
  - Text colors: `#faf8f5`, `#e8e4df`, `#b8b0a8`
  - Accent colors: champagne gold `#d4af37`, playful purple `#b589d6`, amber `#ff9f45`, Spotify green `#1db954`
**And** Typography is configured with Tradewind (brand), Montserrat/Poppins (headlines), Inter/DM Sans (body)
**And** Base layout component uses warm brown background by default
**And** ESLint and TypeScript strict mode are enabled
**And** Project builds successfully without errors
**And** Development server runs on localhost with hot reload

---

### Story 1.2: Centered Hero Component with Brand Identity

As a visitor,
I want to see a centered hero section with the "BREIZAAS" brand signature, headline, and 125k listener stat when I land on the homepage,
So that I immediately understand the artist's identity and credibility.

**Acceptance Criteria:**

**Given** I visit the Breizaas homepage
**When** the page loads
**Then** I see a full-viewport hero section (min-height 100vh) with warm brown gradient background (`#2a1f1a` to `#3a2f28`)
**And** "BREIZAAS" brand name is displayed centered in Tradewind font, champagne gold color, 64px desktop / 48px tablet / 36px mobile
**And** A Norwegian headline "AI Møter Bygdemusikk" is displayed below in Montserrat Bold, warm white, 56px desktop / 40px tablet / 32px mobile
**And** "125 000 månedlige lyttere på Spotify" stat is displayed in playful purple `#b589d6`, bold, prominently centered
**And** All content is centered using auto margins (Direction 1 layout)
**And** An amber radial gradient overlay (`rgba(255, 159, 69, 0.1)`) creates golden hour atmosphere
**And** Hero section is fully responsive across mobile (320px), tablet (768px), and desktop (1024px+) breakpoints
**And** Page loads in < 2 seconds on 3G connection
**And** No white flash appears during load (dark background renders immediately)

---

### Story 1.3: Norwegian Navigation & Routing Structure

As a visitor,
I want to navigate between pages using a sticky Norwegian navigation menu,
So that I can easily explore different sections of the website.

**Acceptance Criteria:**

**Given** I am on any page of the Breizaas website
**When** I look at the top of the page
**Then** I see a sticky navigation bar with warm brown background `rgba(42, 31, 26, 0.95)` and backdrop blur
**And** The navigation contains "BREIZAAS" logo in champagne gold on the left
**And** Navigation links are displayed on the right: "Hjem", "Musikk", "Konserter", "Merch", "Om oss", "Kontakt"
**And** Links are in warm white `#faf8f5`, Inter Medium, 16px
**And** On hover, links change to champagne gold `#d4af37` with smooth underline animation
**And** Active page link is highlighted in champagne gold with 2px bottom border
**And** Navigation remains visible when scrolling (position: sticky)
**And** All routes are functional:
  - `/` → Homepage
  - `/musikk` → Music page
  - `/konserter` → Tour dates page
  - `/merch` → Merchandise page
  - `/om-oss` → About page
  - `/kontakt` → Contact page
**And** Each route has a placeholder page with matching layout
**And** Navigation has accessible focus indicators (2px champagne gold outline) for keyboard users
**And** "Hopp til hovedinnhold" skip link is available and visible on keyboard focus

---

### Story 1.4: Responsive Layout & Mobile Navigation

As a mobile visitor,
I want to access navigation through a hamburger menu optimized for touch,
So that I can easily navigate the website on my phone or tablet.

**Acceptance Criteria:**

**Given** I am viewing the website on a mobile device (< 768px width)
**When** I look at the navigation
**Then** the navigation links are hidden and replaced with a hamburger icon in the top-right
**And** The hamburger icon is 44x44px (minimum touch target), champagne gold color
**And** When I tap the hamburger icon, a full-screen slide-in menu appears from the right
**And** The menu has a warm brown background `#2a1f1a` covering the full viewport
**And** Navigation links are stacked vertically with 24px gap, same styling as desktop
**And** A close icon (X) appears in the top-right, 44x44px touch target
**And** Tapping outside the menu or the close icon dismisses the menu
**And** Pressing Escape key also closes the menu
**And** Tapping a navigation link navigates to the page and closes the menu
**And** Body scroll is prevented when menu is open
**And** Focus is trapped within the menu when open (keyboard navigation cycles through menu items)
**And** Focus returns to hamburger icon when menu is closed
**And** Menu has aria-expanded state and proper ARIA labels in Norwegian
**And** All interactive elements maintain 44x44px minimum touch targets
**And** Layout is fully responsive from 320px (smallest mobile) to 2560px (large desktop)

---

### Story 1.5: About/Bio Page with Artist Information

As a visitor,
I want to read about Breizaas and understand the AI meets bygdemusikk concept,
So that I can learn about the artist's background and musical approach.

**Acceptance Criteria:**

**Given** I navigate to `/om-oss` (About page)
**When** the page loads
**Then** I see a centered hero section with "Om Breizaas" headline
**And** Artist biography is displayed explaining the AI meets bygdemusikk concept (FR16)
**And** Content describes the musical genre: Norwegian bygdemusikk/festmusikk (FR17)
**And** Success metrics and achievements are highlighted: 125k+ Spotify listeners (FR18)
**And** Origin story and creative approach are explained (FR19)
**And** Social media links are provided:
  - Spotify profile link with Spotify green button
  - Instagram, TikTok, Facebook links with appropriate styling
  - All links open in new tabs with proper rel attributes
**And** All text is in Norwegian (Bokmål) with proper æ, ø, å character support
**And** Typography follows V11 system: warm white headlines, warm light gray body text
**And** Content is constrained to 65-75 character line length for readability
**And** Page is fully responsive with mobile (single column), tablet, and desktop layouts
**And** Images (if present) have descriptive Norwegian alt text
**And** Page maintains consistent warm brown aesthetic with V11 color palette
**And** All links have champagne gold hover states
**And** Content is keyboard navigable with visible focus indicators

---

### Story 1.6: SEO Foundation & Structured Data

As a search engine,
I want to crawl and index the Breizaas website with proper Norwegian metadata and structured data,
So that the website appears correctly in Norwegian search results with rich snippets.

**Acceptance Criteria:**

**Given** search engines crawl the Breizaas website
**When** they parse the HTML
**Then** all pages have proper meta tags:
  - `<html lang="nb-NO">` for Norwegian Bokmål
  - Title tags in Norwegian with "Breizaas" branding
  - Meta descriptions in Norwegian (150-160 characters)
  - Open Graph tags for social sharing (og:title, og:description, og:image, og:url)
  - Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
**And** Homepage includes MusicGroup structured data (schema.org) with:
  - name: "Breizaas"
  - genre: "Bygdemusikk, Festmusikk, AI-generert musikk"
  - url: main website URL
  - sameAs: array of social media profile URLs
**And** robots.txt allows indexing of all public pages
**And** sitemap.xml is generated with all public routes (`/`, `/musikk`, `/konserter`, `/merch`, `/om-oss`, `/kontakt`)
**And** `/arrangor` press kit page is included in sitemap but marked with lower priority
**And** Canonical URLs are set correctly for each page
**And** All pages have descriptive, Norwegian-language titles and headings
**And** Images have descriptive alt text in Norwegian
**And** SEO metadata is verified using Google Search Console or similar tools
**And** Page appears correctly when shared on social media (preview image and text)
**And** Lighthouse SEO score is 90+ for all pages

---

### Story 1.7: Accessibility Compliance (WCAG 2.1 AA)

As a visitor using assistive technology,
I want to navigate and consume all content using keyboard-only controls or screen readers,
So that I can fully access the Breizaas website regardless of my abilities.

**Acceptance Criteria:**

**Given** I am using assistive technology to access the website
**When** I navigate through the site
**Then** all color combinations meet WCAG 2.1 AA contrast requirements:
  - Warm white (#faf8f5) on warm brown (#2a1f1a): 15.8:1 ✅
  - Warm light gray (#e8e4df) on warm brown: 11.2:1 ✅
  - Champagne gold (#d4af37) on warm brown: 5.2:1 for large text ✅
  - Playful purple (#b589d6) on warm brown: 4.8:1 for large text ✅
**And** all interactive elements are keyboard accessible via Tab key
**And** tab order follows logical visual flow (top to bottom, left to right)
**And** all interactive elements have visible focus indicators (2px champagne gold outline, 2-4px offset)
**And** skip navigation link "Hopp til hovedinnhold" is present and visible on focus
**And** semantic HTML is used throughout: `<nav>`, `<main>`, `<header>`, `<footer>`, proper heading hierarchy (h1 → h2 → h3)
**And** all images have descriptive Norwegian alt text
**And** ARIA labels are provided for icon-only buttons in Norwegian ("Åpne meny", "Lukk meny")
**And** form inputs have associated labels with htmlFor/id
**And** all interactive elements have minimum 44x44px touch targets
**And** no content relies solely on color to convey information
**And** screen readers (VoiceOver Norwegian, NVDA Norwegian) can navigate and read all content correctly
**And** Lighthouse Accessibility score is 95+ for all pages
**And** axe DevTools reports zero critical accessibility violations
**And** website is testable with keyboard only (no mouse needed for any interaction)

---

### Story 1.8: Performance Optimization & Core Web Vitals

As a visitor on a mobile device with 3G connection,
I want the website to load quickly and feel responsive,
So that I can access content without frustrating delays.

**Acceptance Criteria:**

**Given** I access the Breizaas website on a 3G mobile connection
**When** the page loads
**Then** initial page load completes in < 2 seconds (NFR-P1)
**And** Time to Interactive (TTI) is < 3 seconds (NFR-P1)
**And** Core Web Vitals meet or exceed targets:
  - Largest Contentful Paint (LCP) < 2.5 seconds (NFR-P2)
  - First Input Delay (FID) < 100 milliseconds (NFR-P2)
  - Cumulative Layout Shift (CLS) < 0.1 (NFR-P2)
**And** PageSpeed Insights score is ≥ 90 on both mobile and desktop (NFR-P2)
**And** Images are optimized:
  - WebP format with JPG fallback
  - Responsive images with srcset for 1x, 2x, 3x DPR
  - Lazy loading for below-fold images
  - Proper width/height attributes to prevent layout shift
**And** Fonts are optimized:
  - Google Fonts with font-display: swap
  - Subset to Norwegian characters only (æ, ø, å support)
  - Fallback fonts prevent FOUT (Flash of Unstyled Text)
**And** Critical CSS is inlined for above-fold content
**And** Tailwind CSS purges unused styles
**And** JavaScript bundles are minimized and code-split
**And** Static assets are served from CDN with proper caching headers
**And** No white flash appears during page load (dark background renders immediately)
**And** Client-side page transitions complete in < 500ms (NFR-P1)
**And** All animations run at 60fps using GPU-accelerated transforms
**And** Lighthouse Performance score is ≥ 90 for both mobile and desktop

---

## Epic 2: Music Discovery & Listening - Stories

### Story 2.1: Spotify Widget Integration & Embedded Player

As a visitor,
I want to play Breizaas music samples directly on the website through an embedded Spotify player,
So that I can listen to the music without leaving the site.

**Acceptance Criteria:**

**Given** I am on the `/musikk` page or homepage
**When** I scroll to the music section
**Then** I see an embedded Spotify player (iframe widget) displaying the Breizaas artist profile
**And** the Spotify embed uses dark theme parameter (`?theme=0`) to match V11 aesthetic
**And** the embed is wrapped in a custom container with:
  - Warm brown background `#3a2f28`
  - Vintage gold border `#d4af37` (2px solid)
  - 16px border radius (rounded corners)
  - 16px padding around iframe
  - Max-width 500px, centered on page
**And** I can click play to hear music samples within the iframe
**And** The embed shows current monthly listener count (125k+) from Spotify (FR3)
**And** Embed loads lazily (only when scrolled into view) for performance
**And** If embed fails to load, I see Norwegian error message "Kunne ikke laste Spotify-spiller" with fallback "Lytt på Spotify" button linking to external profile (FR4)
**And** Loading state shows warm brown skeleton placeholder with Spotify logo
**And** Embed is fully responsive on mobile (320px), tablet (768px), and desktop (1024px+)
**And** Embed is keyboard accessible (can Tab to controls inside iframe)
**And** ARIA label "Breizaas Spotify-spiller" is present for screen readers

---

### Story 2.2: Discography Display with Album Information

As a visitor,
I want to view Breizaas's complete discography with album artwork and track listings,
So that I can explore all available music releases.

**Acceptance Criteria:**

**Given** I am on the `/musikk` page
**When** I scroll to the discography section
**Then** I see a section titled "Diskografi" in Montserrat Bold, warm white
**And** albums are displayed in a responsive grid:
  - Desktop (1024px+): 3 columns
  - Tablet (768px): 2 columns
  - Mobile (< 768px): 1 column (full width)
**And** each album card displays:
  - Album artwork image (square, responsive)
  - Album title in warm white
  - Release year in warm light gray
  - Track count (e.g., "12 spor") in warm light gray
**And** album cards have warm brown background `#3a2f28`
**And** on hover (desktop), card displays vintage gold border `#d4af37` with warm amber glow
**And** clicking an album card expands to show full track listing with:
  - Track number
  - Track title in warm white
  - Track duration in warm light gray
**And** each track listing has a "Lytt" (Listen) link in playful purple that opens Spotify
**And** all images have descriptive Norwegian alt text (e.g., "Album cover for [album name]")
**And** album artwork loads progressively (WebP with JPG fallback)
**And** section maintains V11 warm brown aesthetic throughout
**And** all interactive elements have 44x44px minimum touch targets on mobile
**And** discography data is managed via Sanity CMS (prepared for Epic 6 integration)

---

### Story 2.3: YouTube Video Embeds with Lazy Loading

As a visitor,
I want to watch embedded YouTube videos showcasing Breizaas's music and creative process,
So that I can experience the artist's visual content alongside the music.

**Acceptance Criteria:**

**Given** I am on the `/musikk` page or homepage
**When** I scroll to the video section
**Then** I see a section titled "Videoer" in Montserrat Bold, warm white
**And** YouTube videos are displayed as embedded iframes
**And** videos are lazy loaded using Intersection Observer (only load when scrolling into view) for performance (NFR-I4)
**And** before loading, video placeholder shows:
  - YouTube thumbnail image
  - Play icon overlay in champagne gold
  - Warm brown background
**And** each video embed has:
  - Vintage gold border `#d4af37` (2px solid)
  - 16px border radius
  - Responsive aspect ratio (16:9) maintained across all screen sizes
**And** video title is displayed below embed in warm white
**And** videos are responsive:
  - Desktop: 2 columns
  - Tablet: 2 columns
  - Mobile: 1 column (full width)
**And** if video fails to load, Norwegian error message appears: "Kunne ikke laste video"
**And** clicking play button loads and starts video
**And** videos don't auto-play (user must click to play) per accessibility best practices
**And** keyboard users can Tab to video and use Space/Enter to play
**And** video URLs are managed via Sanity CMS (prepared for Epic 6 integration per FR36)
**And** ARIA labels in Norwegian describe each video for screen readers

---

### Story 2.4: Music Page Layout & "Lytt på Spotify" CTA

As a visitor,
I want a well-organized music page with a clear call-to-action to visit Spotify,
So that I can easily navigate to the full Spotify experience for complete listening.

**Acceptance Criteria:**

**Given** I navigate to `/musikk` page
**When** the page loads
**Then** I see a centered hero section with "Musikk" headline in Montserrat Bold, warm white
**And** hero includes the 125k monthly listener stat in playful purple `#b589d6` prominently displayed
**And** page content is organized in clear sections:
  1. Spotify Embed (Story 2.1)
  2. "Lytt på Spotify" CTA
  3. Discography (Story 2.2)
  4. Videos (Story 2.3)
**And** "Lytt på Spotify" CTA is a prominent button with:
  - Spotify green background `#1db954`
  - Warm white text
  - Spotify icon + "Lytt på Spotify" label
  - 48px height (comfortable touch target)
  - Smooth hover effect with glow
  - Opens artist Spotify profile in new tab (FR4)
**And** all sections have generous spacing (96px desktop, 64px mobile) per Direction 1 layout
**And** content is centered with max-width 1200px container
**And** page maintains V11 warm brown aesthetic throughout
**And** page is fully responsive from 320px to 2560px
**And** all Norwegian text displays correctly (æ, ø, å characters)
**And** page has proper SEO metadata:
  - Title: "Musikk - Breizaas"
  - Description in Norwegian
  - Open Graph tags for social sharing
**And** page loads in < 2 seconds
**And** Lighthouse Performance score ≥ 90

---

## Epic 3: Tour Date Discovery & Ticketing - Stories

### Story 3.1: BandsInTown API Integration with Caching & Error Handling

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

### Story 3.2: TourDateCard Component with Grid Layout

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

### Story 3.3: Calendar Export (.ics) & Ticket Purchase Links

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

### Story 3.4: Past Tour History Display

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

### Story 3.5: Tour Page Layout with Social Sharing

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

## Epic 4: Merchandise Browsing & Purchase - Stories

### Story 4.1: Shopify Storefront API Integration & Product Fetching

As a developer,
I want to integrate the Shopify Storefront API to fetch product catalog data with caching and error handling,
So that merchandise is displayed with real-time inventory and pricing information.

**Acceptance Criteria:**

**Given** the Shopify Storefront API is configured
**When** the `/merch` page loads
**Then** the system fetches product catalog from Shopify Storefront API
**And** API responses are cached for 5 minutes (`revalidate: 300`) per architecture requirements (NFR-I3)
**And** API client is implemented in `src/lib/shopify.ts` with TypeScript types
**And** response data is validated using Zod schema including:
  - product ID
  - title
  - description
  - price (formatted in NOK)
  - images (URLs with alt text)
  - variants (sizes, colors, SKU)
  - inventory availability (in stock, low stock, out of stock)
**And** if API request succeeds, products are displayed and cached
**And** if API request fails:
  - Norwegian error message displays: "Kunne ikke laste inn produkter. Prøv igjen senere."
  - Cached products from previous successful request are shown (if available)
  - Retry button in champagne gold appears
  - Error is logged for monitoring
**And** if API returns zero products, Norwegian message displays: "Ingen produkter tilgjengelig for øyeblikket"
**And** while loading, warm brown skeleton cards are displayed (6 placeholder cards in grid)
**And** Shopify Storefront Access Token is stored as environment variable `SHOPIFY_STOREFRONT_TOKEN`
**And** API domain is stored as `SHOPIFY_DOMAIN` environment variable
**And** out-of-stock items are clearly indicated per NFR-I3
**And** inventory sync happens in real-time or near-real-time (5-minute cache)
**And** API errors are handled gracefully without breaking page layout

---

### Story 4.2: Product Catalog Grid with Variant Selection

As a fan,
I want to browse available merchandise with product images, descriptions, and prices,
So that I can find items I want to purchase.

**Acceptance Criteria:**

**Given** I am on the `/merch` page with available products
**When** the products load
**Then** I see products displayed in a responsive grid:
  - Desktop (1024px+): 3 columns
  - Tablet (768px-1023px): 2 columns
  - Mobile (< 768px): 1 column (full width)
**And** each product card displays:
  - Product image (square aspect ratio, optimized WebP with JPG fallback)
  - Product title in warm white `#faf8f5`, 18px semi-bold
  - Price in warm light gray `#e8e4df`, 16px (formatted: "kr 299" Norwegian format)
  - Availability badge if low stock or out of stock
**And** cards have warm brown background `#3a2f28`
**And** cards have 2px transparent border by default
**And** on hover (desktop):
  - Border becomes playful purple `#b589d6` (pink accent per V11 for merch)
  - Warm amber glow appears: `box-shadow: 0 0 30px rgba(181, 137, 214, 0.3)`
  - Card lifts slightly: `translateY(-4px)`
  - Smooth transition: 0.3s ease
**And** clicking a product card opens product detail modal/view with:
  - Larger product image gallery (if multiple images)
  - Full product description in Norwegian
  - Variant selector (if applicable):
    - Size selector (S, M, L, XL, etc.)
    - Color selector with color swatches
    - Each variant shows separate inventory status
  - Quantity selector (1-10)
  - "Legg til i handlekurv" (Add to cart) button in playful purple
  - Current selection displays: "Valgt: [Size] [Color]"
**And** if product is out of stock:
  - Badge "Utsolgt" in playful purple appears
  - "Legg til i handlekurv" button is disabled
  - "Varsle meg" (Notify me) option appears (optional enhancement)
**And** all product images have descriptive Norwegian alt text
**And** product cards maintain 44x44px minimum touch targets for interactive elements
**And** cards are keyboard accessible with champagne gold focus indicators
**And** grid maintains Direction 1 centered layout with max-width 1200px

---

### Story 4.3: Shopping Cart with localStorage Persistence

As a fan,
I want to add merchandise items to a shopping cart that persists across sessions,
So that I can continue shopping and checkout when ready.

**Acceptance Criteria:**

**Given** I am viewing a product
**When** I click "Legg til i handlekurv" (Add to cart)
**Then** the selected product with chosen variant and quantity is added to cart
**And** cart state is stored in browser localStorage for persistence
**And** cart icon in navigation header updates with item count badge:
  - Badge shows total item count
  - Badge has playful purple background `#b589d6`
  - Badge has warm white text
  - Badge is positioned top-right of cart icon
**And** brief success animation appears: "Lagt til i handlekurv!" in champagne gold
**And** when I click the cart icon in navigation:
  - Cart sidebar/modal slides in from right
  - Full-screen overlay appears with warm brown background
  - Cart displays all added items with:
    - Product image thumbnail
    - Product title
    - Variant info (size, color)
    - Quantity with +/- controls
    - Price per item
    - Remove button (trash icon, 44x44px)
  - Cart shows subtotal in Norwegian format: "Delsum: kr 598"
  - "Gå til kassen" (Go to checkout) button in champagne gold at bottom
  - "Fortsett å handle" (Continue shopping) link closes cart
**And** cart data persists when I refresh page or return later (localStorage)
**And** if cart is empty, message displays: "Handlekurven er tom" with link back to `/merch`
**And** updating quantity recalculates subtotal immediately
**And** removing item updates cart count badge
**And** cart sidebar is keyboard accessible and has focus trap when open
**And** pressing Escape key closes cart sidebar
**And** cart maintains V11 warm brown aesthetic with playful purple accents
**And** all interactive elements are 44x44px minimum touch targets

---

### Story 4.4: Shopify Checkout Integration

As a fan,
I want to complete my merchandise purchase through Shopify's secure checkout,
So that I can safely pay for my items and receive them.

**Acceptance Criteria:**

**Given** I have items in my shopping cart
**When** I click "Gå til kassen" (Go to checkout)
**Then** the system creates a Shopify checkout session with current cart items
**And** I am redirected to Shopify's hosted checkout page seamlessly
**And** checkout URL includes:
  - All cart items with variants and quantities
  - Correct pricing in NOK
  - Return URL back to Breizaas website
**And** Shopify checkout handles:
  - Customer email and shipping address collection
  - Payment processing (PCI DSS compliance delegated to Shopify per NFR-S4)
  - Order confirmation
**And** after successful purchase, I am redirected back to Breizaas thank you page at `/merch/takk`
**And** thank you page displays:
  - Success message: "Takk for din bestilling!"
  - Order number (from Shopify)
  - Confirmation that email receipt was sent
  - Link to order tracking (Shopify link)
  - "Fortsett å handle" button back to `/merch`
**And** cart is cleared from localStorage after successful checkout
**And** cart count badge resets to 0
**And** if checkout fails or is cancelled, user returns to cart with items preserved
**And** no sensitive payment or user data is stored on Breizaas infrastructure per NFR-S4
**And** checkout redirect happens smoothly without broken user experience
**And** thank you page maintains V11 warm brown aesthetic
**And** entire checkout flow works on mobile, tablet, and desktop

---

### Story 4.5: Shipping & Return Information Page

As a fan,
I want to view shipping costs, delivery times, and return policy information,
So that I understand the purchase terms before buying merchandise.

**Acceptance Criteria:**

**Given** I am browsing merchandise
**When** I navigate to `/merch/frakt-og-retur` (Shipping & Returns) or click "Frakt og retur info" link on merch page
**Then** I see a page titled "Frakt og Retur" in Montserrat Bold, warm white
**And** page content includes sections:
  1. **Fraktkostnader** (Shipping Costs):
     - Domestic Norway shipping rates
     - International shipping rates (if applicable)
     - Free shipping threshold (if applicable)
     - Estimated delivery times
  2. **Leveringsmetoder** (Delivery Methods):
     - Available carriers (Posten, Bring, etc.)
     - Tracking information availability
  3. **Returpolicy** (Return Policy):
     - Return window (e.g., 14 days)
     - Condition requirements for returns
     - Refund process timeline
     - Return shipping costs responsibility
  4. **Kontakt** (Contact):
     - Email for shipping/return questions
     - Link to contact form
**And** all content is in Norwegian (Bokmål)
**And** typography follows V11 system:
  - Headlines in warm white
  - Body text in warm light gray `#e8e4df`
  - Important info (prices, deadlines) highlighted in playful purple
**And** content is constrained to 65-75 character line length for readability
**And** page is fully responsive (mobile/tablet/desktop)
**And** link to this page appears:
  - In footer navigation
  - On `/merch` page near checkout button
  - In cart sidebar/modal
**And** page maintains V11 warm brown aesthetic
**And** page has proper SEO metadata:
  - Title: "Frakt og Retur - Breizaas Merch"
  - Description in Norwegian
**And** content is managed via Sanity CMS (prepared for Epic 6 integration)

---

## Epic 5: Professional Booking & Press Kit - Stories

### Story 5.1: Press Kit Page (/arrangor) with High-Res Photo Downloads

As an event organizer,
I want to access a professional press kit with high-resolution photos and detailed artist information,
So that I can evaluate and promote Breizaas for my event.

**Acceptance Criteria:**

**Given** I am an event organizer evaluating Breizaas for booking
**When** I navigate to `/arrangor` URL directly
**Then** I see a press kit page titled "Pressekit for Arrangører" in Montserrat Bold, warm white
**And** `/arrangor` page is NOT linked in main navigation (hidden professional resource)
**And** `/arrangor` page IS accessible via footer link "For arrangører" in small text
**And** page includes hero section with:
  - "BREIZAAS" brand name in champagne gold
  - 125k listener stat prominently displayed in playful purple
  - Professional tagline in Norwegian: "AI møter norsk festmusikk"
**And** page content is organized in sections:
  1. **Artistinformasjon** (Artist Information)
  2. **Pressefoto** (Press Photos)
  3. **Teknisk Rider** (Technical Rider - Story 5.4)
  4. **Booking** (Booking Inquiry - Story 5.2)
**And** **Pressefoto section** displays:
  - Grid of high-resolution artist photos (3 columns desktop, 2 tablet, 1 mobile)
  - Each photo card shows:
    - Thumbnail preview with warm brown card background
    - Photo dimensions (e.g., "4000 x 3000 px")
    - File size (e.g., "8.2 MB")
    - File format (JPG, PNG)
    - Download button in champagne gold: "Last ned høyoppløselig"
  - Clicking download button initiates direct download of high-res image file
**And** photo cards have vintage gold border on hover with warm amber glow
**And** **Artistinformasjon section** includes:
  - Detailed artist bio (300-500 words) optimized for event promotion (FR28)
  - Key stats: 125k monthly listeners, number of releases, notable performances
  - Genre description: "Norsk bygdemusikk/festmusikk generert av AI"
  - Target audience info: "Festivaler, konserter, private arrangementer"
  - Booking contact email in champagne gold
**And** all content is in Norwegian (Bokmål) professional language
**And** page maintains V11 warm brown aesthetic throughout
**And** page is fully responsive from mobile to desktop
**And** page has SEO metadata but lower priority in sitemap (professional resource)
**And** all photos have descriptive alt text for accessibility
**And** download buttons are keyboard accessible with focus indicators
**And** press photos are managed via Sanity CMS (prepared for Epic 6 integration per FR38)

---

### Story 5.2: Event Organizer Booking Inquiry Form

As an event organizer,
I want to submit a booking inquiry with event details,
So that I can request Breizaas to perform at my event.

**Acceptance Criteria:**

**Given** I am on the `/arrangor` press kit page
**When** I scroll to the booking section
**Then** I see a booking inquiry form titled "Bookingforespørsel" in Montserrat Bold, warm white
**And** form includes the following fields (all with Norwegian labels):
  - **Kontaktperson** (Contact Person): text input, required
  - **Organisasjon** (Organization): text input, required
  - **E-post** (Email): email input with validation, required
  - **Telefon** (Phone): tel input with Norwegian format validation, optional
  - **Arrangementtype** (Event Type): select dropdown (Festival, Konsert, Privat arrangement, Bedriftsarrangement, Annet), required
  - **Dato** (Date): date picker, required
  - **Sted** (Venue/Location): text input, required
  - **By** (City): text input, required
  - **Budsjett** (Budget): text input, optional
  - **Beskrivelse** (Description): textarea (min 20 characters), required
  - **Ønsker teknisk rider** (Request Technical Rider): checkbox, optional
**And** all input fields have:
  - Warm brown background `#3a2f28`
  - Warm white text `#faf8f5`
  - 2px border `#4a3f35` by default
  - Champagne gold border `#d4af37` with warm amber glow on focus
  - 48px height minimum (comfortable touch targets)
  - 16px font size (prevents iOS zoom)
  - Norwegian placeholder text
**And** form validation using Zod schemas (architecture requirement):
  - Real-time validation on blur
  - Email format validation with Norwegian error: "Vennligst oppgi en gyldig e-postadresse"
  - Required field validation: "Dette feltet er påkrevd"
  - Minimum length validation for description: "Beskrivelsen må være minst 20 tegn"
**And** validation errors display:
  - Amber border `#ff9f45` on error field
  - Norwegian error message below field in warm light gray
  - Error icon appears
**And** submit button:
  - "Send forespørsel" label
  - Champagne gold background with warm brown text
  - Full width on mobile
  - Loading spinner appears during submission with text "Sender..."
  - Disabled state while submitting
**And** on successful submission (Story 5.5 handles backend):
  - Form is replaced with success message: "Takk for din forespørsel! Vi kontakter deg snart."
  - Champagne gold checkmark icon
  - Confirmation email is sent to organizer (FR23)
  - Inquiry data is sent to artist management email (FR25)
**And** form maintains V11 warm brown aesthetic
**And** form is fully accessible with ARIA labels in Norwegian
**And** all interactive elements are keyboard navigable

---

### Story 5.3: General Contact Form

As a visitor,
I want to contact the artist for non-booking inquiries,
So that I can ask questions or provide feedback.

**Acceptance Criteria:**

**Given** I navigate to `/kontakt` (Contact page)
**When** the page loads
**Then** I see a contact page titled "Kontakt" in Montserrat Bold, warm white
**And** page includes a general contact form with fields:
  - **Navn** (Name): text input, required
  - **E-post** (Email): email input with validation, required
  - **Emne** (Subject): select dropdown (Generell henvendelse, Mediaspørsmål, Samarbeid, Teknisk support, Annet), required
  - **Melding** (Message): textarea (min 20 characters), required
**And** form uses same V11 styling as booking form (Story 5.2):
  - Warm brown input backgrounds
  - Champagne gold focus states
  - Norwegian validation messages
  - 48px minimum height inputs
**And** form validation using Zod schemas:
  - Email format validation
  - Required field validation
  - Minimum message length validation
  - Real-time validation on blur
**And** submit button:
  - "Send melding" label
  - Playful purple background `#b589d6` (secondary CTA, not professional gold)
  - Warm white text
  - Loading state during submission
**And** on successful submission:
  - Success message: "Meldingen er sendt! Vi svarer så snart som mulig."
  - Confirmation email sent to visitor (FR24)
  - Message forwarded to artist management (FR25)
**And** page also displays:
  - Artist management email (clickable mailto link in champagne gold)
  - Social media links (Spotify, Instagram, TikTok, Facebook)
  - Link to `/arrangor` for event organizers: "Er du arrangør? Se pressekit →"
**And** form errors display with amber borders and Norwegian messages
**And** page maintains V11 warm brown aesthetic
**And** page is fully responsive (mobile/tablet/desktop)
**And** form is keyboard accessible with proper focus management
**And** page has proper SEO metadata:
  - Title: "Kontakt - Breizaas"
  - Description in Norwegian

---

### Story 5.4: Technical Rider & Event Information

As an event organizer,
I want to access Breizaas's technical rider and performance requirements,
So that I can ensure proper event setup and logistics.

**Acceptance Criteria:**

**Given** I am on the `/arrangor` press kit page
**When** I scroll to the technical rider section
**Then** I see a section titled "Teknisk Rider" in Montserrat Bold, warm white
**And** technical rider content includes:
  - **Tekniske krav** (Technical Requirements):
    - Stage size requirements
    - Sound system specifications
    - Lighting requirements
    - Power requirements
  - **Personaletilbud** (Hospitality):
    - Green room requirements
    - Catering preferences
    - Dressing room needs
  - **Tidsplan** (Schedule):
    - Soundcheck duration needed
    - Performance duration (typical set length)
    - Load-in/load-out time requirements
  - **Kontaktinformasjon** (Contact Information):
    - Technical contact person
    - Day-of-show contact number
**And** technical rider is available as downloadable PDF:
  - Download button in champagne gold: "Last ned teknisk rider (PDF)"
  - PDF filename: `breizaas-teknisk-rider.pdf`
  - PDF opens in new tab
  - PDF maintains professional formatting
**And** all text content is in Norwegian professional language
**And** content is organized in clear sections with warm white headings
**And** body text uses warm light gray `#e8e4df` for readability
**And** important requirements are highlighted in playful purple or champagne gold
**And** section maintains V11 warm brown aesthetic
**And** content is fully responsive (displays well on mobile for quick reference)
**And** PDF download is tracked for analytics (optional)
**And** technical rider content is managed via Sanity CMS (prepared for Epic 6 integration)
**And** if technical rider PDF is unavailable, text content is still readable on page
**And** download button is keyboard accessible with focus indicator

---

### Story 5.5: Form Security (CSRF Protection & Rate Limiting)

As a developer,
I want to implement CSRF protection and rate limiting on forms,
So that the website is protected from spam, abuse, and security vulnerabilities.

**Acceptance Criteria:**

**Given** forms are accessible on the website
**When** users submit booking or contact forms
**Then** all form submissions include CSRF token validation:
  - CSRF token generated on page load
  - Token included in hidden form field
  - Token validated on server before processing submission
  - Invalid token returns 403 Forbidden with Norwegian error: "Sikkerhetsfeil. Vennligst last inn siden på nytt."
**And** rate limiting is enforced per architecture requirement (NFR-S3):
  - Maximum 5 form submissions per IP address per hour
  - Rate limit applies to both booking and contact forms combined
  - Rate limit tracked using in-memory cache or database
  - Exceeding limit returns 429 Too Many Requests with Norwegian error: "For mange forsøk. Vennligst prøv igjen om en time."
  - Rate limit counter resets after 1 hour
**And** CSRF protection is implemented using Vercel Edge Middleware per architecture
**And** form inputs are validated and sanitized server-side:
  - All text inputs sanitized to prevent XSS
  - Email validation using standard regex
  - Phone number validation (Norwegian format)
  - HTML tags stripped from textarea inputs
  - SQL injection prevention through parameterized queries
**And** environment variables are properly secured:
  - Email service credentials stored as env variables
  - API keys never exposed in client-side code
  - Sensitive config excluded from version control
**And** form submission errors are logged for monitoring:
  - CSRF failures logged with IP and timestamp
  - Rate limit violations logged
  - Validation errors logged (without sensitive data)
**And** successful form submissions trigger:
  - Email notification to artist management (FR25)
  - Confirmation email to submitter (FR23 for booking, FR24 for contact)
  - Data stored securely (database or email only, not localStorage)
**And** email delivery uses transactional email service:
  - SendGrid, Resend, or similar service configured
  - Email templates in Norwegian
  - Proper from/reply-to addresses
  - Error handling if email fails to send
**And** security headers are set:
  - Content-Security-Policy (CSP) headers per architecture (NFR-S2)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
**And** all security measures work on both development and production environments
**And** rate limiting and CSRF are tested with automated security tests

---

## Epic 6: Content Management System - Stories

### Story 6.1: Sanity CMS Setup & Schema Definition

As a developer,
I want to set up Sanity CMS with proper schema definitions for all content types,
So that the artist can manage website content independently through a user-friendly interface.

**Acceptance Criteria:**

**Given** I am setting up the CMS infrastructure
**When** I initialize Sanity CMS
**Then** Sanity Studio is installed and configured in the project:
  - `@sanity/client` package installed
  - `sanity.config.ts` configured with project ID and dataset
  - Sanity Studio accessible at `/studio` route
  - Studio uses V11 warm brown color scheme in configuration
**And** Sanity project is created with:
  - Project name: "Breizaas Website"
  - Dataset: "production"
  - API version: latest stable
**And** authentication is configured:
  - Artist admin user created
  - Access restricted to authorized users only (NFR-S4)
  - Google OAuth login enabled for artist
  - No public access to studio
**And** schema definitions are created for content types:
  - `artistInfo` (Story 6.2)
  - `pressKit` (Story 6.3)
  - `video` (Story 6.4)
  - `newsPost` (Story 6.5)
**And** Sanity client is configured in `src/lib/sanity.ts`:
  - Read/write client for server-side operations
  - GROQ query utilities
  - TypeScript types generated from schemas
  - Environment variables for project ID and token: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`
**And** Norwegian language labels configured in Sanity Studio:
  - All field labels in Norwegian
  - Help text in Norwegian
  - Validation messages in Norwegian
**And** Sanity Studio is deployed and accessible via subdomain or `/studio` route
**And** Studio has custom logo (Breizaas brand) in warm brown theme
**And** All schemas follow Sanity best practices with proper validation

---

### Story 6.2: Artist Info & Statistics Content Type

As an artist/manager,
I want to update artist biography, statistics, and achievement metrics through the CMS,
So that the website displays current and accurate information.

**Acceptance Criteria:**

**Given** I am logged into Sanity Studio
**When** I navigate to the Artist Info section
**Then** I see a singleton document type "Artist Info" with fields:
  - **Artist Name**: text (pre-filled: "Breizaas"), read-only
  - **Tagline**: text (e.g., "AI møter norsk festmusikk"), required
  - **Biography** (Biografi): rich text editor (WYSIWYG) with:
    - Bold, italic, underline formatting
    - Headings (H2, H3)
    - Links with Norwegian labels
    - Bullet and numbered lists
    - Character count displayed
    - Preview pane
  - **Short Bio** (Kort biografi): textarea (150-200 characters for SEO descriptions), required
  - **Monthly Listeners** (Månedlige lyttere): number input, required
  - **Total Streams** (Totale avspillinger): number input, optional
  - **Number of Releases** (Antall utgivelser): number input, optional
  - **Notable Achievements** (Prestasjoner): array of text items
  - **Genre Tags** (Sjanger): tags (pre-filled: "Bygdemusikk", "Festmusikk", "AI-generert"), required
  - **Social Media Links** (Sosiale medier): object with:
    - Spotify URL
    - Instagram URL
    - TikTok URL
    - Facebook URL
    - YouTube URL
**And** all field labels and help text are in Norwegian
**And** validation rules enforce:
  - Monthly listeners must be positive number
  - URLs must be valid format
  - Biography required (min 100 characters)
**And** I can preview changes before publishing
**And** clicking "Publish" (Publiser) saves changes and triggers webhook (Story 6.6)
**And** updated content appears on `/om-oss` page within 30 seconds (FR39, Story 6.6)
**And** monthly listener stat updates on homepage hero within 30 seconds
**And** biography updates on `/om-oss` page and `/arrangor` press kit page
**And** social media links update in footer and contact page
**And** I can revert to previous versions using Sanity's built-in revision history
**And** Only one "Artist Info" document exists (singleton pattern)

---

### Story 6.3: Press Kit & Media Management

As an artist/manager,
I want to upload and manage press photos and press kit materials through the CMS,
So that event organizers always have access to current promotional assets.

**Acceptance Criteria:**

**Given** I am logged into Sanity Studio
**When** I navigate to the Press Kit section
**Then** I see a singleton document type "Press Kit" with fields:
  - **Event Organizer Bio** (Bio for arrangører): rich text editor, required (300-500 words optimized for event promotion)
  - **Press Photos** (Pressefoto): array of image objects, each containing:
    - Image upload (drag-and-drop or file select)
    - Alt text in Norwegian, required
    - Caption/description, optional
    - Image automatically optimized by Sanity
    - Display order (sortable via drag-and-drop)
  - **Technical Rider PDF**: file upload (.pdf only), optional
  - **Stage Plot PDF**: file upload (.pdf only), optional
  - **Booking Contact Email**: email input with validation, required
  - **Booking Contact Phone**: text input, optional
  - **Performance Duration** (Varighet): text (e.g., "60-90 minutter"), optional
  - **Target Venues** (Målgruppe): textarea describing ideal event types
**And** image upload supports:
  - JPG, PNG, WebP formats
  - Maximum 10MB file size
  - Automatic image optimization and CDN delivery by Sanity
  - Multiple images can be uploaded at once
  - Images can be reordered via drag-and-drop
**And** PDF uploads support:
  - Maximum 5MB file size
  - PDF preview in studio
  - Download URL generated automatically
**And** all field labels and help text are in Norwegian
**And** validation rules enforce:
  - At least 3 press photos required
  - Alt text required for all images (accessibility)
  - Email format validation for booking contact
**And** I can preview changes before publishing
**And** clicking "Publish" saves changes and triggers webhook
**And** updated press photos appear on `/arrangor` page within 30 seconds (FR39)
**And** high-resolution download links update automatically
**And** technical rider PDF updates on `/arrangor` page if uploaded
**And** booking contact info updates on `/arrangor` and `/kontakt` pages
**And** I can delete old photos and upload new ones easily
**And** Sanity's image CDN provides automatic responsive image URLs

---

### Story 6.4: YouTube Video Management

As an artist/manager,
I want to add, update, and remove YouTube video embeds through the CMS,
So that the website showcases current video content without developer involvement.

**Acceptance Criteria:**

**Given** I am logged into Sanity Studio
**When** I navigate to the Videos section
**Then** I see a document type "Video" that can have multiple instances (not singleton)
**And** each video document has fields:
  - **Title** (Tittel): text, required
  - **YouTube URL**: URL input with validation, required
  - **Description** (Beskrivelse): textarea (optional, 100-300 characters)
  - **Thumbnail Override** (Egendefinert miniatyrbilde): image upload (optional, uses YouTube thumbnail by default)
  - **Published Date** (Publiseringsdato): date picker, required
  - **Featured** (Fremhevet): checkbox (marks video for homepage display), optional
  - **Display Order** (Visningsrekkefølge): number (for manual sorting), optional
**And** YouTube URL validation ensures:
  - Valid YouTube URL format (youtube.com/watch?v= or youtu.be/)
  - Extracts video ID automatically
  - Shows preview of YouTube video in studio
  - Invalid URL shows Norwegian error: "Ugyldig YouTube-lenke"
**And** I can create multiple video entries
**And** I can reorder videos by changing Display Order number or drag-and-drop in list view
**And** I can mark videos as "Featured" to display on homepage
**And** I can unpublish videos (draft state) without deleting them
**And** all field labels and help text are in Norwegian
**And** clicking "Publish" on a video saves changes and triggers webhook
**And** new videos appear on `/musikk` page within 30 seconds (FR39)
**And** featured videos appear on homepage within 30 seconds
**And** videos are lazy-loaded on frontend (technical implementation from Epic 2)
**And** deleting or unpublishing a video removes it from website within 30 seconds
**And** I can see list of all videos with thumbnail previews in studio
**And** Videos are sorted by Published Date (newest first) or Display Order

---

### Story 6.5: News & Announcements Content Type

As an artist/manager,
I want to publish news and announcements through the CMS,
So that fans can stay updated with latest information about releases, tours, and events.

**Acceptance Criteria:**

**Given** I am logged into Sanity Studio
**When** I navigate to the News section
**Then** I see a document type "News Post" that can have multiple instances
**And** each news post has fields:
  - **Title** (Tittel): text, required
  - **Slug**: auto-generated from title (e.g., "ny-singel-ute-naa" for URL `/nyheter/ny-singel-ute-naa`), editable
  - **Published Date** (Publiseringsdato): date-time picker, required
  - **Featured Image** (Hovedbilde): image upload with alt text, required
  - **Excerpt** (Sammendrag): textarea (150-200 characters for preview), required
  - **Content** (Innhold): rich text editor (WYSIWYG) with:
    - Text formatting (bold, italic, underline)
    - Headings (H2, H3, H4)
    - Links (internal and external)
    - Images inline
    - Bullet and numbered lists
    - Blockquotes
  - **Category** (Kategori): select (Nytt album, Singel, Konsert, Samarbeid, Annet), required
  - **Related Links** (Relaterte lenker): array of link objects (optional):
    - Link text
    - URL
  - **Pin to Homepage** (Fest til forsiden): checkbox (shows in homepage news section), optional
**And** slug auto-generates but is editable for custom URLs
**And** slug validation ensures:
  - Only lowercase letters, numbers, and hyphens
  - No spaces or special characters
  - Unique across all news posts
**And** I can create, edit, and delete news posts
**And** I can save as draft without publishing
**And** I can schedule future publish date (post goes live automatically at scheduled time)
**And** all field labels and help text are in Norwegian
**And** clicking "Publish" saves changes and triggers webhook
**And** new news posts appear on `/nyheter` page (if implemented) within 30 seconds (FR39)
**And** pinned news posts appear on homepage within 30 seconds
**And** news posts are sorted by Published Date (newest first)
**And** I can preview individual news post before publishing
**And** Featured image is optimized automatically by Sanity CDN
**And** News posts have SEO metadata auto-generated from title and excerpt

---

### Story 6.6: Webhook Integration & ISR (Incremental Static Regeneration)

As a developer,
I want to configure Sanity webhooks to trigger Next.js ISR on content changes,
So that published content appears on the live website within 30 seconds without full rebuilds.

**Acceptance Criteria:**

**Given** Sanity CMS is configured with content
**When** content editor clicks "Publish" in Sanity Studio
**Then** Sanity webhook fires HTTP POST request to Next.js revalidation API endpoint
**And** webhook payload includes:
  - Document type (artistInfo, video, newsPost, pressKit)
  - Document ID
  - Action (create, update, delete)
  - Timestamp
**And** Next.js API route `/api/revalidate` receives webhook:
  - Validates webhook signature for security
  - Extracts document type from payload
  - Determines affected pages based on document type
  - Calls `revalidate()` for affected paths
**And** revalidation mapping:
  - `artistInfo` changes → revalidate `/`, `/om-oss`, `/arrangor`
  - `video` changes → revalidate `/`, `/musikk`
  - `pressKit` changes → revalidate `/arrangor`
  - `newsPost` changes → revalidate `/`, `/nyheter`, `/nyheter/[slug]`
**And** ISR revalidation completes in < 30 seconds (NFR-P4)
**And** webhook secret is stored as environment variable `SANITY_WEBHOOK_SECRET`
**And** webhook signature validation prevents unauthorized revalidation requests
**And** if revalidation fails:
  - Error is logged with details
  - Retry mechanism attempts revalidation up to 3 times
  - Alert sent to developer (optional monitoring integration)
**And** successful revalidation returns 200 OK to Sanity
**And** content changes are visible on live website within 30 seconds of publishing (FR39)
**And** full site rebuild is NOT required for content updates
**And** webhook works in both production and staging environments
**And** webhook configuration documented in project README
**And** Sanity dashboard shows webhook delivery success/failure logs

---

### Story 6.7: Preview Mode & Publishing Workflow

As an artist/manager,
I want to preview content changes before publishing them live,
So that I can verify everything looks correct before making it public.

**Acceptance Criteria:**

**Given** I am editing content in Sanity Studio
**When** I want to preview changes before publishing
**Then** I see a "Preview" (Forhåndsvisning) button in Sanity Studio toolbar
**And** clicking "Preview" opens website in preview mode:
  - Opens in new browser tab
  - URL includes preview token: `?preview=true&token=[secret]`
  - Displays draft content (unpublished changes)
  - Shows preview banner at top: "Forhåndsvisningsmodus - Dette er ikke publisert innhold"
  - Banner has champagne gold background with "Exit Preview" (Avslutt forhåndsvisning) button
**And** preview mode shows:
  - All draft changes for current document
  - Published content for other documents
  - Live website layout and styling (V11 aesthetic)
  - Actual responsive behavior across devices
**And** preview mode is secured:
  - Requires valid preview token
  - Token validated server-side
  - Unauthorized preview attempts return 403 Forbidden
  - Token stored as environment variable `SANITY_PREVIEW_SECRET`
**And** clicking "Exit Preview" button:
  - Clears preview mode
  - Redirects to published version of page
  - Removes preview token from URL
**And** publishing workflow:
  1. Edit content in Sanity Studio
  2. Click "Preview" to verify changes
  3. Return to Studio
  4. Click "Publish" to make changes live
  5. Content appears on live site within 30 seconds (Story 6.6)
**And** I can see document status in Studio:
  - "Published" (Publisert) - green indicator
  - "Draft" (Utkast) - yellow indicator
  - "Modified" (Endret) - orange indicator (published but has unpublished changes)
**And** I can discard draft changes without affecting published version
**And** I can view revision history and restore previous versions
**And** all Norwegian labels in Studio workflow: "Publiser", "Forhåndsvisning", "Utkast", "Lagre"
**And** preview mode works on mobile, tablet, and desktop
