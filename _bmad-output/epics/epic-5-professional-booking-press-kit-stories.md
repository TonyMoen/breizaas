# Epic 5: Professional Booking & Press Kit - Stories

## Story 5.1: Press Kit Page (/arrangor) with High-Res Photo Downloads

As an event organizer,
I want to access a professional press kit with high-resolution photos and detailed artist information,
So that I can evaluate and promote Breizaas for my event.

**Acceptance Criteria:**

**Given** I am an event organizer evaluating Breizaas for booking
**When** I navigate to `/arrangor` URL directly
**Then** I see a press kit page titled "Pressekit for Arrangører" in Montserrat Bold, warm white
**And** `/arrangor` page is NOT linked in main navigation (hidden professional resource)
**And** `/arrangor` page IS accessible via footer link "For arrangører" in small text
**And** page includes hero section with:
  - "BREIZAAS" brand name in champagne gold
  - 125k listener stat prominently displayed in playful purple
  - Professional tagline in Norwegian: "AI møter norsk festmusikk"
**And** page content is organized in sections:
  1. **Artistinformasjon** (Artist Information)
  2. **Pressefoto** (Press Photos)
  3. **Teknisk Rider** (Technical Rider - Story 5.4)
  4. **Booking** (Booking Inquiry - Story 5.2)
**And** **Pressefoto section** displays:
  - Grid of high-resolution artist photos (3 columns desktop, 2 tablet, 1 mobile)
  - Each photo card shows:
    - Thumbnail preview with warm brown card background
    - Photo dimensions (e.g., "4000 x 3000 px")
    - File size (e.g., "8.2 MB")
    - File format (JPG, PNG)
    - Download button in champagne gold: "Last ned høyoppløselig"
  - Clicking download button initiates direct download of high-res image file
**And** photo cards have vintage gold border on hover with warm amber glow
**And** **Artistinformasjon section** includes:
  - Detailed artist bio (300-500 words) optimized for event promotion (FR28)
  - Key stats: 125k monthly listeners, number of releases, notable performances
  - Genre description: "Norsk bygdemusikk/festmusikk generert av AI"
  - Target audience info: "Festivaler, konserter, private arrangementer"
  - Booking contact email in champagne gold
**And** all content is in Norwegian (Bokmål) professional language
**And** page maintains V11 warm brown aesthetic throughout
**And** page is fully responsive from mobile to desktop
**And** page has SEO metadata but lower priority in sitemap (professional resource)
**And** all photos have descriptive alt text for accessibility
**And** download buttons are keyboard accessible with focus indicators
**And** press photos are managed via Sanity CMS (prepared for Epic 6 integration per FR38)

---

## Story 5.2: Event Organizer Booking Inquiry Form

As an event organizer,
I want to submit a booking inquiry with event details,
So that I can request Breizaas to perform at my event.

**Acceptance Criteria:**

**Given** I am on the `/arrangor` press kit page
**When** I scroll to the booking section
**Then** I see a booking inquiry form titled "Bookingforespørsel" in Montserrat Bold, warm white
**And** form includes the following fields (all with Norwegian labels):
  - **Kontaktperson** (Contact Person): text input, required
  - **Organisasjon** (Organization): text input, required
  - **E-post** (Email): email input with validation, required
  - **Telefon** (Phone): tel input with Norwegian format validation, optional
  - **Arrangementtype** (Event Type): select dropdown (Festival, Konsert, Privat arrangement, Bedriftsarrangement, Annet), required
  - **Dato** (Date): date picker, required
  - **Sted** (Venue/Location): text input, required
  - **By** (City): text input, required
  - **Budsjett** (Budget): text input, optional
  - **Beskrivelse** (Description): textarea (min 20 characters), required
  - **Ønsker teknisk rider** (Request Technical Rider): checkbox, optional
**And** all input fields have:
  - Warm brown background `#3a2f28`
  - Warm white text `#faf8f5`
  - 2px border `#4a3f35` by default
  - Champagne gold border `#d4af37` with warm amber glow on focus
  - 48px height minimum (comfortable touch targets)
  - 16px font size (prevents iOS zoom)
  - Norwegian placeholder text
**And** form validation using Zod schemas (architecture requirement):
  - Real-time validation on blur
  - Email format validation with Norwegian error: "Vennligst oppgi en gyldig e-postadresse"
  - Required field validation: "Dette feltet er påkrevd"
  - Minimum length validation for description: "Beskrivelsen må være minst 20 tegn"
**And** validation errors display:
  - Amber border `#ff9f45` on error field
  - Norwegian error message below field in warm light gray
  - Error icon appears
**And** submit button:
  - "Send forespørsel" label
  - Champagne gold background with warm brown text
  - Full width on mobile
  - Loading spinner appears during submission with text "Sender..."
  - Disabled state while submitting
**And** on successful submission (Story 5.5 handles backend):
  - Form is replaced with success message: "Takk for din forespørsel! Vi kontakter deg snart."
  - Champagne gold checkmark icon
  - Confirmation email is sent to organizer (FR23)
  - Inquiry data is sent to artist management email (FR25)
**And** form maintains V11 warm brown aesthetic
**And** form is fully accessible with ARIA labels in Norwegian
**And** all interactive elements are keyboard navigable

---

## Story 5.3: General Contact Form

As a visitor,
I want to contact the artist for non-booking inquiries,
So that I can ask questions or provide feedback.

**Acceptance Criteria:**

