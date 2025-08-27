import { FileX2 } from 'lucide-react'
import React from 'react'

import { EmptyState } from './EmptyState'

export function EmptyRealtorPropertyPurchase() {
	return (
		<EmptyState
			title='Список заявок на покупку пуст'
			description='Ещё никто из пользователей не создал заявку на приобретение недвижимости. Нужно подождать определённый период времени.'
			icon={FileX2}
		/>
	)
}
