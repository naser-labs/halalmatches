# Deployment & GitHub Pages Configuration Guide

## Overview
This site is deployed to GitHub Pages with a custom domain (`halalmatches.com`) using GitHub Actions CI/CD and Next.js static export.

## Tech Stack
- **Framework:** Next.js 14.2.3 (static export)
- **Deployment:** GitHub Actions → GitHub Pages
- **Custom Domain:** halalmatches.com
- **Build Output:** `./out/` directory

## Prerequisites
All critical files are in place:
- ✅ `public/CNAME` - contains `halalmatches.com`
- ✅ `public/.nojekyll` - prevents Jekyll processing
- ✅ `public/404.html` - SPA routing fallback
- ✅ `.github/workflows/deploy.yml` - automated deployment
- ✅ `next.config.js` - static export configured

## Deployment Flow

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
Triggers on:
- Push to `main` branch
- Manual workflow dispatch

Steps:
1. Checkout code
2. Setup Node.js 20 + npm cache
3. Install dependencies (`npm ci`)
4. Build with Next.js (`npm run build`)
5. **Verify** output contains `index.html` and `CNAME`
6. Upload `./out/` as GitHub Pages artifact
7. Deploy artifact to GitHub Pages

### 2. GitHub Pages Configuration
Expected settings in **Repository Settings → Pages**:

| Setting | Value |
|---------|-------|
| **Source** | GitHub Actions |
| **Custom Domain** | halalmatches.com |
| **Enforce HTTPS** | Enabled ✅ |

**Note:** Do NOT set "Deploy from a branch" - we use Actions exclusively.

### 3. DNS Configuration
Your domain registrar must have:

| Record Type | Value | Purpose |
|------------|-------|---------|
| A | 185.199.108.153 | GitHub Pages IPv4 |
| A | 185.199.109.153 | (redundancy) |
| A | 185.199.110.153 | (redundancy) |
| A | 185.199.111.153 | (redundancy) |
| CNAME | `naser-labs.github.io` | For www subdomain |

**Setup:**
- **Apex domain** (`halalmatches.com`): Use A records pointing to GitHub IPs
- **www subdomain** (`www.halalmatches.com`): Use CNAME pointing to `naser-labs.github.io`

## Build Configuration

### Next.js Config (`next.config.js`)
```javascript
const nextConfig = {
  output: 'export',           // Static export for GitHub Pages
  trailingSlash: true,        // Add trailing slash to routes
  images: { unoptimized: true }, // No image optimization
  basePath: '',               // No base path (root domain)
  assetPrefix: '',            // Assets at root
}
```

### Key Settings Explained
- **`output: 'export'`**: Generates static HTML (not a Node.js server)
- **`trailingSlash: true`**: `/page/` instead of `/page` for GitHub Pages compatibility
- **`images: { unoptimized: true }`**: Static images, no serverless optimization
- **`basePath: ''`**: Deploy at root, not a subdirectory

## Build & Test Locally

### Build
```bash
npm run build
```

Output directory: `./out/`

### Verify Build
```bash
# Should see index.html at root
ls out/index.html

# Should see CNAME for custom domain
cat out/CNAME

# Should see .nojekyll to prevent Jekyll
ls out/.nojekyll

# Check for _next directory (assets)
ls out/_next/
```

### Preview Locally (Optional)
```bash
npm install -g http-server
http-server ./out --port 8000
# Visit http://localhost:8000
```

## Troubleshooting Checklist

### Issue: 404 Not Found
- ✅ Run `npm run build` and verify `out/index.html` exists
- ✅ Check GitHub Pages source is set to "GitHub Actions"
- ✅ Check repository has read/write permissions in Actions

### Issue: Assets Missing (CSS/JS)
- ✅ Next.js `basePath` should be empty (`''`)
- ✅ Check `out/_next/` directory contains assets after build
- ✅ Verify no trailing slash issues in HTML paths

### Issue: Custom Domain Not Working
- ✅ Verify `out/CNAME` contains exact domain: `halalmatches.com`
- ✅ Check repository Settings → Pages → Custom Domain is set
- ✅ Verify DNS records at registrar (A records + CNAME for www)
- ✅ DNS may take 24-48 hours to propagate

### Issue: HTTPS Not Enforcing
- ✅ Custom domain must be set in Pages settings first
- ✅ Wait for HTTPS certificate issuance (5-10 minutes after domain setup)
- ✅ Enable "Enforce HTTPS" toggle in Pages settings

### Issue: Blank Page / JS Errors
- ✅ Open browser DevTools (F12) and check Console for errors
- ✅ Check Network tab for failed asset loads
- ✅ Ensure build completed successfully (check Actions log)

## Verification Script

Run the diagnostic script to check deployment status:

```bash
bash scripts/verify-site.sh
```

This script checks:
1. DNS resolution (A records and CNAME)
2. HTTPS availability
3. Redirect chains (HTTP → HTTPS)
4. HTML content delivery
5. Asset loading (Next.js _next/ directory)
6. Custom domain configuration

## Deployment Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ 1. Push to main branch                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. GitHub Actions Workflow Triggered (.github/workflows) │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Build Job                                            │
│   - Checkout code                                       │
│   - npm ci (install deps)                              │
│   - npm run build (Next.js static export)              │
│   - Verify: index.html, CNAME exist                    │
│   - Upload ./out/ as artifact                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Deploy Job                                           │
│   - Deploy artifact to GitHub Pages                    │
│   - Published at: https://naser-labs.github.io         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Custom Domain Resolution                            │
│   - DNS routes halalmatches.com to GitHub Pages IP      │
│   - GitHub Pages recognizes CNAME file                 │
│   - Serves content at https://halalmatches.com         │
└─────────────────────────────────────────────────────────┘
```

## Monitoring

### Action Items Post-Deployment
1. **Check GitHub Actions**: Repository → Actions → verify latest workflow passed
2. **Test Domain**: Visit https://halalmatches.com in browser
3. **Check SSL**: Run `scripts/verify-site.sh` to confirm HTTPS
4. **Monitor Errors**: Check browser console for runtime errors
5. **Asset Loading**: Verify CSS/JS load properly (Network tab in DevTools)

## Need Help?

### Debug GitHub Actions Failure
1. Go to Repository → Actions → latest workflow run
2. Click failed job to see full logs
3. Common errors:
   - `npm ci` fails: dependency issue
   - `npm run build` fails: check build logs for TypeScript/React errors
   - Artifact upload fails: check permissions

### Debug Domain Issues
1. Verify DNS propagation: `dig halalmatches.com` or `nslookup halalmatches.com`
2. Check GitHub Pages settings: Settings → Pages
3. Verify CNAME file: `curl -s https://raw.githubusercontent.com/naser-labs/halalmatches/main/public/CNAME`
4. Check certificate status: Visit domain and check SSL info

### Debug Content Not Displaying
1. Clear browser cache: Ctrl+Shift+Delete or Cmd+Shift+Delete
2. Do hard refresh: Ctrl+F5 or Cmd+Shift+R
3. Check if site works over GitHub Pages default domain: `https://naser-labs.github.io`
4. Inspect browser console for JavaScript errors

## References
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages + Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages & HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
