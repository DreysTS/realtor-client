import { cookies } from 'next/headers'
import React from 'react'

import { NavbarClient } from './NavbarClient'
import { userService } from '@/services'

export default async function Navbar() {
	try {
		const cookieStore = await cookies()
		const sessionCookie = cookieStore.get('session')?.value || ''

		if (sessionCookie) {
			const user = await userService.findServerProfile(sessionCookie)

			return <NavbarClient initialData={user} />
		}
	} catch (error) {
		return <NavbarClient />
	}
}
