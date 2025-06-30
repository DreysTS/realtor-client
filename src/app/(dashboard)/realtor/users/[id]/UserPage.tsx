'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import UserCard from '../UserCard'

import UserPurchaseCard from './UserPurchaseCard'
import UserRequestCard from './UserRequestCard'
import { SidebarTitle } from '@/components/special'
import { Loading } from '@/components/ui'
import { useFindUserById } from '@/hooks/queries/auth'
import { useFindUserPurchases } from '@/hooks/queries/purchases'
import { useUserRequests } from '@/hooks/queries/requests'
import { IUser } from '@/lib/types'

export default function UserPage() {
	const params = useParams<{ id: string }>()

	const { userProfile, isUserProfileLoading } = useFindUserById(params.id)
	const { userRequests, isUserRequestsLoading } = useUserRequests(params.id)
	const { userPurchases, isUserPurchasesLoading } = useFindUserPurchases(
		params.id
	)

	if (isUserProfileLoading || isUserRequestsLoading || isUserPurchasesLoading)
		return <Loading />

	return (
		<div className='h-full space-y-4'>
			<SidebarTitle>
				Профиль пользователя {userProfile?.displayName}
			</SidebarTitle>
			<UserCard user={userProfile as IUser} disabledLink />
			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
				{userRequests?.map(request => (
					<UserRequestCard key={request.id} request={request} />
				))}
			</div>
			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
				{userPurchases?.map(purchase => (
					<UserPurchaseCard key={purchase.id} purchase={purchase} />
				))}
			</div>
		</div>
	)
}
