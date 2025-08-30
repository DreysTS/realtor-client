'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { RenderFormField } from '@/components/form/RenderFormField'
import { Button, DialogClose, Form } from '@/components/ui'
import { PROPERTY_PURCHASE_FIELDS } from '@/config/form'
import { useAddPurchase, useUpdatePurchase } from '@/hooks/queries/purchases'
import { CreatePurchaseSchema, TypeCreatePurchaseSchema } from '@/lib/schemes'
import { IPurchase } from '@/lib/types'

export function PurchaseForm({ purchase }: { purchase?: IPurchase | null }) {
	const form = useForm<TypeCreatePurchaseSchema>({
		resolver: zodResolver(CreatePurchaseSchema),
		values: {
			description: purchase?.description || '',
			budgetMin: purchase?.budgetMin || ('' as unknown as number),
			budgetMax: purchase?.budgetMax || ('' as unknown as number),
			rooms: purchase?.rooms || ('' as unknown as number),
			areaMin: purchase?.areaMin || ('' as unknown as number),
			areaMax: purchase?.areaMax || ('' as unknown as number),
			phoneNumber: purchase?.user.phoneNumber || '',
			contactMethod: purchase?.contactMethod || ''
		}
	})

	const { createPurchase, isPurchaseCreating } = useAddPurchase()
	const { updatePurchase, isPurchaseUpdating } = useUpdatePurchase()

	const disabled = isPurchaseCreating || isPurchaseUpdating

	async function onSubmit(values: TypeCreatePurchaseSchema) {
		purchase
			? updatePurchase({ purchaseId: purchase.id, data: values })
			: createPurchase(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto space-y-8'
			>
				{PROPERTY_PURCHASE_FIELDS.map(field => (
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
