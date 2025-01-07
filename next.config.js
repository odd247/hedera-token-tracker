/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static exports
  distDir: 'dist',   // Sets the build output directory to 'dist'
  images: {
    unoptimized: true // Required for static export
  }
}

module.exports = nextConfig
