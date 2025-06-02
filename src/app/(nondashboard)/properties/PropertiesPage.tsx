'use client'

import { Building2, FilePlus } from 'lucide-react'
import React from 'react'

import FiltersBar from './FiltersBar'
import FullFilters from './FullFilters'
import { Footer, Section } from '@/components'
import PropertyCard from '@/components/PropertyCard'
import { EmptyList } from '@/components/special'
import { Button } from '@/components/ui'
import { useProperties } from '@/hooks/properties'
import { NAVBAR_HEIGHT } from '@/lib/constants'

export default function PropertiesPage() {
	const { properties, isPropertiesLoading, updateFilters, resetFilters } =
		useProperties()

	const handleUpdateChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		updateFilters({ [e.target.name]: e.target.value })
	}

	return (
		<>
			{' '}
			<Section className={`pt-3 sm:min-h-[calc(100vh-64px)]`}>
				<div className='grid items-end gap-3 rounded-lg border p-4 shadow-sm sm:grid-cols-2 xl:flex'>
					<FiltersBar />
					<FullFilters />
					<Button onClick={resetFilters} className='max-sm:hidden'>
						Сбросить
					</Button>
				</div>
				{isPropertiesLoading ?? (
					<div className='bg-primary h-36 w-36'>Loading...</div>
				)}
				{properties?.length === 0 ? (
					<div
						style={{
							height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
						}}
						className='grid place-items-center'
					>
						<EmptyList
							title='Список объектов пуст'
							description='Вы можете оставить заявку на приобретение недвижимости, либо
				подождать, пока появятся новые объекты'
							icon={Building2}
							buttonPrimary={
								<Button
									effect='expandIcon'
									icon={FilePlus}
									iconPlacement='right'
								>
									Оставить заявку
								</Button>
							}
						/>
					</div>
				) : (
					<>
						<div className='grid gap-4 py-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
							{properties?.map(property => (
								<PropertyCard
									key={property.id}
									property={property}
								/>
							))}
						</div>
					</>
				)}
			</Section>
			<Footer />
		</>
	)
}
