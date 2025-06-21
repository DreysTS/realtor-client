import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		CLIENT_URL: process.env.CLIENT_URL,
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '4000',
				pathname: '/static/**'
			},
			{
				protocol: 'https',
				hostname: 'api.moskvrealty.ru'
			},
			{
				protocol: 'https',
				hostname: 'api.moskvrealty.ru',
				pathname: '/static/**'
			},
		]
	}
}

export default nextConfig
