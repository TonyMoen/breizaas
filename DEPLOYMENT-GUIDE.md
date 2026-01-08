# Breizaas Website - Deployment Guide

**Status:** Ready for customer deployment
**Repository:** https://github.com/TonyMoen/breizaas
**Deployment Strategy:** Scenario 2 (Developer has access to customer's Vercel)

---

## Repository Structure

### Branch Strategy
- **`main`** → Production-ready code (clean, no BMAD files)
- **`develop`** → Development workspace (includes BMAD framework)

### What's Excluded from Production
- `_bmad/` - BMAD framework files
- `_bmad-output/` - Planning and documentation artifacts
- `test-*.mjs` - Development test scripts
- `.claude/` - Claude Code files
- Dev screenshots and test API endpoints

Files excluded via `.gitignore` and `.vercelignore`

---

## Deployment Scenario: Customer's Vercel Account

### Prerequisites
- Access to customer's Vercel account
- GitHub repo: TonyMoen/breizaas
- All environment variables (see below)
- Customer's domain (if custom domain needed)

---

## Environment Variables

### Required for Deployment

```env
# Bandsintown API Configuration
BANDSINTOWN_API_KEY=8af49d659ce35c6256808b07ac1cb41c
NEXT_PUBLIC_BANDSINTOWN_ARTIST_NAME=Breizaas

# Shopify Storefront API Configuration
SHOPIFY_STOREFRONT_TOKEN=e0366dffa5c655a92271d902f357863e
SHOPIFY_DOMAIN=merchforbands.myshopify.com

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=f0qk7p9q
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-27
SANITY_API_TOKEN=skxnKWeWVUBHiVT9QiQNy1sAraD0LGapIaYyXbMHA5mprUzPxvTcymF9LAZQDNfx3Te8rPP5VoY5AeRBz6vl9lSkL8TH1kDowetBtrcqxZSFjQOx0epHY7rPbbzr3FgjA025FIivciPTn3jaZ8z5fREngddL09DyZqCanryBe9OeCYnf15R1

# Email Service (Resend)
RESEND_API_KEY=re_7PJsAtAc_6uXqa5qNoPgQjWgsd3eQdnYe

# Email Recipients
ARTIST_EMAIL=tony.moen94@gmail.com

# Security Configuration
RATE_LIMIT_BYPASS=false
```

---

## Vercel Deployment Steps

### Step 1: Connect GitHub Repository

1. Log into customer's Vercel account
2. Click "Add New..." → "Project"
3. Import from GitHub
4. Search for: `TonyMoen/breizaas`
5. Click "Import"

### Step 2: Configure Project Settings

**Framework Preset:** Next.js
**Root Directory:** `breizaas-website`
**Build Command:** (default)
**Output Directory:** (default)
**Install Command:** (default)

### Step 3: Set Production Branch

**Important:** Set production branch to `main`

- Go to Project Settings → Git
- Set "Production Branch" to `main`

### Step 4: Add Environment Variables

In Vercel Project Settings → Environment Variables, add all variables from the section above.

**For each variable:**
1. Name: [Variable name]
2. Value: [Variable value]
3. Environment: Production (and optionally Preview/Development)
4. Click "Add"

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Verify deployment at the generated Vercel URL

### Step 6: Custom Domain (Optional)

If customer has a custom domain:
1. Go to Project Settings → Domains
2. Add customer's domain
3. Configure DNS records as instructed by Vercel

---

## Post-Deployment Verification

### Test These Pages:
- [ ] Homepage (hero, stats, navigation)
- [ ] `/musikk` - Spotify embeds, discography
- [ ] `/konserter` - Bandsintown tour dates
- [ ] `/butikk` - Shopify merchandise
- [ ] `/om` - Artist bio
- [ ] `/kontakt` - Contact forms
- [ ] `/presskit` - Press kit resources

### Test These Features:
- [ ] Sanity CMS content loads
- [ ] Spotify player works
- [ ] Tour dates display
- [ ] Shopify products load
- [ ] Contact form sends emails
- [ ] Booking form works
- [ ] Mobile navigation
- [ ] SEO meta tags

---

## Sanity CMS Ownership

**Current Sanity Project:** `f0qk7p9q` (production dataset)
**Owner:** breizaas@gmail.com

### Options for Customer:

**Option A: Transfer Sanity Project**
1. Transfer project to customer's Sanity organization
2. Customer updates API tokens in Vercel
3. Customer gets full CMS ownership

**Option B: Keep Current Setup**
1. Add customer as admin to current Sanity project
2. No token changes needed
3. Developer remains project owner

---

## Ongoing Development Workflow

### Developer Workflow:
```bash
# Work in develop branch
git checkout develop
# ... make changes ...
git add .
git commit -m "Feature update"
git push origin develop

# When ready for production
git checkout main
git merge develop
git push origin main
# → Vercel auto-deploys to customer
```

### Customer Updates:
- Content updates via Sanity Studio (no deployments needed)
- Code changes trigger auto-deploy from `main` branch

---

## Troubleshooting

### Build Fails
- Check all environment variables are set correctly
- Verify root directory is `breizaas-website`
- Check build logs for specific errors

### CMS Content Not Loading
- Verify Sanity API token is valid
- Check project ID matches: `ncp5tmyo`
- Ensure dataset is `production`

### Forms Not Working
- Verify Resend API key is valid
- Check ARTIST_EMAIL is correct
- Review rate limiting settings

### Third-Party Integrations
- **Bandsintown:** Verify API key and artist name
- **Shopify:** Check storefront token and domain
- **Spotify:** Embeds should work without keys (public)

---

## Support Contacts

**Developer:** Tony Moen (tony.moen94@gmail.com)
**Repository:** https://github.com/TonyMoen/breizaas

---

## Notes for Future Updates

- BMAD framework remains in `develop` branch only
- Production deploys from `main` branch exclusively
- `.vercelignore` prevents dev files from deploying
- All changes should merge develop → main before production deployment

---

**Document Created:** 2026-01-08
**Last Updated:** 2026-01-08
**Deployment Status:** Pending
