'use client'

import { File, LogOut, Menu, Search, Settings, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { ModeToggle } from './ModeToggle'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Logo,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	buttonVariants
} from './ui'
import {
	DASHBOARD_LINKS_CONFIG,
	DashboardLinksConfig
} from '@/config/navigation'
import { useLogoutMutation, useProfile } from '@/hooks/queries/auth'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { UserRole } from '@/lib/types'
import { cn } from '@/lib/utils'

export function Navbar() {
	const router = useRouter()

	const { user } = useProfile()

	const { logout, isLoadingLogout } = useLogoutMutation()

	return (
		<div
			className='bg-background fixed top-0 left-0 z-50 w-full shadow-sm'
			style={{ height: `${NAVBAR_HEIGHT}px` }}
		>
			<div className='flex h-full w-full items-center justify-between px-4 py-3 sm:px-8'>
				<Link href='/' className='cursor-pointer'>
					<div className='flex items-center gap-3'>
						<div className='h-8 w-8 rounded-md'>
							<Logo />
						</div>
						<h4 className='max-sm:hidden'>MoskvRealty</h4>
					</div>
				</Link>

				<Button
					variant='outline'
					effect='expandIcon'
					iconPlacement='right'
					icon={Search}
					asChild
					size='sm'
				>
					<Link href='/properties' scroll={false}>
						Найти недвижимость
					</Link>
				</Button>

				<div className='flex items-center space-x-3 max-lg:hidden'>
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									className='flex items-center gap-3'
								>
									<Avatar>
										<AvatarImage
											src={user.picture}
											alt={user.displayName + 'Alt'}
										/>
										<AvatarFallback className='bg-primary'>
											{user.displayName[0].toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div>{user.displayName}</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem
									className='flex items-center'
									onClick={() =>
										router.push(
											user.role === 'REGULAR'
												? '/profile/favorites'
												: '/realtor/properties'
										)
									}
								>
									<UserCircle />
									<span>Личный кабинет</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className='flex items-center'
									onClick={() =>
										router.push(
											user.role === 'REGULAR'
												? '/profile/settings'
												: '/realtor/requests'
										)
									}
								>
									{user.role === 'REGULAR' ? (
										<Settings />
									) : (
										<File />
									)}
									<span>
										{user.role === 'REGULAR'
											? 'Настройки'
											: 'Заявки'}
									</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className='flex items-center'
									onClick={() => {
										logout()
									}}
									disabled={isLoadingLogout}
								>
									<LogOut />
									Выйти
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link
							href='/auth/register'
							className={cn(
								buttonVariants({
									size: 'sm'
								}),
								'max-sm:hidden'
							)}
						>
							Регистрация
						</Link>
					)}

					<ModeToggle />
				</div>

				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='outline'
							size='icon-sm'
							className='lg:hidden'
						>
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Меню</SheetTitle>
							<SheetDescription>
								Навигация по сайту
							</SheetDescription>
						</SheetHeader>
						<div className='flex h-full flex-col gap-2 px-4'>
							<Button variant='outline' asChild size='sm'>
								<Link href='/properties' scroll={false}>
									Найти недвижимость <Search />
								</Link>
							</Button>
							<div className='flex flex-col gap-2'>
								{user?.role &&
									[
										UserRole.Regular,
										UserRole.Realtor
									].includes(user.role) && (
										<NavGroup
											items={
												DASHBOARD_LINKS_CONFIG.profile
											}
										/>
									)}

								{user?.role === UserRole.Realtor && (
									<NavGroup
										items={DASHBOARD_LINKS_CONFIG.realtor}
									/>
								)}
							</div>
						</div>
						<SheetFooter className='border-t'>
							<div className='flex items-center justify-between gap-3'>
								{user ? (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant='ghost'
												className='grow justify-start'
											>
												<Avatar>
													<AvatarImage
														src={user.picture}
													/>
													<AvatarFallback className='bg-primary'>
														{user.displayName[0].toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div>{user.displayName}</div>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											className='w-52'
											align='start'
										>
											<DropdownMenuItem
												className='flex items-center'
												disabled={isLoadingLogout}
												onClick={() => {
													logout()
												}}
											>
												<LogOut />
												Выйти
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								) : (
									<Link
										href='/auth/register'
										className={cn(buttonVariants(), 'grow')}
									>
										Регистрация
									</Link>
								)}
								<ModeToggle />
							</div>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}

type NavGroupProps = {
	items: DashboardLinksConfig[keyof DashboardLinksConfig]
}

function NavGroup({ items }: NavGroupProps) {
	const pathname = usePathname()

	return (
		<div className='space-y-2'>
			<h4 className='text-muted-foreground'>{items.title}</h4>
			<div>
				{items.links.map(link => {
					const isActive = pathname === link.href

					return (
						<Link href={link.href} key={link.label}>
							<div
								className={cn(
									isActive && 'text-primary',
									'hover:bg-secondary/75 flex items-center gap-3 rounded-lg px-3 py-2'
								)}
							>
								<link.icon className='h-5 w-5' />
								{link.label}
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
