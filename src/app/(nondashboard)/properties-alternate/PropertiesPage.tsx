'use client'

import { BrushCleaning, Building2, FilePlus } from 'lucide-react'
import React from 'react'

import FiltersBar from './Filters'
import { Container, Footer, Section } from '@/components'
import { EmptyProperties } from '@/components/empty-state'
import {
	Button,
	Loading,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Skeleton,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui'
import { PropertyCard } from '@/components/widgets'
import { usePropertiesAlternate } from '@/hooks/queries/properties/usePropertiesAlternate'
import { NAVBAR_HEIGHT } from '@/lib/constants'

export default function PropertiesPage() {
	const {
		properties,
		isPropertiesLoading,
		isPropertiesFetching,
		hasMore,
		isFetchingNextPage,
		loadMore,
		resetFilters
	} = usePropertiesAlternate()

	return (
		<>
			<Section>
				<Container className='relative grid gap-4 lg:grid-cols-3 2xl:grid-cols-4'>
					<div
						className='h-fit space-y-4 overflow-y-auto rounded-xl border p-4 max-lg:hidden'
						style={{
							top: `calc(${NAVBAR_HEIGHT}px + 8px)`
						}}
					>
						<div className='flex justify-between'>
							<h2 className='text-2xl'>Фильтры</h2>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										size='icon-sm'
										variant='outline'
										onClick={() => resetFilters()}
									>
										<BrushCleaning />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Очистить</p>
								</TooltipContent>
							</Tooltip>
						</div>
						<FiltersBar />
					</div>
					<Sheet>
						<SheetTrigger asChild>
							<Button className='lg:hidden'>Фильтры</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle className='text-2xl'>
									Фильтры
								</SheetTitle>
								<SheetDescription>
									Полные фильтры для точечного выбора
									недвижимости
								</SheetDescription>
							</SheetHeader>
							<div className='space-y-4 overflow-y-auto px-4'>
								<FiltersBar />
							</div>
							<SheetFooter>
								<Button onClick={() => resetFilters()}>
									Очистить <BrushCleaning />
								</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
					<div className='lg:col-span-2 2xl:col-span-3'>
						{(isPropertiesLoading || isPropertiesFetching) && (
							<Loading />
						)}
						{properties?.length === 0 ? (
							<div className='grid h-full grow place-items-center max-sm:pt-4'>
								<EmptyProperties />
							</div>
						) : (
							<>
								<div className='grid gap-4 sm:grid-cols-2 2xl:grid-cols-3'>
									{properties?.map(property => (
										<PropertyCard
											property={property}
											key={property.id}
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
					</div>
				</Container>
			</Section>
			<Footer />
		</>
	)
}
