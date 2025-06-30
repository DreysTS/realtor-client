import { useQuery } from '@tanstack/react-query'

import { purchaseService } from '@/services'

export function useFindPurchase(purchaseId: string) {
	const { data: purchase, isLoading: isPurchaseLoading } = useQuery({
		queryKey: ['purchases', purchaseId],
		queryFn: () => purchaseService.findPurchase(purchaseId)
	})

	return { purchase, isPurchaseLoading }
}
