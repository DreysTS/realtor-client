import { EllipsisVertical, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Separator
} from '@/components/ui'
import { DataItem } from '@/components/ui/data-item'
import { PreviewCarousel, PreviewDescription } from '@/components/widgets'
import { useDeleteRequest } from '@/hooks/queries/requests'
import { propertyRequestStatusMap } from '@/lib/constants'
import { IRequest } from '@/lib/types'
import { translateEnum } from '@/lib/utils'

export function RequestCard({ request }: { request: IRequest }) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

	const { deleteRequest, isRequestDeleting } = useDeleteRequest()

	const handleDeleteClick = (e: Event) => {
		e.preventDefault()
		setDropdownOpen(false)
		setDeleteDialogOpen(true)
	}

	const handleConfirmDelete = () => {
		deleteRequest(request.id)
		setDeleteDialogOpen(false)
	}

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
									request.propertyRequestStatus,
									propertyRequestStatusMap
								)}
							</Badge>
						</div>
						<DropdownMenu
							open={dropdownOpen}
							onOpenChange={setDropdownOpen}
						>
							<DropdownMenuTrigger asChild>
								<Button size='icon-sm' variant='outline'>
									<EllipsisVertical />
									<span className='sr-only'>Open menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className='w-54'
								align='end'
								onInteractOutside={e => {
									if (deleteDialogOpen) {
										e.preventDefault()
									}
								}}
							>
								<DropdownMenuLabel>Выберите</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem
										className='text-destructive'
										onSelect={handleDeleteClick}
									>
										<Trash className='text-destructive mr-2' />
										Удалить
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
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
				{request.propertyRequestStatus === 'APPROWED' && (
					<>
						<Separator />
						<CardFooter>
							<span>
								Ваша заявка одобрена. Вы можете посмотреть её по{' '}
								<Link
									href={`/properties/${request.propertyId}`}
									className='text-primary hover:underline'
								>
									этой ссылке
								</Link>
							</span>
						</CardFooter>
					</>
				)}
				{request.propertyRequestStatus === 'REJECTED' && (
					<>
						<Separator />
						<CardFooter>
							<p>
								Причина отказа:{' '}
								<span className='text-muted-foreground'>
									{request.rejectReason}
								</span>
							</p>
						</CardFooter>
					</>
				)}
			</Card>

			{/* ========== Delete Dialog ========== */}

			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='font-bold'>
							Вы точно хотите удалить заявку?
						</DialogTitle>
						<DialogDescription>
							Это действие нельзя отменить после подтверждения.
							Данные об этой заявке будут безвозвратно удалены.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className='justify-content-end flex flex-row gap-3'>
						<Button
							variant='ghost'
							onClick={() => setDeleteDialogOpen(false)}
						>
							Отмена
						</Button>
						<Button
							variant='destructive'
							disabled={isRequestDeleting}
							onClick={handleConfirmDelete}
							className='text-background font-bold'
						>
							{isRequestDeleting ? 'Удаление...' : 'Удалить'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
