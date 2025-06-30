import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/lib/utils'
import { purchaseService } from '@/services'

export function useUpdateStatus() {
	const queryClinet = useQueryClient()

	const { mutate: updateStatus, isPending: isStatusUpdating } = useMutation({
		mutationFn: ({
			purchaseId,
			status
		}: {
			purchaseId: string
			status: string
		}) => purchaseService.updateStatus(purchaseId, status),
		onSuccess(_, purchaseId) {
			queryClinet.invalidateQueries({
				queryKey: ['userPurchase', purchaseId],
				exact: true
			})

			queryClinet.invalidateQueries({
				queryKey: ['userPurchases'],
				refetchType: 'active'
			})

			queryClinet.invalidateQueries({
				queryKey: ['purchases']
			})

			toast.success('Статус заявки на покупку успешно обновлён.')
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { updateStatus, isStatusUpdating }
}
