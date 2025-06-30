import { useQuery } from '@tanstack/react-query'

import { propertyService } from '@/services'

export function usePropertyById(id: string) {
	const { data: property, isLoading: isPropertyLoading, error: propertyError } = useQuery({
		queryKey: ['property', id],
		queryFn: () => propertyService.findById(id),
		retry: false
	})

	return {
		propertyError,
		property,
		isPropertyLoading
	}
}
