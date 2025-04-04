'use server'

import { cookies } from 'next/headers'

import { FetchClient } from '@/utils'

export const createServerInstance = async () => {
	const cookie = (await cookies()).get('session')?.value || ''

	return new FetchClient({
		baseUrl: process.env.SERVER_URL as string,
		headers: {
			Cookie: cookie
		},
		options: {
			credentials: 'include'
		}
	})
}
