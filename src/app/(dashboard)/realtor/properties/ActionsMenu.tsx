import { Copy, Edit, EllipsisVertical, Trash } from 'lucide-react'
import React, { useState } from 'react'

import { DialogFormWrapper, PropertyForm } from '@/components/form'
import {
	Button,
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
	DropdownMenuTrigger
} from '@/components/ui'
import { useRemoveProperty } from '@/hooks/queries/properties'
import { IProperty } from '@/lib/types'
import { copyToClipboard } from '@/lib/utils'

interface Props {
	property: IProperty
	disabled?: boolean
}

export function ActionsMenu({ property, disabled }: Props) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

	const { removeProperty, isPropertyRemoving } = useRemoveProperty()

	const handleDeleteClick = () => {
		setDropdownOpen(false)
		setDeleteDialogOpen(true)
	}

	const handleUpdateClick = () => {
		setDropdownOpen(false)
		setUpdateDialogOpen(true)
	}

	const handleConfirmDelete = () => {
		removeProperty(property.id)
		setDeleteDialogOpen(false)
	}
	return (
		<>
			<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						size='icon-sm'
						variant='outline'
						disabled={disabled}
					>
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
					<DropdownMenuItem onClick={() => handleUpdateClick()}>
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

			{/* ========== Update Dialog ========== */}

			<DialogFormWrapper
				action='Создать заявку'
				open={updateDialogOpen}
				onOpenChange={setUpdateDialogOpen}
			>
				<div className='my-3 me-1 h-full overflow-y-auto ps-6 pe-5 text-sm'>
					<PropertyForm property={property} />
				</div>
			</DialogFormWrapper>
		</>
	)
}
