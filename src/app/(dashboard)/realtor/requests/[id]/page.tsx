'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import PropertyRequestCard from '../PropertyRequestCard'

import { SidebarTitle } from '@/components/special'
import { Loading } from '@/components/ui'
import { useFindRequestById } from '@/hooks/requests'
import { IRequest } from '@/types'

export default function Page() {
	const params = useParams<{ id: string }>()

	const { request, isRequestLoading } = useFindRequestById(params.id)

	if (isRequestLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>
				Заявка пользователя {request?.user.displayName}
			</SidebarTitle>
			<div className='flex flex-col gap-4'>
				<PropertyRequestCard request={request as IRequest} />
			</div>
		</div>
	)
}
