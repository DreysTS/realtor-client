import { FileX } from 'lucide-react'
import React, { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	Textarea
} from '@/components/ui'
import { useDeclineRequest } from '@/hooks/queries/requests'
import { IRequest } from '@/lib/types'

interface IDecline {
	rejectionReason: string
}

export default function DeclineDialog({ request }: { request: IRequest }) {
	const [rejectDialogOpen, setRejectDialogOpen] = useState(false)

	const { declineRequest, isRequestDeclining } = useDeclineRequest()

	const handleRejectClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setRejectDialogOpen(true)
	}

	const handleConfirmDelete = () => {
		setRejectDialogOpen(false)
	}

	const form = useForm<IDecline>({
		mode: 'onChange',
		values: {
			rejectionReason: ''
		}
	})

	async function onSubmit(values: IDecline) {
		declineRequest({ id: request.id, body: values })
	}

	return (
		<>
			<Button
				className='grow'
				disabled={request.propertyRequestStatus === 'REJECTED'}
				onClick={(e: MouseEvent<HTMLButtonElement>) =>
					handleRejectClick(e)
				}
			>
				Отклонить
				<FileX />
			</Button>

			{/* ========== Decline Dialog ========== */}

			<Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='font-bold'>
							Укажите прчину отклонения заявки.
						</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'
						>
							<FormField
								control={form.control}
								name='rejectionReason'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder='Причина отказа'
												className='h-36 resize-none'
												{...field}
												disabled={isRequestDeclining}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className='flex w-full justify-end gap-3'>
								<Button
									variant='ghost'
									onClick={() => setRejectDialogOpen(false)}
									type='button'
								>
									Отмена
								</Button>
								<Button
									onClick={handleConfirmDelete}
									className='font-bold'
									type='submit'
								>
									Подтвердить
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}
