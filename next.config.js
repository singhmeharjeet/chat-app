/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "next-js.org",
			},
			{
				protocol: "https",
				hostname: "pbs.twimg.com",
			},
			{
				protocol: "https",
				hostname: "xsgames.co",
			},
		],
	},
};

module.exports = nextConfig;
