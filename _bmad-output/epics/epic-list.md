# Epic List

## Epic 1: Foundation & Brand Presence

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

## Epic 2: Music Discovery & Listening

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

## Epic 3: Tour Date Discovery & Ticketing

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

## Epic 4: Merchandise Browsing & Purchase

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

## Epic 5: Professional Booking & Press Kit

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

## Epic 6: Content Management System

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
