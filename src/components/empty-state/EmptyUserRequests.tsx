import { FileX } from 'lucide-react'
import React from 'react'

import { EmptyState } from './EmptyState'

export function EmptyUserRequests() {
	return (
		<EmptyState
			title='Заявок на продажу нету'
			description='Вы можете создать заявку на продажу по первой кнопке выше и заполнить небольшую форму. Ваша заявка будет рассмотрена риэлтором.'
			icon={FileX}
		/>
	)
}
