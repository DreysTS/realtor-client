import { useQuery } from '@tanstack/react-query'

import { propertyService } from '@/services'

export function useRealtorProperties() {
	const { data: properties, isLoading: isPropertiesLoading } = useQuery({
		queryKey: ['properties'],
		queryFn: () => propertyService.realtorFindAll()
	})

	return {
		properties,
		isPropertiesLoading
	}
}
