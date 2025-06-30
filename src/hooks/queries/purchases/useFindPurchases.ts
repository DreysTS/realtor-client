import { useQuery } from '@tanstack/react-query'

import { purchaseService } from '@/services'

export function useFindPurchases() {
	const { data: purchases, isLoading: isPurchasesLoading } = useQuery({
		queryKey: ['purchases'],
		queryFn: () => purchaseService.findPurchases()
	})

	return { purchases, isPurchasesLoading }
}
