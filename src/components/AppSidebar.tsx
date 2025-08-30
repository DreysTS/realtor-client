'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger
} from './ui'
import { DASHBOARD_LINKS_CONFIG } from '@/config/navigation'
import type { DashboardLinksConfig } from '@/config/navigation'
import { useProfile } from '@/hooks/queries/auth'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { UserRole } from '@/lib/types'
import { cn } from '@/lib/utils'

export function AppSidebar() {
	const { user } = useProfile()

	return (
		<Sidebar
			collapsible='icon'
			style={{
				top: `${NAVBAR_HEIGHT}px`,
				height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
			}}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className='flex justify-end'>
						<SidebarTrigger variant='outline' />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{user?.role === UserRole.Regular && (
					<NavGroup items={DASHBOARD_LINKS_CONFIG.profile} />
				)}
				{user?.role === UserRole.Realtor && (
					<>
						<NavGroup items={DASHBOARD_LINKS_CONFIG.profile} />
						<NavGroup items={DASHBOARD_LINKS_CONFIG.realtor} />
					</>
				)}
			</SidebarContent>
		</Sidebar>
	)
}

type NavGroupProps = {
	items: DashboardLinksConfig[keyof DashboardLinksConfig]
}

function NavGroup({ items }: NavGroupProps) {
	const pathname = usePathname()

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{items.title}</SidebarGroupLabel>
			<SidebarMenu>
				{items.links.map(item => {
					const isActive = pathname === item.href
					return (
						<SidebarMenuItem key={item.href}>
							<SidebarMenuButton
								tooltip={item.label}
								asChild
								disabled={isActive}
							>
								<Link
									className={cn(
										isActive ? 'text-primary' : ''
									)}
									href={item.href}
								>
									<item.icon />
									<span>{item.label}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
