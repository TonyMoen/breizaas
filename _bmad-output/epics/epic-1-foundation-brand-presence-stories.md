# Epic 1: Foundation & Brand Presence - Stories

## Story 1.1: Next.js Project Initialization with V11 Design System

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

## Story 1.2: Centered Hero Component with Brand Identity

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

## Story 1.3: Norwegian Navigation & Routing Structure

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

## Story 1.4: Responsive Layout & Mobile Navigation

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

## Story 1.5: About/Bio Page with Artist Information

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

## Story 1.6: SEO Foundation & Structured Data

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

## Story 1.7: Accessibility Compliance (WCAG 2.1 AA)

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

## Story 1.8: Performance Optimization & Core Web Vitals

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
