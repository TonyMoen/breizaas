# Breizaas

**AI Meets Bygdemusikk** | [breizaas.no](https://breizaas.no)

Breizaas is a pioneering AI-generated Norwegian bygdemusikk artist, proving that artificial intelligence can compose and produce genuine, culturally resonant Norwegian folk and celebration music. With **125,000+ monthly Spotify listeners**, Breizaas bridges the gap between tradition and technology.

---

## What We Do

Breizaas creates authentic Norwegian traditional music powered by AI -- from lively party tracks to heartfelt folk melodies. Every release is rooted in the spirit of Norwegian bygdekultur, reimagined through cutting-edge technology.

## The Website

The official website at [breizaas.no](https://breizaas.no) is the home for everything Breizaas:

- **Musikk** -- Stream our music, explore the discography, and watch music videos
- **Konserter** -- Upcoming tour dates and live show information
- **Om Oss** -- The story behind Breizaas, artist stats, and achievements
- **Merch** -- Official merchandise store
- **Arrangor** -- Press kit, technical rider, and booking info for event organizers
- **Kontakt** -- Get in touch

## Listen

[![Spotify](https://img.shields.io/badge/Spotify-125K%2B%20Monthly%20Listeners-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](https://open.spotify.com/artist/breizaas)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 with App Router, React 19 |
| **Language** | TypeScript 5 (strict mode) |
| **Styling** | Tailwind CSS v4 -- custom "V11 Warm Brown" design system |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **CMS** | Sanity with portable text & live preview |
| **E-commerce** | Shopify Storefront API |
| **Tour Dates** | Bandsintown API |
| **Email** | Resend |
| **Forms** | React Hook Form + Zod validation |
| **Fonts** | Inter, Trade Winds, Montserrat |

## Project Structure

```
breizaas-website/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── globals.css             # V11 color system & @theme config
│   │   ├── layout.tsx              # Root layout (nb-NO, fonts, metadata)
│   │   ├── page.tsx                # Homepage
│   │   ├── musikk/                 # Music & discography
│   │   ├── konserter/              # Tour dates & concerts
│   │   ├── om-oss/                 # About the artist
│   │   ├── merch/                  # Shopify merchandise store
│   │   ├── arrangor/               # Press kit & booking for organizers
│   │   ├── kontakt/                # Contact form
│   │   ├── api/                    # API routes
│   │   └── studio/                 # Sanity CMS studio
│   ├── components/                 # React components
│   │   ├── hero.tsx                # Hero section
│   │   └── ui/                     # shadcn/ui components
│   └── lib/                        # Utilities & API clients
├── public/                         # Static assets & images
├── sanity/                         # Sanity schema & config
└── package.json
```

> All routes use Norwegian folder names (`/musikk`, `/konserter`, `/om-oss`) to maintain cultural authenticity.

---

Copyright &copy; 2025-2026 Breizaas. All rights reserved.

Unauthorized use, reproduction, or distribution of this project or any of its contents is strictly prohibited.
