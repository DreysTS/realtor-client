'use client'

import { ListX } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardHeader,
	Loading
} from '@/components/ui'
import { EmptyList, IEmptyList, SidebarTitle } from '@/components/widgets'
import { useFindUsersFeedbacks } from '@/hooks/queries/feedback'

const emptyListProps: IEmptyList = {
	title: 'Никто ещё не оставил отзыва',
	description:
		'Стоит подождать какое-то время, прежде чем кто-то из пользователей оставит отзыв.',
	icon: ListX
}

export default function FeedbackPage() {
	const { usersFeedbacks, isUsersFeedbacksLoading } = useFindUsersFeedbacks()

	if (isUsersFeedbacksLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Обратная связь пользователей</SidebarTitle>
			{usersFeedbacks?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyList
						title={emptyListProps.title}
						description={emptyListProps.description}
						icon={emptyListProps.icon}
					/>
				</div>
			) : (
				usersFeedbacks?.map(feedback => (
					<div key={feedback.id}>
						<Card className='bg-transparent'>
							<CardHeader>
								<div className='flex items-center gap-3'>
									<Avatar className='size-12'>
										<AvatarImage
											src={feedback.user.picture}
										/>
										<AvatarFallback>
											{feedback.user.displayName[0]}
										</AvatarFallback>
									</Avatar>
									<div>
										<Link
											href={`/realtor/users/${feedback.user.id}`}
										>
											<h3 className='text-xl hover:underline'>
												{feedback.user.displayName}
											</h3>
										</Link>

										<span className='text-muted-foreground'>
											{new Date(
												feedback.createdAt
											).toLocaleDateString('ru', {
												day: '2-digit',
												month: '2-digit',
												year: 'numeric'
											})}
										</span>
									</div>
								</div>
							</CardHeader>
							<CardContent>{feedback.content}</CardContent>
						</Card>
					</div>
				))
			)}
		</div>
	)
}
