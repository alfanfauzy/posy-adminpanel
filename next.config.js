/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/fnb-user-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/fnb-user-service/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
