import React from 'react'

import { cn } from '../lib/utils'

interface sectionInterface {
	children?: React.ReactNode
	className?: string | undefined
	style?: React.CSSProperties
}

export function Section({ children, className, style }: sectionInterface) {
	return (
		<section
			className={cn('relative isolate w-full px-3', className)}
			style={style}
		>
			{children}
		</section>
	)
}
