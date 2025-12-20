# HalalMatches

[![Deploy to GitHub Pages](https://github.com/naseruddin25/halalmatches/actions/workflows/deploy.yml/badge.svg)](https://github.com/naseruddin25/halalmatches/actions/workflows/deploy.yml)

**Live Site**: [https://naseruddin25.github.io/halalmatches/](https://naseruddin25.github.io/halalmatches/)

A privacy-first Muslim matrimonial platform built with Islamic principles at its core.

## Features

- **Privacy First**: No database, no PII storage. Your photos stay in your Google Drive, videos on your YouTube.
- **Wali Workflows**: Three structured paths for guardian involvement.
- **Halal Communication**: Structured introductions via Google Chat deep links.
- **Static & Economical**: Deploys to GitHub Pages with zero server costs.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Identity Services (client-side auth)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/halalmatches.git
cd halalmatches

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Static files will be generated in the `/out` directory.

## Deployment

This site is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Current Setup)

✅ **Already configured!** Every push to `main` automatically:
1. Builds the Next.js static export (`npm run build`)
2. Deploys to GitHub Pages
3. Makes the site live at: https://naseruddin25.github.io/halalmatches/

**To deploy:**
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Check deployment status in the **Actions** tab on GitHub.

### First-Time Setup

If GitHub Pages isn't enabled yet:
1. Go to repository **Settings** > **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Save and wait for the first deployment to complete

### Manual Deployment (Alternative)

```bash
# Build the site
npm run build

# The out/ folder contains the static site
# Deploy the contents of out/ to your hosting provider
```

### Local Testing

Test the production build locally:
```bash
# Build the site
npm run build

# Serve the static files
python -m http.server 8000 --directory out
# OR
npx serve out

# Visit http://localhost:8000/halalmatches/
```

### Custom Domain Setup (GoDaddy)

1. **A Records** (point root domain to GitHub Pages):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. **CNAME Record** (for www subdomain):
   ```
   www -> yourusername.github.io
   ```

3. Enable HTTPS in GitHub Pages settings after DNS propagates.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐
│   Browser       │     │  Google Drive    │
│   (localStorage)│     │  (Photos)        │
└────────┬────────┘     └──────────────────┘
         │
         │ Static HTML/JS
         │
┌────────▼────────┐     ┌──────────────────┐
│  GitHub Pages   │     │  YouTube         │
│  (Static Host)  │     │  (Unlisted Vids) │
└─────────────────┘     └──────────────────┘
                        
                        ┌──────────────────┐
                        │  Google Chat     │
                        │  (Messaging)     │
                        └──────────────────┘
```

All user data stays client-side or in user-owned Google services.

## Project Structure

```
src/
├── app/
│   ├── app/              # Protected app routes
│   │   ├── introductions/  # Send introductions
│   │   ├── media/          # Photo management
│   │   ├── profile/        # Profile form
│   │   ├── video/          # YouTube video
│   │   └── wali/           # Wali status
│   ├── faq/              # FAQ page
│   ├── privacy/          # Privacy policy
│   └── wali-workflows/   # Wali process docs
├── components/           # Shared components
└── lib/                  # Utilities & types
```

## Islamic Principles

This platform is designed for Muslims seeking marriage through halal means:

- **Not a dating app**: Structured, purposeful interactions only
- **Wali involvement**: Required guardian participation
- **Privacy protection**: Minimal data collection
- **Clear boundaries**: No casual chatting features

## License

MIT

---

Built with ☪️ for the Muslim ummah.
