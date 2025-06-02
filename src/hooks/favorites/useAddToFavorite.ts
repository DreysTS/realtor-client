import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { favoriteService } from '@/services'

export function useAddToFavorite() {
	const queryClient = useQueryClient()

	const { mutate: addToFavorite, isPending: isAddingToFavorite } =
		useMutation({
			mutationKey: ['add favorite'],
			mutationFn: (id: string) => favoriteService.addToFavorite(id),
			onSuccess(_, id) {
				toast.success('Добавлено в избранное.')
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

	return { addToFavorite, isAddingToFavorite }
}
