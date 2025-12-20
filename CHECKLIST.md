# ✅ Pre-Deployment Checklist

Run through this checklist before pushing to GitHub to ensure everything is ready.

## Build Verification

- [x] ✅ Dependencies installed (`npm install` completed)
- [x] ✅ Build successful (`npm run build` completed without errors)
- [x] ✅ Static files generated in `out/` folder
- [x] ✅ All 13 pages generated successfully
- [x] ✅ No build warnings or errors

## Configuration Verification

- [x] ✅ `next.config.js` has correct `basePath: '/halalmatches'`
- [x] ✅ `next.config.js` has `output: 'export'`
- [x] ✅ `next.config.js` has `assetPrefix: '/halalmatches'`
- [x] ✅ `.nojekyll` file exists in `out/` folder
- [x] ✅ `CNAME` file exists in `out/` folder (for custom domain)

## Path Verification

- [x] ✅ All CSS files use `/halalmatches/_next/static/css/...`
- [x] ✅ All JS files use `/halalmatches/_next/static/chunks/...`
- [x] ✅ All navigation links use `/halalmatches/...` prefix
- [x] ✅ No broken relative paths (all paths are properly prefixed)
- [x] ✅ No absolute paths starting with `/` (except `/halalmatches/...`)

## Page Structure Verification

- [x] ✅ `out/index.html` exists (home page)
- [x] ✅ `out/faq/index.html` exists
- [x] ✅ `out/privacy/index.html` exists
- [x] ✅ `out/wali-workflows/index.html` exists
- [x] ✅ `out/app/index.html` exists (dashboard)
- [x] ✅ `out/404.html` exists (error page)

## GitHub Actions Verification

- [x] ✅ `.github/workflows/deploy.yml` exists
- [x] ✅ Workflow configured to build on push to `main`
- [x] ✅ Workflow configured to deploy from `out/` folder
- [x] ✅ Proper permissions set for GitHub Pages deployment

## Asset Verification

- [x] ✅ No local images (site uses external resources only)
- [x] ✅ CSS files generated and properly linked
- [x] ✅ JavaScript files generated and properly linked
- [x] ✅ Fonts/icons properly embedded

## Navigation Testing (Local)

Before deploying, test locally with:
```bash
python -m http.server 8000 --directory out
# OR
npx serve out -p 8000
```

Then visit `http://localhost:8000/halalmatches/` and test:

- [ ] Home page loads correctly
- [ ] All navigation links work (no 404s)
- [ ] FAQ page loads
- [ ] Privacy page loads
- [ ] Wali Workflows page loads
- [ ] App dashboard loads
- [ ] Dark mode toggle works
- [ ] All styles load correctly
- [ ] Mobile menu works (test on mobile or resize browser)

## Deployment Checklist

### Option 1: Automatic (GitHub Actions)

- [ ] Push code to GitHub: `git push origin main`
- [ ] Go to repository Settings > Pages
- [ ] Set source to "GitHub Actions"
- [ ] Wait for Actions workflow to complete
- [ ] Check Actions tab for deployment status
- [ ] Visit https://naseruddin25.github.io/halalmatches/
- [ ] Test all pages and navigation on live site

### Option 2: Manual (gh-pages branch)

- [ ] Build site: `npm run build`
- [ ] Create/switch to gh-pages branch
- [ ] Copy `out/*` to root
- [ ] Push to GitHub: `git push origin gh-pages`
- [ ] Enable Pages with source: gh-pages branch
- [ ] Visit https://naseruddin25.github.io/halalmatches/

## Post-Deployment Verification

After deployment, verify on live site:

- [ ] Home page: https://naseruddin25.github.io/halalmatches/
- [ ] FAQ: https://naseruddin25.github.io/halalmatches/faq/
- [ ] Privacy: https://naseruddin25.github.io/halalmatches/privacy/
- [ ] Wali Workflows: https://naseruddin25.github.io/halalmatches/wali-workflows/
- [ ] Dashboard: https://naseruddin25.github.io/halalmatches/app/
- [ ] All navigation links work
- [ ] All footer links work
- [ ] Dark mode toggle works
- [ ] Mobile responsive (test on mobile device)
- [ ] Browser console shows no errors
- [ ] All CSS/JS loads (no 404s in Network tab)

## Troubleshooting

### If pages show 404:
1. Wait 1-2 minutes for GitHub Pages to update
2. Check repository Settings > Pages is enabled
3. Verify deployment completed in Actions tab
4. Clear browser cache and retry

### If CSS/JS don't load:
1. Check browser console for errors
2. Verify `_next/` folder exists in deployment
3. Check Network tab for failed requests
4. Ensure basePath in `next.config.js` is correct

### If navigation broken:
1. Verify all links have `/halalmatches/` prefix
2. Rebuild: `npm run build`
3. Redeploy updated files

## Files to Commit

✅ Commit these files:
- All source files in `src/`
- `next.config.js`
- `package.json`, `package-lock.json`
- `tailwind.config.js`, `tsconfig.json`
- `.github/workflows/deploy.yml`
- `public/CNAME`, `public/.nojekyll`
- `README.md`, documentation files

❌ DO NOT commit:
- `node_modules/` (in .gitignore)
- `out/` (built automatically by GitHub Actions)
- `.next/` (build cache)

## Ready to Deploy?

If all checks pass:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Setup complete: Ready for GitHub Pages deployment"

# Push to GitHub
git push origin main
```

Then:
1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Watch the "Deploy to GitHub Pages" workflow
4. When complete (✅ green checkmark), visit your site!

---

**🎉 Your site is production-ready!**

See [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) for full setup details.
See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.
