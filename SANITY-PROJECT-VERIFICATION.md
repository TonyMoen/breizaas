# Sanity Project Verification Guide

**Purpose:** Verify that the deployed Vercel site is connected to the correct Sanity project.

**Created:** 2026-01-08
**Last Verified:** 2026-01-08

---

## ✅ Correct Project Configuration

**Customer's Sanity Project:**
- **Project ID:** `f0qk7p9q`
- **Owner:** breizaas@gmail.com
- **Dataset:** `production`
- **Studio URL:** https://breizaas-website.vercel.app/studio

**Deployed Site:**
- **Production URL:** https://breizaas-website.vercel.app
- **Vercel Project:** gisle-knutsens-projects/breizaas-website
- **GitHub Repo:** TonyMoen/breizaas (main branch)

---

## Quick Verification Methods

### Method 1: Run Verification Script (Fastest)

```bash
node test-sanity-project.mjs
```

**Expected Output:**
```
✅ VERIFIED: Deployed site is using the correct Sanity project!
   Project ID: f0qk7p9q
```

If you see `f0qk7p9q` → **Correct!** ✅
If you see anything else → **Wrong project!** ❌

---

### Method 2: Check Vercel Environment Variables

```bash
cd breizaas-website
vercel env pull .env.production
grep NEXT_PUBLIC_SANITY_PROJECT_ID .env.production
```

**Expected Output:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID="f0qk7p9q"
```

---

### Method 3: Test Studio Access

1. Go to: https://breizaas-website.vercel.app/studio
2. Login with: `breizaas@gmail.com`
3. If login works → Correct project ✅
4. If "unauthorized" error → Wrong project ❌

---

### Method 4: Check Sanity Dashboard

1. Go to: https://sanity.io/manage
2. Find project `f0qk7p9q` (should be named "Breizaas")
3. Check CORS origins includes: `https://breizaas-website.vercel.app`
4. Check if `breizaas@gmail.com` is listed as project member

---

## What to Check After Every Deployment

After deploying to Vercel, verify:

- [ ] Run `node test-sanity-project.mjs` → Should show `f0qk7p9q`
- [ ] Test Studio access at `/studio` → Customer can login
- [ ] Content displays on homepage → Data loading from Sanity
- [ ] No 401/403 errors in browser console

---

## Troubleshooting

### If Wrong Project ID is Detected:

**Symptoms:**
- Verification script shows wrong project ID
- Customer can't access `/studio`
- 401 errors in console
- Content not loading

**Fix:**
```bash
cd breizaas-website

# Remove wrong variables
vercel env rm NEXT_PUBLIC_SANITY_PROJECT_ID production --yes
vercel env rm SANITY_API_TOKEN production --yes

# Add correct variables
echo -n "f0qk7p9q" | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
echo -n "[GET_NEW_TOKEN]" | vercel env add SANITY_API_TOKEN production

# Redeploy
vercel --prod
```

Get new token from: https://sanity.io/manage/project/f0qk7p9q/api

---

### If CORS Error:

**Symptoms:**
- Studio loads but shows "Unauthorized" or CORS error
- Browser console shows CORS-related errors

**Fix:**
1. Go to: https://sanity.io/manage/project/f0qk7p9q/api
2. Scroll to "CORS Origins"
3. Ensure `https://breizaas-website.vercel.app` is in the list
4. Check "Allow credentials" is enabled

---

## Reference: Environment Variables

**All Required Sanity Variables:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=f0qk7p9q
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-27
SANITY_API_TOKEN=[token-from-customer-project]
```

**Where to Get Token:**
https://sanity.io/manage/project/f0qk7p9q/api → "Tokens" section

---

## History

### 2026-01-08 - Initial Deployment Issue
- **Problem:** Deployed with wrong project ID (`ncp5tmyo`)
- **Cause:** Wrong ID in `.env.local`
- **Fix:** Updated Vercel env vars to `f0qk7p9q`
- **Verification:** Created this guide + test script

---

## Quick Reference

| What | Value |
|------|-------|
| Correct Project ID | `f0qk7p9q` |
| Wrong Project ID (OLD) | `ncp5tmyo` ❌ |
| Dataset | `production` |
| Owner | breizaas@gmail.com |
| Studio URL | https://breizaas-website.vercel.app/studio |
| Sanity Dashboard | https://sanity.io/manage/project/f0qk7p9q |

---

**💡 Pro Tip:** Run `node test-sanity-project.mjs` before every major deployment to ensure configuration hasn't changed!
