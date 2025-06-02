import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUpdatePropertySchema } from '@/lib/schemes'
import { propertyService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useUpdateProperty() {
	const queryClient = useQueryClient()

	const { mutate: updateProperty, isPending: isPropertyUpdating } =
		useMutation({
			mutationKey: ['update property'],
			mutationFn: ({
				id,
				body
			}: {
				id: string
				body: TypeUpdatePropertySchema
			}) => propertyService.update(id, body),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['properties']
				})

				toast.success('Недвижимость успешно обновлена.', {
					description: 'Вы можете проверить её наличие уже на сайте.'
				})
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { updateProperty, isPropertyUpdating }
}
