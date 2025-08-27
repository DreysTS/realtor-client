import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '../ui'

import { EmptyState } from './EmptyState'
import { cn } from '@/lib/utils'

export function EmptyUserFavorites() {
	return (
		<EmptyState
			title='Ещё нет избранных объектов'
			description='Вы можете добавить понравившиеся вам объекты в каталоге недвижимости. Смотрите по вашим предпочтениям.'
			icon={Heart}
		>
			<Link
				href='/properties'
				className={cn(buttonVariants({ effect: 'ringHover' }))}
			>
				Каталог
			</Link>
		</EmptyState>
	)
}
