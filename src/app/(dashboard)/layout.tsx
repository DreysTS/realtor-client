import React from 'react'

import { AppSidebar, Navbar } from '@/components'
import { SidebarProvider } from '@/components/ui'
import { NAVBAR_HEIGHT } from '@/lib/constants'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Navbar />

			<div className='min-h-screen w-full'>
				<div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
					<div
						className='flex'
						style={{
							minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`
						}}
					>
						<AppSidebar />
						<div className='grow p-4 px-8 pt-8 pb-5 transition-all duration-100'>
							{children}
						</div>
					</div>
				</div>
			</div>
		</SidebarProvider>
	)
}
