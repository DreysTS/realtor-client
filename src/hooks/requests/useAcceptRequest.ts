import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { requestService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useAcceptRequest() {
	const queryClient = useQueryClient()

	const { mutate: acceptRequest, isPending: isRequestAccepting } =
		useMutation({
			mutationFn: (id: string) => requestService.acceptRequest(id),
			onSuccess(_, id) {
				queryClient.invalidateQueries({
					queryKey: ['requests', id],
					exact: true
				})

				queryClient.invalidateQueries({
					queryKey: ['requests'],
					refetchType: 'active'
				})

				toast.success('Заявка успешно одобрена.')
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { acceptRequest, isRequestAccepting }
}
