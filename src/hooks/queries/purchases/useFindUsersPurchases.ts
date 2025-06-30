import { useQuery } from '@tanstack/react-query'

import { purchaseService } from '@/services'

export function useFindUsersPurchases() {
	const { data: usersPurchases, isLoading: isUsersPurchasesLoading } =
		useQuery({
			queryKey: ['userPurchases'],
			queryFn: () => purchaseService.findUsersPurchases()
		})

	return { usersPurchases, isUsersPurchasesLoading }
}
