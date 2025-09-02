import Link from 'next/link'
import React from 'react'

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
import { PreviewCarousel } from '@/components/widgets'
import { propertyRequestStatusMap } from '@/lib/constants'
import { IRequest } from '@/lib/types'
import { cn, translateEnum } from '@/lib/utils'

export default function UserRequestCard({ request }: { request: IRequest }) {
	return (
		<Card className='bg-transparent'>
			<CardHeader className='grow'>
				<div className='space-y-2'>
					<h2 className='text-lg font-semibold sm:text-xl xl:text-2xl'>
						{request.title}
					</h2>
					<Badge>
						{translateEnum(
							request.status,
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
				<div className='flex w-full flex-wrap gap-2'>
					<Link
						className={cn(buttonVariants({}), 'grow')}
						href={`/realtor/requests/${request.id}`}
					>
						Ссылка на заявку
					</Link>

					{request.status === 'APPROWED' && (
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
