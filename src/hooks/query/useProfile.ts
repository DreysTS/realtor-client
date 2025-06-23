import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services'

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.findProfile(),
		retry: false
	})

	return {
		user,
		isLoading
	}
}
