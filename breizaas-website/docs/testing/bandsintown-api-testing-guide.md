# Bandsintown API Integration Testing Guide

**Story:** 3.1 - BandsInTown API Integration with Caching & Error Handling
**Created:** 2025-12-27
**Purpose:** Manual testing guide for Bandsintown API integration

---

## Testing Strategy

Per project-context.md, this project uses **manual testing** with TypeScript + ESLint + build validation instead of automated test files.

---

## Test Scenarios

### 1. Success Response - Upcoming Events

**Setup:**
- Ensure `.env.local` has valid `BANDSINTOWN_API_KEY`
- Set `NEXT_PUBLIC_BANDSINTOWN_ARTIST_NAME=Breizaas`

**Test:**
1. Navigate to `/konserter` page
2. Observe loading skeleton (3 warm brown cards with pulse animation)
3. Wait for API response

**Expected Result:**
- ✅ Loading skeleton displays with "Laster konserter..." ARIA label
- ✅ API fetches from `https://rest.bandsintown.com/artists/Breizaas/events/?app_id=...`
- ✅ Response validated by Zod schema
- ✅ Tour dates display (when Story 3.2 component is created)
- ✅ Response cached for 1 hour (Next.js automatic caching)

**Sample Success Data:**
```json
[
  {
    "id": "123456",
    "datetime": "2025-06-15T19:00:00",
    "venue": {
      "name": "Rockefeller Music Hall",
      "city": "Oslo",
      "country": "Norway"
    },
    "description": "Live performance",
    "lineup": ["Breizaas"],
    "offers": [
      {
        "type": "Tickets",
        "url": "https://example.com/tickets",
        "status": "available"
      }
    ],
    "url": "https://bandsintown.com/e/123456"
  }
]
```

---

### 2. Empty Response - No Upcoming Events

**Test:**
1. If Breizaas has no upcoming events scheduled on Bandsintown
2. Navigate to `/konserter` page

**Expected Result:**
- ✅ API returns empty array `[]`
- ✅ Norwegian message displays: "Ingen kommende konserter"
- ✅ No errors logged
- ✅ Page layout remains intact

---

### 3. Timeout Scenario (5+ seconds)

**Simulating Timeout:**
```typescript
// Temporarily modify bandsintown.ts for testing
const response = await fetch(url, {
  next: { revalidate: 3600 },
  signal: AbortSignal.timeout(100), // Changed to 100ms for testing
});
```

**Expected Result:**
- ✅ Request aborts after timeout
- ✅ ApiError returned with code `BANDSINTOWN_TIMEOUT`
- ✅ Norwegian error message: "Kunne ikke laste inn konserter. Prøv igjen senere."
- ✅ Fallback cached data shown (if available)
- ✅ Console error logged: `Bandsintown API error (BANDSINTOWN_TIMEOUT):...`
- ✅ Page layout remains functional (NFR-I2)

---

### 4. Network Error

**Simulating Network Error:**
- Disconnect internet connection
- Navigate to `/konserter` page

**Expected Result:**
- ✅ Network error caught
- ✅ ApiError returned with code `BANDSINTOWN_FETCH_ERROR`
- ✅ Norwegian error message: "Kunne ikke laste inn konserter. Prøv igjen senere."
- ✅ Fallback cached data shown (if available from previous successful request)
- ✅ Console error logged
- ✅ Retry button displays in champagne gold (Story 3.2)

---

### 5. Invalid API Response (Zod Validation Failure)

**Simulating Invalid Data:**
```typescript
// Mock scenario: API returns malformed data
{
  "id": 123, // Should be string, not number
  "datetime": "invalid-date",
  "venue": null // Should be object
}
```

**Expected Result:**
- ✅ Zod schema validation fails with `z.ZodError`
- ✅ ApiError returned with code `BANDSINTOWN_INVALID_DATA`
- ✅ Norwegian error message displayed
- ✅ Fallback cached data shown (if available)
- ✅ Console error logged with Zod validation details

---

### 6. Missing API Key

**Test:**
1. Remove or comment out `BANDSINTOWN_API_KEY` from `.env.local`
2. Restart dev server (`npm run dev`)
3. Navigate to `/konserter` page

**Expected Result:**
- ✅ ApiError returned with code `BANDSINTOWN_NO_API_KEY`
- ✅ Console error: `BANDSINTOWN_API_KEY environment variable not set`
- ✅ Norwegian error message displayed
- ✅ Fallback cached data shown (if available)
- ✅ Page doesn't crash (graceful degradation)

---

### 7. API Returns Non-200 Status

