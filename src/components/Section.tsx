import React from 'react'

import { cn } from '../utils'

interface sectionInterface {
	children?: React.ReactNode
	className?: string | undefined
}

export function Section({ children, className }: sectionInterface) {
	return (
		<section className={cn('relative isolate w-full px-3', className)}>
			{children}
		</section>
	)
}
