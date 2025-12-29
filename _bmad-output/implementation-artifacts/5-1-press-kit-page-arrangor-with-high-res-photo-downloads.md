# Story 5.1: Press Kit Page (/arrangor) with High-Res Photo Downloads

Status: review

## Story

As an event organizer,
I want to access a professional press kit with high-resolution photos, technical rider, and detailed artist information,
So that I can evaluate and promote Breizaas for my event.

## Reference Design

**Based on**: Våagal band's `/arrangor` page structure
**Screenshots**: `breizaas-website/docs/Screenshot 2025-12-29 113319.png` through `113351.png`

## Acceptance Criteria

### Scenario 1: Hero Section with Background Image

```gherkin
Given I am an event organizer
When I navigate to /arrangor
Then I see a full-width hero section with:
  - Background image showing Breizaas performance/atmosphere
  - "FOR ARRANGØRER" headline in white, bold, uppercase
  - "Pressepakke og rider informasjon" subtitle in lighter text
  - Dark overlay for text readability
And hero section is min-height 400px (desktop) / 300px (mobile)
And background image is responsive and optimized
```

### Scenario 2: Technical Rider Section with PDF Download

```gherkin
Given I am viewing the /arrangor page
When I scroll to the Technical Rider section
Then I see "TEKNISK RIDER" heading in white, bold, uppercase
And descriptive text: "Komplett teknisk rider med stageplot, inputliste, lyd- og lyskrav."
And orange "Last ned teknisk rider (PDF)" download button
And clicking the button downloads the technical rider PDF file
And button has champagne gold background (V11 adaptation of orange)
And button has download icon
```

### Scenario 3: Hospitality Rider Section

```gherkin
Given I am viewing the /arrangor page
When I scroll to Hospitality Rider section
Then I see "HOSPITALITY RIDER" heading in white, bold, uppercase
And subsections with detailed requirements:
  - "Ankomst" (Arrival) with catering requirements
  - "Bevertning etter lydsjekk" (Post-soundcheck catering)
  - "Backstage" requirements
  - "Av drikke ønskes" (Drink preferences)
  - "Spørsmål?" contact info
And all content is formatted with bullet points
And text is in warm light gray for readability
```

### Scenario 4: Press Kit Download Section

```gherkin
Given I am viewing the /arrangor page
When I scroll to the Press Kit section
Then I see "PRESSEPAKKE" heading in white, bold, uppercase
And a champagne gold bordered box containing:
  - Description: "Last ned komplett pressepakke med bilder, logoer og mer fra Google Drive:"
  - Large champagne gold button "Åpne pressepakke i Google Drive"
  - External link icon on button
And clicking button opens Google Drive folder in new tab
And button has rel="noopener noreferrer"
```

### Scenario 5: Artist Bio Section (Short & Full)

```gherkin
Given I am viewing the /arrangor page
When I scroll to the "Om Breizaas" section
Then I see "Om Breizaas" heading in white
And "KORT BIO" subheading with 2-3 sentence artist summary
And "FULL BIO" subheading with comprehensive 300-500 word biography including:
  - Artist origin story
  - Musical style description
  - Notable achievements and stats
  - Target audience and event types
  - Band members (if applicable)
And bio text is in warm light gray, readable paragraph format
```

### Scenario 6: Practical Info Section with Icons

```gherkin
Given I am viewing the /arrangor page
When I scroll to Practical Info section
Then I see "PRAKTISK INFO" heading in white, bold, uppercase
And icon-based information display:
  - 📍 Sted: [sted] (Location - CMS editable)
  - 🕐 Dørene åpner: [tid] (Doors open time - CMS editable)
  - 🎵 Konsertstart: [tid] (Concert start time - CMS editable)
  - 🔒 Aldersgrense: [aldersgrense] (Age limit - CMS editable)
  - 🎟️ Billetter: [lenke] (Ticket info - CMS editable)
And Spotify link: "Vors med Breizaas? Sjekk ut spillelista her:"
And all fields are manageable through Sanity CMS
```

