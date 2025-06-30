import React from 'react'

import SortControl from './SortControl'
import {
	Label,
	RadioGroup,
	RadioGroupItem,
	Slider,
	buttonVariants
} from '@/components/ui'
import { useProperties } from '@/hooks/queries/properties'
import { radioRooms } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function FiltersBar() {
	const { filters, updateFilters, updateSorting } = useProperties()

	return (
		<>
			<div className='flex flex-col max-sm:hidden'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Кол-во комнат
				</h4>
				<RadioGroup
					className='flex flex-row gap-3'
					value={filters.rooms || ''}
					onValueChange={value => updateFilters({ rooms: value })}
				>
					{radioRooms.map(item => (
						<div
							className='flex items-center space-x-2'
							key={item.value}
						>
							<RadioGroupItem
								value={item.value.toString()}
								id={item.label}
								className='peer sr-only'
							/>
							<Label
								htmlFor={item.label}
								className={cn(
									buttonVariants({
										variant: 'outline',
										size: 'sm'
									}),
									'peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								)}
							>
								<span className='mx-auto'>{item.label}</span>
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
			<div className='flex flex-col justify-between max-sm:hidden xl:w-1/8'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Выберите цену
				</h4>
				<div className='mb-2 flex justify-between gap-2'>
					<span className=''>
						{Number(filters.minPrice ?? '0').toLocaleString()} ₽
					</span>
					<span className=''>
						{Number(
							filters.maxPrice ?? '100000000'
						).toLocaleString()}{' '}
						₽
					</span>
				</div>
				<Slider
					min={0}
					max={100000000}
					step={100000}
					value={[
						Number(filters.minPrice || 0),
						Number(filters.maxPrice || 100000000)
					]}
					onValueChange={([min, max]) =>
						updateFilters({
							minPrice: min.toString(),
							maxPrice: max.toString()
						})
					}
				/>
			</div>
			<div className='flex flex-col justify-between max-sm:hidden xl:w-1/8'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Выберите площадь
				</h4>
				<div className='mb-2 flex justify-between gap-2'>
					<span className=''>
						{Number(filters.minSquare ?? '0').toLocaleString()}
					</span>
					<span className=''>
						{Number(
							filters.maxSquare ?? '200'
						).toLocaleString()}{' '}
					</span>
				</div>
				<Slider
					min={0}
					max={200}
					step={1}
					value={[
						Number(filters.minSquare || 0),
						Number(filters.maxSquare || 200)
					]}
					onValueChange={([min, max]) =>
						updateFilters({
							minSquare: min.toString(),
							maxSquare: max.toString()
						})
					}
				/>
			</div>
			<div className='flex flex-col justify-between max-sm:hidden'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Сортировка:
				</h4>
				<div className='flex flex-wrap gap-2'>
					<SortControl
						field='price'
						currentSort={filters.sortBy}
						onSort={updateSorting}
					>
						По цене
					</SortControl>
					<SortControl
						field='square'
						currentSort={filters.sortBy}
						onSort={updateSorting}
					>
						По площади
					</SortControl>
				</div>
			</div>
		</>
	)
}
