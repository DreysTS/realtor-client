'use client'

import { Building2, FilePlus } from 'lucide-react'
import React from 'react'

import FiltersBar from './FiltersBar'
import FullFilters from './FullFilters'
import { Footer, Section } from '@/components'
import { EmptyList, PropertyCard } from '@/components/special'
import { Button } from '@/components/ui'
import { useProperties } from '@/hooks/queries/properties'

export default function PropertiesPage() {
	const {
		properties,
		isPropertiesLoading,
		resetFilters,
		hasMore,
		loadMore,
		isFetchingNextPage
	} = useProperties()

	return (
		<>
			<Section
				className={`flex flex-col pt-3 sm:min-h-[calc(100vh-64px)]`}
			>
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
					<div className='grid h-full grow place-items-center max-sm:pt-4'>
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
						{hasMore && (
							<div className='mt-6 flex justify-center'>
								<Button
									onClick={loadMore}
									disabled={isFetchingNextPage}
									className='px-6 py-3'
								>
									{isFetchingNextPage
										? 'Загрузка...'
										: 'Показать еще'}
								</Button>
							</div>
						)}
					</>
				)}
			</Section>
			<Footer />
		</>
	)
}
