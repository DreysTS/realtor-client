import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { purchaseService } from '@/services'

export function useDeletePurchase() {
	const queryClient = useQueryClient()

	const { mutate: deletePurchase, isPending: isPurchaseDeleting } =
		useMutation({
			mutationKey: ['delete purchase'],
			mutationFn: (purchaseId: string) =>
				purchaseService.deletePurchase(purchaseId),
			onSuccess() {
				toast.success('Заявка на покупку успешна удалена!')
				queryClient.invalidateQueries({
					queryKey: ['purchases']
				})
			},
			onError() {
				toast.error('При удалении заявки на покупку произошла ошибка.')
			}
		})

	return { deletePurchase, isPurchaseDeleting }
}
