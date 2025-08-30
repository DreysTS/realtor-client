import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/components/providers'
import { userService } from '@/services'

export function useProfile() {
	const auth = useAuth()

	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.findProfile(),
		initialData: auth.user,
		retry: false
	})

	return {
		user,
		isLoading
	}
}
