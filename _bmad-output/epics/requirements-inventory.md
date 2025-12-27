# Requirements Inventory

## Functional Requirements

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

## NonFunctional Requirements

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

## Additional Requirements

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

## FR Coverage Map

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
