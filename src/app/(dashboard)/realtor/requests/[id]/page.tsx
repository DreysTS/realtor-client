'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import PropertyRequestCard from '../PropertyRequestCard'

import { Loading } from '@/components/ui'
import { SidebarTitle } from '@/components/widgets'
import { useFindRequestById } from '@/hooks/queries/requests'
import { IRequest } from '@/lib/types'

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
