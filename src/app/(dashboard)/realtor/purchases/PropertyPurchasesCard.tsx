import Link from 'next/link'
import React from 'react'

import { PreviewDescription } from '@/components'
import {
	Avatar,
	AvatarImage,
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	buttonVariants
} from '@/components/ui'
import { DataItem } from '@/components/ui/data-item'
import { useUpdateStatus } from '@/hooks/purchases'
import {
	propertyPurchaseStatusMap,
	propertyPurchaseStatuses
} from '@/lib/constants'
import { IPurchase } from '@/types'
import { cn, formatPhoneNumber, translateEnum } from '@/utils'

export default function PropertyPurchasesCard({
	purchase
}: {
	purchase: IPurchase
}) {
	const { updateStatus, isStatusUpdating } = useUpdateStatus()

	return (
		<Card className='bg-transparent'>
			<CardHeader>
				<div className='flex justify-between'>
					<div className='flex flex-wrap items-center gap-3'>
						<h2 className='text-2xl font-semibold'>
							Заявка на покупку недвижимости
						</h2>
						<Badge>
							{translateEnum(
								purchase.status,
								propertyPurchaseStatusMap
							)}
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className='grid gap-6 lg:grid-cols-3'>
				<div>
					<DataItem
						label='Номер для связи'
						value={formatPhoneNumber(purchase.user.phoneNumber)}
					/>
					<DataItem
						label='Способ связи'
						value={purchase.contact_method}
					/>
					<PreviewDescription description={purchase.description} />
				</div>
				<div>
					<DataItem
						label='Минимальный бюджет'
						value={purchase.budget_min?.toLocaleString() + ' ₽'}
					/>
					<DataItem
						label='Максимальный бюджет'
						value={purchase.budget_min?.toLocaleString() + ' ₽'}
					/>
					<DataItem
						label='Количество комнат'
						value={purchase.rooms}
					/>
					<DataItem
						label='Минимальная площадь'
						value={purchase.area_min + ' м²'}
					/>
					<DataItem
						label='Максимальная площадь'
						value={purchase.area_max + ' м²'}
					/>
				</div>
				<div>
					<DataItem
						label='Дата создания'
						value={new Date(purchase.createdAt).toLocaleDateString(
							'ru',
							{
								day: '2-digit',
								month: '2-digit',
								year: 'numeric'
							}
						)}
					/>
					{purchase.createdAt !== purchase.updatedAt && (
						<DataItem
							label='Дата изменения'
							value={new Date(
								purchase.updatedAt
							).toLocaleDateString('ru', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric'
							})}
						/>
					)}
				</div>
			</CardContent>
			<CardFooter className='flex flex-wrap justify-between gap-2'>
				<div className='grid place-items-center max-sm:grow'>
					<Link
						className={cn(
							buttonVariants({ variant: 'ghost' }),
							'w-full'
						)}
						href={`/realtor/users/${purchase.userId}`}
					>
						<Avatar>
							<AvatarImage src={purchase.user.picture} />
						</Avatar>
						<span>{purchase.user.displayName}</span>
					</Link>
				</div>
				<div className='flex flex-wrap gap-2'>
					{propertyPurchaseStatuses.map((status, index) => (
						<Button
							key={index}
							className='max-sm:grow'
							onClick={() =>
								updateStatus({
									purchaseId: purchase.id,
									status
								})
							}
							disabled={
								purchase.status.toLowerCase() === status ||
								isStatusUpdating
							}
							variant={
								purchase.status.toLowerCase() === status
									? 'default'
									: 'ghost'
							}
							size='sm'
						>
							{translateEnum(status, propertyPurchaseStatusMap)}
						</Button>
					))}
				</div>
			</CardFooter>
		</Card>
	)
}
