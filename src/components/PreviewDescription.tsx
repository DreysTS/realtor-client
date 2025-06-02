'use client'

import React, { useState } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui'

export function PreviewDescription({ description }: { description: string }) {
	const [descriptionSheet, setDescriptionSheet] = useState(false)

	return (
		<>
			<div className='lg:hover:bg-secondary/50 flex flex-col lg:rounded-lg lg:px-2 lg:py-1 lg:transition-colors'>
				<span className='text-muted-foreground text-sm font-normal'>
					Описание
				</span>
				<span
					className='line-clamp-3 cursor-pointer font-bold hover:underline'
					onClick={e => {
						e.preventDefault()
						setDescriptionSheet(true)
					}}
				>
					{description}
				</span>
			</div>

			<Sheet open={descriptionSheet} onOpenChange={setDescriptionSheet}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Описание</SheetTitle>
					</SheetHeader>
					<div className='w-full max-w-3xl px-4'>{description}</div>
				</SheetContent>
			</Sheet>
		</>
	)
}
