import { useQuery } from '@tanstack/react-query'

import { propertyService } from '@/services'

export function useRealtorProperty(propertyId: string) {
	const { data: property, isLoading: isPropertyLoading } = useQuery({
		queryKey: ['properties', propertyId],
		queryFn: () => propertyService.realtorFindById(propertyId)
	})

	return {
		property,
		isPropertyLoading
	}
}
