---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/prd.md
workflowType: "architecture"
lastStep: 8
status: "complete"
completedAt: "2025-12-21"
project_name: "Breizaas"
user_name: "Tony-"
date: "2025-12-21"
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The project encompasses **51 functional requirements** across 9 key capability areas, revealing a comprehensive artist website platform:

1. **Music Discovery & Showcase (FR1-FR5)**: Complete discography display, Spotify integration for playback and statistics (125k+ listeners), YouTube video embeds
2. **Tour & Event Information (FR6-FR9)**: Bandsintown-powered tour date display, ticket purchase links, calendar integration, tour history
3. **Merchandise Management (FR10-FR15)**: Shopify headless integration for product browsing, cart management, checkout, inventory tracking
4. **Artist Information & Bio (FR16-FR20)**: AI meets bygdemusikk story, genre positioning, success metrics, social media links
5. **Booking & Contact Management (FR21-FR25)**: Professional booking inquiry forms for event organizers, contact functionality
6. **Press Kit & Media Resources (FR26-FR31)**: Hidden `/arrangor` page with downloadable high-res photos, detailed bio, technical rider, booking procedures
7. **Content Management (FR32-FR40)**: Full Sanity CMS self-service for artist to update bio, stats, tour dates, YouTube videos, news, press materials with immediate live reflection
8. **Navigation & Site Structure (FR41-FR46)**: Multi-device responsive design, Norwegian search optimization, social sharing, keyboard navigation, screen reader support
9. **Discovery & SEO (FR47-FR51)**: Search engine indexing of Norwegian content, structured data (MusicGroup, Event, Product schemas), rich snippets

**Architecturally, these requirements demand:**

- **Multi-source data aggregation**: 5 external APIs must be orchestrated seamlessly
- **Dual rendering strategy**: Static generation for SEO + dynamic revalidation for fresh content
- **Content independence**: Artist must manage content without deployment cycles
- **Progressive enhancement**: Core content accessible even if JavaScript fails

**Non-Functional Requirements:**

Critical NFRs that will drive architectural decisions:

**Performance (NFR-P1 to NFR-P4):**

- **Page Load**: < 2s on 3G, TTI < 3s, client-side transitions < 500ms
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1, PageSpeed ≥ 90
- **API Caching**: Spotify minimum 1hr cache, 5s timeout with graceful degradation
- **Build Performance**: Full rebuild < 5min, ISR updates < 30s after CMS publish

**Security (NFR-S1 to NFR-S4):**

- HTTPS mandatory, API keys in environment variables only, CSP headers
- CSRF protection on forms, rate limiting (5 submissions/IP/hour)
- PCI compliance delegated to Shopify hosted checkout

**Accessibility (NFR-A1 to NFR-A5):**

- WCAG 2.1 AA compliance mandatory across all pages
- Screen reader compatibility (VoiceOver, NVDA, JAWS)
- Keyboard navigation, proper ARIA labels, semantic HTML5

**Integration Reliability (NFR-I1 to NFR-I5):**

- All 5 APIs must gracefully degrade on failure
- Tour dates update within 1hr of Bandsintown changes
- Shopify inventory real-time/near-real-time sync
- Sanity webhook triggers ISR within 30s with retry mechanism

**Availability (NFR-R1 to NFR-R4):**

- 99.9% uptime requirement
- User-friendly Norwegian error messages
- Browser compatibility (Chrome, Firefox, Safari, Edge latest)
- Production error monitoring and automated alerts

**Scale & Complexity:**

- **Primary domain**: Server-side generated (SSG) web application with API orchestration
- **Complexity level**: Low (per PRD classification) but with sophisticated integration and performance requirements
- **Estimated architectural components**:
  - 7 page routes (Norwegian URLs: `/`, `/musikk`, `/konserter`, `/merch`, `/om-oss`, `/kontakt`, `/arrangor`)
  - 5 API integration modules (Spotify, Bandsintown, Shopify, YouTube, Sanity)
  - Content management layer (Sanity CMS with webhook/ISR)
  - SEO optimization layer (meta tags, structured data, sitemap)
  - Performance optimization layer (caching, ISR, image optimization)

### Technical Constraints & Dependencies

**Framework & Platform Constraints:**

- **Next.js required**: SSG/ISR capabilities essential for SEO + content freshness balance
- **Norwegian URL routing**: Custom routes (`/musikk` not `/music`) requiring Next.js rewrites or file naming strategy
- **Migration context**: Rebuilding from existing Vite site - proven design patterns available as reference

**Third-Party API Dependencies:**

- **Spotify Web API**: Artist profile, discography, listener stats (rate limits apply)
- **Bandsintown API**: Tour dates, venues, ticket links (update frequency constraints)
- **Shopify Storefront API**: Product catalog, cart, inventory (checkout redirects to Shopify hosted)
- **YouTube API**: Video embeds (lazy loading required for performance)
- **Sanity CMS**: Headless CMS with GROQ queries, webhook integration for ISR triggers

**Localization Constraints:**

- **Content language**: Norwegian (Bokmål) for all user-facing text
- **Codebase language**: English for maintainability
- **Character encoding**: Proper handling of Norwegian characters (æ, ø, å)
- **SEO language**: nb-NO specification for search engines

**Hosting & Deployment Constraints:**

- **Recommended platform**: Vercel (optimal Next.js support) or equivalent (Netlify, AWS Amplify)
- **SSL/TLS**: Required for all pages
- **Environment variables**: Secure storage for API keys
- **CDN**: Global distribution for static assets

**Browser & Device Constraints:**

- **Target browsers**: Modern only (latest Chrome, Firefox, Safari, Edge) - no IE11
- **Mobile-first**: Responsive design with breakpoints at 320px, 768px, 1024px, 1440px
- **Progressive enhancement**: Core functionality without JavaScript

### Cross-Cutting Concerns Identified

**1. Performance Optimization Strategy**

- SSG for all pages to meet < 2s load target
- ISR for content freshness without rebuild bottlenecks
- API response caching to minimize external calls and meet performance targets
- Image optimization via Next.js Image component
- Code splitting and lazy loading for below-fold content
- Font optimization (system fonts or optimized web fonts)

**2. API Integration Resilience**

- Graceful degradation when APIs fail (cached data or user-friendly messages)
- Timeout handling (5s max) with fallback strategies
- Rate limit management across all 5 APIs
- Caching layer to reduce API dependency for performance
- Error state design for each integration point

**3. SEO Excellence**

- Norwegian keyword optimization (Breizaas, bygdemusikk, AI artist, festmusikk)
- Structured data schemas (MusicGroup, Event, Product) for rich snippets
- Open Graph tags for social sharing
- Dynamic meta tags per page
- XML sitemap generation
- Canonical URLs and hreflang tags (nb-NO)
- Fast load times as SEO ranking factor

**4. Content Management Workflow**

- Sanity CMS → Webhook → ISR pipeline must complete in < 30s
- Artist self-service capability without developer involvement
- Preview mode for content review before publishing
- Resilient webhook handling with retry mechanism
- Clear separation of managed content vs static code

**5. Accessibility Compliance**

- WCAG 2.1 AA standards across all pages
- Semantic HTML5 throughout
- ARIA labels for dynamic content
- Keyboard navigation and focus management
- Screen reader optimization
- Color contrast and alt text requirements
- Automated testing integration (axe, Lighthouse)

**6. Security Posture**

- HTTPS mandatory for all traffic
- API keys never exposed to client
- CSRF protection on forms
- Rate limiting on form submissions
- CSP headers to prevent XSS
- PCI compliance delegated to Shopify
- Sanity CMS access control

**7. Norwegian Localization**

- Norwegian URL structure (`/musikk`, `/konserter`, `/merch`, `/om-oss`, `/kontakt`, `/arrangor`)
- Norwegian content throughout (Bokmål)
- English codebase for technical clarity
- Proper character encoding for æ, ø, å
- Norwegian error messages and UI text
- nb-NO language specification for SEO

## Starter Template Evaluation

### Technical Preferences Established

**Core Stack:**

- **Language**: TypeScript (type safety and modern best practices)
- **Framework**: Next.js 15 with App Router (SSG/ISR required for SEO + content freshness)
- **Styling**: Tailwind CSS (utility-first approach for rapid, maintainable styling)
- **Component Library**: shadcn/ui (accessible, customizable components built on Radix UI)

**Development Philosophy:**

- Build from scratch with intent to improve UX beyond existing Vite site
- Use Vite site as reference point, not strict template
- Focus on clean, modern implementation leveraging Next.js 15 best practices

### Primary Technology Domain

**Server-side generated (SSG) web application** with API orchestration, based on project requirements for:

