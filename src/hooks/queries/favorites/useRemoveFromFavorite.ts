import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { favoriteService } from '@/services'

export function useRemoveFromFavorite() {
	const queryClient = useQueryClient()

	const { mutate: removeFromFavorite, isPending: isRemovingFromFavorite } =
		useMutation({
			mutationKey: ['remove favorite'],
			mutationFn: (id: string) => favoriteService.removeFromFavorite(id),
			onSuccess(_, id) {
				toast.success('Удалено из избранного.')
				queryClient.invalidateQueries({
					queryKey: ['favorite', id],
					exact: true
				})
				queryClient.invalidateQueries({
					queryKey: ['user favorites'],
					refetchType: 'active'
				})
			},
			onError() {
				toast.error('Не удалось добавить в избранное.')
			}
		})

	return { removeFromFavorite, isRemovingFromFavorite }
}