**Given** I navigate to `/kontakt` (Contact page)
**When** the page loads
**Then** I see a contact page titled "Kontakt" in Montserrat Bold, warm white
**And** page includes a general contact form with fields:
  - **Navn** (Name): text input, required
  - **E-post** (Email): email input with validation, required
  - **Emne** (Subject): select dropdown (Generell henvendelse, Mediaspørsmål, Samarbeid, Teknisk support, Annet), required
  - **Melding** (Message): textarea (min 20 characters), required
**And** form uses same V11 styling as booking form (Story 5.2):
  - Warm brown input backgrounds
  - Champagne gold focus states
  - Norwegian validation messages
  - 48px minimum height inputs
**And** form validation using Zod schemas:
  - Email format validation
  - Required field validation
  - Minimum message length validation
  - Real-time validation on blur
**And** submit button:
  - "Send melding" label
  - Playful purple background `#b589d6` (secondary CTA, not professional gold)
  - Warm white text
  - Loading state during submission
**And** on successful submission:
  - Success message: "Meldingen er sendt! Vi svarer så snart som mulig."
  - Confirmation email sent to visitor (FR24)
  - Message forwarded to artist management (FR25)
**And** page also displays:
  - Artist management email (clickable mailto link in champagne gold)
  - Social media links (Spotify, Instagram, TikTok, Facebook)
  - Link to `/arrangor` for event organizers: "Er du arrangør? Se pressekit →"
**And** form errors display with amber borders and Norwegian messages
**And** page maintains V11 warm brown aesthetic
**And** page is fully responsive (mobile/tablet/desktop)
**And** form is keyboard accessible with proper focus management
**And** page has proper SEO metadata:
  - Title: "Kontakt - Breizaas"
  - Description in Norwegian

---

## Story 5.4: Technical Rider & Event Information

As an event organizer,
I want to access Breizaas's technical rider and performance requirements,
So that I can ensure proper event setup and logistics.

**Acceptance Criteria:**

**Given** I am on the `/arrangor` press kit page
**When** I scroll to the technical rider section
**Then** I see a section titled "Teknisk Rider" in Montserrat Bold, warm white
**And** technical rider content includes:
  - **Tekniske krav** (Technical Requirements):
    - Stage size requirements
    - Sound system specifications
    - Lighting requirements
    - Power requirements
  - **Personaletilbud** (Hospitality):
    - Green room requirements
    - Catering preferences
    - Dressing room needs
  - **Tidsplan** (Schedule):
    - Soundcheck duration needed
    - Performance duration (typical set length)
    - Load-in/load-out time requirements
  - **Kontaktinformasjon** (Contact Information):
    - Technical contact person
    - Day-of-show contact number
**And** technical rider is available as downloadable PDF:
  - Download button in champagne gold: "Last ned teknisk rider (PDF)"
  - PDF filename: `breizaas-teknisk-rider.pdf`
  - PDF opens in new tab
  - PDF maintains professional formatting
**And** all text content is in Norwegian professional language
**And** content is organized in clear sections with warm white headings
**And** body text uses warm light gray `#e8e4df` for readability
**And** important requirements are highlighted in playful purple or champagne gold
**And** section maintains V11 warm brown aesthetic
**And** content is fully responsive (displays well on mobile for quick reference)
**And** PDF download is tracked for analytics (optional)
**And** technical rider content is managed via Sanity CMS (prepared for Epic 6 integration)
**And** if technical rider PDF is unavailable, text content is still readable on page
**And** download button is keyboard accessible with focus indicator

---

## Story 5.5: Form Security (CSRF Protection & Rate Limiting)

As a developer,
I want to implement CSRF protection and rate limiting on forms,
So that the website is protected from spam, abuse, and security vulnerabilities.

**Acceptance Criteria:**

**Given** forms are accessible on the website
**When** users submit booking or contact forms
**Then** all form submissions include CSRF token validation:
  - CSRF token generated on page load
  - Token included in hidden form field
  - Token validated on server before processing submission
  - Invalid token returns 403 Forbidden with Norwegian error: "Sikkerhetsfeil. Vennligst last inn siden på nytt."
**And** rate limiting is enforced per architecture requirement (NFR-S3):
  - Maximum 5 form submissions per IP address per hour
  - Rate limit applies to both booking and contact forms combined
  - Rate limit tracked using in-memory cache or database
  - Exceeding limit returns 429 Too Many Requests with Norwegian error: "For mange forsøk. Vennligst prøv igjen om en time."
  - Rate limit counter resets after 1 hour
**And** CSRF protection is implemented using Vercel Edge Middleware per architecture
**And** form inputs are validated and sanitized server-side:
  - All text inputs sanitized to prevent XSS
  - Email validation using standard regex
  - Phone number validation (Norwegian format)
  - HTML tags stripped from textarea inputs
  - SQL injection prevention through parameterized queries
**And** environment variables are properly secured:
  - Email service credentials stored as env variables
  - API keys never exposed in client-side code
  - Sensitive config excluded from version control
**And** form submission errors are logged for monitoring:
  - CSRF failures logged with IP and timestamp
  - Rate limit violations logged
  - Validation errors logged (without sensitive data)
**And** successful form submissions trigger:
  - Email notification to artist management (FR25)
  - Confirmation email to submitter (FR23 for booking, FR24 for contact)
  - Data stored securely (database or email only, not localStorage)
**And** email delivery uses transactional email service:
  - SendGrid, Resend, or similar service configured
  - Email templates in Norwegian
  - Proper from/reply-to addresses
  - Error handling if email fails to send
**And** security headers are set:
  - Content-Security-Policy (CSP) headers per architecture (NFR-S2)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
**And** all security measures work on both development and production environments
**And** rate limiting and CSRF are tested with automated security tests

---
