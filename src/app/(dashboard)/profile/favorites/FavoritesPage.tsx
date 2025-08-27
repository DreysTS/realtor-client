'use client'

import React from 'react'

import { EmptyUserFavorites } from '@/components/empty-state'
import { Loading } from '@/components/ui'
import { PropertyCard, SidebarTitle } from '@/components/widgets'
import { useFavoritesProperties } from '@/hooks/queries/favorites'

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
					<EmptyUserFavorites />
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
