import { MousePointer2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/utils'

interface ISectionTitling {
	title: string
	subtitle?: string
	className?: string
}

export function SectionTitling({
	title,
	subtitle,
	className
}: ISectionTitling) {
	return (
		<div className={cn('mb-8 lg:mb-16', className)}>
			<h2 className='pb-2 text-2xl font-semibold tracking-tight transition-colors [text-shadow:_hsl(var(--foreground)/0.3)_0_0_16px] first:mt-0 lg:text-4xl'>
				{title}
			</h2>

			{subtitle && (
				<p className='flex gap-2 leading-7'>
					<MousePointer2 className='text-primary mt-1.5 size-5 min-h-5 min-w-5 rotate-[110deg]' />
					{subtitle}
				</p>
			)}
		</div>
	)
}
