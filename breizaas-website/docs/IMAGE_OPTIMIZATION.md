# Image Optimization Patterns for Breizaas Website

This document provides comprehensive guidelines for using Next.js Image optimization in the Breizaas website to maintain Core Web Vitals performance.

## Why Image Optimization Matters

- **LCP (Largest Contentful Paint)**: Images are often the LCP element - poor optimization hurts rankings
- **CLS (Cumulative Layout Shift)**: Images without dimensions cause layout shift
- **Performance Score**: Unoptimized images dramatically reduce Lighthouse scores
- **Bundle Size**: WebP/AVIF formats reduce file sizes 30-50% vs JPEG/PNG
- **Norwegian 3G Users**: Mobile-first audience needs fast image loading

## Next.js Image Component Basics

Next.js `next/image` automatically provides:
- ✅ Automatic WebP/AVIF format conversion (when browser supports)
- ✅ Lazy loading by default (below-fold images)
- ✅ Responsive srcset generation (different sizes per breakpoint)
- ✅ Automatic image optimization and caching
- ✅ Layout shift prevention (when width/height specified)

## Pattern 1: Above-Fold Images (Hero, First Album Artwork)

**Use Case:** Images visible immediately on page load (hero backgrounds, first album cover)

**Critical:** Use `priority` prop to preload and prevent lazy loading

```tsx
import Image from 'next/image';

// Hero background image (if added in future)
<Image
  src="/images/hero-background.jpg"
  alt="Breizaas - AI møter norsk bygdemusikk"
  width={1920}
  height={1080}
  priority // CRITICAL: Prevents lazy loading, optimizes LCP
  sizes="100vw" // Full viewport width on all screens
  className="absolute inset-0 object-cover"
/>

// First album artwork in music grid
<Image
  src="/images/albums/first-album-cover.jpg"
  alt="Albumcover for [album navn]"
  width={600}
  height={600}
  priority // First visible album should preload
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

**Why `priority`?**
- Tells Next.js to preload this image (adds `<link rel="preload">`)
- Prevents lazy loading delay for critical LCP images
- Only use on 1-2 images per page (the most critical ones)

## Pattern 2: Below-Fold Images (Lazy Loading)

**Use Case:** Images further down the page (album grids, press photos, tour history)

**Default Behavior:** Next.js lazy loads by default - no `priority` prop needed

```tsx
import Image from 'next/image';

// Album artwork in grid (below first row)
<Image
  src="/images/albums/album-cover-2.jpg"
  alt="Albumcover for Festlåter vol. 2"
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  // No priority = automatic lazy loading when scrolled into view
/>

// Press kit photo
<Image
  src="/images/press/breizaas-portrait.jpg"
  alt="Pressefoto av Breizaas"
  width={800}
  height={600}
  quality={90} // Higher quality for press photos (default is 75)
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

**Lazy Loading Benefits:**
- Only loads images when user scrolls near them
- Reduces initial page load time
- Saves bandwidth for mobile users
- Improves INP (less JavaScript execution on load)

## Pattern 3: Responsive Images with Multiple Breakpoints

**Use Case:** Images that change size based on screen width (grid layouts, responsive containers)

**Key:** Use `sizes` attribute to tell browser which image size to load

```tsx
import Image from 'next/image';

// Product grid (merch page)
<Image
  src="/images/merch/tshirt-black.jpg"
  alt="Breizaas t-skjorte (svart)"
  width={600}
  height={800}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  // Mobile: Full width
  // Tablet: 50% width (2 columns)
  // Desktop: 33% width (3 columns)
/>

// Tour date venue photo
<Image
  src="/images/venues/venue-oslo.jpg"
  alt="Konsertsted i Oslo"
  width={800}
  height={450}
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
  className="rounded-lg"
/>
```

**How `sizes` Works:**
- Tells browser the rendered size at each breakpoint
- Browser downloads optimal image size (not full resolution on mobile)
- Matches Tailwind breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

## Pattern 4: Fixed Size Images (Icons, Logos, Thumbnails)

**Use Case:** Images with consistent size across all screens (social icons, small thumbnails)

```tsx
import Image from 'next/image';

// Social media icon
<Image
  src="/images/icons/spotify-icon.svg"
  alt="Spotify"
  width={32}
  height={32}
  // No sizes needed - fixed size
/>

// Small album thumbnail in player
<Image
  src="/images/albums/thumbnail-small.jpg"
  alt="Nå spilles: [låtnavn]"
  width={64}
  height={64}
/>
```

## Pattern 5: Aspect Ratio Containers (Prevent CLS)

**Use Case:** Dynamic content like Spotify/YouTube embeds that load asynchronously

**Critical:** Reserve space BEFORE content loads to prevent layout shift

```tsx
// Spotify embed container (Epic 2)
<div className="aspect-video w-full bg-brown-medium rounded-lg overflow-hidden">
  <iframe
    src="https://open.spotify.com/embed/..."
    width="100%"
    height="100%"
    frameBorder="0"
    allow="encrypted-media"
    title="Spotify Player - Breizaas"
  />
</div>

// YouTube embed container (Epic 2)
<div className="aspect-video w-full rounded-lg overflow-hidden">
  <iframe
    src="https://www.youtube.com/embed/..."
    width="100%"
    height="100%"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="YouTube Video - Breizaas"
  />
</div>
```

**Why This Matters:**
- `aspect-video` (16:9 ratio) reserves exact space before iframe loads
- Prevents CLS when embed appears
- Maintains CLS < 0.1 target

## Norwegian Alt Text Best Practices

