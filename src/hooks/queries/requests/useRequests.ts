import { useQuery } from '@tanstack/react-query'

import { requestService } from '@/services'

export function useRequests() {
	const { data: requests, isLoading: isRequestsLoading } = useQuery({
		queryKey: ['user requests'],
		queryFn: () => requestService.findRequests()
	})

	return { requests, isRequestsLoading }
}
