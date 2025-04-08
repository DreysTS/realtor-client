'use client'

import React from 'react'

import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui'
import { NAVBAR_HEIGHT } from '@/lib/constants'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className='min-h-screen w-full'>
				<Navbar />
				<div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
					<div className='flex'>
						<AppSidebar />
						<div className='flex-grow p-4 px-8 pt-8 pb-5 transition-all duration-100'>
							{children}
						</div>
					</div>
				</div>
			</div>
		</SidebarProvider>
	)
}
