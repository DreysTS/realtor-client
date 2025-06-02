import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { feedbackService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useDeleteFeedback() {
	const { mutate: deleteFeedback, isPending: isFeedbackDeleting } =
		useMutation({
			mutationKey: ['delete feedback'],
			mutationFn: (feedbackId: string) =>
				feedbackService.deleteFeedback(feedbackId),
			onSuccess() {
				toast.success('Отзыв успешно удалён!')
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { deleteFeedback, isFeedbackDeleting }
}
