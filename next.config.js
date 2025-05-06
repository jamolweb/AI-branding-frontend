/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'oaidalleapiprodscus.blob.core.windows.net',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig
