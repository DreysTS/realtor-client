'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { ModeToggle } from './ModeToggle'
import { buttonVariants } from './ui'
import { useLogoutMutation } from '@/hooks/query'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/utils'

export default function Navbar() {
	const router = useRouter()
	const pathname = usePathname()

	const { logout, isLoadingLogout } = useLogoutMutation()

	return (
		<div
			className='bg-background fixed top-0 left-0 z-50 w-full'
			style={{ height: `${NAVBAR_HEIGHT}px` }}
		>
			<div className='flex w-full items-center justify-between px-8 py-3'>
				<Link href='/' className='cursor-pointer'>
					<div className='flex items-center gap-3'>
						<div className='bg-primary h-8 w-8 rounded-md'></div>
						<span>MosRealtor</span>
					</div>
				</Link>
				<div className='flex items-center space-x-3'>
					<>
						<Link
							href='/auth/register'
							className={cn(
								buttonVariants({
									size: 'sm'
								})
							)}
						>
							Регистрация
						</Link>
						<Link
							href='/auth/login'
							className={cn(
								buttonVariants({
									variant: 'secondary',
									size: 'sm'
								})
							)}
						>
							Войти
						</Link>
					</>
					<ModeToggle />
				</div>
			</div>
		</div>
	)
}
