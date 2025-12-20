/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment at username.github.io/repo-name
  basePath: '/halalmatches',
  assetPrefix: '/halalmatches',
}

module.exports = nextConfig
