/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack: (config, { dev, isServer }) => {
    // Disable eval in production
    if (!dev) {
      config.optimization.minimize = true;
    }
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false
    };
    
    return config;
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://mainnet-public.mirrornode.hedera.com; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig
