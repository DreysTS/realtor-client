import { Filter } from 'lucide-react'
import React, { useState } from 'react'

import {
	Button,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui'

export default function FullFilters() {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false)

	return (
		<>
			<Button
				onClick={e => {
					e.preventDefault()
					setIsFiltersOpen(true)
				}}
				variant='outline'
			>
				Все фильтры
				<Filter />
			</Button>

			<Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
				<SheetContent className='sm:max-w-10xl'>
					<SheetHeader>
						<SheetTitle>Все параметры фильтров</SheetTitle>
					</SheetHeader>
					<div className='px-3'></div>
				</SheetContent>
			</Sheet>
		</>
	)
}