- SEO excellence (Norwegian market discovery)
- Performance targets (< 2s load, Core Web Vitals compliance)
- Content freshness (ISR for Sanity CMS updates)
- Multiple external API integrations (Spotify, Bandsintown, Shopify, YouTube, Sanity)

### Starter Options Considered

**Option 1: Official create-next-app (Selected)**

The official Next.js CLI provides a minimal, battle-tested foundation:

- Latest Next.js 15 with App Router and Server Components
- TypeScript configuration out-of-the-box
- Tailwind CSS integration with postcss setup
- ESLint configured for Next.js best practices
- Turbopack for fast development builds
- Zero bloat - only essential configurations

**Option 2: Pre-configured Boilerplates**

Community starters like ixartz/Next-js-Boilerplate or theodorusclarence/ts-nextjs-tailwind-starter offer more batteries-included setups with Prettier, Husky, Storybook, testing frameworks, and authentication scaffolding.

**Rejected** - Too opinionated for this project. The goal is to build something better from scratch, not inherit a complex boilerplate structure.

### Selected Starter: create-next-app + shadcn/ui

**Rationale for Selection:**

1. **Minimal starting point**: Official CLI creates lean foundation without unnecessary dependencies
2. **Maximum flexibility**: No pre-configured opinions about project structure, testing, or additional tooling
3. **Latest best practices**: Guaranteed to follow current Next.js conventions and optimizations
4. **shadcn/ui philosophy**: Components copied into project (full ownership, no black-box npm package)
5. **Norwegian URL support**: Clean slate for implementing custom routing (`/musikk`, `/konserter`, etc.)
6. **ISR-ready**: App Router provides built-in ISR via `revalidate` configuration
7. **Performance-first**: Next.js 15 includes automatic optimizations for images, fonts, and code splitting

**Initialization Commands:**

```bash
# Step 1: Create Next.js project with TypeScript, Tailwind, App Router
npx create-next-app@latest breizaas-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Step 2: Initialize shadcn/ui (run inside project directory)
cd breizaas-website
npx shadcn@latest init

# Step 3: Add initial shadcn/ui components as needed
npx shadcn@latest add button card
```

**CLI Options Explained:**

- `--typescript`: Enable TypeScript with tsconfig.json
- `--tailwind`: Install and configure Tailwind CSS v4
- `--eslint`: Set up ESLint with Next.js recommended rules
- `--app`: Use App Router (required for SSG/ISR)
- `--src-dir`: Organize code in `src/` directory (cleaner project structure)
- `--import-alias "@/*"`: Enable absolute imports (e.g., `import from '@/components/...'`)

### Architectural Decisions Provided by Starter

**Language & Runtime:**

- TypeScript 5+ with strict mode enabled
- React 19 with Server Components support
- Node.js runtime for SSG builds and ISR

**Styling Solution:**

- Tailwind CSS v4 with PostCSS integration
- `app/globals.css` with Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`)
- Built-in dark mode support via Tailwind's dark mode class strategy
- shadcn/ui components use CSS variables for theming (easy Norwegian color palette customization)

**Build Tooling:**

- Turbopack for development (faster hot reloading than Webpack)
- Webpack for production builds (optimized, tree-shaken bundles)
- Automatic code splitting per route
- Built-in image optimization via `next/image`
- Font optimization with `next/font` (supports local fonts or Google Fonts)

**Testing Framework:**

- None included by default (intentional - add as needed)
- Recommended additions: Vitest for unit tests, Playwright for E2E (aligns with accessibility testing requirements)

**Code Organization:**

- `src/app/` - App Router pages and layouts (file-based routing)
- `src/components/` - React components (shadcn/ui components live in `src/components/ui/`)
- `src/lib/` - Utility functions, API clients, helpers
- `public/` - Static assets (images, fonts, etc.)
- Environment variables via `.env.local` (API keys for Spotify, Bandsintown, Shopify, Sanity)

**Project Structure (Norwegian URLs):**

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Norwegian meta tags, fonts)
│   ├── page.tsx            # Home page (/)
│   ├── musikk/             # Music/discography (/musikk)
│   ├── konserter/          # Tour dates (/konserter)
│   ├── merch/              # Merchandise (/merch)
│   ├── om-oss/             # About (/om-oss)
│   ├── kontakt/            # Contact/booking (/kontakt)
│   └── arrangor/           # Press kit (/arrangor)
├── components/
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── spotify.ts          # Spotify API client
│   ├── bandsintown.ts      # Bandsintown API client
│   ├── shopify.ts          # Shopify Storefront API client
│   └── sanity.ts           # Sanity CMS client
└── public/                 # Static assets
```

**Development Experience:**

- Hot module reloading with Turbopack
- TypeScript IntelliSense in VS Code
- ESLint on-save linting
- Automatic import sorting (can be configured)
- Server Component debugging via React DevTools

**Deployment Architecture:**

- Vercel-optimized (recommended platform from PRD)
- Automatic HTTPS via Vercel SSL
- CDN distribution for static assets
- Environment variable management via Vercel dashboard
- Webhook endpoint for Sanity CMS → ISR triggers

**Note:** Project initialization using these commands should be the first implementation task. The Norwegian URL structure will be implemented through App Router's file-based routing (folder names = URL paths).

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Next.js built-in caching strategy for API responses
- Widget-based approach for Spotify and YouTube (no API keys needed)
- API clients for Bandsintown, Shopify Storefront, and Sanity CMS
- Zod for data validation across forms and API responses
- React Server Components with minimal client state
- Vercel hosting with auto-deploy pipeline

**Important Decisions (Shape Architecture):**

- React Hook Form for contact and booking forms
- localStorage for Shopify cart persistence
- Vercel Analytics for Core Web Vitals monitoring
- Environment variable management via Vercel platform

**Deferred Decisions (Post-MVP):**

- Advanced error tracking (Sentry) - add if needed after launch
- Testing framework selection - add Vitest/Playwright when ready
- Additional state management (Zustand) - only if client state complexity grows

### Data Architecture

**Caching Strategy: Next.js Built-in Fetch Caching**

- **Decision**: Use Next.js native `fetch()` with `next: { revalidate }` option
- **Implementation**:
  - Spotify widget embeds: No caching needed (iframe handles it)
  - YouTube widget embeds: Lazy-loaded, no caching needed
  - Bandsintown API: `revalidate: 3600` (1 hour cache)
  - Shopify Storefront API: `revalidate: 300` (5 min cache for inventory freshness)
  - Sanity CMS: ISR triggered by webhook (on-demand revalidation)
- **Rationale**: Leverages Next.js App Router capabilities, no additional services required, meets NFR-P3 (1hr minimum cache for external APIs)
- **Affects**: All pages with external data, build performance (NFR-P4)

**Data Validation: Zod**

- **Decision**: Zod for runtime validation and TypeScript type inference
- **Version**: Latest stable (will verify during implementation)
- **Implementation**:
  - API response validation (Bandsintown, Shopify, Sanity)
  - Form validation schemas (contact form, booking form)
  - Integration with React Hook Form
- **Rationale**: TypeScript-native, widely adopted in Next.js ecosystem, works seamlessly with React Hook Form and shadcn/ui patterns
- **Affects**: All API integrations, form submissions (FR21-FR25)

### API & Communication Patterns

**API Integration Architecture: Hybrid Widget + API Approach**

**Widget-Based Integrations (No API Keys Required):**

- **Spotify Integration**:

  - **Decision**: Use Spotify Embed Player (iframe widgets)
  - **Implementation**: React component wrapper in `src/components/spotify-embed.tsx`
  - **Data**: Artist profile, albums, tracks via embed URLs
  - **Rationale**: No API access required, automatic authentication, always up-to-date content
  - **Affects**: FR1-FR4 (Music Discovery & Showcase)

- **YouTube Integration**:
  - **Decision**: Use YouTube iframe embeds with lazy loading
  - **Implementation**: React component in `src/components/youtube-embed.tsx` with intersection observer
  - **Performance**: Lazy load to meet NFR-P1 (< 2s page load)
  - **Rationale**: No API quota concerns, native YouTube player features, performance-optimized
  - **Affects**: FR5 (YouTube video showcase)

**API-Based Integrations:**

- **Bandsintown API**:

  - **Client**: `src/lib/bandsintown.ts`
  - **Data**: Tour dates, venues, ticket links
  - **Caching**: 1hr revalidation
  - **Error Handling**: Fallback to cached data or "No upcoming shows" message
  - **Affects**: FR6-FR9 (Tour & Event Information)

