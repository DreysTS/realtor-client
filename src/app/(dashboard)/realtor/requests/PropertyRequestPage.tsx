'use client'

import React from 'react'

import PropertyRequestCard from './PropertyRequestCard'
import { SidebarTitle } from '@/components/special'
import { Loading } from '@/components/ui'
import { useUsersRequests } from '@/hooks/requests'

export default function PropertyRequestPage() {
	const { usersRequests, isUsersRequestsLoading } = useUsersRequests()

	if (isUsersRequestsLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>Заявки на покупку</SidebarTitle>
			<div className='flex flex-col gap-4'>
				{usersRequests?.map(request => (
					<PropertyRequestCard key={request.id} request={request} />
				))}
			</div>
		</div>
	)
}
