'use client'

import { File, FilePlus2, Heart, Menu, Star, Users, X } from 'lucide-react'
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
	useSidebar
} from './ui'
import { useProfile } from '@/hooks/query'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/utils'

export default function AppSidebar() {
	const pathname = usePathname()
	const { toggleSidebar, open } = useSidebar()
	const { user, isLoading } = useProfile()

	const role: string = 'ADMIN'

	const navLinks =
		role === 'REGULAR'
			? [
					{
						icon: Heart,
						label: 'Избранное',
						href: '/profile/favorites'
					},
					{
						icon: File,
						label: 'Мои заявки',
						href: '/profile/requests'
					},
					{
						icon: FilePlus2,
						label: 'Создать заявку',
						href: '/profile/requests/new'
					}
				]
			: [
					{
						icon: Heart,
						label: 'Недвижимость',
						href: '/realtor/properties'
					},
					{
						icon: File,
						label: 'Заявки',
						href: '/realtor/requests'
					},
					{
						icon: Star,
						label: 'Отзывы',
						href: '/realtor/reviews'
					},
					{
						icon: Users,
						label: 'Пользователи',
						href: '/realtor/users'
					}
				]

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
										{user?.displayName}
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
					{navLinks.map(link => {
						const isActive = pathname === link.href
						console.log(pathname)

						return (
							<SidebarMenuItem key={link.href}>
								<SidebarMenuButton
									asChild
									className={cn(
										'flex items-center px-7 py-7 transition-colors',
										isActive
											? 'bg-primary/20 hover:bg-primary/25'
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
											<link.icon className='h-5 w-5' />
											{open && <span>{link.label}</span>}
										</div>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	)
}
