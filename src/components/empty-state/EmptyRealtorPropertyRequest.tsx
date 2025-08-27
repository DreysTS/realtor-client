import { FileX2 } from 'lucide-react'
import React from 'react'

import { EmptyState } from './EmptyState'

export function EmptyRealtorPropertyRequest() {
	return (
		<EmptyState
			title='Список заявок на продажу пуст'
			description='Ещё никто из пользователей не создал заявку на продажу недвижимости. Нужно подождать определённый период времени.'
			icon={FileX2}
		/>
	)
}
