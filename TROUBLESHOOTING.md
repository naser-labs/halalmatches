# GitHub Pages Custom Domain Troubleshooting Checklist

## STEP 0: Discovery Status ✅
- [x] Framework identified: Next.js 14 with static export
- [x] Deployment method: GitHub Actions
- [x] Domain: halalmatches.com
- [x] CNAME file present and correct
- [x] Build configuration verified

## STEP 1: Critical Fixes Applied ✅

### 1.1 Add SPA Routing Fallback
- [x] `public/404.html` created with redirect logic for client-side routing
- [x] Allows GitHub Pages to serve index.html for unknown routes
- [x] Next.js can handle client-side navigation properly

### 1.2 Enhance Build Workflow
- [x] Updated `.github/workflows/deploy.yml` with verification steps
- [x] Workflow now validates `out/index.html` and `out/CNAME` exist
- [x] Added `NODE_ENV: production` for optimized build
- [x] Improved logging and error reporting

### 1.3 Configuration Verified
- [x] `next.config.js`: `output: 'export'` (static export)
- [x] `next.config.js`: `trailingSlash: true` (GitHub Pages compatibility)
- [x] `next.config.js`: `images: { unoptimized: true }` (no serverless needed)
- [x] `next.config.js`: `basePath: ''` and `assetPrefix: ''` (root domain)

## STEP 2: GitHub Pages Settings (MANUAL - Required)

### ⚠️ YOU MUST DO THIS IN GITHUB UI
Navigate to: **Repository → Settings → Pages**

| Setting | Required Value | How to Set |
|---------|---|---|
| **Source** | **GitHub Actions** | Dropdown showing "GitHub Actions" (not a branch) |
| **Custom Domain** | `halalmatches.com` | Enter in text field, click Save |
| **Enforce HTTPS** | ✅ **Enabled** | Toggle ON (blue) |

**Exact Steps:**
1. Go to: https://github.com/naser-labs/halalmatches/settings/pages
2. Under "Build and deployment":
   - Source dropdown: Select **GitHub Actions**
3. Under "Custom domain":
   - Clear any existing value
   - Type: `halalmatches.com`
   - Click **Save**
4. Wait 1-2 minutes for certificate validation
5. Check box: **Enforce HTTPS** (should appear after certificate is ready)
6. Click **Save**

## STEP 3: Domain Registrar DNS (MANUAL - Required)

### Configure DNS Records
Your domain registrar (GoDaddy, Namecheap, Google Domains, etc.) needs:

**For Apex Domain** (`halalmatches.com`):
```
Type: A    Name: @         Value: 185.199.108.153
Type: A    Name: @         Value: 185.199.109.153
Type: A    Name: @         Value: 185.199.110.153
Type: A    Name: @         Value: 185.199.111.153
```

**For WWW Subdomain** (`www.halalmatches.com`):
```
Type: CNAME    Name: www    Value: naser-labs.github.io
```

**Propagation:** DNS changes typically take 5 minutes to 24 hours

## STEP 4: Verification (Automated)

Run the diagnostic script to test everything:

```bash
bash scripts/verify-site.sh
```

**Expected Output:**
```
✓ PASS: halalmatches.com resolves to GitHub Pages IP(s)
✓ PASS: www.halalmatches.com CNAME points to GitHub Pages
✓ PASS: https://halalmatches.com returns 200 OK
✓ PASS: http redirects to HTTPS
✓ PASS: https://www.halalmatches.com serves content
✓ PASS: Next.js asset references detected in HTML
✓ PASS: 404 errors return HTTP 404 status
```

## STEP 5: Local Build Verification

Test the build works locally:

```bash
# Install dependencies
npm ci

# Build the site
npm run build

# Verify output
echo "=== Checking build artifacts ==="
ls -lh out/index.html
cat out/CNAME
ls out/_next/

# Verify directory structure
echo "=== Build output structure ==="
find out -maxdepth 2 -type f | head -20
```

**Expected:** `out/` directory with:
- `index.html` (root page)
- `CNAME` (domain config)
- `.nojekyll` (Jekyll bypass)
- `404.html` (SPA fallback)
- `_next/` (assets: JS, CSS)
- Other static files

## STEP 6: Trigger New Deployment

After making GitHub Pages configuration changes, trigger a new deployment:

**Option A: Push a commit**
```bash
git add .
git commit -m "trigger: force re-deployment with fixed Pages settings"
git push origin main
```

**Option B: Manually dispatch workflow**
1. Go to: https://github.com/naser-labs/halalmatches/actions/workflows/deploy.yml
2. Click **Run workflow**
3. Select branch: **main**
4. Click **Run workflow**

