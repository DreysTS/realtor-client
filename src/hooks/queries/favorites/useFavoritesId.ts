import { useQuery } from '@tanstack/react-query'

import { favoriteService } from '@/services'

export function useFavoritesId() {
	const { data: favoriteIds, isLoading: isFavoritesLoading } = useQuery({
		queryKey: ['user favorites'],
		queryFn: () => favoriteService.getFavoritesId()
	})

	return { favoriteIds, isFavoritesLoading }
}
