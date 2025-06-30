import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeFeedbackScheme } from '@/lib/schemes/feedback.scheme'
import { toastMessageHandler } from '@/lib/utils'
import { feedbackService } from '@/services'

export function useCreateFeedback() {
	const queryClient = useQueryClient()

	const { mutate: createFeedback, isPending: isFeedbackCreating } =
		useMutation({
			mutationKey: ['create feedback'],
			mutationFn: (data: TypeFeedbackScheme) =>
				feedbackService.createFeedback(data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['feedbacks']
				})

				toast.success('Отзыв успешно создан!')
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { createFeedback, isFeedbackCreating }
}
