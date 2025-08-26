import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { RenderFormField } from '@/components/form/RenderFormField'
import { Button, DialogClose, Form } from '@/components/ui'
import { PROPERTY_REQUEST_FIELDS } from '@/config/form'
import { useCreateRequest } from '@/hooks/queries/requests'
import { CreateRequestSchema, TypeCreateRequestSchema } from '@/lib/schemes'

export function RequestForm() {
	const form = useForm<TypeCreateRequestSchema>({
		resolver: zodResolver(CreateRequestSchema),
		values: {
			title: '',
			description: '',
			images: [],
			price: '' as unknown as number,
			square: '' as unknown as number,
			rooms: '' as unknown as number,
			address: '',
			phoneNumber: '',
			contactMethod: ''
		}
	})

	const { createRequest, isRequestCreating } = useCreateRequest()

	const disabled = isRequestCreating

	async function onSubmit(values: TypeCreateRequestSchema) {
		createRequest(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto w-full max-w-3xl space-y-8'
			>
				{PROPERTY_REQUEST_FIELDS.map(field => (
					<RenderFormField
						key={String(field.name)}
						field={field}
						control={form.control}
						disabled={disabled}
					/>
				))}
				<div className='flex gap-3'>
					<DialogClose asChild>
						<Button variant='ghost' disabled={disabled}>
							Отмена
						</Button>
					</DialogClose>
					<Button type='submit' className='grow' disabled={disabled}>
						Отправить
					</Button>
				</div>
			</form>
		</Form>
	)
}
