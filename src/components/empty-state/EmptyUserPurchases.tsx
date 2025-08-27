import { FileX } from 'lucide-react'
import React from 'react'

import { EmptyState } from './EmptyState'

export function EmptyUserPurchases() {
	return (
		<EmptyState
			title='Заявок на покупку нету'
			description='Вы можете создать заявку на покупку по второй кнопке выше и заполнить небольшую форму. Ваша заявка будет рассмотрена риэлтором.'
			icon={FileX}
		/>
	)
}