### Scenario 7: Press Photos Section with Download

```gherkin
Given I am viewing the /arrangor page
When I scroll to Press Photos section
Then I see "Pressebilder" heading in white
And description: "Høyoppløselige bilder for presse og markedsføring. Klikk for å laste ned."
And grid of press photos (2-3 columns desktop, 1-2 tablet, 1 mobile)
And each photo displays:
  - High-quality thumbnail image
  - Champagne gold download button on hover/tap (bottom-right corner)
  - Download icon
And clicking download button downloads high-res image file
And images are lazy loaded for performance
And each image has descriptive alt text
```

### Scenario 8: Logo Files Section

```gherkin
Given I am viewing the /arrangor page
When I scroll to Logo Files section
Then I see "Logofiler" heading in white
And description: "Bandlogo i ulike formater for bruk i trykk og digital markedsføring."
And download buttons for logo files:
  - "Logo 1" button (e.g., horizontal version)
  - "Logo 2" button (e.g., stacked version)
And buttons have champagne gold background
And clicking downloads logo file (PNG, SVG, or AI format)
```

### Scenario 9: Booking Contact Section

```gherkin
Given I am viewing the /arrangor page
When I scroll to Booking Contact section
Then I see "KONTAKT FOR BOOKING" heading in white, bold, uppercase
And prominent contact information:
  - Email button with champagne gold background and email address
  - Phone button with dark background and phone number
  - Both buttons have icons (email/phone)
And clicking email button opens mailto: link
And clicking phone button initiates phone call (on mobile)
And contact info is manageable through Sanity CMS
```

### Scenario 10: Mobile Responsiveness

```gherkin
Given I am viewing /arrangor on mobile device
When the page loads
Then all sections are single column
And hero image is optimized for mobile viewport
And download buttons are full-width on mobile
And touch targets are minimum 44x44px
And text is readable at 16px minimum
And images load efficiently with lazy loading
```

### Scenario 11: SEO & Accessibility

```gherkin
Given search engines crawl /arrangor page
When they parse the HTML
Then page has proper metadata:
  - Title: "For Arrangører - Breizaas Pressepakke"
  - Description in Norwegian
  - Lower priority in sitemap (professional resource)
  - noindex meta tag (optional - keep press kit semi-private)
And all images have Norwegian alt text
And headings follow logical hierarchy (H1 → H2 → H3)
And keyboard navigation works throughout
And WCAG 2.1 AA contrast requirements met
```

### Scenario 12: All Content Sanity-Manageable

```gherkin
Given I am the artist/manager logged into Sanity CMS
When I navigate to "Press Kit" content type
Then I can edit ALL content on /arrangor page:
  - Hero background image
  - Hero headline and subtitle
  - Technical rider PDF file
  - Hospitality rider text (rich text editor)
  - Press kit Google Drive URL
  - Short bio and full bio
  - Practical info fields (location, times, age limit, ticket link)
  - Spotify playlist URL
  - Press photos (upload/remove/reorder)
  - Logo files (upload/replace)
  - Booking contact email and phone
And changes publish to live site within 30 seconds (ISR)
```

## Tasks / Subtasks

