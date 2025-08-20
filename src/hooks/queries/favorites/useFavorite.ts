import { MouseEvent, useMemo } from 'react'

import { useAddToFavorite } from './useAddToFavorite'
import { useFavoritesId } from './useFavoritesId'
import { useRemoveFromFavorite } from './useRemoveFromFavorite'

export function useFavorite(id: string) {
	const { addToFavorite, isAddingToFavorite } = useAddToFavorite()
	const { removeFromFavorite, isRemovingFromFavorite } =
		useRemoveFromFavorite()
	const { favoriteIds, isFavoritesLoading } = useFavoritesId()

	const isFavorited = favoriteIds?.some(
		favorite => favorite.propertyId === id
	)

	const handleFavorite = () => {
		isFavorited ? removeFromFavorite(id) : addToFavorite(id)
	}

	return useMemo(
		() => ({
			isAddingToFavorite,
			isRemovingFromFavorite,
			isFavoritesLoading,
			isFavorited,
			handleFavorite
		}),
		[
			isAddingToFavorite,
			isRemovingFromFavorite,
			isFavoritesLoading,
			isFavorited,
			handleFavorite
		]
	)
}
