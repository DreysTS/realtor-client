'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import {
	Button,
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	buttonVariants,
	useSidebar
} from './ui'
import { useProfile } from '@/hooks/query'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { cn, navLinksGenerator } from '@/utils'

export function AppSidebar() {
	const pathname = usePathname()
	const { toggleSidebar, open } = useSidebar()
	const { user, isLoading } = useProfile()

	const role: string = 'REGULAR'

	const navLinks = navLinksGenerator(user?.role as string)

	return (
		<Sidebar
			collapsible='icon'
			className='fixed left-0 shadow-lg'
			style={{
				top: `${NAVBAR_HEIGHT}px`,
				height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
			}}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div
							className={cn(
								'mb-3 flex min-h-[56px] w-full items-center pt-3',
								open ? 'justify-between px-6' : 'justify-center'
							)}
						>
							{open ? (
								<>
									<h1 className='line-clamp-1 text-xl font-bold'>
										Профиль
									</h1>
									<Button
										size='icon-sm'
										variant='ghost'
										onClick={() => toggleSidebar()}
									>
										<X className='h-6 w-6' />
									</Button>
								</>
							) : (
								<Button
									size='icon-sm'
									variant='ghost'
									onClick={() => toggleSidebar()}
								>
									<Menu className='h-6 w-6' />
								</Button>
							)}
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarMenu>
					<TooltipProvider>
						{navLinks.map(link => {
							const isActive = pathname.startsWith(link.href)

							return (
								<Tooltip key={link.href}>
									<TooltipTrigger asChild>
										<SidebarMenuItem>
											<SidebarMenuButton
												asChild
												className={cn(
													'flex items-center px-7 py-7 transition-colors',
													isActive
														? 'text-primary hover:text-primary'
														: '',
													open ? '' : 'ml-2'
												)}
											>
												<Link
													href={link.href}
													className='w-full'
													scroll={false}
												>
													<div className='flex items-center gap-3'>
														<link.icon
															className={cn(
																open
																	? 'h-5 w-5'
																	: 'h-4 w-4'
															)}
														/>
														{open && (
															<span className='line-clamp-1'>
																{link.label}
															</span>
														)}
													</div>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</TooltipTrigger>
									{!open && (
										<TooltipContent side='right'>
											{link.label}
										</TooltipContent>
									)}
								</Tooltip>
							)
						})}
					</TooltipProvider>
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	)
}
