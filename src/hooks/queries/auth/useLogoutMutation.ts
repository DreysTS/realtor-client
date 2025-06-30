import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/lib/utils'
import { authService } from '@/services'

export function useLogoutMutation() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			queryClient.setQueryData(['profile'], null)
			queryClient.setQueryData(['user favorites'], null)
			queryClient.setQueryData(['user favorites properties'], null)
			toast.success('Вы успешно вышли из системы')
			router.push('/')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
