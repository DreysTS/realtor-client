'use client'

import React from 'react'

import PropertyRequestCard from './PropertyRequestCard'
import { EmptyRealtorPropertyRequest } from '@/components/empty-state'
import { Loading } from '@/components/ui'
import { SidebarTitle } from '@/components/widgets'
import { useUsersRequests } from '@/hooks/queries/requests'

export default function PropertyRequestPage() {
	const { usersRequests, isUsersRequestsLoading } = useUsersRequests()

	if (isUsersRequestsLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Заявки на продажу</SidebarTitle>
			{usersRequests?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyRealtorPropertyRequest />
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