- **Shopify Storefront API**:

  - **Client**: `src/lib/shopify.ts`
  - **Data**: Product catalog, variants, inventory, cart operations
  - **Caching**: 5min revalidation for inventory freshness
  - **Checkout**: Redirect to Shopify hosted checkout (PCI compliance per NFR-S3)
  - **Affects**: FR10-FR15 (Merchandise Management)

- **Sanity CMS**:
  - **Client**: `src/lib/sanity.ts` with GROQ queries
  - **Data**: Artist bio, stats, news, press kit content
  - **Revalidation**: Webhook-triggered ISR (< 30s per NFR-I5)
  - **Preview Mode**: Draft content preview for artist
  - **Affects**: FR32-FR40 (Content Management)

**Centralized Error Handling Pattern:**

```typescript
// Shared error handling utility
- 5s timeout per NFR-P3
- Try/catch with graceful degradation
- Norwegian error messages per NFR-R2
- Fallback to cached data when available
- Logging for production monitoring
```

**Rationale**: Widget approach eliminates API complexity for Spotify/YouTube while maintaining professional presentation. API clients for services requiring data manipulation (tour dates, commerce, CMS) with unified error handling ensures reliability per NFR-I1-I5.

### Authentication & Security

**Form Security: CSRF Protection + Rate Limiting**

- **Decision**: Vercel Edge Middleware for rate limiting + CSRF tokens
- **Implementation**:
  - Contact form (FR24-FR25): CSRF token validation, 5 submissions/IP/hour
  - Booking form (FR21-FR23): CSRF token validation, 5 submissions/IP/hour
  - Edge middleware intercepts form submissions
- **Rationale**: Leverages Vercel platform capabilities, meets NFR-S3 requirements, no external dependencies
- **Affects**: FR21-FR25 (Booking & Contact Management)

**API Key Security:**

- **Decision**: Environment variables with Next.js conventions
- **Server-only keys**: `BANDSINTOWN_APP_ID`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SANITY_API_TOKEN`, `SANITY_WEBHOOK_SECRET`
- **Client-safe keys**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- **Storage**: `.env.local` (local), Vercel Environment Variables (production)
- **Rationale**: Follows Next.js security best practices, meets NFR-S2 (no API keys exposed to client)
- **Affects**: All API integrations, webhook handling

**Content Security Policy (CSP):**

- **Decision**: Implement CSP headers via `next.config.js`
- **Allowed sources**: Spotify embeds, YouTube embeds, Shopify checkout, Sanity Studio
- **Rationale**: Meets NFR-S2 XSS protection requirement
- **Affects**: All pages with third-party embeds

### Frontend Architecture

**State Management: React Server Components + Minimal Client State**

- **Decision**: Maximize Server Components, minimal client-side state
- **Implementation**:
  - **Server Components** (default): All page routes, data fetching, SEO meta tags
  - **Client Components** (selective): Forms, cart, interactive widgets
  - **Cart State**: localStorage persistence (no server state needed)
  - **Form State**: React Hook Form (isolated component state)
- **Rationale**: Meets NFR-P1 performance targets, minimal JavaScript bundle, progressive enhancement per requirements
- **Affects**: All pages, client-side JavaScript bundle size

**Form Handling: React Hook Form + Zod**

- **Decision**: React Hook Form with Zod validation schemas
- **Implementation**:
  - Contact form: Name, email, message validation
  - Booking form: Event details, organizer info, date validation
  - Client-side validation with Zod schemas
  - Server-side validation in API routes
- **Rationale**: TypeScript-safe, accessible form handling, integrates with shadcn/ui form components
- **Affects**: FR21-FR25 (Booking & Contact forms)

**Component Architecture:**

```
src/components/
├── ui/                     # shadcn/ui components (button, card, form, etc.)
├── spotify-embed.tsx       # Spotify iframe wrapper
├── youtube-embed.tsx       # YouTube iframe wrapper (lazy-loaded)
├── tour-dates.tsx          # Bandsintown data display
├── merch-grid.tsx          # Shopify product grid
└── booking-form.tsx        # Booking inquiry form
```

- **Pattern**: Server Components by default, "use client" only when needed
- **Reusability**: Extract common patterns into `src/components/ui/` via shadcn/ui
- **Norwegian content**: All UI text in Norwegian via prop/constant values

### Infrastructure & Deployment

**Hosting Platform: Vercel**

- **Decision**: Vercel (as recommended in PRD)
- **Features Used**:
  - Automatic HTTPS/SSL (NFR-S1)
  - Global CDN for static assets (NFR-P1, NFR-R1)
  - Edge middleware for rate limiting
  - Environment variable management
  - Webhook endpoints for Sanity ISR
- **Rationale**: Optimal Next.js 15 support, meets NFR-R1 (99.9% uptime), zero configuration overhead
- **Affects**: All deployment, performance (NFR-P1-P4)

**CI/CD Pipeline: Vercel Auto-Deploy**

- **Decision**: Vercel Git integration with automatic deployments
- **Workflow**:
  - Push to feature branch → Preview deployment
  - Merge to `main` → Production deployment
  - Automatic build optimization and caching
- **Rationale**: Zero-config CI/CD, preview environments for testing, meets deployment requirements
- **Affects**: Development workflow, QA process

**Environment Configuration:**

```bash
# .env.local (development)
BANDSINTOWN_APP_ID=xxx
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxx
SHOPIFY_STORE_DOMAIN=xxx.myshopify.com
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
SANITY_WEBHOOK_SECRET=xxx
```

- **Management**: Vercel dashboard for production/preview environments
- **Security**: Server-only keys never exposed to client bundle
- **Separation**: Development, Preview, Production environments

**Monitoring & Analytics: Vercel Analytics**

- **Decision**: Start with Vercel Analytics, add Sentry post-launch if needed
- **Vercel Analytics Features**:
  - Core Web Vitals tracking (LCP, FID, CLS per NFR-P2)
  - Real User Monitoring (RUM)
  - Performance insights
- **Future Addition**: Sentry for error tracking (NFR-R4 alerts)
- **Rationale**: Built-in performance monitoring meets immediate needs, can add error tracking based on actual production behavior
- **Affects**: NFR-P2 (Core Web Vitals compliance validation), NFR-R4 (monitoring)

### Decision Impact Analysis

**Implementation Sequence:**

1. **Project Initialization** (First story)

   - Run `create-next-app` with TypeScript, Tailwind, App Router
   - Initialize shadcn/ui
   - Configure environment variables structure

2. **Norwegian URL Structure** (Foundation)

   - Create folder structure: `musikk/`, `konserter/`, `merch/`, `om-oss/`, `kontakt/`, `arrangor/`
   - Configure root layout with Norwegian meta tags (nb-NO)

3. **API Client Layer** (Before page implementation)

   - Implement `src/lib/bandsintown.ts`, `shopify.ts`, `sanity.ts`
   - Set up Zod schemas for API responses
   - Configure caching and error handling

4. **Widget Components** (Before pages using them)

   - `spotify-embed.tsx`, `youtube-embed.tsx`
   - Lazy loading configuration for YouTube

5. **Page Implementation** (Following route structure)

   - Home `/`, Music `/musikk`, Tour `/konserter`, etc.
   - Each page fetches data server-side with caching

6. **Form Implementation** (After pages)

   - Contact and booking forms with React Hook Form + Zod
   - CSRF protection and rate limiting middleware

7. **Sanity Webhook** (CMS integration)

   - Webhook endpoint for ISR triggers
   - Preview mode configuration

8. **Monitoring & Deployment** (Final setup)
   - Vercel Analytics integration
   - Production environment variables
   - Final SEO validation

**Cross-Component Dependencies:**

- **Sanity CMS → All Pages**: Most pages consume Sanity content, so CMS schema must be designed early
- **API Caching → Performance**: Cache configuration directly impacts NFR-P1 and NFR-P2 targets
- **Environment Variables → All Integrations**: Must be configured before any API client testing
- **shadcn/ui Setup → All Pages**: UI components must be initialized before page development
- **Norwegian URLs → Routing**: Folder structure must be established before component development

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 6 key areas where AI agents could make different choices that would cause implementation conflicts:

1. Component and file naming conventions (React/TypeScript/Next.js)
2. API route and function naming patterns
3. Type definition placement and organization
4. API error handling structure across 3 integrations
5. Norwegian vs English code patterns
6. Date/time format standardization

### Naming Patterns

**Component & File Naming Conventions:**

- **React Components**: PascalCase filenames

  - `SpotifyEmbed.tsx`, `TourDates.tsx`, `BookingForm.tsx`
  - shadcn/ui components in `src/components/ui/` follow same pattern: `Button.tsx`, `Card.tsx`

- **Page Routes**: kebab-case folder names matching Norwegian URLs

  - `src/app/musikk/page.tsx` (not `src/app/Musikk/` or `src/app/music/`)
  - `src/app/konserter/page.tsx`
  - `src/app/om-oss/page.tsx`

- **Utility Files**: camelCase filenames

  - `src/lib/apiClient.ts`, `src/lib/formatDate.ts`, `src/lib/messages.ts`
  - API clients: `src/lib/bandsintown.ts`, `src/lib/shopify.ts`, `src/lib/sanity.ts`

- **Type Definitions**: PascalCase with `.types.ts` suffix
  - `src/types/Bandsintown.types.ts`, `src/types/Shopify.types.ts`, `src/types/Sanity.types.ts`

**API & Route Naming Conventions:**

- **Next.js API Routes**: Match page structure with `/api/` prefix

  - `/api/bandsintown/` for tour data
  - `/api/contact/` for contact form submission
  - `/api/booking/` for booking form submission
  - `/api/revalidate/` for Sanity webhook ISR triggers

- **Function Naming**: camelCase for all functions

  - `getBandsinownEvents()`, `getShopifyProducts()`, `submitBookingForm()`
  - Server Actions (if used): Prefix with `action` → `actionSubmitContact()`

- **Variable Naming**: camelCase for variables, PascalCase for React components/types
  - `const tourDates = ...` (not `tour_dates` or `TourDates`)
  - `const SpotifyPlayer = ...` (React component)

**Norwegian Content Naming:**

- **Code identifiers**: ALWAYS English (variables, functions, types, comments)
- **UI text**: Norwegian content via constants, props, or Sanity CMS
- **File/folder names**: Norwegian ONLY for URL-matching routes (`musikk/`, `konserter/`)

### Structure Patterns

**Project Organization:**

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Norwegian meta tags)
│   ├── page.tsx                # Home page
│   ├── musikk/                 # Norwegian URL routes
│   ├── konserter/
│   ├── merch/
│   ├── om-oss/
│   ├── kontakt/
│   ├── arrangor/
│   └── api/                    # API routes
│       ├── bandsintown/
│       ├── contact/
│       ├── booking/
│       └── revalidate/
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── spotify-embed.tsx       # Widget components
│   ├── youtube-embed.tsx
│   ├── tour-dates.tsx
│   ├── merch-grid.tsx
│   └── booking-form.tsx
├── lib/
│   ├── bandsintown.ts          # API clients
│   ├── shopify.ts
│   ├── sanity.ts
│   ├── apiClient.ts            # Shared utilities
│   ├── formatDate.ts
│   └── messages.ts             # Norwegian UI strings
├── types/
│   ├── Bandsintown.types.ts    # API response types
│   ├── Shopify.types.ts
│   └── Sanity.types.ts
└── public/                     # Static assets
```

