import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/lib/utils'
import { requestService } from '@/services'

export function useCreateRequest() {
	const queryClient = useQueryClient()

	const { mutate: createRequest, isPending: isRequestCreating } = useMutation(
		{
			mutationKey: ['create request'],
			mutationFn: (data: any) => requestService.create(data),
			onSuccess() {
				toast.success('Заявка успешно создана!')
				queryClient.invalidateQueries({
					queryKey: ['user requests']
				})
			},
			onError(error) {
				toastMessageHandler(error)
			}
		}
	)

	return { createRequest, isRequestCreating }
}
