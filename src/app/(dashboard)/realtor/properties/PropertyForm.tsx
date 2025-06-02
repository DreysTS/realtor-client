'use client'

import { useForm } from 'react-hook-form'

import { ImageUpload } from '@/components'
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	RadioGroup,
	RadioGroupItem,
	Switch,
	Textarea
} from '@/components/ui'
import { useCreateProperty, useUpdateProperty } from '@/hooks/properties'
import {
	buildingTypeMap,
	propertyTypeMap,
	sellingTypeMap
} from '@/lib/constants'
import { TypeCreatePropertySchema } from '@/lib/schemes'
import { IProperty } from '@/types'

export default function PropertyForm({
	property
}: {
	property?: IProperty | null
}) {
	const form = useForm<TypeCreatePropertySchema>({
		mode: 'onChange',
		values: {
			title: property?.title || '',
			description: property?.description || '',
			images: property?.images || [],
			price: property?.price || ('' as unknown as number),
			square: property?.square || ('' as unknown as number),
			rooms: property?.rooms || ('' as unknown as number),
			kitchenSquare: property?.kitchenSquare || ('' as unknown as number),
			roomsSquare: property?.roomsSquare || ('' as unknown as number),
			floor: property?.floor || ('' as unknown as number),
			totalFloors: property?.totalFloors || ('' as unknown as number),
			isSecondary: property?.isSecondary || false,
			builtYear: property?.builtYear || ('' as unknown as number),
			ceilingHeight: property?.ceilingHeight || ('' as unknown as number),
			buildingType: property?.buildingType || 'BRICK',
			propertyType: property?.propertyType || 'FLAT',
			sellingType: property?.sellingType || 'SALE',
			address: property?.location.address || '',
			city: property?.location.city || '',
			district: property?.location.district || ''
		}
	})

	const { createProperty, isPropertyCreating } = useCreateProperty()
	const { updateProperty, isPropertyUpdating } = useUpdateProperty()

	async function onSubmit(values: TypeCreatePropertySchema) {
		values.price = Number(values.price)
		values.square = Number(values.square)
		values.rooms = Number(values.rooms)
		values.kitchenSquare = Number(values.kitchenSquare)
		values.roomsSquare = Number(values.roomsSquare)
		values.floor = Number(values.floor)
		values.totalFloors = Number(values.totalFloors)
		values.builtYear = Number(values.builtYear)
		values.ceilingHeight = Number(values.ceilingHeight)

		property
			? updateProperty({ id: property.id, body: values })
			: createProperty(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto max-w-3xl space-y-8 py-10'
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
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
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
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
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
									isDisabled={isPropertyCreating}
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
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
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
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
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
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='kitchenSquare'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Площадь кухни</FormLabel>
							<FormControl>
								<Input
									placeholder='14.3'
									{...field}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='roomsSquare'
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Площадь комнат</FormLabel>
								<FormControl>
									<Input
										placeholder='13.7, 10.1'
										{...field}
										disabled={
											isPropertyCreating ||
											isPropertyUpdating
										}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)
					}}
				/>

				<FormField
					control={form.control}
					name='floor'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Этаж</FormLabel>
							<FormControl>
								<Input
									placeholder='10'
									{...field}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='totalFloors'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Этажей в доме</FormLabel>
							<FormControl>
								<Input
									placeholder='24'
									{...field}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='isSecondary'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
							<div className='space-y-0.5'>
								<FormLabel>Вторичка</FormLabel>
								<FormDescription>
									Вкл. - вторичка, выкл. - первичка
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
									aria-readonly
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='builtYear'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Год постройки</FormLabel>
							<FormControl>
								<Input
									placeholder='2024'
									{...field}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='ceilingHeight'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Высотка потолков</FormLabel>
							<FormControl>
								<Input
									placeholder='2.5'
									{...field}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='buildingType'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Материал дома</FormLabel>

							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									className='flex w-full items-stretch'
									defaultValue={field.value}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								>
									{buildingTypeMap.map((option, index) => (
										<FormItem
											className='flex items-center space-y-0 space-x-3'
											key={index}
										>
											<FormControl>
												<RadioGroupItem
													value={option.enum}
													className='peer sr-only'
												/>
											</FormControl>
											<FormLabel className='border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary" flex cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-transparent p-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												{option.translate}
											</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='propertyType'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Тип недвижимости</FormLabel>

							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									className='flex w-full items-stretch'
									defaultValue={field.value}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								>
									{propertyTypeMap.map((option, index) => (
										<FormItem
											className='flex items-center space-y-0 space-x-3'
											key={index}
										>
											<FormControl>
												<RadioGroupItem
													value={option.enum}
													className='peer sr-only'
												/>
											</FormControl>
											<FormLabel className='border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary" flex cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-transparent p-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												{option.translate}
											</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='sellingType'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Тип продажи</FormLabel>

							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									className='flex w-full'
									defaultValue={field.value}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								>
									{sellingTypeMap.map((option, index) => (
										<FormItem
											className='flex items-center space-y-0 space-x-3'
											key={index}
										>
											<FormControl>
												<RadioGroupItem
													value={option.enum}
													className='peer sr-only'
												/>
											</FormControl>
											<FormLabel className='border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary" flex cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-transparent p-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												{option.translate}
											</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
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
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='city'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Город</FormLabel>
							<FormControl>
								<Input
									placeholder='Москва'
									{...field}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='district'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Район</FormLabel>
							<FormControl>
								<Input
									placeholder='Яуза парк'
									{...field}
									disabled={
										isPropertyCreating || isPropertyUpdating
									}
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
						disabled={isPropertyCreating || isPropertyUpdating}
					>
						Сбросить
					</Button>
					<Button
						type='submit'
						className='grow'
						disabled={isPropertyCreating || isPropertyUpdating}
					>
						Отправить
					</Button>
				</div>
			</form>
		</Form>
	)
}
