'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import PropertyCard from '@/components/PropertyCard'
import { EmptyList, IEmptyList, SidebarTitle } from '@/components/special'
import { Loading, buttonVariants } from '@/components/ui'
import { useFavoritesProperties } from '@/hooks/favorites'
import { cn } from '@/utils'

const emptyListProps: IEmptyList = {
	title: 'Ещё нет избранных объектов',
	description:
		'Вы можете добавить понравившиеся вам объекты в каталоге недвижимости. Смотрите по вашим предпочтениям.',
	icon: Heart,
	buttonPrimary: (
		<Link
			href='/properties'
			className={cn(buttonVariants({ effect: 'ringHover' }))}
		>
			Каталог
		</Link>
	)
}

export default function FavoritesPage() {
	const { favoritedProperties, isFavoritedPropertiesLoading } =
		useFavoritesProperties()

	if (isFavoritedPropertiesLoading) {
		return <Loading />
	}

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Избранное</SidebarTitle>

			{favoritedProperties?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyList
						title={emptyListProps.title}
						description={emptyListProps.description}
						icon={emptyListProps.icon}
						buttonPrimary={emptyListProps.buttonPrimary}
					/>
				</div>
			) : (
				<div className='grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{favoritedProperties?.map(favoritedProperty => (
						<PropertyCard
							key={favoritedProperty.propertyId}
							property={favoritedProperty.property}
						/>
					))}
				</div>
			)}
		</div>
	)
}
