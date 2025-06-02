import React from 'react'
import { useForm } from 'react-hook-form'

import { ImageUpload } from '@/components'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea
} from '@/components/ui'
import { useCreateRequest } from '@/hooks/requests'
import { TypeCreateRequestSchema } from '@/lib/schemes'

export default function RequestForm() {
	const form = useForm<TypeCreateRequestSchema>({
		mode: 'onChange',
		values: {
			title: '',
			description: '',
			images: [],
			price: '' as unknown as number,
			square: '' as unknown as number,
			rooms: '' as unknown as number,
			address: ''
		}
	})

	const { createRequest, isRequestCreating } = useCreateRequest()

	async function onSubmit(values: TypeCreateRequestSchema) {
		values.price = Number(values.price)
		values.rooms = Number(values.rooms)
		values.square = Number(values.square)

		createRequest(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto w-full max-w-3xl space-y-8 py-10'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Заголовок (название)</FormLabel>
							<FormControl>
								<Input
									placeholder='Трёшка на Патриках'
									{...field}
									disabled={isRequestCreating}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Всего владельцев было двое..'
									className='resize-none'
									{...field}
									disabled={isRequestCreating}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Выберите изображения</FormLabel>
							<FormControl>
								<ImageUpload
									isDisabled={isRequestCreating}
									onChange={field.onChange}
									value={field.value as string[]}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Стоимость</FormLabel>
							<FormControl>
								<Input
									placeholder='10.000.000'
									{...field}
									disabled={isRequestCreating}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='square'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Площадь</FormLabel>
							<FormControl>
								<Input
									placeholder='43.8 '
									{...field}
									disabled={isRequestCreating}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='rooms'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Количество комнат</FormLabel>
							<FormControl>
								<Input
									placeholder='2'
									{...field}
									disabled={isRequestCreating}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Адрес</FormLabel>
							<FormControl>
								<Input
									placeholder='г. Москва, улица Пушкина, дом Колотушкина'
									{...field}
									disabled={isRequestCreating}
								/>
							</FormControl>

							<FormMessage />
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
						disabled={isRequestCreating}
					>
						Сбросить
					</Button>
					<Button
						type='submit'
						className='grow'
						disabled={isRequestCreating}
					>
						Отправить
					</Button>
				</div>
			</form>
		</Form>
	)
}
