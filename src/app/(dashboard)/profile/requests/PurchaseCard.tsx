import React, { useState } from 'react'

import { Badge, Card, CardContent, CardHeader } from '@/components/ui'
import { DataItem } from '@/components/ui/data-item'
import { PreviewDescription } from '@/components/widgets'
import { useDeletePurchase } from '@/hooks/queries/purchases'
import { propertyPurchaseStatusMap } from '@/lib/constants'
import { IPurchase } from '@/lib/types'
import { formatPhoneNumber, translateEnum } from '@/lib/utils'

export function PurchaseCard({ purchase }: { purchase: IPurchase }) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

	const { deletePurchase, isPurchaseDeleting } = useDeletePurchase()

	const handleDeleteClick = (e: Event) => {
		e.preventDefault()
		setDropdownOpen(false)
		setDeleteDialogOpen(true)
	}

	const handleConfirmDelete = () => {
		deletePurchase(purchase.id)
		setDeleteDialogOpen(false)
	}

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
						value={purchase.contactMethod}
					/>
					<PreviewDescription description={purchase.description} />
				</div>
				<div>
					<DataItem
						label='Минимальный бюджет'
						value={purchase.budgetMin?.toLocaleString() + ' ₽'}
					/>
					<DataItem
						label='Максимальный бюджет'
						value={purchase.budgetMax?.toLocaleString() + ' ₽'}
					/>
					<DataItem
						label='Количество комнат'
						value={purchase.rooms}
					/>
					<DataItem
						label='Минимальная площадь'
						value={purchase.areaMin + ' м²'}
					/>
					<DataItem
						label='Максимальная площадь'
						value={purchase.areaMax + ' м²'}
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
		</Card>
	)
}
