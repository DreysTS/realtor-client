import React from 'react'

import SortControl, { SortField } from '../properties/SortControl'

import { CheckboxGroupFilter } from './CheckboxGroupFilter'
import { RangeFilter } from './RangeFilter'
import { useProperties } from '@/hooks/queries/properties'
import {
	BUILDING_TYPE_FILTERS_LIST,
	PROPERTY_TYPE_FILTERS_LIST,
	ROOMS_FILTERS_LIST,
	SECONDARY_FILTERS_LIST,
	SORTING_FILTERS_LIST
} from '@/lib/constants/filters'

export function Filters() {
	const { filters, updateFilters, updateSorting } = useProperties()

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

			<RangeFilter
				title='Выберите цену'
				min={0}
				max={100000000}
				step={100000}
				filters={filters}
				filterKeyMin='minPrice'
				filterKeyMax='maxPrice'
				updateFilters={updateFilters}
			/>

			{/* Square filter */}

			<RangeFilter
				title='Выберите площадь'
				min={0}
				max={200}
				step={1}
				filters={filters}
				filterKeyMin='minSquare'
				filterKeyMax='maxSquare'
				updateFilters={updateFilters}
			/>

			{/* Rooms filter */}

			<CheckboxGroupFilter
				title='Кол-во комнат'
				paramKey='rooms'
				options={ROOMS_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>

			{/* Building type filter */}

			<CheckboxGroupFilter
				title='Тип стен'
				paramKey='buildingType'
				options={BUILDING_TYPE_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>

			{/* Property type filter */}

			<CheckboxGroupFilter
				title='Тип недвижимости'
				paramKey='propertyType'
				options={PROPERTY_TYPE_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>

			{/* Is secondary filter */}

			<CheckboxGroupFilter
				title='Тип рынка'
				paramKey='isSecondary'
				options={SECONDARY_FILTERS_LIST}
				filters={filters}
				updateFilters={updateFilters}
			/>
		</>
	)
}
