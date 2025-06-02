import { useQuery } from '@tanstack/react-query'

import { feedbackService } from '@/services'

export function useFindUserFeedbacks(targetUserId: string) {
	const { data: userFeedbacks, isLoading: isUserFeedbacksLoading } = useQuery(
		{
			queryKey: ['userFeedbacks'],
			queryFn: () => feedbackService.findUserFeedbacks(targetUserId)
		}
	)

	return { userFeedbacks, isUserFeedbacksLoading }
}
