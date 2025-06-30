import { useQuery } from '@tanstack/react-query'

import { requestService } from '@/services'

export function useFindRequestById(requestId: string) {
	const { data: request, isLoading: isRequestLoading } = useQuery({
		queryKey: ['request', requestId],
		queryFn: () => requestService.findRequestById(requestId)
	})

	return { request, isRequestLoading }
}
