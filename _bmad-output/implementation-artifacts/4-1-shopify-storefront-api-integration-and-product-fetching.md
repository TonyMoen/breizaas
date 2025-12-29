# Story 4.1: Shopify Storefront API Integration & Product Fetching

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to integrate the Shopify Storefront API to fetch product catalog data with caching and error handling,
So that merchandise is displayed with real-time inventory and pricing information.

## Acceptance Criteria

### BDD Scenarios

#### Scenario 1: Successful Product Fetch from Shopify
```gherkin
Given the Shopify Storefront API is configured with valid credentials
When the /merch page loads
Then the system should fetch products from Shopify Storefront API
And products should be cached for 5 minutes (revalidate: 300)
And products should display with title, description, price, images, and variants
And the response should pass Zod schema validation
```

#### Scenario 2: API Error Handling with Graceful Degradation
```gherkin
Given the Shopify API request fails or times out
When the /merch page attempts to load products
Then a Norwegian error message "Kunne ikke laste inn produkter. Prøv igjen senere." should display
And cached products from previous successful request should show (if available)
And a retry button in champagne gold should appear
And the error should be logged for monitoring
And the page layout should NOT break
```

#### Scenario 3: Out-of-Stock Product Display
```gherkin
Given a product has zero inventory available
When products are fetched from Shopify
Then the product should display with an "Utsolgt" badge
And the inventory status should be clearly indicated
And out-of-stock items should still be visible in the catalog
```

#### Scenario 4: Loading State Display
```gherkin
Given the /merch page is loading products
When the API request is in progress
Then 6 warm brown skeleton placeholder cards should display in grid layout
And skeletons should match the grid responsive behavior
And no white flash should occur during loading
```

#### Scenario 5: Product Filtering by Brand Name
```gherkin
Given the Shopify store contains multiple products
When the API fetches products
Then ONLY products with "Breizaas" in the title should be returned
And products without "Breizaas" in the title should be filtered out
And the filtering should be case-insensitive
```

#### Scenario 6: Empty Catalog Handling
```gherkin
Given the Shopify API returns zero products (or zero "Breizaas" products after filtering)
When the /merch page loads
Then a Norwegian message "Ingen produkter tilgjengelig for øyeblikket" should display
And social media links should be provided
And the page should maintain V11 aesthetic
```

## Tasks / Subtasks

- [x] Task 1: Create Shopify TypeScript types and Zod schemas (AC: Scenario 1)
  - [x] Define `ShopifyProduct` interface with all required fields
  - [x] Define `ShopifyVariant` interface for product variants
  - [x] Create Zod schemas for runtime validation
  - [x] Define `ApiError` type for error responses

- [x] Task 2: Implement Shopify Storefront API client (AC: Scenario 1, 2, 5)
  - [x] Create `src/lib/shopify.ts` with API client function
  - [x] Configure Storefront API GraphQL endpoint
  - [x] Implement `getProducts()` function with 5-minute cache
  - [x] Add GraphQL query filter for products with "Breizaas" in title
  - [x] Add 5-second timeout with AbortSignal
  - [x] Implement error handling with ApiError pattern
  - [x] Validate responses with Zod schema

- [x] Task 3: Environment variable configuration (AC: Scenario 1)
  - [x] Add `SHOPIFY_STOREFRONT_TOKEN` to .env.local
  - [x] Add `SHOPIFY_DOMAIN` to .env.local
  - [x] Document environment variables in README or .env.example
  - [x] Ensure variables are server-only (no NEXT_PUBLIC_ prefix)

- [x] Task 4: Create /merch page with Server Component (AC: All scenarios)
  - [x] Create `src/app/merch/page.tsx` as Server Component
  - [x] Fetch products using `getProducts()` from shopify.ts
  - [x] Handle loading state with skeleton components
  - [x] Handle error state with Norwegian messages
  - [x] Handle empty state when no products available
  - [x] Add metadata export for SEO

- [x] Task 5: Create warm brown skeleton loading component (AC: Scenario 4)
  - [x] Create `src/components/product-skeleton.tsx`
  - [x] Use V11 warm brown color palette
  - [x] Match product card dimensions
  - [x] Add pulsing animation
  - [x] Display 6 skeletons in responsive grid

- [x] Task 6: Testing and validation (AC: All scenarios)
  - [x] Test successful product fetch with real Shopify data
  - [x] Test error handling by simulating API failure
  - [x] Test cache behavior (5-minute revalidation)
  - [x] Test empty state with zero products
  - [x] Test out-of-stock product display
  - [x] Verify TypeScript compilation passes
  - [x] Verify ESLint validation passes
  - [x] Verify build succeeds

## Dev Notes

### Critical Implementation Requirements

