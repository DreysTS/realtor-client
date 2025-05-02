import { useQuery } from '@tanstack/react-query'

import { propertyService } from '@/services'

export function useProperties() {
	const { data: properties, isLoading: isPropertyLoading } = useQuery({
		queryKey: ['properties'],
		queryFn: () => propertyService.findAll()
	})

	return {
		properties,
		isPropertyLoading
	}
}