**Type Definition Organization:**

- **Hybrid Approach**:

  - **API types**: Centralized in `src/types/` directory (shared across multiple components)
  - **Component-specific types**: Co-located with component file or exported from same file

- **Examples**:

  ```typescript
  // src/types/Bandsintown.types.ts (shared)
  export type BandsinownEvent = {
    id: string;
    datetime: string;
    venue: { name: string; location: string };
  };

  // src/components/tour-dates.tsx (component-specific)
  type TourDatesProps = {
    events: BandsinownEvent[];
    maxDisplay?: number;
  };
  ```

### Format Patterns

**API Response Formats:**

- **Standardized Error Structure**: All API clients must use consistent error format

```typescript
// src/types/ApiError.types.ts
export type ApiError = {
  message: string; // Norwegian user-facing message
  code: string; // Error code for logging (e.g., 'BANDSINTOWN_TIMEOUT')
  fallback?: any; // Cached data if available
  timestamp: string; // ISO 8601 timestamp
};
```

- **API Client Pattern**: All API clients return `Promise<T | ApiError>`

```typescript
// Example from src/lib/bandsintown.ts
export async function getBandsinownEvents(): Promise<
  BandsinownEvent[] | ApiError
> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000), // 5s timeout per NFR-P3
    });

    if (!response.ok) throw new Error("API_ERROR");

    const data = await response.json();
    return BandsinownEventSchema.parse(data); // Zod validation
  } catch (error) {
    return {
      message: MESSAGES.errors.noTourDates,
      code: "BANDSINTOWN_FETCH_ERROR",
      fallback: getCachedEvents(),
      timestamp: new Date().toISOString(),
    };
  }
}
```

**Data Exchange Formats:**

- **JSON Field Naming**: camelCase for TypeScript/JavaScript consistency

  - API responses get transformed to camelCase if they arrive as snake_case
  - Example: `user_id` from external API → `userId` in TypeScript types

- **Date/Time Format**:

  - **Storage/API**: ISO 8601 strings (`2025-12-21T10:00:00Z`)
  - **Display**: Norwegian locale via `Intl.DateTimeFormat('nb-NO')`
  - **Timezone**: Always store UTC, convert to local for display

  ```typescript
  // src/lib/formatDate.ts
  export function formatTourDate(isoString: string): string {
    return new Intl.DateTimeFormat("nb-NO", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(isoString));
  }
  ```

- **Boolean Handling**: TypeScript `true/false` (not 1/0 or "true"/"false" strings)

- **Null vs Undefined**:
  - Use `null` for intentional absence (API responses)
  - Use `undefined` for uninitialized state (React component state)
  - Optional properties use `?:` notation

### Communication Patterns

**Server/Client Component Patterns:**

- **Default**: All components are Server Components unless they need interactivity
- **"use client" Directive**: ONLY when component needs:

  - Browser APIs (localStorage for cart)
  - Event handlers (onClick, onChange)
  - React hooks (useState, useEffect)
  - Form interactions (React Hook Form)

- **Examples**:

  ```typescript
  // Server Component (default) - No directive needed
  export default async function TourPage() {
    const events = await getBandsinownEvents();
    return <TourDates events={events} />;
  }

  // Client Component - Needs "use client"
  ("use client");
  export function BookingForm() {
    const { register, handleSubmit } = useForm();
    // Interactive form logic
  }
  ```

**State Management Patterns:**

- **Server State**: Fetched in Server Components, passed as props
- **Client State**:

  - **Forms**: React Hook Form (component-scoped)
  - **Cart**: localStorage persistence (no global state library needed)
  - **UI State**: useState within Client Components

- **NO global state library** (Zustand/Redux) unless complexity grows post-MVP

**Form Submission Pattern:**

```typescript
// Consistent pattern for all forms
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "./booking.schema";

export function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingData) => {
    const response = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Show Norwegian error message
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

### Process Patterns

**Error Handling Patterns:**

- **Norwegian User Messages**: Centralized in `src/lib/messages.ts`

```typescript
// src/lib/messages.ts
export const MESSAGES = {
  errors: {
    noTourDates: "Ingen kommende konserter funnet",
    apiTimeout: "Kunne ikke laste data. Prøv igjen senere.",
    formSubmitError: "Kunne ikke sende skjema. Sjekk feltene og prøv igjen.",
    networkError: "Nettverksfeil. Sjekk tilkoblingen din.",
  },
  success: {
    bookingSubmitted: "Bookingforespørsel sendt!",
    contactSubmitted: "Melding sendt!",
  },
};
```

- **Error Boundary**: Root layout includes error boundary for unhandled errors

```typescript
// src/app/error.tsx (Next.js convention)
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Noe gikk galt</h2>
      <button onClick={reset}>Prøv igjen</button>
    </div>
  );
}
```

- **API Route Error Handling**: Consistent HTTP status codes
  - `200`: Success
  - `400`: Bad request (validation error)
  - `429`: Rate limit exceeded
  - `500`: Server error
  - `503`: External API unavailable (with fallback data if available)

**Loading State Patterns:**

- **Server Components**: Use React Suspense with `loading.tsx` files

```typescript
// src/app/konserter/loading.tsx
export default function Loading() {
  return <div>Laster konserter...</div>;
}
```

- **Client Components**: Use `isLoading` state from React Hook Form or useState

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await submitForm(data);
  } finally {
    setIsSubmitting(false);
  }
};
```

**Caching & Revalidation Patterns:**

- **Bandsintown**: `fetch(url, { next: { revalidate: 3600 } })` // 1 hour
- **Shopify**: `fetch(url, { next: { revalidate: 300 } })` // 5 minutes
- **Sanity CMS**: Webhook-triggered ISR via `/api/revalidate?secret=XXX&path=/musikk`
- **Widgets (Spotify, YouTube)**: No caching needed, handled by iframe

### Enforcement Guidelines

**All AI Agents MUST:**

