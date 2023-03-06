/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/fnb-user-service/:path*',
        destination: `https://pvpapi.klikoo.co.id/fnb-user-service/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
