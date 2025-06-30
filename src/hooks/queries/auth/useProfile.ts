import { useQuery } from '@tanstack/react-query'

import { IUser } from '@/lib/types'
import { userService } from '@/services'

export function useProfile(initialData?: IUser) {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.findProfile(),
		initialData,
		retry: false
	})

	return {
		user,
		isLoading
	}
}