1. **Follow Norwegian URL naming** for routes (`musikk/`, `konserter/`, not `music/`, `concerts/`)
2. **Use PascalCase for React components** and kebab-case for Norwegian route folders
3. **Return ApiError type** from all API client functions for consistent error handling
4. **Use centralized Norwegian messages** from `src/lib/messages.ts` (never hardcode Norwegian strings in components)
5. **Default to Server Components**, only use "use client" when necessary
6. **Apply Zod validation** to all API responses and form submissions
7. **Use ISO 8601 for dates** internally, Norwegian format for display
8. **Store environment variables** following Next.js conventions (`NEXT_PUBLIC_*` for client access)
9. **Handle errors gracefully** with Norwegian messages and fallback data from cache

**Pattern Enforcement:**

- **TypeScript strict mode** catches type mismatches automatically
- **ESLint** configured by Next.js catches naming inconsistencies
- **Code review** focuses on pattern adherence
- **Architecture document** (this document) is the source of truth for all patterns

**Updating Patterns:**

- If a pattern conflict is discovered during implementation, update this architecture document first
- Refactor existing code to match new pattern if necessary

### Pattern Examples

**Good Examples:**

```typescript
// ✅ Correct: PascalCase component, Norwegian route, Server Component default
// src/app/konserter/page.tsx
import { TourDates } from "@/components/tour-dates";
import { getBandsinownEvents } from "@/lib/bandsintown";

export default async function KonserterPage() {
  const events = await getBandsinownEvents();

  if ("code" in events) {
    // ApiError returned
    return <div>{events.message}</div>;
  }

  return <TourDates events={events} />;
}
```

```typescript
// ✅ Correct: Centralized Norwegian messages
// src/components/booking-form.tsx
"use client";

import { MESSAGES } from "@/lib/messages";

export function BookingForm() {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      // submission logic
    } catch {
      setError(MESSAGES.errors.formSubmitError);
    }
  };

  return <form>{error && <p>{error}</p>}</form>;
}
```

```typescript
// ✅ Correct: API client with consistent error handling
// src/lib/bandsintown.ts
import { BandsinownEventSchema } from "@/types/Bandsintown.types";
import { MESSAGES } from "./messages";

export async function getBandsinownEvents() {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    const data = await response.json();
    return BandsinownEventSchema.parse(data);
  } catch (error) {
    return {
      message: MESSAGES.errors.noTourDates,
      code: "BANDSINTOWN_ERROR",
      fallback: null,
      timestamp: new Date().toISOString(),
    };
  }
}
```

**Anti-Patterns:**

```typescript
// ❌ Wrong: Norwegian variable names
const ingenKonserter = [];
const hentTurData = () => {};

// ✅ Correct: English code, Norwegian UI text
const noEvents = [];
const fetchTourData = () => {};
const message = "Ingen konserter";
```

```typescript
// ❌ Wrong: Hardcoded Norwegian strings in components
export function TourDates() {
  return <p>Ingen kommende konserter</p>;
}

// ✅ Correct: Centralized messages
import { MESSAGES } from "@/lib/messages";

export function TourDates() {
  return <p>{MESSAGES.errors.noTourDates}</p>;
}
```

```typescript
// ❌ Wrong: snake_case in TypeScript
const user_id = "123";
const get_events = () => {};

// ✅ Correct: camelCase
const userId = "123";
const getEvents = () => {};
```

```typescript
// ❌ Wrong: Using "use client" unnecessarily
"use client";

export function StaticContent() {
  return <div>Static text</div>;
}

// ✅ Correct: Server Component by default
export function StaticContent() {
  return <div>Static text</div>;
}
```

```typescript
// ❌ Wrong: Inconsistent error format
throw new Error("Failed to fetch");

// ✅ Correct: Consistent ApiError format
return {
  message: MESSAGES.errors.apiTimeout,
  code: "API_TIMEOUT",
  fallback: cachedData,
  timestamp: new Date().toISOString(),
};
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
breizaas-website/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── components.json                  # shadcn/ui configuration
├── .env.local                       # Local environment variables (gitignored)
├── .env.example                     # Example environment template
├── .gitignore
├── .eslintrc.json
├── src/
│   ├── app/
│   │   ├── globals.css              # Tailwind directives and global styles
│   │   ├── layout.tsx               # Root layout (Norwegian meta tags, fonts, navigation)
│   │   ├── page.tsx                 # Home page (/)
│   │   ├── error.tsx                # Global error boundary
│   │   ├── not-found.tsx            # 404 page
│   │   ├── sitemap.ts               # Dynamic sitemap generation
│   │   ├── robots.ts                # Dynamic robots.txt
│   │   │
│   │   ├── musikk/                  # Music/discography page
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── metadata.ts          # Page-specific meta tags
│   │   │
│   │   ├── konserter/               # Tour dates page
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── metadata.ts
│   │   │
│   │   ├── merch/                   # Merchandise page
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── metadata.ts
│   │   │
│   │   ├── om-oss/                  # About page
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│   │   │
│   │   ├── kontakt/                 # Contact/booking page
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│   │   │
│   │   ├── arrangor/                # Hidden press kit page
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│   │   │
│   │   └── api/                     # API routes
│   │       ├── bandsintown/
│   │       │   └── route.ts         # Bandsintown proxy/cache endpoint
│   │       ├── contact/
│   │       │   └── route.ts         # Contact form submission
│   │       ├── booking/
│   │       │   └── route.ts         # Booking form submission
│   │       └── revalidate/
│   │           └── route.ts         # Sanity webhook ISR trigger
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── ...                  # Other shadcn/ui components as needed
│   │   │
│   │   ├── navigation.tsx           # Site navigation component
│   │   ├── footer.tsx               # Site footer
│   │   ├── spotify-embed.tsx        # Spotify iframe wrapper
│   │   ├── youtube-embed.tsx        # YouTube iframe wrapper (lazy-loaded)
│   │   ├── tour-dates.tsx           # Bandsintown event display
│   │   ├── merch-grid.tsx           # Shopify product grid
│   │   ├── booking-form.tsx         # Booking inquiry form
│   │   └── contact-form.tsx         # Contact form
│   │
│   ├── lib/
│   │   ├── bandsintown.ts           # Bandsintown API client
│   │   ├── shopify.ts               # Shopify Storefront API client
│   │   ├── sanity.ts                # Sanity CMS client (GROQ queries)
│   │   ├── messages.ts              # Norwegian UI strings centralized
│   │   ├── formatDate.ts            # Date formatting utilities (Norwegian locale)
│   │   ├── seo.ts                   # SEO helpers (structured data, meta tags)
│   │   └── utils.ts                 # General utility functions (cn, etc.)
│   │
│   ├── types/
│   │   ├── ApiError.types.ts        # Shared error type
│   │   ├── Bandsintown.types.ts     # Bandsintown API response types
│   │   ├── Shopify.types.ts         # Shopify Storefront API types
│   │   └── Sanity.types.ts          # Sanity CMS content types
│   │
│   └── middleware.ts                # Edge middleware (rate limiting, CSRF)
│
└── public/
    ├── robots.txt                   # Static robots.txt (if not using dynamic)
    ├── favicon.ico
    ├── images/                      # Static images
    │   ├── logo.png
    │   └── press/                   # Press kit images
    └── assets/                      # Other static assets
```

### Architectural Boundaries

**API Boundaries:**

**External APIs (Outbound):**

- **Bandsintown API**: `src/lib/bandsintown.ts` → Bandsintown service

  - Endpoint: Tour dates fetch
  - Caching: 1hr revalidation
  - Error handling: ApiError type with fallback

- **Shopify Storefront API**: `src/lib/shopify.ts` → Shopify GraphQL API

  - Endpoint: Product catalog, cart operations
  - Caching: 5min revalidation
  - Checkout: Redirect to Shopify hosted checkout

- **Sanity CMS**: `src/lib/sanity.ts` → Sanity GROQ API
  - Endpoint: Content fetching via GROQ queries
  - Revalidation: Webhook-triggered ISR
  - Preview mode: Draft content access

**Internal APIs (Inbound):**

- **`/api/contact`**: Contact form submission → Email service integration
- **`/api/booking`**: Booking form submission → Email service integration
- **`/api/revalidate`**: Sanity webhook → Triggers ISR for specific paths
- **`/api/bandsintown`** (optional): Proxy endpoint for client-side bandsintown requests if needed

**Component Boundaries:**

**Server Components (Data Fetching Layer):**

- All page routes (`page.tsx` files) are Server Components by default
- Fetch data server-side using API clients (`bandsintown.ts`, `shopify.ts`, `sanity.ts`)
- Pass data down to presentation components as props
- No client-side JavaScript for data fetching

