import Link from 'next/link'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { IUser } from '@/types'

export default function UserCard({
	user,
	disabledLink = false
}: {
	user: Pick<IUser, 'id' | 'displayName' | 'email' | 'picture' | 'createdAt'>
	disabledLink?: boolean
}) {
	return (
		<div className='flex items-center gap-3 rounded-xl border p-6'>
			<Avatar className='size-12'>
				<AvatarImage src={user.picture} />
				<AvatarFallback>{user.displayName[0]}</AvatarFallback>
			</Avatar>
			<div>
				{disabledLink ? (
					<h3 className='text-xl'>{user.displayName}</h3>
				) : (
					<Link href={`/realtor/users/${user.id}`}>
						<h3 className='text-xl hover:underline'>
							{user.displayName}
						</h3>
					</Link>
				)}

				<span className='text-muted-foreground'>{user.email}</span>
			</div>
		</div>
	)
}
