import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { propertyService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function usePropertyMutation() {
	const queryClient = useQueryClient()

	const { mutate: property, isPending: isLoadingProperty } = useMutation({
		mutationKey: ['create property'],
		mutationFn: (formData: FormData) => propertyService.create(formData),
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

	return { property, isLoadingProperty }
}