**Client Components (Interactivity Layer):**

- Forms: `booking-form.tsx`, `contact-form.tsx` (React Hook Form)
- Cart (if implemented): Client-side localStorage state
- Interactive widgets: Any component needing onClick, useState, useEffect

**Presentation Components (Can be Server or Client):**

- `tour-dates.tsx`: Server Component receiving events as props
- `merch-grid.tsx`: Server Component receiving products as props
- `spotify-embed.tsx`, `youtube-embed.tsx`: Client Components (iframe interaction)

**Component Communication Pattern:**

```typescript
// Server Component (page.tsx) fetches data
export default async function KonserterPage() {
  const events = await getBandsinownEvents(); // Server-side fetch
  return <TourDates events={events} />; // Pass data as props
}

// Presentation Component receives data
export function TourDates({ events }: { events: BandsinownEvent[] }) {
  // No data fetching, pure presentation
  return <div>{/* Render events */}</div>;
}
```

**Service Boundaries:**

**API Client Layer** (`src/lib/`):

- Encapsulates all external API communication
- Returns typed data or ApiError
- Handles caching, timeouts, error recovery
- No direct fetch calls from components

**Validation Layer:**

- Zod schemas co-located with API clients or forms
- Validates API responses before returning to components
- Validates form input before submission

**Message Layer** (`src/lib/messages.ts`):

- Centralized Norwegian UI strings
- Imported by components for user-facing text
- Single source of truth for all error/success messages

**Data Boundaries:**

**No Database** (Content managed externally):

- Sanity CMS handles all content storage
- Shopify handles product/inventory data
- Bandsintown handles tour date data
- No server-side database needed

**Caching Layer:**

- Next.js built-in fetch cache with revalidation
- ISR cache invalidation via webhook
- localStorage for client-side cart state

**Data Flow:**

```
External Sources → API Clients → Server Components → Client Components → User

Sanity CMS ──────┐
                 │
Bandsintown API ─┼──> src/lib/*.ts ──> page.tsx ──> Components ──> Browser
                 │       (caching)      (SSG/ISR)     (props)
Shopify API ─────┘

User Forms ──> Client Components ──> /api/contact ──> Email Service
                                      /api/booking
```

### Requirements to Structure Mapping

**Music Discovery & Showcase (FR1-FR5):**

- **Page**: `src/app/musikk/page.tsx`
- **Components**: `src/components/spotify-embed.tsx`, `src/components/youtube-embed.tsx`
- **CMS Content**: Artist bio, featured tracks (via Sanity)

**Tour & Event Information (FR6-FR9):**

- **Page**: `src/app/konserter/page.tsx`
- **API Client**: `src/lib/bandsintown.ts`
- **Component**: `src/components/tour-dates.tsx`
- **Types**: `src/types/Bandsintown.types.ts`

**Merchandise Management (FR10-FR15):**

- **Page**: `src/app/merch/page.tsx`
- **API Client**: `src/lib/shopify.ts`
- **Component**: `src/components/merch-grid.tsx`
- **Types**: `src/types/Shopify.types.ts`
- **Cart**: Client-side localStorage (if needed beyond Shopify redirect)

**Artist Information & Bio (FR16-FR20):**

- **Page**: `src/app/om-oss/page.tsx`
- **API Client**: `src/lib/sanity.ts`
- **CMS Content**: Full artist bio, AI meets bygdemusikk story, social links

**Booking & Contact Management (FR21-FR25):**

- **Page**: `src/app/kontakt/page.tsx`
- **Components**: `src/components/booking-form.tsx`, `src/components/contact-form.tsx`
- **API Routes**: `src/app/api/booking/route.ts`, `src/app/api/contact/route.ts`
- **Middleware**: `src/middleware.ts` (CSRF, rate limiting)

**Press Kit & Media Resources (FR26-FR31):**

- **Page**: `src/app/arrangor/page.tsx`
- **CMS Content**: Press materials, high-res photos, tech rider (via Sanity)
- **Static Assets**: `public/images/press/` for downloadable images

**Content Management (FR32-FR40):**

- **API Client**: `src/lib/sanity.ts`
- **Webhook**: `src/app/api/revalidate/route.ts`
- **CMS**: External Sanity Studio (separate deployment)

**Navigation & Site Structure (FR41-FR46):**

- **Layout**: `src/app/layout.tsx` (root layout with navigation)
- **Component**: `src/components/navigation.tsx`
- **Metadata**: Page-specific `metadata.ts` files in each route
- **Error Pages**: `src/app/error.tsx`, `src/app/not-found.tsx`

**Discovery & SEO (FR47-FR51):**

- **SEO Utilities**: `src/lib/seo.ts` (structured data helpers)
- **Sitemap**: `src/app/sitemap.ts` (dynamic generation)
- **Robots**: `src/app/robots.ts` or `public/robots.txt`
- **Meta Tags**: `src/app/layout.tsx` + page-specific metadata
- **Language**: `<html lang="nb-NO">` in root layout

### Cross-Cutting Concerns

**Norwegian Localization:**

- **Messages**: `src/lib/messages.ts` (all Norwegian UI strings)
- **Date Formatting**: `src/lib/formatDate.ts` (Norwegian locale)
- **URL Structure**: Norwegian folder names (`musikk/`, `konserter/`, etc.)
- **Meta Tags**: Norwegian language tags in all metadata
- **Error Messages**: Norwegian error strings from centralized messages

**Performance Optimization:**

- **Image Optimization**: Next.js `<Image>` component (automatic)
- **Font Optimization**: `next/font` in `src/app/layout.tsx`
- **Code Splitting**: Automatic per route
- **Lazy Loading**: YouTube embed with intersection observer
- **Caching**: ISR + fetch revalidation

**Security:**

- **Middleware**: `src/middleware.ts` (rate limiting for forms)
- **Environment Variables**: `.env.local` (server-only API keys)
- **CSRF Protection**: Token validation in form API routes
- **CSP Headers**: `next.config.js` configuration

**Accessibility (WCAG 2.1 AA):**

- **Semantic HTML**: All components use semantic elements
- **ARIA Labels**: shadcn/ui components include ARIA
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Focus Management**: Proper focus indicators
- **Alt Text**: All images include descriptive alt attributes

### Integration Points

**Internal Communication:**

**Server Component → API Client:**

```typescript
// src/app/konserter/page.tsx
const events = await getBandsinownEvents(); // Direct function call server-side
```

**Client Component → API Route:**

```typescript
// src/components/booking-form.tsx
const response = await fetch("/api/booking", {
  method: "POST",
  body: JSON.stringify(formData),
});
```

**Server Component → Client Component:**

```typescript
// Props-based data passing
<TourDates events={events} /> // Pass server-fetched data to client component
```

**External Integrations:**

**Sanity CMS → ISR Webhook:**

1. Content updated in Sanity Studio
2. Webhook POST to `/api/revalidate?secret=XXX&path=/musikk`
3. Next.js revalidates cached page
4. Fresh content appears within 30s

**Form Submissions → Email Service:**

1. User submits booking form
2. `POST /api/booking`
3. API route validates with Zod
4. Sends email via email service (SendGrid, Resend, etc.)
5. Returns Norwegian success/error message

**Shopify Checkout Flow:**

1. User adds product to cart (localStorage)
2. User clicks checkout
3. Redirect to Shopify hosted checkout URL
4. Shopify handles payment (PCI compliant)
5. Redirect back to success page

**Data Flow:**

```
External Sources → API Clients → Server Components → Client Components → User

Sanity CMS ──────┐
                 │
Bandsintown API ─┼──> src/lib/*.ts ──> page.tsx ──> Components ──> Browser
                 │       (caching)      (SSG/ISR)     (props)
Shopify API ─────┘

User Forms ──> Client Components ──> /api/contact ──> Email Service
                                      /api/booking
```

### File Organization Patterns

**Configuration Files:**

- **Root level**: `package.json`, `next.config.js`, `tailwind.config.ts`, `tsconfig.json`, `components.json`
- **Environment**: `.env.local` (gitignored), `.env.example` (template)
- **TypeScript**: `tsconfig.json` with strict mode, path aliases (`@/*`)

**Source Organization:**

- **`src/app/`**: Pages and API routes (Next.js App Router convention)
- **`src/components/`**: Reusable React components
  - `ui/`: shadcn/ui components
  - Root: Feature components, forms, widgets
- **`src/lib/`**: Utilities, API clients, helpers (non-React code)
- **`src/types/`**: Shared TypeScript types

**Asset Organization:**

