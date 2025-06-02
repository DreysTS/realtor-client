import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeFeedbackScheme } from '@/lib/schemes/feedback.scheme'
import { feedbackService } from '@/services'
import { toastMessageHandler } from '@/utils'

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
