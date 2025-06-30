import { Filter } from 'lucide-react'
import React, { useState } from 'react'

import SortControl from './SortControl'
import {
	Button,
	Label,
	RadioGroup,
	RadioGroupItem,
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
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

export default function FullFilters() {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false)

	const { filters, updateFilters, updateSorting, resetFilters } =
		useProperties()

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
				<SheetContent side='left'>
					<SheetHeader>
						<SheetTitle>Все параметры фильтров</SheetTitle>
					</SheetHeader>
					<div className='space-y-6 overflow-y-auto px-3'>
						<div>
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
								<SortControl
									field='rooms'
									currentSort={filters.sortBy}
									onSort={updateSorting}
								>
									По кол-ву комнат
								</SortControl>
							</div>
						</div>

						<div>
							<h4 className='text-muted-foreground mb-3 text-sm'>
								Кол-во комнат
							</h4>
							<RadioGroup
								className='flex flex-row flex-wrap gap-3'
								value={filters.rooms || ''}
								onValueChange={value =>
									updateFilters({ rooms: value })
								}
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
													variant: 'outline'
												}),
												'peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
											)}
										>
											<span className='mx-auto'>
												{item.label}
											</span>
										</Label>
									</div>
								))}
							</RadioGroup>
						</div>

						<div>
							<h4 className='text-muted-foreground mb-3 text-sm'>
								Выберите цену
							</h4>
							<div className='mb-2 flex justify-between gap-2'>
								<span className=''>
									{Number(
										filters.minPrice ?? '0'
									).toLocaleString()}{' '}
									₽
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

						<div>
							<h4 className='text-muted-foreground mb-3 text-sm'>
								Выберите площадь
							</h4>
							<div className='mb-2 flex justify-between gap-2'>
								<span className=''>
									{Number(
										filters.minSquare ?? '0'
									).toLocaleString()}
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

						<div>
							<h4 className='text-muted-foreground mb-3 text-sm'>
								Тип стен
							</h4>
							<RadioGroup
								className='flex flex-row flex-wrap gap-3'
								value={filters.buildingType || ''}
								onValueChange={value =>
									updateFilters({
										buildingType: value as BuildingType
									})
								}
							>
								{radioBuildingType.map(item => (
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
											<span className='mx-auto'>
												{item.label}
											</span>
										</Label>
									</div>
								))}
							</RadioGroup>
						</div>

						<div>
							<h4 className='text-muted-foreground mb-3 text-sm'>
								Тип недвижимости
							</h4>
							<RadioGroup
								className='flex flex-row flex-wrap gap-3'
								value={filters.propertyType || ''}
								onValueChange={value =>
									updateFilters({
										propertyType: value as PropertyType
									})
								}
							>
								{radioPropertyType.map(item => (
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
											<span className='mx-auto'>
												{item.label}
											</span>
										</Label>
									</div>
								))}
							</RadioGroup>
						</div>

						<div>
							<h4 className='text-muted-foreground mb-3 text-sm'>
								Новизна
							</h4>
							<RadioGroup
								className='flex flex-row flex-wrap gap-3'
								value={filters.isSecondary || ''}
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
											<span className='mx-auto'>
												{item.label}
											</span>
										</Label>
									</div>
								))}
							</RadioGroup>
						</div>
					</div>
					<SheetFooter>
						<Button onClick={resetFilters}>Сбросить</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	)
}
