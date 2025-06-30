'use client'

import React from 'react'

import UserCard from './UserCard'
import { SidebarTitle } from '@/components/special'
import { Loading } from '@/components/ui'
import { useUsers } from '@/hooks/queries/auth'

export default function UsersPage() {
	const { users, isUsersLoading, usersError } = useUsers()

	if (isUsersLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>Все пользователи</SidebarTitle>
			{users?.map(user => <UserCard user={user} key={user.id} />)}
		</div>
	)
}
