import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeSettingsSchema } from '@/lib/schemes'
import { userService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeSettingsSchema) =>
			userService.updateProfile(data),
		onSuccess() {
			toast.success('Профиль успешно обновлён')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
