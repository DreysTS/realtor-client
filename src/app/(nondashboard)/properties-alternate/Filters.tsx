import React from 'react'

import SortControl, { SortField } from '../properties/SortControl'

import { FilterCheckboxGroup } from './FilterCheckboxGroup'
import { Input, Slider } from '@/components/ui'
import { usePropertiesAlternate } from '@/hooks/queries/properties/usePropertiesAlternate'
import {
	BUILDING_TYPE_FILTERS_LIST,
	PROPERTY_TYPE_FILTERS_LIST,
	ROOMS_FILTERS_LIST,
	SECONDARY_FILTERS_LIST,
	SORTING_FILTERS_LIST
} from '@/lib/constants/filters'

export default function FiltersBar() {
	const { filters, updateFilters, updateSorting } = usePropertiesAlternate()

	return (
		<>
			{/* Sorting filter */}

			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Сортировка
				</h4>
				<div className='flex flex-wrap gap-3'>
					{SORTING_FILTERS_LIST.map(item => (
						<SortControl
							key={item.field}
							field={item.field as SortField}
							currentSort={filters.sortBy as string}
							onSort={updateSorting}
						>
							{item.label}
						</SortControl>
					))}
				</div>
			</div>

			{/* Price filter */}

			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Выберите цену
				</h4>
				<div className='flex justify-between divide-x-1'>
					<Input
						value={filters.minPrice || 0}
						onChange={e =>
							updateFilters({
								minPrice: e.target.value
							})
						}
						className='rounded-r-none'
					/>
					<Input
						value={filters.maxPrice || 100000000}
						onChange={e =>
							updateFilters({ maxPrice: e.target.value })
						}
						className='rounded-l-none'
					/>
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

			{/* Square filter */}

			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Выберите площадь
				</h4>
				<div className='flex justify-between'>
					<Input
						value={filters.minSquare || 0}
						onChange={e =>
							updateFilters({
								minSquare: e.target.value
							})
						}
						className='rounded-r-none'
					/>
					<Input
						value={filters.maxSquare || 200}
						onChange={e =>
							updateFilters({ maxSquare: e.target.value })
						}
						className='rounded-l-none'
					/>
				</div>
				<Slider
					min={0}
					max={200}
					step={1}
					value={[
						Number(filters.minSquare || 0),
						Number(filters.maxSquare || 100000000)
					]}
					onValueChange={([min, max]) =>
						updateFilters({
							minSquare: min.toString(),
							maxSquare: max.toString()
						})
					}
				/>
			</div>

			{/* Rooms filter */}

			<FilterCheckboxGroup
				title='Кол-во комнат'
				paramKey='rooms'
				options={ROOMS_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>

			{/* Building type filter */}

			<FilterCheckboxGroup
				title='Тип стен'
				paramKey='buildingType'
				options={BUILDING_TYPE_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>

			{/* Property type filter */}

			<FilterCheckboxGroup
				title='Тип недвижимости'
				paramKey='propertyType'
				options={PROPERTY_TYPE_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>

			{/* Is secondary filter */}

			{/* <div>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Тип рынка
				</h4>
				<RadioGroup
					className='flex flex-row flex-wrap gap-3'
					value={(filters.isSecondary as string) || ''}
					onValueChange={value =>
						updateFilters({
							isSecondary: value
						})
					}
				>
					{SECONDARY_FILTERS_LIST.map(item => (
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
										variant: 'outline'
									}),
									'peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								)}
							>
								<span className='mx-auto'>{item.label}</span>
							</Label>
						</div>
					))}
				</RadioGroup>
			</div> */}

			<FilterCheckboxGroup
				title='Тип рынка'
				paramKey='isSecondary'
				options={SECONDARY_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>
		</>
	)
}
