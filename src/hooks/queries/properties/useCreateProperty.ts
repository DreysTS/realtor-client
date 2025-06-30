import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeCreatePropertySchema } from '@/lib/schemes'
import { toastMessageHandler } from '@/lib/utils'
import { propertyService } from '@/services'

export function useCreateProperty() {
	const queryClient = useQueryClient()

	const { mutate: createProperty, isPending: isPropertyCreating } =
		useMutation({
			mutationKey: ['create property'],
			mutationFn: (body: TypeCreatePropertySchema) =>
				propertyService.create(body),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['properties']
				})

				toast.success('Недвижимость успешно создана.', {
					description: 'Вы можете проверить её наличие уже на сайте.'
				})
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { createProperty, isPropertyCreating }
}
