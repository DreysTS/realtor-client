import { useQuery } from '@tanstack/react-query'

import { purchaseService } from '@/services'

export function useFindUserPurchases(targetUserId: string) {
	const { data: userPurchases, isLoading: isUserPurchasesLoading } = useQuery(
		{
			queryKey: ['userPurchases', targetUserId],
			queryFn: () => purchaseService.findUserPurchases(targetUserId)
		}
	)

	return { userPurchases, isUserPurchasesLoading }
}
