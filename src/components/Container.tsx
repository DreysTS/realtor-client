import React, { forwardRef } from 'react'

import { cn } from '../utils'

interface ContainerInterface {
	children?: React.ReactNode
	className?: string
}

export function Container({ children, className }: ContainerInterface) {
	return (
		<div
			className={cn(
				'container mx-auto py-8 md:py-12 xl:py-16',
				className
			)}
		>
			{children}
		</div>
	)
}
