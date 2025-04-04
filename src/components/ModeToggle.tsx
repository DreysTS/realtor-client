'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button, Skeleton } from './ui'

export function ModeToggle({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme()

	const [isClient, setIsClient] = React.useState(false)

	React.useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) return <Skeleton className='size-8 rounded-md' />

	return (
		<Button
			className={className}
			variant='ghost'
			size='icon-sm'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? (
				<Moon className='h-[1.2rem] w-[1.2rem]' />
			) : (
				<Sun className='h-[1.2rem] w-[1.2rem]' />
			)}
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
