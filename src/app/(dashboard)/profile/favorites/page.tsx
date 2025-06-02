'use client'

import React from 'react'

import PropertyCard from '@/components/PropertyCard'
import { SidebarTitle } from '@/components/special'
import { Loading } from '@/components/ui'
import { useFavoritesProperties } from '@/hooks/favorites'

export default function Page() {
	const { favoritedProperties, isFavoritedPropertiesLoading } =
		useFavoritesProperties()

	if (isFavoritedPropertiesLoading) {
		return <Loading />
	}

	return (
		<div className='space-y-4'>
			<SidebarTitle>Избранное</SidebarTitle>
			<div className='grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{favoritedProperties?.map(favoritedProperty => {
					return (
						<PropertyCard
							key={favoritedProperty.propertyId}
							property={favoritedProperty.property}
						/>
					)
				})}
			</div>
		</div>
	)
}
