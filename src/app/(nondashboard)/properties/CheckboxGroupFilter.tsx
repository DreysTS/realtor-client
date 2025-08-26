import React from 'react'

import { Checkbox, Label, buttonVariants } from '@/components/ui'
import { PropertyFilters, SearchParamsObject } from '@/lib/types'
import { cn } from '@/lib/utils'

type Option = {
	value: string | number | boolean
	label: string
}

interface CheckboxGroupFilterProps {
	title: string
	paramKey: keyof Pick<
		PropertyFilters,
		'rooms' | 'buildingType' | 'propertyType' | 'isSecondary'
	>
	options: Option[]
	filters: SearchParamsObject
	updateFilters: (update: Partial<PropertyFilters>) => void
}

const CheckboxGroupFilter = React.memo(
	({
		title,
		paramKey,
		options,
		filters,
		updateFilters
	}: CheckboxGroupFilterProps) => {
		const prev = React.useMemo(() => {
			const raw = filters[paramKey]
			return Array.isArray(raw) ? raw : raw ? [raw] : []
		}, [filters, paramKey])

		return (
			<div className='flex flex-col'>
				<h4 className='text-muted-foreground mb-3 text-sm'>{title}</h4>
				<div className='flex flex-row flex-wrap gap-3'>
					{options.map(item => {
						const value = item.value.toString()

						return (
							<div
								className='flex items-center space-x-2'
								key={item.label}
							>
								<Checkbox
									id={`${paramKey}-${item.label}`}
									className='peer sr-only'
									checked={prev.includes(value) ?? false}
									onCheckedChange={checked => {
										if (checked) {
											if (!prev.includes(value)) {
												updateFilters({
													[paramKey]: [...prev, value]
												})
											}
										} else {
											const next = prev.filter(
												v => v !== value
											)
											updateFilters({
												[paramKey]: next
											})
										}
									}}
								/>
								<Label
									htmlFor={`${paramKey}-${item.label}`}
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
						)
					})}
				</div>
			</div>
		)
	}
)

export { CheckboxGroupFilter }
