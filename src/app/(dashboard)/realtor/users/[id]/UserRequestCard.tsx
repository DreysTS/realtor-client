import Link from 'next/link'
import React from 'react'

import { PreviewCarousel } from '@/components'
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	Separator,
	buttonVariants
} from '@/components/ui'
import { propertyRequestStatusMap } from '@/lib/constants'
import { IRequest } from '@/types'
import { cn, translateEnum } from '@/utils'

export default function UserRequestCard({ request }: { request: IRequest }) {
	return (
		<Card className='bg-transparent'>
			<CardHeader className='grow'>
				<div className='space-y-2'>
					<h2 className='text-lg sm:text-xl xl:text-2xl font-semibold'>{request.title}</h2>
					<Badge>
						{translateEnum(
							request.propertyRequestStatus,
							propertyRequestStatusMap
						)}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<PreviewCarousel images={request.images} />
			</CardContent>
			<Separator />
			<CardFooter>
				<div className='flex flex-wrap gap-2 w-full'>
					<Link
						className={cn(buttonVariants({}), 'grow')}
						href={`/realtor/requests/${request.id}`}
					>
						Ссылка на заявку
					</Link>

					{request.propertyRequestStatus === 'APPROWED' && (
						<Link
							href={`/realtor/properties/${request.propertyId}`}
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'grow'
							)}
						>
							Ссылка на объект
						</Link>
					)}
				</div>
			</CardFooter>
		</Card>
	)
}