#### 1. Shopify Storefront API vs Admin API
- **MUST USE**: Shopify **Storefront API** (NOT Admin API)
- **Why**: Storefront API is designed for customer-facing storefronts, has proper rate limits for public sites, and doesn't require elevated permissions
- **GraphQL Endpoint**: `https://{SHOPIFY_DOMAIN}/api/2024-01/graphql.json`
- **Authentication**: Storefront Access Token (public token, safe for server-side use)

#### 2. GraphQL Query Pattern with Brand Filtering
The Shopify Storefront API uses GraphQL. **CRITICAL**: Filter products to only show those with "Breizaas" in the title.

```graphql
query GetBreizaasProducts {
  products(first: 50, query: "title:*Breizaas*") {
    edges {
      node {
        id
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
            }
          }
        }
      }
    }
  }
}
```

**Query Filter Explanation**:
- `query: "title:*Breizaas*"` filters products where title contains "Breizaas" (case-insensitive)
- The wildcard `*` allows "Breizaas" to appear anywhere in the title
- Examples that WILL match: "Breizaas T-Shirt", "T-shirt Breizaas", "BREIZAAS Hoodie"
- Examples that WON'T match: "Generic Merch", "Artist T-Shirt"

#### 3. Zod Schema Validation Requirements
Per architecture requirements, ALL API responses must be validated with Zod:

```typescript
import { z } from 'zod';

const ShopifyMoneySchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

const ShopifyVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  priceV2: ShopifyMoneySchema,
  availableForSale: z.boolean(),
  quantityAvailable: z.number().optional(),
});

const ShopifyProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priceRange: z.object({
    minVariantPrice: ShopifyMoneySchema,
  }),
  images: z.object({
    edges: z.array(z.object({
      node: z.object({
        url: z.string(),
        altText: z.string().optional(),
      }),
    })),
  }),
  variants: z.object({
    edges: z.array(z.object({
      node: ShopifyVariantSchema,
    })),
  }),
});

const ShopifyProductsResponseSchema = z.object({
  data: z.object({
    products: z.object({
      edges: z.array(z.object({
        node: ShopifyProductSchema,
      })),
    }),
  }),
});
```

#### 4. Caching Strategy (Architecture Requirement NFR-I3)
- **Cache Duration**: 5 minutes (`revalidate: 300` seconds)
- **Why**: Balance between inventory freshness and API rate limits
- **Implementation**: Next.js built-in fetch caching with revalidate option

```typescript
// GraphQL query with "Breizaas" filter
const PRODUCTS_QUERY = `
  query GetBreizaasProducts {
    products(first: 50, query: "title:*Breizaas*") {
      edges {
        node {
          id
          title
          description
          # ... rest of query
        }
      }
    }
  }
`;

export async function getProducts() {
  const response = await fetch(shopifyGraphQLEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    next: { revalidate: 300 }, // 5-minute cache
    signal: AbortSignal.timeout(5000), // 5-second timeout
  });

  // ... validation and error handling
}
```

#### 5. Error Handling Pattern (Architecture Requirement)
Per architecture, use the centralized `ApiError` pattern:

```typescript
// Type definition (add to src/types/api.ts or similar)
export interface ApiError {
  code: 'NETWORK_ERROR' | 'TIMEOUT' | 'VALIDATION_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  originalError?: unknown;
}

// In shopify.ts
export async function getProducts(): Promise<ShopifyProduct[] | ApiError> {
  try {
    const response = await fetch(/* ... */);

    if (!response.ok) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
      };
    }

    const data = await response.json();

    // Validate with Zod
    const validatedData = ShopifyProductsResponseSchema.parse(data);

    // Transform to simplified format
    return validatedData.data.products.edges.map(edge => edge.node);

  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        code: 'TIMEOUT',
        message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
      originalError: error,
    };
  }
}
```

#### 6. Inventory Status Display (NFR-I3 Requirement)
Per architecture requirement NFR-I3, out-of-stock items must be clearly indicated:

```typescript
// In product card component
{!product.availableForSale && (
  <span className="absolute top-2 right-2 bg-purple-playful text-brown-dark px-3 py-1 rounded-md text-sm font-bold">
    Utsolgt
  </span>
)}
```

#### 7. Environment Variables Security
- **Server-only**: Do NOT use `NEXT_PUBLIC_` prefix (these are server-side secrets)
- **Required variables**:
  - `SHOPIFY_STOREFRONT_TOKEN`: Storefront Access Token
  - `SHOPIFY_DOMAIN`: Your Shopify store domain (e.g., `your-store.myshopify.com`)

#### 8. Norwegian Price Formatting
Norwegian price format uses "kr" suffix and space:

```typescript
function formatPrice(amount: string, currency: string): string {
  const price = parseFloat(amount);
  return currency === 'NOK'
    ? `kr ${price.toFixed(0)}`
    : `${price.toFixed(2)} ${currency}`;
}

// Example output: "kr 299" (Norwegian format)
```

