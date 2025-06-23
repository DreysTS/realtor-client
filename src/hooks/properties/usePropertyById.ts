import { useQuery } from '@tanstack/react-query'

import { propertyService } from '@/services'

export function usePropertyById(id: string) {
	const { data: property, isLoading: isPropertyLoading, error } = useQuery({
		queryKey: ['property', id],
		queryFn: () => propertyService.findById(id),
		retry: false
	})

	return {
		error,
		property,
		isPropertyLoading
	}
}
