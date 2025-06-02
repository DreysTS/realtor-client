import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { requestService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useDeleteRequest() {
	const queryClient = useQueryClient()

	const { mutate: deleteRequest, isPending: isRequestDeleting } = useMutation(
		{
			mutationFn: (id: string) => requestService.delete(id),
			onSuccess() {
				toast.success('Заявка успешно удалена.')
				queryClient.invalidateQueries({
					queryKey: ['user requests']
				})
			},
			onError(error) {
				toastMessageHandler(error)
			}
		}
	)

	return { deleteRequest, isRequestDeleting }
}
