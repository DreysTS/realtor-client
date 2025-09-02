import { Building2 } from 'lucide-react'
import React from 'react'

import { SendYourApplication } from '../feature/SendYourApplication'

import { EmptyState } from './EmptyState'

export function EmptyProperties() {
	return (
		<EmptyState
			title='Список объектов пуст'
			description='Вы можете оставить заявку на приобретение недвижимости, либо
				подождать, пока появятся новые объекты'
			icon={Building2}
		>
			<SendYourApplication />
		</EmptyState>
	)
}
