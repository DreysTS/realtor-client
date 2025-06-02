import { useQuery } from '@tanstack/react-query'

import { requestService } from '@/services'

export function useUsersRequests() {
	const { data: usersRequests, isLoading: isUsersRequestsLoading } = useQuery(
		{
			queryKey: ['requests'],
			queryFn: () => requestService.findUsersRequests()
		}
	)

	return { usersRequests, isUsersRequestsLoading }
}
