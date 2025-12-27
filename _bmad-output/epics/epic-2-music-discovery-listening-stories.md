# Epic 2: Music Discovery & Listening - Stories

## Story 2.1: Spotify Widget Integration & Embedded Player

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

## Story 2.2: Discography Display with Album Information

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

## Story 2.3: YouTube Video Embeds with Lazy Loading

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

## Story 2.4: Music Page Layout & "Lytt på Spotify" CTA

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
