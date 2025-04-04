import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeResetPasswordSchema } from '@/lib/schemes'
import { passwordRecoveryService } from '@/services'
import { toastMessageHandler } from '@/utils'

export function useResetPasswordMutation() {
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeResetPasswordSchema
			recaptcha: string
		}) => passwordRecoveryService.reset(values, recaptcha),
		onSuccess() {
			toast.success('Проверьте почту', {
				description:
					'На вашу почту была отправлена ссылка для подтверждения.'
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { reset, isLoadingReset }
}
