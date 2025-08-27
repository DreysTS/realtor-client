import { useDirection } from '@radix-ui/react-direction'
import { Expand, Maximize, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui'

import { cn } from '@/lib/utils'

interface Props {
	action: string
	title?: string
	children: React.ReactNode
}

export function DialogFormWrapper({ action, title, children }: Props) {
	const [variant, setVariant] = useState<'default' | 'fullscreen'>('default')

	const direction = useDirection()

	const toggleVariant = () => {
		setVariant(prev => (prev === 'default' ? 'fullscreen' : 'default'))
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>
					{action} <PlusCircle />
				</Button>
			</DialogTrigger>
			<DialogContent
				className={cn(
					'p-0',
					variant === 'default'
						? 'sm:max-h-[min(650px,80vh)] sm:max-w-lg'
						: ''
				)}
				dir={direction}
				variant={variant}
			>
				<DialogHeader className='border-border m-0 border-b pt-5 pb-3'>
					<DialogTitle className='px-6 text-base'>
						{title ? title : action}
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter className='border-border border-t px-6 py-4'>
					<Button
						className='grow'
						variant='outline'
						onClick={toggleVariant}
					>
						{variant === 'default' ? <Expand /> : <Maximize />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
