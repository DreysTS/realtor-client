import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { propertyService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useRemoveProperty() {
	const queryClinet = useQueryClient()

	const { mutate: removeProperty, isPending: isPropertyRemoving } =
		useMutation({
			mutationFn: (id: string) => propertyService.delete(id),
			onSuccess() {
				toast.success('Объект успешно удалён!')
				queryClinet.invalidateQueries({
					queryKey: ['properties']
				})
			},
			onError(error: Error) {
				toastMessageHandler(error)
			}
		})

	return { removeProperty, isPropertyRemoving }
}
