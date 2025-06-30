import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeCreatePurchaseSchema } from '@/lib/schemes'
import { toastMessageHandler } from '@/lib/utils'
import { purchaseService } from '@/services'

export function useAddPurchase() {
	const queryClient = useQueryClient()

	const { mutate: createPurchase, isPending: isPurchaseCreating } =
		useMutation({
			mutationKey: ['add purchase'],
			mutationFn: (data: TypeCreatePurchaseSchema) =>
				purchaseService.addPurchase(data),
			onSuccess() {
				toast.success('Заявка на покупку успешна создана!')
				queryClient.invalidateQueries({
					queryKey: ['purchases']
				})
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { createPurchase, isPurchaseCreating }
}
