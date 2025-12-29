# Story 4.3: Shopping Cart with localStorage Persistence

Status: ready-for-dev

## ⚠️ CRITICAL IMPLEMENTATION NOTE

**THIS STORY HAS BEEN OBSOLETED BY ARCHITECTURE DECISION IN STORY 4.2**

### What Happened:
Story 4.2 was implemented with a **simplified architecture** that eliminates the need for a local shopping cart:
- Products link **directly to Shopify product pages** via `onlineStoreUrl`
- Shopify handles **all cart functionality** (add to cart, quantity, variants, checkout)
- No localStorage cart state needed on Breizaas website

### Why This is Better:
✅ **Simpler UX**: Users go directly to Shopify's proven product pages
✅ **Less Code**: ~80% less code than full cart implementation
✅ **Better Performance**: No client-side JavaScript for cart management
✅ **Zero Bugs**: Leverages Shopify's battle-tested cart system
✅ **Faster Load**: Server Components instead of client-side state management

### Developer Decision Required:

**Option 1: Mark Story as "CANCELLED - Not Needed"**
- Update sprint-status.yaml: Change status from "backlog" to "cancelled"
- Add note: "Architecture simplified in Story 4.2 - cart handled by Shopify"
- Move to next story (4.4 or 4.5)

**Option 2: Implement Anyway (Not Recommended)**
- Would require reverting Story 4.2's direct Shopify links
- Build cart UI, state management, localStorage persistence
- Adds ~500-700 lines of code
- Adds client-side JavaScript overhead
- Degrades performance metrics

### Recommendation: **Option 1 - Cancel This Story**

The simplified architecture from Story 4.2 already satisfies all **user outcomes** from this epic:
- ✅ Fans can browse merchandise (4.2 ✓)
- ✅ Fans can view product details (on Shopify)
- ✅ Fans can add items to cart (on Shopify)
- ✅ Fans can complete checkout (4.4 handles Shopify redirect)

---

## Original Story Requirements (For Historical Reference)

### Story

As a fan,
I want to add merchandise items to a shopping cart that persists across sessions,
So that I can continue shopping and checkout when ready.

### Acceptance Criteria (OBSOLETED)

All acceptance criteria below are **no longer applicable** due to the simplified architecture implemented in Story 4.2.

<details>
<summary>Click to view original acceptance criteria (obsolete)</summary>

#### Scenario 1: Add Product to Cart
```gherkin
Given I am viewing a product
When I click "Legg til i handlekurv" (Add to cart)
Then the selected product with chosen variant and quantity is added to cart
And cart state is stored in browser localStorage for persistence
And cart icon in navigation header updates with item count badge
And brief success animation appears: "Lagt til i handlekurv!" in champagne gold
```

#### Scenario 2: Cart Icon Badge
```gherkin
Given I have items in my cart
When I view the navigation header
Then I should see a cart icon with an item count badge
And the badge should show total item count
And the badge should have playful purple background #b589d6
And the badge should have warm white text
And the badge should be positioned top-right of cart icon
```

#### Scenario 3: Open Cart Sidebar
```gherkin
Given I have items in my cart
When I click the cart icon in navigation
Then a cart sidebar/modal should slide in from right
And full-screen overlay should appear with warm brown background
And cart should display all added items
And each item should show:
  - Product image thumbnail
  - Product title
  - Variant info (size, color)
  - Quantity with +/- controls
  - Price per item
  - Remove button (trash icon, 44x44px)
And cart should show subtotal in Norwegian format: "Delsum: kr 598"
And "Gå til kassen" (Go to checkout) button in champagne gold at bottom
And "Fortsett å handle" (Continue shopping) link closes cart
```

#### Scenario 4: Update Quantity
```gherkin
Given I have an item in my cart
When I click the "+" button to increase quantity
Then the quantity should increase by 1
And the subtotal should recalculate immediately
And the cart count badge should update
And the change should persist in localStorage
```

#### Scenario 5: Remove Item from Cart
```gherkin
Given I have an item in my cart
When I click the remove button (trash icon)
Then the item should be removed from cart
And the subtotal should recalculate
And the cart count badge should update
And the change should persist in localStorage
```

#### Scenario 6: Empty Cart State
```gherkin
Given my cart is empty
When I open the cart sidebar
Then I should see message: "Handlekurven er tom"
And a link back to /merch page should be displayed
And no checkout button should be visible
```

#### Scenario 7: localStorage Persistence
```gherkin
Given I have items in my cart
When I refresh the page or return later
Then my cart items should still be present
And cart count badge should reflect saved items
And cart data should load from localStorage on page load
```

#### Scenario 8: Keyboard Accessibility
```gherkin
Given the cart sidebar is open
When I navigate with keyboard
Then focus should be trapped within the cart sidebar
And Tab key should cycle through interactive elements
And Escape key should close the cart sidebar
And all buttons should be keyboard accessible
And focus should return to cart icon when closed
```

</details>

---

## Tasks / Subtasks (ALL CANCELLED)

