'use client'

import { FileX2 } from 'lucide-react'
import React from 'react'

import PropertyRequestCard from './PropertyRequestCard'
import { Loading } from '@/components/ui'
import { EmptyList, IEmptyList, SidebarTitle } from '@/components/widgets'
import { useUsersRequests } from '@/hooks/queries/requests'

const emptyListProps: Omit<IEmptyList, 'primaryButton' | 'secondaryButton'> = {
	title: 'Список заявок на продажу пуст',
	description:
		'Ещё никто из пользователей не создал заявку на продажу недвижимости. Нужно подождать определённый период времени.',
	icon: FileX2
}

export default function PropertyRequestPage() {
	const { usersRequests, isUsersRequestsLoading } = useUsersRequests()

	if (isUsersRequestsLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Заявки на продажу</SidebarTitle>
			{usersRequests?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyList
						title={emptyListProps.title}
						description={emptyListProps.description}
						icon={emptyListProps.icon}
					/>
				</div>
			) : (
				<div className='flex flex-col gap-4'>
					{usersRequests?.map(request => (
						<PropertyRequestCard
							key={request.id}
							request={request}
						/>
					))}
				</div>
			)}
		</div>
	)
}