## STEP 7: Monitor Deployment

1. **Check Actions Status:**
   - Go to: Repository → Actions
   - Latest workflow should show ✅ passed
   - If ❌ failed, click job to see error logs

2. **Test the Site:**
   - Visit: https://halalmatches.com
   - Check for content (should load hero section with "Find Your Spouse The Halal Way")
   - Open DevTools (F12) → Console tab (should be no errors)
   - Check Network tab (CSS/JS should load)

3. **Run Verification Script:**
   ```bash
   bash scripts/verify-site.sh
   ```

## STEP 8: Troubleshooting Guide

### Problem: 404 Not Found
**Cause:** GitHub Pages not configured or deployment failed

**Fix:**
1. Verify Pages source is "GitHub Actions" (not a branch)
2. Check Actions workflow passed (green ✅)
3. Wait 30 seconds and refresh browser
4. Hard refresh: Ctrl+F5 (PC) or Cmd+Shift+R (Mac)

### Problem: Blank Page / No Content
**Cause:** Build error or asset loading issue

**Fix:**
1. Check Actions log: Did build complete?
2. Look for TypeScript/React errors in workflow output
3. Run `npm run build` locally to reproduce
4. Check browser Network tab for failed requests
5. Check browser Console for JS errors

### Problem: CSS/JS Assets Missing
**Cause:** Wrong basePath or assetPrefix setting

**Fix:**
- ✅ Already fixed in `next.config.js` (basePath and assetPrefix are empty strings)
- Verify `out/_next/` directory exists after build
- Check Network tab for asset URLs (should be root-relative like `/_next/...`)

### Problem: Custom Domain Not Working
**Cause:** DNS not configured or not propagated

**Fix:**
1. Run: `dig halalmatches.com +short` (should show GitHub IPs)
2. Run: `nslookup halalmatches.com` (should resolve)
3. Verify DNS records in registrar match table in STEP 3
4. Wait up to 24 hours for DNS propagation
5. Check: https://www.whatsmydns.net/?q=halalmatches.com (global propagation)

### Problem: HTTPS Not Available
**Cause:** Certificate not issued yet or custom domain not set

**Fix:**
1. Verify custom domain is set in GitHub Pages settings
2. Wait 5-10 minutes for certificate issuance
3. Refresh Pages settings page
4. Toggle "Enforce HTTPS" once certificate appears

## STEP 9: Final Checklist Before Launch

- [ ] GitHub Pages source: **GitHub Actions**
- [ ] Custom domain: **halalmatches.com**
- [ ] HTTPS: **Enabled** (toggle is ON)
- [ ] DNS A records: **4 records pointing to GitHub IPs**
- [ ] DNS CNAME: **www → naser-labs.github.io**
- [ ] Latest Actions workflow: **Passed ✅**
- [ ] `public/CNAME`: **Contains `halalmatches.com`**
- [ ] `public/.nojekyll`: **Present (prevents Jekyll)**
- [ ] `public/404.html`: **Present (SPA routing)**
- [ ] `out/index.html`: **Exists after build**
- [ ] `scripts/verify-site.sh`: **All checks pass**
- [ ] Browser test: **Site loads at https://halalmatches.com**
- [ ] Browser DevTools Console: **No errors**
- [ ] Browser Network tab: **All assets load successfully**

## STEP 10: Post-Launch Monitoring

### Monitor these weekly:
- [ ] GitHub Actions: Any workflow failures?
- [ ] SSL certificate: Still valid? (GitHub auto-renews)
- [ ] Site accessibility: Can you reach halalmatches.com?
- [ ] Content freshness: Is latest build deployed?

### Setup Alerts (Optional):
- GitHub Pages deployment failures
- Actions workflow failures
- Uptime monitoring service

## Support Resources

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages HTTPS Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [DNS Propagation Checker](https://www.whatsmydns.net)

---

## Summary of Changes

### Files Created/Modified:
1. ✅ `public/404.html` - NEW: SPA routing fallback
2. ✅ `.github/workflows/deploy.yml` - UPDATED: Added verification steps
3. ✅ `docs/DEPLOYMENT.md` - NEW: Comprehensive deployment guide
4. ✅ `scripts/verify-site.sh` - NEW: Diagnostic script
5. ✅ `TROUBLESHOOTING.md` - NEW: This file (checklist & fixes)

### Configuration Status:
- ✅ All code-level fixes applied
- ⚠️ GitHub Pages UI settings MUST be set manually (see STEP 2)
- ⚠️ DNS records MUST be configured at registrar (see STEP 3)

**Next Action:** Follow STEP 2 and STEP 3 for manual GitHub UI and DNS configuration.