- **`public/`**: Static assets served from root
  - `images/`: Image files
  - `press/`: Press kit downloadable assets
  - `favicon.ico`, `robots.txt`

### Development Workflow Integration

**Development Server Structure:**

1. Run `npm run dev` → Turbopack starts on `localhost:3000`
2. Pages in `src/app/` hot reload automatically
3. Environment variables loaded from `.env.local`
4. API routes available at `/api/*`
5. TypeScript type checking in editor (VS Code)

**Build Process Structure:**

1. `npm run build` → Next.js production build
2. Static pages generated via SSG
3. API routes bundled as serverless functions
4. Assets optimized (images, fonts, CSS)
5. Output to `.next/` directory

**Deployment Structure (Vercel):**

1. Push to `main` branch → Automatic Vercel deployment
2. `.env.local` → Vercel Environment Variables (via dashboard)
3. Serverless functions deployed from `src/app/api/`
4. Static assets served from CDN
5. ISR cache managed by Vercel edge network

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**

All architectural decisions are fully compatible and work together seamlessly:

- **Frontend Stack**: Next.js 15 (App Router + Server Components) + React 19 + TypeScript 5 are the current stable releases designed to work together
- **Styling**: Tailwind CSS v4 + shadcn/ui are specifically designed for Next.js integration with zero conflicts
- **Validation**: Zod + React Hook Form are the standard pairing in the Next.js ecosystem
- **Deployment**: Vercel + Next.js is the optimal pairing (same company, native support)
- **API Integrations**: Widget approach (Spotify, YouTube) eliminates authentication complexity; API clients (Bandsintown, Shopify, Sanity) have no conflicting requirements
- **No version conflicts identified**: All chosen technologies are current, maintained, and production-ready

**Pattern Consistency:**

Implementation patterns fully support architectural decisions:

- **Naming Conventions**: TypeScript camelCase/PascalCase patterns align perfectly with Next.js and React conventions
- **Norwegian URLs**: Next.js App Router file-based routing naturally supports folder names as URLs (`musikk/`, `konserter/`)
- **Server Components Default**: Pattern matches Next.js 15 best practices for performance
- **Centralized Messages**: Norwegian UI strings in `src/lib/messages.ts` follows i18n best practices
- **Error Handling**: ApiError type provides consistent structure across all 3 API integrations
- **Form Patterns**: React Hook Form + Zod resolver is the established pattern in modern Next.js applications

**Structure Alignment:**

Project structure perfectly supports all architectural decisions:

- **`src/app/` Organization**: Follows Next.js App Router conventions exactly (layout, page, loading, error, metadata files)
- **Component Boundaries**: Clear separation between `components/` (presentation) and `lib/` (business logic)
- **API Client Layer**: `src/lib/` location for API clients separates data fetching from components (Server Component pattern)
- **Type Organization**: `src/types/` for shared types supports TypeScript strict mode across the project
- **Middleware Placement**: `src/middleware.ts` at root level is correct for Edge middleware
- **Norwegian Route Structure**: Folder-based routing enables SEO-friendly Norwegian URLs without custom rewrites

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**

All 9 functional requirement categories have complete architectural support:

1. **Music Discovery & Showcase (FR1-FR5)**: `/musikk` page + Spotify/YouTube widget components + Sanity CMS content
2. **Tour & Event Information (FR6-FR9)**: `/konserter` page + `bandsintown.ts` API client + tour display component
3. **Merchandise Management (FR10-FR15)**: `/merch` page + `shopify.ts` API client + product grid component + localStorage cart
4. **Artist Information & Bio (FR16-FR20)**: `/om-oss` page + Sanity CMS for full artist bio and story
5. **Booking & Contact Management (FR21-FR25)**: `/kontakt` page + booking/contact forms + API routes + CSRF/rate limiting middleware
6. **Press Kit & Media Resources (FR26-FR31)**: `/arrangor` page + Sanity CMS + `public/images/press/` for downloadable assets
7. **Content Management (FR32-FR40)**: Sanity CMS client + `/api/revalidate` webhook + ISR for sub-30s updates
8. **Navigation & Site Structure (FR41-FR46)**: Root layout + navigation component + metadata per page + error boundaries
9. **Discovery & SEO (FR47-FR51)**: SEO utilities + sitemap generation + structured data helpers + nb-NO language tags

**Cross-cutting requirements fully addressed:**

- Norwegian localization: Centralized messages, date formatting, URL structure, meta tags
- Responsive design: Tailwind CSS mobile-first + shadcn/ui responsive components
- Accessibility: WCAG 2.1 AA via shadcn/ui + semantic HTML patterns

**Functional Requirements Coverage:**

All 51 functional requirements mapped to specific architectural components with implementation path defined.

**Non-Functional Requirements Coverage:**

- **NFR-P1 to NFR-P4 (Performance)**:

  - < 2s load: SSG + ISR + widget embeds (no heavy API processing)
  - Core Web Vitals: Next.js Image optimization + code splitting + Vercel Analytics monitoring
  - API caching: 1hr (Bandsintown), 5min (Shopify), webhook ISR (Sanity)
  - Build performance: < 5min with Next.js optimizations

- **NFR-S1 to NFR-S4 (Security)**:

  - HTTPS: Vercel automatic SSL
  - API keys: `.env.local` server-only variables, `NEXT_PUBLIC_*` pattern for client-safe
  - CSRF: Token validation in form API routes
  - Rate limiting: Edge middleware (5 submissions/IP/hour)

- **NFR-A1 to NFR-A5 (Accessibility)**:

  - WCAG 2.1 AA: shadcn/ui components built on Radix UI (accessible by default)
  - Screen readers: Semantic HTML + ARIA labels
  - Keyboard navigation: All interactive elements keyboard accessible
  - Focus management: Proper focus indicators in shadcn/ui

- **NFR-I1 to NFR-I5 (Integration Reliability)**:

  - Graceful degradation: ApiError type with fallback data
  - Timeouts: 5s max via `AbortSignal.timeout(5000)`
  - ISR updates: Sanity webhook triggers revalidation within 30s
  - Error handling: Norwegian error messages with fallback to cached data

- **NFR-R1 to NFR-R4 (Availability)**:
  - 99.9% uptime: Vercel platform SLA
  - Error monitoring: Vercel Analytics, optional Sentry
  - Browser compatibility: Modern browsers only (latest Chrome, Firefox, Safari, Edge)
  - Norwegian error messages: Centralized in `src/lib/messages.ts`

### Implementation Readiness Validation ✅

**Decision Completeness:**

All critical decisions documented with specific versions and rationale:

- **Starter Template**: `create-next-app` with specific CLI flags documented
- **Technology Stack**: Next.js 15, React 19, TypeScript 5+, Tailwind CSS v4, shadcn/ui (all current stable)
- **API Strategy**: Widget embeds (Spotify, YouTube) + API clients (Bandsintown, Shopify, Sanity)
- **Caching Strategy**: Next.js fetch revalidation with specific times per API
- **Form Validation**: Zod schemas with React Hook Form integration
- **Deployment**: Vercel auto-deploy on git push
- **Monitoring**: Vercel Analytics for Core Web Vitals

**Structure Completeness:**

Complete project structure with all files and directories specified:

- **7 page routes**: All Norwegian URL folders defined (`musikk/`, `konserter/`, `merch/`, `om-oss/`, `kontakt/`, `arrangor/`, plus home)
- **4 API routes**: All endpoints specified (`/api/contact`, `/api/booking`, `/api/revalidate`, optional `/api/bandsintown`)
- **10+ components**: All feature components listed (forms, widgets, displays, navigation, footer)
- **3 API clients**: All integration modules specified (`bandsintown.ts`, `shopify.ts`, `sanity.ts`)
- **4 type files**: All shared type definitions listed (`ApiError`, `Bandsintown`, `Shopify`, `Sanity`)
- **Utilities**: All helper modules defined (`messages.ts`, `formatDate.ts`, `seo.ts`, `utils.ts`)

**Pattern Completeness:**

Comprehensive implementation patterns with examples:

- **Naming**: 6 categories covered (components, routes, utilities, types, APIs, Norwegian content)
- **Structure**: Project organization, type organization clearly defined
- **Formats**: API responses, data exchange, date/time, booleans, null handling
- **Communication**: Server/Client patterns, state management, form submission
- **Processes**: Error handling, loading states, caching/revalidation
- **Enforcement**: 9 mandatory rules for AI agents + pattern enforcement mechanisms
- **Examples**: 5 good examples + 5 anti-patterns with code snippets

### Gap Analysis Results

**No Critical Gaps Identified** ✅

The architecture is complete and ready for implementation. All requirements have architectural support, all decisions are documented, and all patterns are defined.

