import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { requestService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useDeclineRequest() {
	const queryClient = useQueryClient()

	const { mutate: declineRequest, isPending: isRequestDeclining } =
		useMutation({
			mutationFn: ({ id, body }: { id: string; body: any }) =>
				requestService.declieneRequest(id, body),
			onSuccess(_, id) {
				queryClient.invalidateQueries({
					queryKey: ['requests', id],
					exact: true
				})

				queryClient.invalidateQueries({
					queryKey: ['requests'],
					refetchType: 'active'
				})

				toast.success('Заявка успешно отклонена.')
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { declineRequest, isRequestDeclining }
}
