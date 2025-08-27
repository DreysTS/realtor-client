import { ListX } from 'lucide-react'
import React from 'react'

import { EmptyState } from './EmptyState'

export function EmptyFeedback() {
	return (
		<EmptyState
			title='Никто ещё не оставил отзыва'
			description='Стоит подождать какое-то время, прежде чем кто-то из пользователей оставит отзыв.'
			icon={ListX}
		/>
	)
}