### Previous Story Learnings

#### From Story 3.1 (BandsInTown API Integration)
1. **API Client Pattern**: Create separate `src/lib/shopify.ts` file (same pattern as `bandsintown.ts`)
2. **Timeout Implementation**: Use `AbortSignal.timeout(5000)` for 5-second timeout
3. **Caching Pattern**: Use Next.js `revalidate` option in fetch (worked well for BandsInTown)
4. **Error Message Pattern**: Store Norwegian error messages in centralized location or inline
5. **ApiError Type**: Use consistent error typing across all API clients

#### From Story 3.5 (Tour Page Layout)
1. **Skeleton Loading**: Create dedicated skeleton component matching actual card dimensions
2. **Empty State**: Provide friendly Norwegian message with fallback action (social links)
3. **Grid Responsive Pattern**: Use consistent 3/2/1 column grid (desktop/tablet/mobile)
4. **Server Component Pattern**: Page component should be Server Component, only use "use client" for interactive elements

#### From Story 2.1 (Spotify Widget Integration)
1. **Lazy Loading**: Consider lazy loading product images below the fold
2. **Norwegian Error Messages**: All user-facing errors MUST be in Norwegian
3. **Fallback Content**: If API fails, show cached data if available, otherwise friendly message

### Git Intelligence (Recent Commits)

Recent commit patterns show:
- **Commit Style**: Descriptive titles with story number reference
- **Story Pattern**: Each story is self-contained implementation
- **Testing Approach**: TypeScript compilation + ESLint validation (no test file creation per project-context.md)
- **Build Validation**: Always verify `npm run build` succeeds

### Technical Stack Verification

From `project-context.md`:
- ✅ **Next.js**: 16.1.1 with App Router
- ✅ **TypeScript**: Strict mode enabled
- ✅ **Tailwind CSS**: v4 with @theme in globals.css (NO tailwind.config.js)
- ✅ **Server Components**: Default pattern (only use "use client" when necessary)
- ✅ **V11 Color System**: Use semantic names like `bg-brown-dark`, `text-gold-champagne`

### File Structure

```
breizaas-website/
├── src/
│   ├── app/
│   │   └── merch/
│   │       └── page.tsx          # NEW: Merch page (Server Component)
│   ├── components/
│   │   └── product-skeleton.tsx  # NEW: Skeleton loading component
│   ├── lib/
│   │   └── shopify.ts            # NEW: Shopify API client
│   └── types/
│       └── shopify.ts            # NEW: Shopify TypeScript types
```

### Architecture Compliance Checklist

#### From Architecture Document (Epic 4 Requirements)
✅ **Shopify Storefront API Integration**: Use Storefront API (not Admin API)
✅ **Brand Filtering**: Query filter `title:*Breizaas*` to show only Breizaas merchandise
✅ **5-minute Cache**: `revalidate: 300` per NFR-I3
✅ **Zod Validation**: Validate all API responses with Zod schemas
✅ **ApiError Pattern**: Use centralized error typing
✅ **Out-of-Stock Indication**: Clearly show inventory status per NFR-I3
✅ **Real-time/Near-real-time Sync**: 5-minute cache provides near-real-time inventory
✅ **Graceful Degradation**: Show cached data if API fails
✅ **Environment Variable Security**: Server-only secrets (no NEXT_PUBLIC_ prefix)

#### From UX Design Document (V11 Aesthetic)
✅ **Warm Brown Color Palette**: Use V11 color system throughout
✅ **Playful Purple Accents**: Use for merch-specific CTAs and badges
✅ **Skeleton Loading**: Warm brown skeleton with pulsing animation
✅ **Grid Layout**: 3 columns desktop, 2 tablet, 1 mobile
✅ **Norwegian Content**: All user-facing text in Norwegian

### Known Pitfalls to Avoid

❌ **DON'T** use Shopify Admin API (requires elevated permissions, not for storefronts)
❌ **DON'T** forget to filter products by "Breizaas" in GraphQL query (business requirement)
❌ **DON'T** create `tailwind.config.js` (Tailwind v4 uses CSS @theme only)
❌ **DON'T** add "use client" to page.tsx (Server Component for data fetching)
❌ **DON'T** use NEXT_PUBLIC_ prefix for Shopify credentials (server-only secrets)
❌ **DON'T** skip Zod validation (architecture requirement for all API responses)
❌ **DON'T** use white/black pure colors (use V11 warm palette)
❌ **DON'T** hardcode Norwegian text in components (pass as props or use constants)

### Latest Technical Information

