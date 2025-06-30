import { useQuery } from '@tanstack/react-query'

import { favoriteService } from '@/services'

export function useFavoritesProperties() {
	const {
		data: favoritedProperties,
		isLoading: isFavoritedPropertiesLoading
	} = useQuery({
		queryKey: ['user favorites properties'],
		queryFn: () => favoriteService.getFavoritesProperties()
	})

	return { favoritedProperties, isFavoritedPropertiesLoading }
}
