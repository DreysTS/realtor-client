import { FileCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import DeclineDialog from './DeclineDialog'
import {
	Avatar,
	AvatarImage,
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	Separator,
	buttonVariants
} from '@/components/ui'
import { DataItem } from '@/components/ui/data-item'
import { PreviewCarousel, PreviewDescription } from '@/components/widgets'
import { useAcceptRequest } from '@/hooks/queries/requests'
import { propertyRequestStatusMap } from '@/lib/constants'
import { IRequest } from '@/lib/types'
import { cn, translateEnum } from '@/lib/utils'

export default function PropertyRequestCard({
	request
}: {
	request: IRequest
}) {
	const { acceptRequest, isRequestAccepting } = useAcceptRequest()

	return (
		<>
			<Card className='bg-transparent'>
				<CardHeader>
					<div className='flex justify-between gap-3 max-lg:flex-col lg:items-center'>
						<div className='flex flex-wrap items-center gap-2 lg:gap-4'>
							<h2 className='text-2xl font-semibold'>
								{request.title}
							</h2>
							<Badge>
								{translateEnum(
									request.status,
									propertyRequestStatusMap
								)}
							</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
					<PreviewCarousel images={request.images} />
					<div>
						<DataItem
							label='Цена'
							value={request.price.toLocaleString() + ' ₽'}
						/>
						<DataItem
							label='Площадь'
							value={request.square + ' м²'}
						/>
						<DataItem
							label='Цена за м²'
							value={
								Math.round(
									request.price / request.square
								).toLocaleString() + ' ₽'
							}
						/>
						<DataItem label='Кол-во комнат' value={request.rooms} />
					</div>
					<div className='space-y-2'>
						<DataItem
							label='Адрес'
							value={request.address}
							row={false}
						/>
						<PreviewDescription description={request.description} />
					</div>
					<div>
						<DataItem
							label='Дата создания'
							value={new Date(
								request.createdAt
							).toLocaleDateString('ru', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric'
							})}
						/>
						{request.createdAt !== request.updatedAt && (
							<DataItem
								label='Дата изменения'
								value={new Date(
									request.updatedAt
								).toLocaleDateString('ru', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								})}
							/>
						)}
					</div>
				</CardContent>
				<Separator />
				<CardFooter className='flex flex-wrap justify-between gap-4'>
					<div className='grid place-items-center max-sm:grow'>
						<Link
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								'w-full'
							)}
							href={`/realtor/users/${request.userId}`}
						>
							<Avatar>
								<AvatarImage src={request.user.picture} />
							</Avatar>
							<span>{request.user.displayName}</span>
						</Link>
					</div>
					<div className='flex flex-wrap gap-2 max-sm:grow'>
						<Button
							className='grow'
							variant='ghost'
							disabled={
								request.status === 'APPROWED' ||
								isRequestAccepting
							}
							onClick={() => acceptRequest(request.id)}
						>
							Одобрить
							<FileCheck />
						</Button>
						<DeclineDialog request={request} />
					</div>
				</CardFooter>
			</Card>
		</>
	)
}
