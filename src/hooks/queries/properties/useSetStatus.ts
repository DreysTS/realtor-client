import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/lib/utils'
import { propertyService } from '@/services'

export function useSetStatus() {
	const queryClinet = useQueryClient()

	const { mutate: setStatus, isPending: isSettingStatus } = useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) =>
			propertyService.setStatus(id, status),
		onSuccess(_, id) {
			queryClinet.invalidateQueries({
				queryKey: ['property', id],
				exact: true
			})

			queryClinet.invalidateQueries({
				queryKey: ['properties'],
				refetchType: 'active'
			})

			toast.success('Статус объекта успешно обновлён.')
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { setStatus, isSettingStatus }
}