**Scenarios:**
- 401 Unauthorized (invalid API key)
- 404 Not Found (artist doesn't exist)
- 429 Too Many Requests (rate limit exceeded)
- 500 Internal Server Error

**Expected Result:**
- ✅ Error caught: `API returned ${status}`
- ✅ ApiError returned with code `BANDSINTOWN_FETCH_ERROR`
- ✅ Norwegian error message displayed
- ✅ Console error logged with status code
- ✅ Fallback cached data shown (if available)

---

## Caching Validation

### First Request
1. Clear browser cache
2. Navigate to `/konserter` page
3. Open Network tab in DevTools
4. Observe API request to Bandsintown

**Expected:**
- ✅ Request sent to `https://rest.bandsintown.com/artists/Breizaas/events/?app_id=...`
- ✅ Response received and displayed
- ✅ Next.js caches response for 1 hour

### Second Request (Within 1 Hour)
1. Refresh `/konserter` page
2. Observe Network tab

**Expected:**
- ✅ NO network request to Bandsintown (served from cache)
- ✅ Tour dates display instantly from Next.js cache
- ✅ Performance improved (< 2 seconds page load per NFR-P1)

### Third Request (After 1 Hour)
1. Wait 1 hour or manually invalidate cache
2. Navigate to `/konserter` page

**Expected:**
- ✅ New API request sent (cache revalidation)
- ✅ Fresh data fetched from Bandsintown
- ✅ Cache updated for next 1 hour

---

## Accessibility Testing

### Screen Reader Testing
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate to `/konserter` page while loading

**Expected:**
- ✅ Screen reader announces "Laster konserter..." when skeleton displays
- ✅ Loading skeleton has `role="status"` for status updates
- ✅ Error messages are announced when they appear

---

## Performance Testing

### Core Web Vitals (NFR-P3)
1. Navigate to `/konserter` page
2. Open Lighthouse in DevTools
3. Run Performance audit

**Expected:**
- ✅ LCP < 2.5 seconds
- ✅ CLS < 0.1 (skeleton prevents layout shift)
- ✅ Page load < 2 seconds on 3G

### Timeout Validation (NFR-P3)
1. Use network throttling to simulate slow connection
2. Observe request timing

**Expected:**
- ✅ Request aborts after 5 seconds max
- ✅ Error handling prevents hanging UI
- ✅ User experience remains responsive

---

## Sample Test Data

Use this sample data for Story 3.2 when creating TourDateCard component:

```typescript
const sampleEvents: BandsinownEvent[] = [
  {
    id: "test-event-1",
    datetime: "2025-06-15T19:00:00",
    venue: {
      name: "Rockefeller Music Hall",
      city: "Oslo",
      country: "Norway",
    },
    description: "Summer Tour 2025",
    lineup: ["Breizaas"],
    offers: [
      {
        type: "Tickets",
        url: "https://example.com/tickets",
        status: "available",
      },
    ],
    url: "https://bandsintown.com/e/test-event-1",
  },
  {
    id: "test-event-2",
    datetime: "2025-07-20T20:00:00",
    venue: {
      name: "Gamle Bergen Museum",
      city: "Bergen",
      country: "Norway",
    },
    lineup: ["Breizaas", "Support Act"],
    offers: [
      {
        type: "Tickets",
        url: "https://example.com/tickets-2",
        status: "sold out",
      },
    ],
    url: "https://bandsintown.com/e/test-event-2",
  },
];
```

---

## Checklist for Story 3.1 Completion

### API Client Testing
- [ ] Successful API response returns typed `BandsinownEvent[]` array
- [ ] Empty events array returns successfully (zero events scenario)
- [ ] Timeout after 5 seconds returns ApiError with code `BANDSINTOWN_TIMEOUT`
- [ ] Network error returns ApiError with Norwegian message
- [ ] Invalid data (Zod validation failure) returns ApiError with code `BANDSINTOWN_INVALID_DATA`
- [ ] Missing API key returns ApiError with code `BANDSINTOWN_NO_API_KEY`

### Caching Testing
- [ ] First request fetches from Bandsintown API
- [ ] Second request within 1 hour uses cached data (no API call)
- [ ] Request after 1 hour refetches from API (cache revalidation)

### Error Handling Testing
- [ ] Error messages display in Norwegian
- [ ] Fallback cached data displays when API fails (if available)
- [ ] Error is logged to console for monitoring

### Build Validation
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] `npm run lint` passes with no ESLint errors
- [ ] Environment variable access doesn't break build

---

**Last Updated:** 2025-12-27
**Status:** Ready for manual testing when Story 3.2 (TourDateCard component) is implemented
