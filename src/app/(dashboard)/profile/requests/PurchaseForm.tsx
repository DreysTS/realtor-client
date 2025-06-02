'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Textarea
} from '@/components/ui'
import { useAddPurchase, useUpdatePurchase } from '@/hooks/purchases'
import { TypeCreatePurchaseSchema } from '@/lib/schemes'
import { IPurchase } from '@/types'

export default function PurchaseForm({
	purchase
}: {
	purchase?: IPurchase | null
}) {
	const form = useForm<TypeCreatePurchaseSchema>({
		mode: 'onChange',
		values: {
			description: purchase?.description || '',
			phone_number: purchase?.user.phoneNumber || '',
			budget_min: purchase?.budget_min || ('' as unknown as number),
			budget_max: purchase?.budget_max || ('' as unknown as number),
			rooms: purchase?.rooms || ('' as unknown as number),
			area_min: purchase?.area_min || ('' as unknown as number),
			area_max: purchase?.area_max || ('' as unknown as number),
			contact_method: purchase?.contact_method || ''
		}
	})

	const { createPurchase, isPurchaseCreating } = useAddPurchase()
	const { updatePurchase, isPurchaseUpdating } = useUpdatePurchase()

	async function onSubmit(values: TypeCreatePurchaseSchema) {
		values.budget_min = Number(values.budget_min)
		values.budget_max = Number(values.budget_max)
		values.rooms = Number(values.rooms)
		values.area_min = Number(values.area_min)
		values.area_max = Number(values.area_max)

		purchase
			? updatePurchase({ purchaseId: purchase.id, data: values })
			: createPurchase(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto max-w-3xl space-y-8 py-10'
			>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание</FormLabel>
							<FormControl>
								<Textarea
									className='resize-none'
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='phone_number'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Номер телефона</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='budget_min'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Минимальный бюджет</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='budget_max'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Максимальный бюджет</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='rooms'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Желаемое количество комнат</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='area_min'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Минимальная площадь</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='area_max'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Максимальная площадь</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='contact_method'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Способ связи</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={
										isPurchaseCreating || isPurchaseUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className='flex gap-3'>
					<Button
						type='reset'
						variant='ghost'
						onClick={() => {
							form.reset
						}}
						disabled={isPurchaseCreating || isPurchaseUpdating}
					>
						Сбросить
					</Button>
					<Button
						type='submit'
						className='grow'
						disabled={isPurchaseCreating || isPurchaseUpdating}
					>
						Отправить
					</Button>
				</div>
			</form>
		</Form>
	)
}
