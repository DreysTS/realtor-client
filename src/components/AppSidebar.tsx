import { cookies } from 'next/headers'
import React from 'react'

import { AppSidebarClient } from './AppSidebarClient'
import { userService } from '@/services'

export default async function AppSidebar() {
	const cookieStore = await cookies()
	const sessionCookie = cookieStore.get('session')?.value || ''

	if (sessionCookie) {
		const user = await userService.findServerProfile(sessionCookie)

		return <AppSidebarClient initialData={user} />
	}

	return <AppSidebarClient />
}