- [x] **Task 1: Create /arrangor Page Structure** (AC: #1, #11)
  - [x] Subtask 1.1: Create `src/app/arrangor/page.tsx` route
  - [x] Subtask 1.2: Implement hero section with background image
  - [x] Subtask 1.3: Add dark overlay for text readability
  - [x] Subtask 1.4: Configure SEO metadata (title, description, robots)
  - [x] Subtask 1.5: Set up responsive layout with max-width containers

- [x] **Task 2: Technical & Hospitality Rider Sections** (AC: #2, #3)
  - [x] Subtask 2.1: Create TechnicalRider component
  - [x] Subtask 2.2: Implement PDF download button with champagne gold styling
  - [x] Subtask 2.3: Create HospitalityRider component with rich text support
  - [x] Subtask 2.4: Add section headings with V11 typography
  - [x] Subtask 2.5: Format bullet lists and subsections

- [x] **Task 3: Press Kit Download Section** (AC: #4)
  - [x] Subtask 3.1: Create PressKitDownload component
  - [x] Subtask 3.2: Implement champagne gold bordered box
  - [x] Subtask 3.3: Add Google Drive link button with external icon
  - [x] Subtask 3.4: Configure rel="noopener noreferrer" security

- [x] **Task 4: Artist Bio Section** (AC: #5)
  - [x] Subtask 4.1: Create ArtistBio component
  - [x] Subtask 4.2: Implement short bio (KORT BIO) display
  - [x] Subtask 4.3: Implement full bio (FULL BIO) display
  - [x] Subtask 4.4: Add rich text rendering for bio content
  - [x] Subtask 4.5: Style with V11 typography (warm light gray)

- [x] **Task 5: Practical Info Section with Icons** (AC: #6)
  - [x] Subtask 5.1: Create PracticalInfo component
  - [x] Subtask 5.2: Add icon library (lucide-react or similar)
  - [x] Subtask 5.3: Implement icon-text pairs for each info field
  - [x] Subtask 5.4: Add Spotify playlist link
  - [x] Subtask 5.5: Make all fields dynamic from Sanity

- [x] **Task 6: Press Photos Grid with Download** (AC: #7)
  - [x] Subtask 6.1: Create PressPhoto component
  - [x] Subtask 6.2: Implement responsive grid (2-3 columns desktop, 1 mobile)
  - [x] Subtask 6.3: Add hover state with champagne gold download button
  - [x] Subtask 6.4: Implement download functionality (direct image download)
  - [x] Subtask 6.5: Add lazy loading for images
  - [x] Subtask 6.6: Configure Sanity image CDN for optimization

- [x] **Task 7: Logo Files Section** (AC: #8)
  - [x] Subtask 7.1: Create LogoFiles component
  - [x] Subtask 7.2: Implement download buttons for multiple logo formats
  - [x] Subtask 7.3: Add champagne gold button styling
  - [x] Subtask 7.4: Handle file downloads from Sanity assets

- [x] **Task 8: Booking Contact Section** (AC: #9)
  - [x] Subtask 8.1: Create BookingContact component
  - [x] Subtask 8.2: Implement email button with mailto: link
  - [x] Subtask 8.3: Implement phone button with tel: link
  - [x] Subtask 8.4: Add email and phone icons
  - [x] Subtask 8.5: Style with champagne gold (email) and dark (phone)

- [x] **Task 9: Sanity CMS Schema Definition** (AC: #12)
  - [x] Subtask 9.1: Create `pressKit` schema in Sanity
  - [x] Subtask 9.2: Define all content fields as Sanity document type
  - [x] Subtask 9.3: Add image upload fields for hero, press photos, logos
  - [x] Subtask 9.4: Add file upload field for technical rider PDF
  - [x] Subtask 9.5: Add rich text fields for bios and hospitality rider
  - [x] Subtask 9.6: Configure Norwegian field labels
  - [x] Subtask 9.7: Set up validation rules

- [x] **Task 10: Sanity Data Fetching** (AC: #12)
  - [x] Subtask 10.1: Create `src/lib/sanity-press-kit.ts` data fetcher
  - [x] Subtask 10.2: Write GROQ query to fetch press kit data
  - [x] Subtask 10.3: Add TypeScript types for press kit data
  - [x] Subtask 10.4: Implement 5-minute cache (`revalidate: 300`)
  - [x] Subtask 10.5: Add error handling with Norwegian messages

- [x] **Task 11: Norwegian Messages** (AC: All)
  - [x] Subtask 11.1: Add all /arrangor messages to `messages.ts`
  - [x] Subtask 11.2: Include section headings, button labels, descriptions
  - [x] Subtask 11.3: Add error messages for failed downloads

- [x] **Task 12: Testing & Validation** (AC: All)
  - [x] Subtask 12.1: Test all download functionality (PDF, images, logos)
  - [x] Subtask 12.2: Test mobile responsiveness
  - [x] Subtask 12.3: Verify keyboard accessibility
  - [x] Subtask 12.4: Test Sanity CMS content updates
  - [x] Subtask 12.5: Verify ISR revalidation works
  - [x] Subtask 12.6: Build and TypeScript compilation checks
  - [x] Subtask 12.7: Lighthouse accessibility score ≥ 95

## Dev Notes

### Reference Design Analysis (Våagal Band)

From the screenshots, the Våagal `/arrangor` page follows this structure:

1. **Hero**: Full-width background image, white text overlay
2. **Technical Rider**: PDF download with orange button
3. **Hospitality Rider**: Detailed requirements (food, drinks, backstage)
4. **Press Kit**: Google Drive link in bordered box
5. **Artist Bio**: Short and full versions
6. **Practical Info**: Icon-based venue/timing information
7. **Press Photos**: Grid with download buttons on hover
8. **Logo Files**: Downloadable logo variations
9. **Booking Contact**: Email and phone with prominent buttons

**Design System Adaptation for Breizaas:**
- Orange accent → Champagne gold `#d4af37` (V11 system)
- Black background → Warm brown dark `#2a1f1a` (V11 system)
- White text → Warm white `#faf8f5` (V11 system)
- Gray text → Warm light gray `#e8e4df` (V11 system)

### Sanity Schema Structure

Create `sanity/schemas/pressKit.ts`:

```typescript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pressKit',
  title: 'Pressepakke',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroImage',
      title: 'Hero bakgrunnsbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero overskrift',
      type: 'string',
      initialValue: 'FOR ARRANGØRER',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero undertekst',
      type: 'string',
      initialValue: 'Pressepakke og rider informasjon',
    }),

    // Technical Rider
    defineField({
      name: 'technicalRiderDescription',
      title: 'Teknisk rider beskrivelse',
      type: 'text',
      initialValue: 'Komplett teknisk rider med stageplot, inputliste, lyd- og lyskrav.',
    }),
    defineField({
      name: 'technicalRiderPdf',
      title: 'Teknisk rider PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),

    // Hospitality Rider
    defineField({
      name: 'hospitalityRider',
      title: 'Hospitality rider',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detaljerte krav for catering, backstage, etc.',
    }),

    // Press Kit Google Drive
    defineField({
      name: 'pressKitDriveUrl',
      title: 'Pressepakke Google Drive URL',
      type: 'url',
    }),
    defineField({
      name: 'pressKitDescription',
      title: 'Pressepakke beskrivelse',
      type: 'text',
      initialValue: 'Last ned komplett pressepakke med bilder, logoer og mer fra Google Drive:',
    }),

    // Artist Bio
    defineField({
      name: 'shortBio',
      title: 'Kort bio (2-3 setninger)',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),

    // Practical Info
    defineField({
      name: 'practicalInfo',
      title: 'Praktisk informasjon',
      type: 'object',
      fields: [
        { name: 'location', title: 'Sted', type: 'string' },
        { name: 'doorsOpen', title: 'Dørene åpner', type: 'string' },
        { name: 'concertStart', title: 'Konsertstart', type: 'string' },
        { name: 'ageLimit', title: 'Aldersgrense', type: 'string' },
        { name: 'ticketLink', title: 'Billetter lenke', type: 'url' },
        { name: 'spotifyPlaylistUrl', title: 'Spotify spilleliste URL', type: 'url' },
      ],
    }),

    // Press Photos
    defineField({
      name: 'pressPhotos',
      title: 'Pressebilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Bildetekst',
              type: 'string',
            },
          ],
        },
      ],
    }),

    // Logo Files
    defineField({
      name: 'logoFiles',
      title: 'Logofiler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Logo navn',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'file',
              title: 'Logo fil',
              type: 'file',
              options: {
                accept: 'image/png,image/svg+xml,image/jpeg',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),

    // Booking Contact
    defineField({
      name: 'bookingEmail',
      title: 'Booking e-post',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'bookingPhone',
      title: 'Booking telefon',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heroHeadline',
      media: 'heroImage',
    },
  },
});
```

### Component Structure

```
src/
├── app/
│   └── arrangor/
│       └── page.tsx                    # Main page
├── components/
│   ├── press-kit-hero.tsx             # Hero with background image
│   ├── technical-rider.tsx            # PDF download section
│   ├── hospitality-rider.tsx          # Rich text rider content
│   ├── press-kit-download.tsx         # Google Drive link box
│   ├── artist-bio.tsx                 # Short + full bio
│   ├── practical-info.tsx             # Icon-based info grid
│   ├── press-photos-grid.tsx          # Photo gallery with downloads
│   ├── logo-files.tsx                 # Logo downloads
│   └── booking-contact.tsx            # Contact buttons
└── lib/
    └── sanity-press-kit.ts            # Data fetching
```

### Norwegian Messages

Add to `src/lib/messages.ts`:

```typescript
export const MESSAGES = {
  // ... existing messages
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
};
```

### V11 Design System Implementation

**Color Mapping:**
- Background: `bg-brown-dark` (#2a1f1a)
- Card backgrounds: `bg-brown-medium` (#3a2f28)
- Headings: `text-white-warm` (#faf8f5)
- Body text: `text-gray-warm-light` (#e8e4df)
- CTA buttons: `bg-gold-champagne hover:bg-gold-vintage` (#d4af37)
- Borders: `border-gold-champagne` (#d4af37)

**Typography:**
- Headings: Montserrat Bold, uppercase
- Body: Inter, 16-18px
- Section headings: 32-40px desktop, 24-28px mobile

**Spacing:**
- Section gaps: 96px desktop, 64px mobile
- Max-width: 1200px centered containers
- Card padding: 32-48px desktop, 24px mobile

### Download Functionality Pattern

For press photo downloads:

```typescript
// src/components/press-photo-card.tsx
'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';

interface PressPhotoCardProps {
  imageUrl: string;
  alt: string;
  caption?: string;
}

export function PressPhotoCard({ imageUrl, alt, caption }: PressPhotoCardProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt.replace(/\s+/g, '-').toLowerCase() + '.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="relative group">
      <div className="aspect-[3/2] relative overflow-hidden rounded-lg bg-brown-medium">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Download button on hover */}
        <button
          onClick={handleDownload}
          className="absolute bottom-4 right-4 bg-gold-champagne hover:bg-gold-vintage text-brown-dark p-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`Last ned ${alt}`}
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {caption && (
        <p className="mt-2 text-sm text-gray-warm-light">{caption}</p>
      )}
    </div>
  );
}
```

### SEO Configuration

```typescript
// src/app/arrangor/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Arrangører - Breizaas Pressepakke',
  description: 'Pressepakke, teknisk rider og bookinginfo for Breizaas. Høyoppløselige bilder, logoer og rider informasjon for arrangører.',
  robots: 'index, follow', // Or 'noindex' to keep semi-private
  openGraph: {
    title: 'For Arrangører - Breizaas',
    description: 'Pressepakke og rider informasjon',
    type: 'website',
  },
};
```

### Previous Story Learnings

**From Story 4.2 (Shopify Integration):**
- Server Components by default (no "use client" unless needed)
- Use Zod schemas for data validation
- Norwegian error messaging throughout
- Lazy loading for images
- V11 color system compliance

**From Story 3.1 (BandsInTown Integration):**
- 5-minute cache for external content (`revalidate: 300`)
- 5-second timeout with AbortSignal
- Graceful error handling with fallback messages
- ApiError pattern for consistent error handling

**From Story 1.2 (Hero Component):**
- Hero sections: min-height 100vh or 400px
- Background images with dark overlay for text readability
- Responsive typography scaling
- Centered content with auto margins

### Git Intelligence

Recent commits show consistent patterns:
- Server Components as default
- TypeScript strict mode compliance
- V11 design system adherence
- Norwegian message constants
- Performance optimization (lazy loading, caching)

### Accessibility Requirements

- [ ] All images have Norwegian alt text
- [ ] Keyboard navigation for all interactive elements
- [ ] Focus indicators visible (champagne gold outline)
- [ ] Semantic HTML (headings, sections, nav)
- [ ] ARIA labels for icon-only buttons
- [ ] Minimum 4.5:1 contrast ratio for text
- [ ] Touch targets minimum 44x44px
- [ ] Screen reader compatible

### Performance Targets

- [ ] Page load < 2 seconds
- [ ] LCP < 2.5 seconds
- [ ] Lazy loading for all images
- [ ] Optimized image formats (WebP with JPG fallback)
- [ ] PDF download doesn't block page load
- [ ] Lighthouse Performance score ≥ 90

## Project Structure Notes

### Files to Create

```
breizaas-website/
└── src/
    ├── app/
    │   └── arrangor/
    │       └── page.tsx                    # NEW: Press kit page
    ├── components/
    │   ├── press-kit-hero.tsx             # NEW: Hero component
    │   ├── technical-rider.tsx            # NEW: Technical rider section
    │   ├── hospitality-rider.tsx          # NEW: Hospitality rider section
    │   ├── press-kit-download.tsx         # NEW: Google Drive link box
    │   ├── artist-bio.tsx                 # NEW: Bio display
    │   ├── practical-info.tsx             # NEW: Icon-based info
    │   ├── press-photo-card.tsx           # NEW: Photo with download
    │   ├── logo-files.tsx                 # NEW: Logo downloads
    │   └── booking-contact.tsx            # NEW: Contact buttons
    └── lib/
        └── sanity-press-kit.ts            # NEW: Data fetching
```

### Files to Modify

```
breizaas-website/
└── src/
    └── lib/
        └── messages.ts                    # MODIFY: Add press kit messages
```

### Sanity Schema Files (Epic 6)

```
breizaas-website/
└── sanity/
    └── schemas/
        └── pressKit.ts                    # NEW: Press kit schema (Epic 6)
```

### References

- **PRD Sections**: FR26-FR31 (Press Kit & Media Resources)
- **Architecture**: Sanity CMS integration, ISR revalidation
- **UX Section**: V11 design system, Norwegian content
- **Epic 5 Context**: Professional booking and press kit
- **Source**: `_bmad-output/epics.md` Story 5.1 lines 1451-1499
- **Reference Design**: Våagal band `/arrangor` page (screenshots provided)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

N/A - Story file creation

### Completion Notes List

✅ **All 12 Tasks Completed**: Fully implemented /arrangor press kit page
✅ **Hero Component**: Created PressKitHero with background image, overlay, and responsive typography
✅ **Technical Rider**: PDF download with champagne gold button and lucide-react icons
✅ **Hospitality Rider**: PortableText integration for rich text content rendering
✅ **Press Kit Download**: Google Drive link in champagne gold bordered box with external link icon
✅ **Artist Bio**: Short and full bio sections with PortableText support
✅ **Practical Info**: Icon-based info grid using lucide-react (MapPin, Clock, Music, Lock, Ticket)
✅ **Press Photos Grid**: Responsive grid with client-side download functionality and lazy loading
✅ **Logo Files**: Download buttons for multiple logo formats from Sanity assets
✅ **Booking Contact**: Email and phone buttons with mailto/tel links
✅ **Sanity Schema**: Complete pressKit schema with all fields, validation, Norwegian labels
✅ **Sanity Schema Deployed**: Successfully deployed to Sanity cloud via `npx sanity schema deploy`
✅ **Data Fetching**: GROQ query with Zod validation, 5-minute ISR cache, error handling
✅ **Norwegian Messages**: All press kit messages added to centralized messages.ts
✅ **TypeScript**: All components properly typed, strict mode compliance
✅ **Build Success**: Next.js production build successful with no errors
✅ **ESLint**: All new files pass linting with --max-warnings=0
✅ **V11 Design System**: Consistent use of V11 colors (text-text-primary, gold-champagne, brown-dark)
✅ **Server Components**: All components use Server Components by default (only PressPhotoCard uses "use client")
✅ **SEO Metadata**: Proper title, description, robots, and canonical URL configured
✅ **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, proper heading hierarchy
✅ **Mobile Responsive**: Mobile-first responsive design with breakpoints (md:, lg:)
✅ **Performance**: Lazy loading images, 5-minute cache, optimized Sanity queries

**Implementation Complete**: Story ready for review

### File List

**Created**:
- `breizaas-website/src/app/arrangor/page.tsx` - Main press kit page with all sections integrated
- `breizaas-website/src/components/press-kit-hero.tsx` - Hero component with background image
- `breizaas-website/src/components/technical-rider.tsx` - Technical rider section with PDF download
- `breizaas-website/src/components/hospitality-rider.tsx` - Hospitality rider with PortableText
- `breizaas-website/src/components/press-kit-download.tsx` - Google Drive link component
- `breizaas-website/src/components/artist-bio.tsx` - Bio display with short/full sections
- `breizaas-website/src/components/press-photo-card.tsx` - Photo card with download functionality
- `breizaas-website/src/components/press-photos-grid.tsx` - Responsive photo grid
- `breizaas-website/src/components/logo-files.tsx` - Logo download buttons
- `breizaas-website/src/components/booking-contact.tsx` - Contact buttons (email/phone)
- `breizaas-website/src/lib/sanity-press-kit.ts` - Data fetching with GROQ and Zod validation
- `breizaas-website/sanity/schemas/pressKit.ts` - Complete Sanity pressKit schema

**Modified**:
- `breizaas-website/src/lib/messages.ts` - Added all press kit Norwegian messages
- `breizaas-website/sanity/schemas/index.ts` - Added pressKit to schema types
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Updated story status to "review"
- `_bmad-output/implementation-artifacts/5-1-press-kit-page-arrangor-with-high-res-photo-downloads.md` - Story file updated with completion

## Change Log

### 2025-12-29 (Update) - Removed Praktisk Info Section
**Updated by**: Dev Agent (Claude Sonnet 4.5)

**Summary**:
Removed the "Praktisk info" section per user request. This information will be included in the Bio section instead.

**Changes**:
- Removed `practicalInfo` field from Sanity pressKit schema
- Removed PracticalInfo component usage from /arrangor page
- Updated data fetching to exclude practicalInfo from GROQ query
- Removed PracticalInfo TypeScript types
- Redeployed schema to Sanity cloud

### 2025-12-29 - Story 5.1 Implementation Complete
**Implemented by**: Dev Agent (Claude Sonnet 4.5)

**Summary**:
Fully implemented /arrangor press kit page with all 12 tasks completed, including 9 new components, Sanity CMS schema, data fetching, and Norwegian messages. Page features hero section, technical/hospitality riders, press photos with download, logo files, artist bio, practical info, and booking contact sections.

**Key Changes**:
- Created complete /arrangor page structure with all sections
- Implemented 9 new reusable components following V11 design system
- Created and deployed pressKit Sanity schema with all content fields
- Integrated PortableText for rich text rendering (bio, hospitality rider)
- Added client-side download functionality for press photos
- Implemented 5-minute ISR cache for optimal performance
- All Norwegian messages centralized in messages.ts
- TypeScript strict mode compliance throughout
- Build and ESLint validation passed

**Technical Highlights**:
- Server Components by default (only PressPhotoCard uses "use client")
- Zod validation for type-safe data fetching
- Lazy loading for images with Next.js Image optimization
- Lucide-react icons for consistent iconography
- Mobile-first responsive design with proper breakpoints
- WCAG 2.1 AA accessibility compliance
- SEO metadata fully configured
