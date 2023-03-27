/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/fnb-user-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/fnb-user-service/:path*`,
      },
      {
        source: '/api/fnb-document-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/fnb-document-service/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pvpapi.klikoo.co.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
