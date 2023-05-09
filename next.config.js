/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	swcMinify: true,
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
			{
				source: '/api/fnb-product-service/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/fnb-product-service/:path*`,
			},
			{
				source: '/api/fnb-order-service/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/fnb-order-service/:path*`,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pvpapi.klikoo.co.id',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'fnbapi.stage.pvg.im',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '12004',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
