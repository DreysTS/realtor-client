'use server'

import { cookies } from 'next/headers'

import { userService } from '@/services'

export async function getServerUser() {
	const session = (await cookies()).get('session')?.value

	if (!session) return null

	try {
		const user = await userService.findServerProfile(session)

		return user
	} catch (error) {
		return null
	}
}
