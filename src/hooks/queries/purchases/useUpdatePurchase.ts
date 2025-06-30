import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUpdatePurchaseSchema } from '@/lib/schemes'
import { toastMessageHandler } from '@/lib/utils'
import { purchaseService } from '@/services'

export function useUpdatePurchase() {
	const queryClient = useQueryClient()

	const { mutate: updatePurchase, isPending: isPurchaseUpdating } =
		useMutation({
			mutationKey: ['update purchase'],
			mutationFn: ({
				purchaseId,
				data
			}: {
				purchaseId: string
				data: TypeUpdatePurchaseSchema
			}) => purchaseService.updatePurchase(purchaseId, data),
			onSuccess() {
				toast.success('Заявка на покупку успешна обновлена!')
				queryClient.invalidateQueries({
					queryKey: ['purchases']
				})
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { updatePurchase, isPurchaseUpdating }
}
