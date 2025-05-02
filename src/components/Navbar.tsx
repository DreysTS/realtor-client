'use client'

import { LogOut, Search, Settings, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
	buttonVariants
} from './ui'
import { useLogoutMutation, useProfile } from '@/hooks/query'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/utils'

export default function Navbar() {
	const router = useRouter()

	const { user, isLoading } = useProfile()

	const { logout, isLoadingLogout } = useLogoutMutation()

	const role: string = 'ADMIN'

	return (
		<div
			className='bg-background fixed top-0 left-0 z-50 w-full shadow-sm'
			style={{ height: `${NAVBAR_HEIGHT}px` }}
		>
			<div className='flex w-full items-center justify-between px-8 py-3'>
				<Link href='/' className='cursor-pointer'>
					<div className='flex items-center gap-3'>
						<div className='bg-primary h-8 w-8 rounded-md'></div>
						<span>MosRealtor</span>
					</div>
				</Link>

				<Button
					variant='outline'
					effect='expandIcon'
					iconPlacement='right'
					icon={Search}
					onClick={() =>
						router.push('/properties', { scroll: false })
					}
				>
					Найти недвижимость
				</Button>

				<div className='flex items-center space-x-3'>
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									className='flex items-center gap-3'
								>
									<Avatar>
										<AvatarImage src={user.picture} />
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
											role === 'REGULAR'
												? '/profile/favorites'
												: '/realtor/properties',
											{
												scroll: false
											}
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
											role === 'REGULAR'
												? '/profile/settings'
												: '/realtor/users',
											{
												scroll: false
											}
										)
									}
								>
									<Settings />
									<span>Настройки</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className='flex items-center'
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
							className={cn(
								buttonVariants({
									size: 'sm'
								}),
								'max-sm:hidden'
							)}
						>
							Зарегистрируйтесь
						</Link>
					)}

					<ModeToggle />
				</div>
			</div>
		</div>
	)
}
