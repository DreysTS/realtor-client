import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services'

export function useUsers() {
	const {
		data: users,
		isLoading: isUsersLoading,
		error: usersError
	} = useQuery({
		queryKey: ['users'],
		queryFn: () => userService.findAllUsers()
	})

	return { users, isUsersLoading, usersError }
}
