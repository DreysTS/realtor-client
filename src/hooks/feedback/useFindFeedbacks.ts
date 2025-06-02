import { useQuery } from '@tanstack/react-query'

import { feedbackService } from '@/services'

export function useFindFeedbacks() {
	const { data: feedbacks, isLoading: isFeedbacksLoading } = useQuery({
		queryKey: ['feedbacks'],
		queryFn: () => feedbackService.findFeedbacks()
	})

	return { feedbacks, isFeedbacksLoading }
}