**All images MUST have descriptive Norwegian alt text** for:
- Accessibility (screen readers)
- SEO (Google indexes alt text)
- Context when images fail to load

```tsx
// ✅ GOOD - Descriptive Norwegian alt text
<Image
  src="/albums/festlater-vol-1.jpg"
  alt="Albumcover for Festlåter Vol. 1 - Breizaas"
  width={400}
  height={400}
/>

<Image
  src="/press/live-performance.jpg"
  alt="Breizaas live på Storås Festival 2024"
  width={800}
  height={600}
/>

// ❌ BAD - Generic or English alt text
<Image
  src="/albums/album.jpg"
  alt="Album" // Too generic
  width={400}
  height={400}
/>

<Image
  src="/press/photo.jpg"
  alt="Artist photo" // Not in Norwegian
  width={800}
  height={600}
/>
```

**Alt Text Template:**
- Album covers: "Albumcover for [album navn]"
- Press photos: "Pressefoto av Breizaas [context]"
- Live photos: "Breizaas live på [venue/festival] [year]"
- Merch: "Breizaas [product type] ([color/variant])"

## Quality Settings

**Default Quality:** 75 (good balance of size vs visual quality)

**When to Adjust:**

```tsx
// High quality for press kit downloads (90)
<Image
  src="/press/high-res-portrait.jpg"
  alt="Høyoppløselig pressefoto av Breizaas"
  width={2400}
  height={1600}
  quality={90} // Higher quality for professional use
/>

// Lower quality for background textures (60)
<Image
  src="/textures/wood-grain-bg.jpg"
  alt=""
  width={1920}
  height={1080}
  quality={60} // Background texture can be lower quality
  className="opacity-20" // Further reduces need for high quality
/>
```

## Performance Checklist for Images

Before adding any image to the codebase, ensure:

- [ ] **Width and height specified** (prevents CLS)
- [ ] **`priority` prop on above-fold images** (optimizes LCP)
- [ ] **Appropriate `sizes` attribute** (responsive images)
- [ ] **Norwegian alt text** (accessibility + SEO)
- [ ] **Proper quality setting** (default 75, press photos 90)
- [ ] **No priority on below-fold images** (allows lazy loading)
- [ ] **Aspect ratio containers for embeds** (prevents CLS)

## Common Mistakes to Avoid

❌ **Don't use `<img>` tags directly**
```tsx
// ❌ WRONG - Bypasses Next.js optimization
<img src="/hero.jpg" alt="Hero" />

// ✅ CORRECT - Use Next.js Image
<Image src="/hero.jpg" alt="Hero" width={1200} height={800} />
```

❌ **Don't forget width/height** (causes CLS)
```tsx
// ❌ WRONG - No dimensions = layout shift
<Image src="/album.jpg" alt="Album" />

// ✅ CORRECT - Always specify dimensions
<Image src="/album.jpg" alt="Album" width={400} height={400} />
```

❌ **Don't use priority on all images**
```tsx
// ❌ WRONG - Too many priority images hurts performance
<Image src="/image1.jpg" priority />
<Image src="/image2.jpg" priority />
<Image src="/image3.jpg" priority />

// ✅ CORRECT - Only 1-2 critical images
<Image src="/hero.jpg" priority /> {/* Above fold */}
<Image src="/image2.jpg" /> {/* Lazy loads */}
<Image src="/image3.jpg" /> {/* Lazy loads */}
```

❌ **Don't use external images without configuration**
```tsx
// ❌ WRONG - External domains need configuration
<Image src="https://example.com/image.jpg" width={400} height={400} />

// ✅ CORRECT - Add domain to next.config.ts first
// In next.config.ts:
// images: {
//   remotePatterns: [
//     { protocol: 'https', hostname: 'example.com' }
//   ]
// }
```

## Testing Image Performance

After adding images, verify:

1. **Lighthouse Audit**
   - Run Lighthouse on the page
   - Check "Properly size images" passes
   - Check "Serve images in next-gen formats" passes
   - Check "Image elements have explicit width and height" passes

2. **Network Tab**
   - Open Chrome DevTools → Network
   - Reload page
   - Verify above-fold images load first (priority working)
   - Verify below-fold images lazy load on scroll

3. **Layout Shift Regions**
   - Open DevTools → Rendering → Layout Shift Regions
   - Reload page
   - Verify no blue regions appear during image load

4. **Core Web Vitals**
   - LCP should improve with optimized images
   - CLS should remain < 0.1 with proper dimensions
   - INP unaffected (images don't block interactions)

## Future Epic Guidance

**Epic 2 (Music):** Album artwork, Spotify embeds
- Use `priority` on first visible album cover
- Lazy load remaining album grid
- Aspect-ratio containers for Spotify iframes

**Epic 3 (Tour Dates):** Venue photos, event posters
- All lazy loaded (below fold)
- Responsive sizes for grid layout
- Quality 75 sufficient for venue photos

**Epic 4 (Merch):** Product photos, variant images
- First product `priority`, rest lazy load
- High quality (85-90) for product detail images
- Responsive sizes for grid → detail view

**Epic 5 (Contact/Press Kit):** High-res press photos
- Quality 90 for downloadable press photos
- Lazy load all images (press kit below fold)
- Provide download links for full-res versions

**Epic 6 (CMS):** Sanity-hosted images
- Use Sanity Image URLs with Next.js Image
- Configure `remotePatterns` for Sanity CDN
- Same optimization patterns apply

---

**Last Updated:** 2025-12-26
**Related Documents:** `PERFORMANCE_BASELINE.md`, `project-context.md`
**Performance Target:** LCP < 2.5s, CLS < 0.1, Performance Score ≥ 90
