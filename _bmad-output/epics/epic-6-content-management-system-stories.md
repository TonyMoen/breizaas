# Epic 6: Content Management System - Stories

## Story 6.1: Sanity CMS Setup & Schema Definition

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

## Story 6.2: Artist Info & Statistics Content Type

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

## Story 6.3: Press Kit & Media Management

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

## Story 6.4: YouTube Video Management

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

## Story 6.5: News & Announcements Content Type

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

## Story 6.6: Webhook Integration & ISR (Incremental Static Regeneration)

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

## Story 6.7: Preview Mode & Publishing Workflow

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
