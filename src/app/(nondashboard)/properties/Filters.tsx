import React, { memo } from 'react'

import SortControl, { SortField } from '../properties/SortControl'

import {
	Checkbox,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Slider,
	buttonVariants
} from '@/components/ui'
import { useProperties } from '@/hooks/queries/properties'
import {
	radioBuildingType,
	radioPropertyType,
	radioRooms,
	radioSecondary
} from '@/lib/constants'
import { BuildingType, PropertyType } from '@/lib/types'
import { cn } from '@/lib/utils'

export const Filters = memo(() => {
	const { filters, updateFilters, updateSorting } = useProperties()

	return (
		<>
			{/* Sorting filter */}

			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Сортировка
				</h4>
				<div className='flex flex-wrap gap-3'>
					{[
						{
							field: 'price',
							label: 'По цене'
						},
						{
							field: 'square',
							label: 'По площади'
						},
						{
							field: 'rooms',
							label: 'По кол-ву комнат'
						}
					].map(item => (
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

			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Кол-во комнат
				</h4>
				<div className='flex flex-row flex-wrap gap-3'>
					{radioRooms.map(item => (
						<div
							className='flex items-center space-x-2'
							key={item.label}
						>
							<Checkbox
								id={item.label}
								className='peer sr-only'
								checked={
									filters.rooms?.includes(
										item.value.toString()
									) ?? false
								}
								onCheckedChange={checked => {
									const value = item.value.toString()
									const prev =
										(filters.rooms as string[]) ?? []

									if (checked) {
										if (!prev.includes(value)) {
											updateFilters({
												rooms: [...prev, value]
											})
										}
									} else {
										updateFilters({
											rooms: prev.filter(v => v !== value)
										})
									}
								}}
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
				</div>
			</div>

			{/* Building type filter */}

			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Кол-во комнат
				</h4>
				<div className='flex flex-row flex-wrap gap-3'>
					{radioBuildingType.map(item => (
						<div
							className='flex items-center space-x-2'
							key={item.label}
						>
							<Checkbox
								id={item.label}
								className='peer sr-only'
								checked={
									filters.buildingType?.includes(
										item.value.toString()
									) ?? false
								}
								onCheckedChange={checked => {
									const value = item.value as BuildingType
									const prev =
										(filters.buildingType as BuildingType[]) ??
										[]

									if (checked) {
										if (!prev.includes(value)) {
											updateFilters({
												buildingType: [...prev, value]
											})
										}
									} else {
										updateFilters({
											buildingType: prev.filter(
												v => v !== value
											)
										})
									}
								}}
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
				</div>
			</div>

			{/* Property type filter */}

			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>
					Кол-во комнат
				</h4>
				<div className='flex flex-row flex-wrap gap-3'>
					{radioPropertyType.map(item => (
						<div
							className='flex items-center space-x-2'
							key={item.label}
						>
							<Checkbox
								id={item.label}
								className='peer sr-only'
								checked={
									filters.propertyType?.includes(
										item.value.toString()
									) ?? false
								}
								onCheckedChange={checked => {
									const value = item.value as PropertyType
									const prev =
										(filters.propertyType as PropertyType[]) ??
										[]

									if (checked) {
										if (!prev.includes(value)) {
											updateFilters({
												propertyType: [...prev, value]
											})
										}
									} else {
										updateFilters({
											propertyType: prev.filter(
												v => v !== value
											)
										})
									}
								}}
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
				</div>
			</div>

			{/* Is secondary filter */}

			<div>
				<h4 className='text-muted-foreground mb-3 text-sm'>Новизна</h4>
				<RadioGroup
					className='flex flex-row flex-wrap gap-3'
					value={(filters.isSecondary as string) || ''}
					onValueChange={value =>
						updateFilters({
							isSecondary: value
						})
					}
				>
					{radioSecondary.map(item => (
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
			</div>
		</>
	)
})
