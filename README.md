# HalalMatches

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

### GitHub Pages

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Configure your custom domain in repository settings

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
