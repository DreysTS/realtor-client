'use client'

import { BrushCleaning, Building2, FilePlus } from 'lucide-react'
import React from 'react'

import FiltersBar from './Filters'
import { Container, Footer, Section } from '@/components'
import { EmptyList, IEmptyList, PropertyCard } from '@/components/special'
import {
	Button,
	Sheet,
	SheetContent,
	SheetFooter,
	SheetTitle,
	SheetTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui'
import { usePropertiesAlternate } from '@/hooks/queries/properties/usePropertiesAlternate'
import { NAVBAR_HEIGHT } from '@/lib/constants'

const emptyListProps: IEmptyList = {
	title: 'Список объектов пуст',
	description:
		'Вы можете оставить заявку на приобретение недвижимости, либо подождать, пока появятся новые объекты',
	icon: Building2,
	buttonPrimary: (
		<Button effect='expandIcon' icon={FilePlus} iconPlacement='right'>
			Оставить заявку
		</Button>
	)
}

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
						className='sticky h-fit space-y-4 overflow-y-auto rounded-xl border p-4 max-lg:hidden'
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
							<SheetTitle>
								<SheetTitle className='text-2xl'>
									Фильтры
								</SheetTitle>
							</SheetTitle>
							<div className='overflow-y-auto px-4 py-10'>
								<FiltersBar />
							</div>
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
								<EmptyList
									title={emptyListProps.title}
									description={emptyListProps.description}
									icon={emptyListProps.icon}
									buttonPrimary={emptyListProps.buttonPrimary}
								/>
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
