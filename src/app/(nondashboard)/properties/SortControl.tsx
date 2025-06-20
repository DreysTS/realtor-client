import { ArrowDown, ArrowUp } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui'

const sortFields = ['createdAt', 'price', 'square', 'rooms'] as const

type SortField = (typeof sortFields)[number]

interface SortControlProps {
	field: SortField
	currentSort?: string
	onSort: (field: string, direction: 'asc' | 'desc') => void
	children: React.ReactNode
}

export default function SortControl({
	field,
	currentSort,
	onSort,
	children
}: SortControlProps) {
	const [currentField, currentDirection] = currentSort?.split(',') || []
	const isActive = currentField === field

	const handleClick = () => {
		const newDirection =
			isActive && currentDirection === 'asc' ? 'desc' : 'asc'
		onSort(field, newDirection)
	}

	return (
		<Button
			variant={isActive ? 'secondary' : 'outline'}
			onClick={handleClick}
		>
			{children}
			{isActive &&
				(currentDirection === 'asc' ? (
					<ArrowUp className='size-4' />
				) : (
					<ArrowDown className='size-4' />
				))}
		</Button>
	)
}
