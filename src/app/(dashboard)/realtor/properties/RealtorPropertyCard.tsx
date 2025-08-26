import { Copy, Edit, EllipsisVertical, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import PropertyForm from './PropertyForm'
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	DataItem,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Separator,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui'
import { PreviewCarousel, PreviewDescription } from '@/components/widgets'
import { useRemoveProperty, useSetStatus } from '@/hooks/queries/properties'
import {
	buildingTypeMap,
	propertyStatuses,
	propertyTypeMap,
	sellingTypeMap,
	statusMap
} from '@/lib/constants'
import { IProperty } from '@/lib/types'
import { copyToClipboard, translateEnum } from '@/lib/utils'

export default function RealtorPropertyCard({
	property
}: {
	property: IProperty
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [updateSheetOpen, setUpdateSheetOpen] = useState(false)

	const { removeProperty, isPropertyRemoving } = useRemoveProperty()
	const { setStatus, isSettingStatus } = useSetStatus()

	const handleDeleteClick = () => {
		setDropdownOpen(false)
		setDeleteDialogOpen(true)
	}

	const handleUpdateClick = () => {
		setDropdownOpen(false)
		setUpdateSheetOpen(true)
	}

	const handleConfirmDelete = () => {
		removeProperty(property.id)
		setDeleteDialogOpen(false)
	}

	return (
		<>
			<Card className='bg-transparent'>
				<CardHeader>
					<div className='flex justify-between gap-3 max-lg:flex-col lg:items-center'>
						<div className='flex flex-wrap items-center gap-3'>
							<h2 className='text-2xl font-semibold hover:underline'>
								<Link href={`/properties/${property.id}`}>
									{property.title}
								</Link>
							</h2>
							{property.sellingType && (
								<Badge>
									{translateEnum(
										property.sellingType as string,
										sellingTypeMap
									)}
								</Badge>
							)}

							<Badge>
								{property.isSecondary
									? 'Вторичка'
									: 'Новостройка'}
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
							<DropdownMenuContent className='w-54' align='end'>
								<DropdownMenuLabel>Выберите</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => copyToClipboard(property.id)}
								>
									<Copy className='mr-2' />
									Копировать id
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleUpdateClick()}
								>
									<Edit className='mr-2' />
									Изменить
								</DropdownMenuItem>
								<DropdownMenuItem
									className='text-destructive'
									onClick={() => handleDeleteClick()}
								>
									<Trash className='text-destructive mr-2' />
									Удалить
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5'>
					<PreviewCarousel images={property.images} />

					<div>
						<DataItem
							label='Цена'
							value={property.price.toLocaleString() + ' ₽'}
						/>
						<DataItem
							label='Площадь'
							value={property.square + ' м²'}
						/>
						<DataItem
							label='Цена за м²'
							value={
								Math.round(
									property.price / property.square
								).toLocaleString() + ' ₽'
							}
						/>
						<DataItem
							label='Этаж'
							value={
								property.floor && property.totalFloors
									? property.floor +
										'/' +
										property.totalFloors
									: ''
							}
						/>
						<DataItem
							label='Кол-во комнат'
							value={property.rooms}
						/>
					</div>
					<div>
						<DataItem
							label='Площадь кухни'
							value={
								property.kitchenSquare
									? property.kitchenSquare + ' м²'
									: ''
							}
						/>
						<DataItem
							label='Высота потолков'
							value={
								property.ceilingHeight
									? property.ceilingHeight + ' м'
									: ''
							}
						/>
						<DataItem
							label='Материал дома'
							value={
								property.buildingType
									? translateEnum(
											property.buildingType as string,
											buildingTypeMap
										)
									: ''
							}
						/>
						<DataItem
							label='Тип объекта'
							value={
								property.propertyType
									? translateEnum(
											property.propertyType as string,
											propertyTypeMap
										)
									: ''
							}
						/>
						<DataItem
							label='Год постройки'
							value={property.builtYear || ''}
						/>
					</div>
					<div>
						<DataItem
							label='Адрес'
							value={property.location.address}
							row={false}
							className='gap-1'
						/>
						<PreviewDescription
							description={property.description}
						/>
					</div>
					<div>
						<DataItem
							label='Дата создания'
							value={new Date(
								property.createdAt
							).toLocaleDateString('ru', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric'
							})}
						/>
						{property.createdAt !== property.updatedAt && (
							<DataItem
								label='Дата изменения'
								value={new Date(
									property.updatedAt
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
				<CardFooter className='flex flex-wrap justify-end gap-2'>
					{propertyStatuses.map((status, index) => (
						<Button
							key={index}
							className='max-sm:grow'
							onClick={() =>
								setStatus({ id: property.id, status })
							}
							disabled={
								property.status.toLowerCase() === status ||
								isSettingStatus
							}
							variant={
								property.status.toLowerCase() === status
									? 'default'
									: 'ghost'
							}
							size='sm'
						>
							{translateEnum(status, statusMap)}
						</Button>
					))}
				</CardFooter>
			</Card>

			{/* ========== Delete Dialog ========== */}

			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='font-bold'>
							Вы точно хотите удалить объект?
						</DialogTitle>
						<DialogDescription>
							Это действие нельзя отменить после подтверждения.
							Данные об этой недвижимости будут безвозвратно
							удалены.
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
							disabled={isPropertyRemoving}
							onClick={handleConfirmDelete}
							className='text-background font-bold'
						>
							{isPropertyRemoving ? 'Удаление...' : 'Удалить'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* ========== Update Sheet ========== */}

			<Sheet open={updateSheetOpen} onOpenChange={setUpdateSheetOpen}>
				<SheetContent className='overflow-y-scroll sm:max-w-fit'>
					<SheetHeader>
						<SheetTitle className='text-2xl'>
							Обновить объект
						</SheetTitle>
					</SheetHeader>
					<div className='px-4'>
						<PropertyForm property={property} />
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}
