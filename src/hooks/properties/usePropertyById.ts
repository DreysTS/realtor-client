import { useQuery } from '@tanstack/react-query'

import { propertyService } from '@/services'

export function usePropertyById(id: string) {
	const { data: property, isLoading: isPropertyLoading } = useQuery({
		queryKey: ['property', id],
		queryFn: () => propertyService.findById(id)
	})

	return {
		property,
		isPropertyLoading
	}
}
