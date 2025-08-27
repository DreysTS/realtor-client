'use client'

import { BrushCleaning } from 'lucide-react'
import React from 'react'

import { Filters } from './Filters'
import { Container, Footer, Section } from '@/components'
import { EmptyProperties } from '@/components/empty-state'
import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui'
import { PropertyCard } from '@/components/widgets'
import { useProperties } from '@/hooks/queries/properties'

export default function PropertiesPage() {
	const {
		properties,
		isPropertiesLoading,
		isPropertiesFetching,
		hasMore,
		isFetchingNextPage,
		loadMore,
		resetFilters
	} = useProperties()

	return (
		<>
			<Section>
				<Container className='relative grid gap-4 lg:grid-cols-3 2xl:grid-cols-4'>
					<div className='relative bottom-0 h-fit max-lg:hidden'>
						<div className='sticky bottom-0 h-fit space-y-4 overflow-y-auto rounded-xl border p-4'>
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
							<Filters />
						</div>
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
								<SheetDescription aria-describedby='undefined'></SheetDescription>
							</SheetHeader>
							<div className='space-y-4 overflow-y-auto px-4'>
								<Filters />
							</div>
							<SheetFooter>
								<Button onClick={() => resetFilters()}>
									Очистить
								</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
					<div className='lg:col-span-2 2xl:col-span-3'>
						{(isPropertiesLoading || isPropertiesFetching) ?? (
							<div className='bg-primary h-36 w-36'>
								Loading...
							</div>
						)}
						{properties?.length === 0 ? (
							<div className='grid h-full grow place-items-center max-sm:pt-4'>
								<EmptyProperties />
							</div>
						) : (
							<>
								<div className='grid gap-4 md:grid-cols-2 2xl:grid-cols-3'>
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
