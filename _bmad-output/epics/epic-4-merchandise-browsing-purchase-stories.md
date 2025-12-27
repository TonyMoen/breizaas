# Epic 4: Merchandise Browsing & Purchase - Stories

## Story 4.1: Shopify Storefront API Integration & Product Fetching

As a developer,
I want to integrate the Shopify Storefront API to fetch product catalog data with caching and error handling,
So that merchandise is displayed with real-time inventory and pricing information.

**Acceptance Criteria:**

**Given** the Shopify Storefront API is configured
**When** the `/merch` page loads
**Then** the system fetches product catalog from Shopify Storefront API
**And** API responses are cached for 5 minutes (`revalidate: 300`) per architecture requirements (NFR-I3)
**And** API client is implemented in `src/lib/shopify.ts` with TypeScript types
**And** response data is validated using Zod schema including:
  - product ID
  - title
  - description
  - price (formatted in NOK)
  - images (URLs with alt text)
  - variants (sizes, colors, SKU)
  - inventory availability (in stock, low stock, out of stock)
**And** if API request succeeds, products are displayed and cached
**And** if API request fails:
  - Norwegian error message displays: "Kunne ikke laste inn produkter. Prøv igjen senere."
  - Cached products from previous successful request are shown (if available)
  - Retry button in champagne gold appears
  - Error is logged for monitoring
**And** if API returns zero products, Norwegian message displays: "Ingen produkter tilgjengelig for øyeblikket"
**And** while loading, warm brown skeleton cards are displayed (6 placeholder cards in grid)
**And** Shopify Storefront Access Token is stored as environment variable `SHOPIFY_STOREFRONT_TOKEN`
**And** API domain is stored as `SHOPIFY_DOMAIN` environment variable
**And** out-of-stock items are clearly indicated per NFR-I3
**And** inventory sync happens in real-time or near-real-time (5-minute cache)
**And** API errors are handled gracefully without breaking page layout

---

## Story 4.2: Product Catalog Grid with Variant Selection

As a fan,
I want to browse available merchandise with product images, descriptions, and prices,
So that I can find items I want to purchase.

**Acceptance Criteria:**

**Given** I am on the `/merch` page with available products
**When** the products load
**Then** I see products displayed in a responsive grid:
  - Desktop (1024px+): 3 columns
  - Tablet (768px-1023px): 2 columns
  - Mobile (< 768px): 1 column (full width)
**And** each product card displays:
  - Product image (square aspect ratio, optimized WebP with JPG fallback)
  - Product title in warm white `#faf8f5`, 18px semi-bold
  - Price in warm light gray `#e8e4df`, 16px (formatted: "kr 299" Norwegian format)
  - Availability badge if low stock or out of stock
**And** cards have warm brown background `#3a2f28`
**And** cards have 2px transparent border by default
**And** on hover (desktop):
  - Border becomes playful purple `#b589d6` (pink accent per V11 for merch)
  - Warm amber glow appears: `box-shadow: 0 0 30px rgba(181, 137, 214, 0.3)`
  - Card lifts slightly: `translateY(-4px)`
  - Smooth transition: 0.3s ease
**And** clicking a product card opens product detail modal/view with:
  - Larger product image gallery (if multiple images)
  - Full product description in Norwegian
  - Variant selector (if applicable):
    - Size selector (S, M, L, XL, etc.)
    - Color selector with color swatches
    - Each variant shows separate inventory status
  - Quantity selector (1-10)
  - "Legg til i handlekurv" (Add to cart) button in playful purple
  - Current selection displays: "Valgt: [Size] [Color]"
**And** if product is out of stock:
  - Badge "Utsolgt" in playful purple appears
  - "Legg til i handlekurv" button is disabled
  - "Varsle meg" (Notify me) option appears (optional enhancement)
**And** all product images have descriptive Norwegian alt text
**And** product cards maintain 44x44px minimum touch targets for interactive elements
**And** cards are keyboard accessible with champagne gold focus indicators
**And** grid maintains Direction 1 centered layout with max-width 1200px

---

## Story 4.3: Shopping Cart with localStorage Persistence

As a fan,
I want to add merchandise items to a shopping cart that persists across sessions,
So that I can continue shopping and checkout when ready.

**Acceptance Criteria:**

**Given** I am viewing a product
**When** I click "Legg til i handlekurv" (Add to cart)
**Then** the selected product with chosen variant and quantity is added to cart
**And** cart state is stored in browser localStorage for persistence
**And** cart icon in navigation header updates with item count badge:
  - Badge shows total item count
  - Badge has playful purple background `#b589d6`
  - Badge has warm white text
  - Badge is positioned top-right of cart icon
