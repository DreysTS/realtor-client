import { useMutation } from '@tanstack/react-query'

import { TypeRegisterSchema } from '@/lib/schemes'
import { toastMessageHandler } from '@/lib/utils'
import { authService } from '@/services'

export function useRegisterMutation() {
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeRegisterSchema
			recaptcha: string
		}) => authService.register(values, recaptcha),
		onSuccess(data: any) {
			toastMessageHandler(data)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister }
}
