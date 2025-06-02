import { useQuery } from '@tanstack/react-query'

import { requestService } from '@/services'

export function useUserRequests(targetUserId: string) {
	const { data: userRequests, isLoading: isUserRequestsLoading } = useQuery({
		queryKey: ['user requests', targetUserId],
		queryFn: () => requestService.findUserRequests(targetUserId)
	})

	return { userRequests, isUserRequestsLoading }
}