**And** brief success animation appears: "Lagt til i handlekurv!" in champagne gold
**And** when I click the cart icon in navigation:
  - Cart sidebar/modal slides in from right
  - Full-screen overlay appears with warm brown background
  - Cart displays all added items with:
    - Product image thumbnail
    - Product title
    - Variant info (size, color)
    - Quantity with +/- controls
    - Price per item
    - Remove button (trash icon, 44x44px)
  - Cart shows subtotal in Norwegian format: "Delsum: kr 598"
  - "Gå til kassen" (Go to checkout) button in champagne gold at bottom
  - "Fortsett å handle" (Continue shopping) link closes cart
**And** cart data persists when I refresh page or return later (localStorage)
**And** if cart is empty, message displays: "Handlekurven er tom" with link back to `/merch`
**And** updating quantity recalculates subtotal immediately
**And** removing item updates cart count badge
**And** cart sidebar is keyboard accessible and has focus trap when open
**And** pressing Escape key closes cart sidebar
**And** cart maintains V11 warm brown aesthetic with playful purple accents
**And** all interactive elements are 44x44px minimum touch targets

---

## Story 4.4: Shopify Checkout Integration

As a fan,
I want to complete my merchandise purchase through Shopify's secure checkout,
So that I can safely pay for my items and receive them.

**Acceptance Criteria:**

**Given** I have items in my shopping cart
**When** I click "Gå til kassen" (Go to checkout)
**Then** the system creates a Shopify checkout session with current cart items
**And** I am redirected to Shopify's hosted checkout page seamlessly
**And** checkout URL includes:
  - All cart items with variants and quantities
  - Correct pricing in NOK
  - Return URL back to Breizaas website
**And** Shopify checkout handles:
  - Customer email and shipping address collection
  - Payment processing (PCI DSS compliance delegated to Shopify per NFR-S4)
  - Order confirmation
**And** after successful purchase, I am redirected back to Breizaas thank you page at `/merch/takk`
**And** thank you page displays:
  - Success message: "Takk for din bestilling!"
  - Order number (from Shopify)
  - Confirmation that email receipt was sent
  - Link to order tracking (Shopify link)
  - "Fortsett å handle" button back to `/merch`
**And** cart is cleared from localStorage after successful checkout
**And** cart count badge resets to 0
**And** if checkout fails or is cancelled, user returns to cart with items preserved
**And** no sensitive payment or user data is stored on Breizaas infrastructure per NFR-S4
**And** checkout redirect happens smoothly without broken user experience
**And** thank you page maintains V11 warm brown aesthetic
**And** entire checkout flow works on mobile, tablet, and desktop

---

## Story 4.5: Shipping & Return Information Page

As a fan,
I want to view shipping costs, delivery times, and return policy information,
So that I understand the purchase terms before buying merchandise.

**Acceptance Criteria:**

**Given** I am browsing merchandise
**When** I navigate to `/merch/frakt-og-retur` (Shipping & Returns) or click "Frakt og retur info" link on merch page
**Then** I see a page titled "Frakt og Retur" in Montserrat Bold, warm white
**And** page content includes sections:
  1. **Fraktkostnader** (Shipping Costs):
     - Domestic Norway shipping rates
     - International shipping rates (if applicable)
     - Free shipping threshold (if applicable)
     - Estimated delivery times
  2. **Leveringsmetoder** (Delivery Methods):
     - Available carriers (Posten, Bring, etc.)
     - Tracking information availability
  3. **Returpolicy** (Return Policy):
     - Return window (e.g., 14 days)
     - Condition requirements for returns
     - Refund process timeline
     - Return shipping costs responsibility
  4. **Kontakt** (Contact):
     - Email for shipping/return questions
     - Link to contact form
**And** all content is in Norwegian (Bokmål)
**And** typography follows V11 system:
  - Headlines in warm white
  - Body text in warm light gray `#e8e4df`
  - Important info (prices, deadlines) highlighted in playful purple
**And** content is constrained to 65-75 character line length for readability
**And** page is fully responsive (mobile/tablet/desktop)
**And** link to this page appears:
  - In footer navigation
  - On `/merch` page near checkout button
  - In cart sidebar/modal
**And** page maintains V11 warm brown aesthetic
**And** page has proper SEO metadata:
  - Title: "Frakt og Retur - Breizaas Merch"
  - Description in Norwegian
**And** content is managed via Sanity CMS (prepared for Epic 6 integration)

---
