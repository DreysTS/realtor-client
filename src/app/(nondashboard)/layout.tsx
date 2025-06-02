import React from 'react'

import { Navbar } from '@/components'
import { NAVBAR_HEIGHT } from '@/lib/constants'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-full w-full'>
			<Navbar />
			<main style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>{children}</main>
		</div>
	)
}
