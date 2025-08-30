import { LucideIcon } from 'lucide-react'
import React from 'react'

interface IEmptyStateProps {
	title: string
	description: string
	icon: LucideIcon
	children?: React.ReactNode
}

export function EmptyState({
	title,
	description,
	icon: Icon,
	children
}: IEmptyStateProps) {
	return (
		<div className='flex max-w-[36rem] flex-col items-center gap-4 text-center'>
			<span className='bg-card rounded-lg border p-2 lg:p-3'>
				<Icon className='max-lg:size-5' />
			</span>
			<h1 className='text-xl font-semibold lg:text-3xl'>{title}</h1>
			<span className='text-muted-foreground'>{description}</span>
			<div className='space-x-3'>{children}</div>
		</div>
	)
}
