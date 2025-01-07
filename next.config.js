/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Changed from 'export' to 'standalone'
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
