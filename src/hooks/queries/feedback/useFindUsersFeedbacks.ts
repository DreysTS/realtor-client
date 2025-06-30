import { useQuery } from '@tanstack/react-query'

import { feedbackService } from '@/services'

export function useFindUsersFeedbacks() {
	const { data: usersFeedbacks, isLoading: isUsersFeedbacksLoading } =
		useQuery({
			queryKey: ['usersFeedbacks'],
			queryFn: () => feedbackService.findUsersFeedbacks()
		})

	return { usersFeedbacks, isUsersFeedbacksLoading }
}
