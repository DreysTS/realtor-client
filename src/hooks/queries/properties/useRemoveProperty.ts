import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/lib/utils'
import { propertyService } from '@/services'

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
