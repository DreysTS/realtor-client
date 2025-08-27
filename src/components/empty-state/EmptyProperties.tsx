import { Building2, FilePlus } from 'lucide-react'
import React from 'react'

import { Button } from '../ui'

import { EmptyState } from './EmptyState'

export function EmptyProperties() {
	return (
		<EmptyState
			title='Список объектов пуст'
			description='Вы можете оставить заявку на приобретение недвижимости, либо
				подождать, пока появятся новые объекты'
			icon={Building2}
		>
			<Button effect='expandIcon' icon={FilePlus} iconPlacement='right'>
				Оставить заявку
			</Button>
		</EmptyState>
	)
}