**Minor Enhancement Opportunities** (Non-blocking, can be addressed during implementation):

1. **Email Service Selection**: Form API routes (`/api/contact`, `/api/booking`) will send emails, but specific service (SendGrid, Resend, Postmark) not chosen

   - **Why Deferred**: Service selection doesn't affect architecture; can be decided when implementing form endpoints
   - **Implementation Guidance**: Choose provider based on pricing/features during Epic implementation

2. **Sanity CMS Schema Design**: Content types for artist bio, press materials, etc. will need Sanity schema definitions

   - **Why Deferred**: Schema design is content modeling, not architectural; Sanity flexibility allows iteration
   - **Implementation Guidance**: Design schemas based on actual content needs during CMS setup story

3. **Specific shadcn/ui Components**: Only `button`, `card`, `form`, `input`, `label` explicitly listed; other components will be needed
   - **Why Deferred**: shadcn/ui components are added on-demand via CLI
   - **Implementation Guidance**: Run `npx shadcn@latest add [component]` as needed during development

**Assessment**: These deferrals are intentional and appropriate. The architecture provides clear guidance on where and how these decisions will be made without over-specifying implementation details.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed (51 FRs + all NFRs documented)
- [x] Scale and complexity assessed (Low complexity with sophisticated integrations)
- [x] Technical constraints identified (Next.js required, Norwegian URLs, 5 API integrations)
- [x] Cross-cutting concerns mapped (7 categories: localization, performance, security, accessibility, API resilience, SEO, CMS workflow)

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions (Next.js 15, React 19, TypeScript 5+, Tailwind v4, shadcn/ui latest)
- [x] Technology stack fully specified (complete starter command + all dependencies)
- [x] Integration patterns defined (Widget approach + API clients with ApiError type)
- [x] Performance considerations addressed (ISR, caching strategy, Core Web Vitals monitoring)

**✅ Implementation Patterns**

- [x] Naming conventions established (6 categories with examples)
- [x] Structure patterns defined (hybrid type organization, Server Components default)
- [x] Communication patterns specified (Server Component → API client, Client Component → API route)
- [x] Process patterns documented (error handling, loading states, caching/revalidation)

**✅ Project Structure**

- [x] Complete directory structure defined (all files and folders from root to leaves)
- [x] Component boundaries established (Server vs Client Components, API client layer)
- [x] Integration points mapped (Sanity webhook, form submissions, Shopify checkout)
- [x] Requirements to structure mapping complete (all 9 FR categories mapped to specific files)

### Architecture Readiness Assessment

**Overall Status:** ✅ **READY FOR IMPLEMENTATION**

**Confidence Level:** **HIGH**

Based on validation results, this architecture provides comprehensive guidance for consistent AI-agent implementation with no critical gaps or blocking issues.

**Key Strengths:**

1. **Complete Technology Decisions**: Every layer of the stack is specified with versions (Next.js 15, React 19, TypeScript 5+, Tailwind v4, shadcn/ui)
2. **Clear Implementation Patterns**: Comprehensive naming, structure, format, and process patterns with code examples
3. **Widget Strategy**: Simplified architecture by using Spotify/YouTube embeds instead of complex API integrations
4. **Norwegian-First Design**: URL structure, messages, date formatting, and SEO all designed for Norwegian audience
5. **Performance-Optimized**: SSG/ISR strategy meets aggressive NFRs (< 2s load, Core Web Vitals compliance)
6. **Accessibility Built-In**: shadcn/ui choice ensures WCAG 2.1 AA compliance from day one
7. **Complete Requirements Coverage**: All 51 FRs mapped to specific architectural components
8. **Vercel-Optimized**: Deployment strategy leverages platform capabilities (auto-deploy, ISR, Edge middleware)

**Areas for Future Enhancement** (Post-MVP):

1. **Advanced Error Tracking**: Add Sentry if production error patterns warrant detailed tracking
2. **Testing Framework**: Add Vitest/Playwright when complexity justifies comprehensive test coverage
3. **Advanced State Management**: Add Zustand only if client-side state complexity grows beyond forms/cart
4. **Performance Monitoring**: Enhance beyond Vercel Analytics if deeper insights needed
5. **Internationalization**: If expanding beyond Norwegian market, implement i18n framework (next-intl)

### Implementation Handoff

**AI Agent Guidelines:**

- **Follow all architectural decisions exactly as documented**: Technology versions, patterns, and structure are prescriptive
- **Use implementation patterns consistently**: Naming, error handling, and component patterns must be uniform across all code
- **Respect project structure and boundaries**: Server vs Client Components, API client layer separation, Norwegian route folders
- **Refer to this document for all architectural questions**: This is the source of truth for all implementation decisions

**First Implementation Priority:**

Initialize the project using the documented starter template command:

```bash
# Step 1: Create Next.js project with TypeScript, Tailwind, App Router
npx create-next-app@latest breizaas-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Step 2: Initialize shadcn/ui (run inside project directory)
cd breizaas-website
npx shadcn@latest init

# Step 3: Add initial shadcn/ui components
npx shadcn@latest add button card form input label
```

After initialization, the implementation sequence follows the order defined in **Decision Impact Analysis → Implementation Sequence** (architecture.md:545-579):

1. Project Initialization (commands above)
2. Norwegian URL Structure (create route folders)
3. API Client Layer (implement `bandsintown.ts`, `shopify.ts`, `sanity.ts`)
4. Widget Components (Spotify, YouTube embeds)
5. Page Implementation (all 7 routes with SSG/ISR)
6. Form Implementation (contact, booking with validation)
7. Sanity Webhook (ISR trigger endpoint)
8. Monitoring & Deployment (Vercel Analytics, environment variables)

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2025-12-21
**Document Location:** \_bmad-output/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**

- 15+ architectural decisions made (technology stack, API strategy, caching, forms, deployment, monitoring)
- 25+ implementation patterns defined (naming, structure, formats, communication, processes)
- 30+ architectural components specified (7 pages, 4 APIs, 10+ components, 3 API clients, 4 type files)
- 51 functional requirements + all NFRs fully supported

**📚 AI Agent Implementation Guide**

- Technology stack with verified versions (Next.js 15, React 19, TypeScript 5+, Tailwind v4, shadcn/ui)
- Consistency rules that prevent implementation conflicts (9 mandatory rules + enforcement mechanisms)
- Project structure with clear boundaries (Server/Client Components, API client layer)
- Integration patterns and communication standards (ApiError type, centralized messages)

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing Breizaas. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**

```bash
# Step 1: Create Next.js project with TypeScript, Tailwind, App Router
npx create-next-app@latest breizaas-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Step 2: Initialize shadcn/ui (run inside project directory)
cd breizaas-website
npx shadcn@latest init

# Step 3: Add initial shadcn/ui components
npx shadcn@latest add button card form input label
```

**Development Sequence:**

1. Initialize project using documented starter template
2. Set up development environment per architecture (Norwegian URL folders, environment variables)
3. Implement core architectural foundations (API clients, widget components, messages file)
4. Build features following established patterns (pages with SSG/ISR, forms with validation)
5. Maintain consistency with documented rules (naming, error handling, component patterns)

### Quality Assurance Checklist

**✅ Architecture Coherence**

- [x] All decisions work together without conflicts
- [x] Technology choices are compatible (Next.js 15 + React 19 + TypeScript 5+ + Tailwind v4 + shadcn/ui)
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**

- [x] All functional requirements are supported (51 FRs across 9 categories)
- [x] All non-functional requirements are addressed (Performance, Security, Accessibility, Integration, Availability)
- [x] Cross-cutting concerns are handled (Norwegian localization, performance, security, accessibility)
- [x] Integration points are defined (Sanity webhook, form submissions, Shopify checkout)

**✅ Implementation Readiness**

- [x] Decisions are specific and actionable (versions specified, commands documented)
- [x] Patterns prevent agent conflicts (comprehensive examples with anti-patterns)
- [x] Structure is complete and unambiguous (all files and folders defined)
- [x] Examples are provided for clarity (5 good examples + 5 anti-patterns)

### Project Success Factors

**🎯 Clear Decision Framework**
Every technology choice was made collaboratively with clear rationale, ensuring all stakeholders understand the architectural direction.

**🔧 Consistency Guarantee**
Implementation patterns and rules ensure that multiple AI agents will produce compatible, consistent code that works together seamlessly.

**📋 Complete Coverage**
All project requirements are architecturally supported, with clear mapping from business needs to technical implementation.

**🏗️ Solid Foundation**
The chosen starter template and architectural patterns provide a production-ready foundation following current best practices.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.
