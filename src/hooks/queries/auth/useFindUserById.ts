import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services'

export function useFindUserById(id: string) {
	const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
		queryKey: ['user info', id],
		queryFn: () => userService.findById(id)
	})

	return { userProfile, isUserProfileLoading }
}