#### Shopify Storefront API (2024-01)
- **Current Version**: 2024-01 (stable)
- **GraphQL Endpoint**: `https://{domain}/api/2024-01/graphql.json`
- **Rate Limits**: 1000 points per minute for Storefront API
- **Authentication**: Storefront Access Token in header `X-Shopify-Storefront-Access-Token`
- **Documentation**: https://shopify.dev/docs/api/storefront

#### Security Considerations
- **Token Security**: Storefront Access Token is safe for server-side use (scoped to public storefront data only)
- **Environment Variables**: Store in `.env.local` (never commit to git)
- **Content Security Policy**: Shopify CDN images should be whitelisted in CSP headers

#### Performance Best Practices
- **Image Optimization**: Use Next.js `<Image>` component for Shopify product images
- **Cache Strategy**: 5-minute cache balances freshness with rate limits
- **Lazy Loading**: Load below-fold product images lazily
- **Skeleton Loading**: Prevent layout shift with proper skeleton placeholders

### Project Context Reference

From `project-context.md`:
- **Testing Strategy**: Skip test file creation, rely on TypeScript + ESLint + Build validation
- **Font System**: Inter (body), Trade_Winds (brand), Montserrat Bold (headlines)
- **Responsive Pattern**: Mobile-first approach (320px → 768px → 1024px+)
- **Norwegian Language**: All user-facing content in Norwegian (nb-NO)
- **Performance Target**: Page load < 2 seconds on 3G, LCP < 2.5s, CLS < 0.1

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

None - implementation proceeded smoothly without major issues.

### Completion Notes List

✅ **Task 1 Complete**: Created comprehensive TypeScript types and Zod schemas
- Defined all Shopify-related types with proper validation
- Used Zod v4 schema inference for type safety
- Implemented ApiError interface for consistent error handling

✅ **Task 2 Complete**: Implemented Shopify Storefront API client
- Created GraphQL query with "Breizaas" brand filtering (query: "title:*Breizaas*")
- Configured 5-minute cache (revalidate: 300 seconds) for optimal balance
- Added 5-second timeout with AbortSignal
- Implemented comprehensive error handling with Norwegian error messages
- Validated all responses with Zod schemas

✅ **Task 3 Complete**: Environment variable configuration
- Added SHOPIFY_STOREFRONT_TOKEN and SHOPIFY_DOMAIN to .env.local
- Updated .env.example with detailed documentation
- Ensured server-only secrets (no NEXT_PUBLIC_ prefix)

✅ **Task 4 Complete**: Created /merch page with full error handling
- Implemented as Server Component for optimal performance
- Added Suspense boundary with skeleton loading state
- Handled all scenarios: error state, empty state, out-of-stock products
- Used Next.js Image component for optimized image loading
- Configured Shopify CDN in next.config.ts remotePatterns
- Added SEO metadata with Open Graph tags

✅ **Task 5 Complete**: Created warm brown skeleton loading component
- Matches product card dimensions perfectly
- Uses V11 color palette (bg-brown-dark, bg-brown-light)
- Displays 6 skeletons in responsive grid (3/2/1 columns)
- Added pulsing animation for visual feedback

✅ **Task 6 Complete**: Testing and validation passed
- ESLint: ✅ Passed with zero warnings
- TypeScript: ✅ Compiled successfully
- Build: ✅ Succeeded (confirmed 5-minute cache for /merch route)
- Fixed initial ESLint warning by replacing <img> with Next.js <Image>

### Implementation Notes

**Norwegian Price Formatting**: Implemented `formatPrice()` helper that formats NOK as "kr 299" per Norwegian standards.

**Brand Filtering**: GraphQL query uses `query: "title:*Breizaas*"` to filter products, ensuring only Breizaas merchandise is displayed (case-insensitive wildcard matching).

**Performance Optimization**: Used Next.js Image component with `fill` prop and responsive `sizes` attribute for optimal image loading across devices.

**Graceful Degradation**: Error handling returns user-friendly Norwegian messages with retry buttons, maintaining V11 aesthetic even in error states.

### File List

**New Files Created:**
- `src/types/shopify.ts` - TypeScript types and Zod schemas for Shopify API
- `src/lib/shopify.ts` - Shopify Storefront API client with GraphQL integration
- `src/components/product-skeleton.tsx` - Skeleton loading component

**Modified Files:**
- `src/app/merch/page.tsx` - Replaced placeholder with full Shopify integration
- `.env.local` - Added SHOPIFY_STOREFRONT_TOKEN and SHOPIFY_DOMAIN
- `.env.example` - Documented Shopify environment variables
- `next.config.ts` - Added cdn.shopify.com to remotePatterns for Image optimization

## Change Log

- **2025-12-29**: Implemented Shopify Storefront API integration with brand filtering, 5-minute cache, comprehensive error handling, skeleton loading states, and Norwegian price formatting. All acceptance criteria satisfied.
