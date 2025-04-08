import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useLogoutMutation() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			queryClient.setQueryData(['profile'], null)
			toast.success('Вы успешно вышли из системы')
			router.push('/')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
