import { LucideIcon } from 'lucide-react'
import React from 'react'

export interface IEmptyList {
	title: string
	description: string
	icon: LucideIcon
	buttonPrimary?: React.ReactNode
	buttonSecondary?: React.ReactNode
}

export function EmptyList({
	title,
	description,
	icon: Icon,
	buttonPrimary,
	buttonSecondary
}: IEmptyList) {
	return (
		<div className='flex max-w-[36rem] flex-col items-center gap-4 text-center'>
			<span className='bg-card rounded-lg border p-2 lg:p-3'>
				<Icon className='max-lg:size-5' />
			</span>
			<h1 className='text-xl font-semibold lg:text-3xl'>{title}</h1>
			<p className='text-muted-foreground'>{description}</p>
			<div className='space-x-3'>
				{buttonPrimary}
				{buttonSecondary}
			</div>
		</div>
	)
}
