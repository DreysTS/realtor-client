import React from 'react'

export function SidebarTitle({ children }: { children: React.ReactNode }) {
	return (
		<h1 className='text-shadow-foreground text-xl font-semibold text-shadow-sm/20 lg:text-3xl lg:font-bold'>
			{children}
		</h1>
	)
}
