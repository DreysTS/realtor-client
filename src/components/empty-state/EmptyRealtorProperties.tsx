import { TextSearch } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '../ui'

import { EmptyState } from './EmptyState'
import { cn } from '@/lib/utils'

export function EmptyRealtorProperties() {
	return (
		<EmptyState
			title='Список объектов пуст'
			description='По кнопке выше вы можете добавить ещё объекты, если они у вас имеются. Или вы можете одобрить новые в заявках.'
			icon={TextSearch}
		>
			<Link
				href='/realtor/requests'
				className={cn(buttonVariants({ effect: 'ringHover' }))}
			>
				Заявки
			</Link>
		</EmptyState>
	)
}
