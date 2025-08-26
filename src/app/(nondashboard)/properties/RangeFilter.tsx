import React from 'react'

import { Input, Slider } from '@/components/ui'
import { PropertyFilters, SearchParamsObject } from '@/lib/types'

type RangeKeys = 'minPrice' | 'maxPrice' | 'minSquare' | 'maxSquare'

interface RangeFilterProps<T extends SearchParamsObject<PropertyFilters>> {
	title: string
	min: number
	max: number
	step?: number
	filters: T
	filterKeyMin: Extract<keyof T, RangeKeys>
	filterKeyMax: Extract<keyof T, RangeKeys>
	updateFilters: (update: Partial<PropertyFilters>) => void
}

const RangeFilter = React.memo(
	<T extends SearchParamsObject<PropertyFilters>>({
		title,
		min,
		max,
		step = 1,
		filters,
		filterKeyMin,
		filterKeyMax,
		updateFilters
	}: RangeFilterProps<T>) => {
		return (
			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>{title}</h4>

				<div className='flex justify-between'>
					<Input
						value={filters[filterKeyMin] ?? min}
						onChange={e =>
							updateFilters({
								[filterKeyMin]: e.target.value
							} as Partial<PropertyFilters>)
						}
						className='rounded-r-none'
					/>

					<Input
						value={filters[filterKeyMax] ?? max}
						onChange={e =>
							updateFilters({
								[filterKeyMax]: e.target.value
							} as Partial<PropertyFilters>)
						}
						className='rounded-l-none'
					/>
				</div>

				<Slider
					min={min}
					max={max}
					step={step}
					value={[
						Number(filters[filterKeyMin] || min),
						Number(filters[filterKeyMax] || max)
					]}
					onValueChange={([valMin, valMax]) =>
						updateFilters({
							[filterKeyMin]: valMin.toString(),
							[filterKeyMax]: valMax.toString()
						} as Partial<PropertyFilters>)
					}
				/>
			</div>
		)
	}
)

export { RangeFilter }