- [ ] ~~Task 1: Create CartContext with localStorage persistence~~ **CANCELLED**
- [ ] ~~Task 2: Build Cart Sidebar Component~~ **CANCELLED**
- [ ] ~~Task 3: Add Cart Icon with Badge to Navigation~~ **CANCELLED**
- [ ] ~~Task 4: Implement Add to Cart functionality~~ **CANCELLED**
- [ ] ~~Task 5: Build Cart Item Component with quantity controls~~ **CANCELLED**
- [ ] ~~Task 6: Norwegian cart messages~~ **CANCELLED**
- [ ] ~~Task 7: Testing and validation~~ **CANCELLED**

---

## Dev Notes

### Why This Story is Cancelled

#### Architecture Decision from Story 4.2:
In Story 4.2, the team made a **strategic architectural decision** to simplify the merchandise flow:

**Instead of:**
```
Product Card → Add to Cart → Cart Sidebar → Checkout Button → Shopify
```

**We implemented:**
```
Product Card → "Kjøp nå" Link → Shopify Product Page → Shopify Cart → Shopify Checkout
```

**Benefits of Simplified Approach:**
1. **Performance**: No client-side cart state = faster page loads
2. **Simplicity**: ~80% less code to maintain
3. **Reliability**: Shopify's cart is battle-tested, handles edge cases
4. **UX**: Users familiar with Shopify's proven cart experience
5. **Cost**: Less JavaScript = better Core Web Vitals scores

#### What Shopify Already Handles:
- ✅ Cart state management
- ✅ Quantity selection (1-10+)
- ✅ Variant selection (sizes, colors)
- ✅ Cart persistence (Shopify cookies)
- ✅ Inventory validation
- ✅ Price calculations
- ✅ Checkout flow

#### What We'd Have to Build (If Not Cancelled):
- ❌ React Context for cart state (~50 lines)
- ❌ localStorage sync logic (~80 lines)
- ❌ Cart sidebar component (~150 lines)
- ❌ Cart item component (~100 lines)
- ❌ Quantity controls (~60 lines)
- ❌ Add to cart logic (~40 lines)
- ❌ Navigation badge (~30 lines)
- ❌ Focus trap for sidebar (~40 lines)
- ❌ TypeScript types for cart (~30 lines)
- **Total: ~580 lines of code we don't need**

### Impact on Remaining Epic 4 Stories

#### Story 4.4: Shopify Checkout Integration
**Status**: Still needed, but **simplified**
- Remove references to "cart sidebar"
- Update to reflect direct product page links
- Focus on Shopify-hosted checkout experience
- Thank you page still needed

#### Story 4.5: Shipping & Return Information Page
**Status**: Still needed, **no changes**
- Standalone information page
- Not affected by cart architecture decision

### Developer Action Required

Update `sprint-status.yaml`:

```yaml
development_status:
  # ... other stories ...
  4-3-shopping-cart-with-localstorage-persistence: cancelled  # ← Change from "backlog" to "cancelled"
  4-4-shopify-checkout-integration: backlog  # ← This will be next after 4.2 review
  4-5-shipping-and-return-information-page: backlog
```

Add comment in sprint-status.yaml:
```yaml
# Story 4.3 cancelled - Architecture simplified in Story 4.2
# Cart functionality handled by Shopify directly via onlineStoreUrl links
# Decision: Direct Shopify links provide better UX and performance
```

### Reference: Story 4.2 Implementation

From `src/components/product-card.tsx`:
```typescript
// Direct link to Shopify product page (no local cart)
<Link
  href={product.onlineStoreUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="block w-full bg-purple-playful hover:bg-purple-playful-hover text-white-warm text-center py-3 rounded-md font-bold transition-colors duration-300"
>
  {MESSAGES.merch.buyNow}  {/* "Kjøp nå" */}
</Link>
```

This **replaces** the need for:
- ~~"Legg til i handlekurv" button~~
- ~~Cart sidebar~~
- ~~localStorage cart state~~

### If You Absolutely Must Implement a Cart (Not Recommended)

<details>
<summary>Click to view full implementation guide (only if cart is required)</summary>

**Warning**: This will require reverting Story 4.2's direct Shopify links.

#### Step 1: Create CartContext

Create `src/contexts/cart-context.tsx`:
```typescript
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  image?: { url: string; altText?: string };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('breizaas-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load cart from localStorage', error);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('breizaas-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existing = current.find(item => item.variantId === newItem.variantId);
      if (existing) {
        return current.map(item =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...newItem, quantity: 1 }];
    });
  };

  // ... rest of cart logic
}
```

#### Step 2: Modify ProductCard Component

Change from Link to button with onClick handler...

**[Additional 400+ lines of implementation details omitted for brevity]**

</details>

---

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Completion Notes List

✅ **Story Analyzed**: Comprehensive analysis completed
✅ **Architecture Conflict Identified**: Story 4.3 obsoleted by Story 4.2's simplified approach
✅ **Recommendation Made**: Cancel story, mark as "cancelled" in sprint-status.yaml
✅ **Impact Assessment**: Reviewed impact on remaining Epic 4 stories (4.4, 4.5)
✅ **Documentation**: Provided historical reference and rationale for cancellation

**Next Action**: Developer should update sprint-status.yaml and proceed to Story 4.4 or 4.5

### File List

**No files created or modified** - Story cancelled before implementation

**Recommended change**:
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Update story status to "cancelled"
