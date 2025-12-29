# Breizaas Website

Professional artist website for Breizaas, an AI-generated Norwegian bygdemusikk artist with 125,000 monthly Spotify listeners.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS v4 with V11 Warm Brown design system
- **Components:** shadcn/ui (Radix UI primitives)
- **Fonts:** Geist Sans & Geist Mono

## V11 Design System

The website uses a custom "V11 Warm Brown + Clean Vintage" color palette designed to evoke Norwegian cabin warmth with sophisticated party energy:

### Color Utilities

- **Backgrounds:** `bg-brown-dark`, `bg-brown-base`, `bg-brown-light`
- **Surfaces:** `bg-cream-base`, `bg-cream-warm`, `bg-beige`
- **Accents:** `text-gold-champagne`, `text-purple-vibrant`, `text-amber-glow`
- **Typography:** `text-text-primary`, `text-text-secondary`, `text-text-muted`
- **Effects:** `golden-glow`, `purple-glow`

See `src/app/globals.css` for the complete color palette.

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Fill in required API keys in `.env.local` (see Environment Variables section)

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the site

### Environment Variables

Create a `.env.local` file based on `.env.example` and configure:

**Server-only variables (never exposed to client):**
- `BANDSINTOWN_APP_ID` - For tour dates integration
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - For merchandise store
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
- `SANITY_API_TOKEN` - For CMS content management
- `SANITY_WEBHOOK_SECRET` - For Sanity webhooks

**Public variables (safe for client-side):**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (usually "production")

**Important:** Never commit `.env.local` to version control!

## Project Structure

```
breizaas-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Tailwind + V11 theme configuration
│   │   ├── layout.tsx          # Root layout (Norwegian meta tags)
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── .env.example                # Environment variable template
├── .env.local                  # Local environment variables (gitignored)
├── components.json             # shadcn/ui configuration
├── package.json
├── tsconfig.json               # TypeScript configuration
└── README.md
```

## Development Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
npx tsc --noEmit # Check TypeScript errors
```

## Norwegian URL Structure

All routes use Norwegian folder names to maintain cultural authenticity:

- ✅ `src/app/musikk/page.tsx` (correct)
- ❌ `src/app/music/page.tsx` (incorrect)

## Naming Conventions

- **React Components:** PascalCase (`SpotifyEmbed.tsx`)
- **Utility files:** camelCase (`formatDate.ts`)
- **Route folders:** kebab-case Norwegian (`om-oss/`)

## TypeScript Guidelines

- Strict mode enabled
- No `any` types without explicit justification
- Proper type definitions required for all props and functions

## Contributing

When adding new features:

1. Use Server Components by default (only add "use client" when necessary)
2. Follow V11 color palette guidelines (no pure white/black)
3. Maintain Norwegian URL structure
4. Ensure WCAG 2.1 AA accessibility compliance
5. Test color contrast ratios for all text/background combinations

## Accessibility

All color combinations must meet WCAG 2.1 AA standards (4.5:1 contrast ratio). The V11 warm color palette has been designed with accessibility in mind.

## License

© Breizaas. All rights reserved.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
