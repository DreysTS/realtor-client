'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
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
import { usePropertyMutation } from '@/hooks/query'
import { PropertySchema, TypePropertySchema } from '@/lib/schemes'
import { BUILDING_TYPES, PROPERTY_TYPES, SELLING_TYPES } from '@/types'

export default function CreatePropertyForm() {
	const [files, setFiles] = useState<File[] | null>(null)

	const dropZoneConfig = {
		maxFiles: 5,
		maxSize: 1024 * 1024 * 4,
		multiple: true
	}

	const form = useForm<TypePropertySchema>({
		resolver: zodResolver(PropertySchema),
		defaultValues: {
			title: '',
			description: '',
			price: '' as unknown as number,
			square: '' as unknown as number,
			rooms: '' as unknown as number,
			kitchenSquare: '' as unknown as number,
			roomsSquare: '' as unknown as number,
			floor: '' as unknown as number,
			totalFloors: '' as unknown as number,
			isSecondary: false,
			builtYear: '' as unknown as number,
			ceilingHeight: '' as unknown as number,
			buildingType: 'BRICK',
			propertyType: 'FLAT',
			sellingType: 'SALE',
			address: '',
			city: '',
			district: ''
		}
	})

	const { property, isLoadingProperty } = usePropertyMutation()

	async function onSubmit(values: TypePropertySchema) {
		const formData = new FormData()

		if (files) {
			files.forEach(file => {
				formData.append('files', file)
			})
		}

		Object.entries(values).forEach(([key, value]) => {
			if (value !== undefined) {
				const stringValue = Array.isArray(value)
					? value.join(',')
					: String(value)
				formData.append(key, stringValue)
			}
		})

		property(formData)
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
									type=''
									{...field}
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
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormItem>
					<FormLabel>Выберите изображения</FormLabel>
					<FormControl>
						<FileUploader
							value={files}
							onValueChange={setFiles}
							dropzoneOptions={dropZoneConfig}
							className='bg-background relative rounded-lg p-2'
						>
							<FileInput
								id='fileInput'
								className='outline-1 outline-slate-500 outline-dashed'
							>
								<div className='flex w-full flex-col items-center justify-center p-8'>
									<CloudUpload className='h-10 w-10 text-gray-500' />
									<p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
										<span className='font-semibold'>
											Click to upload
										</span>
										&nbsp; or drag and drop
									</p>
									<p className='text-xs text-gray-500 dark:text-gray-400'>
										SVG, PNG, JPG or GIF
									</p>
								</div>
							</FileInput>
							<FileUploaderContent className='[&__button]:hover:bg-primary [&__button]:cursor-pointer [&__button]:rounded [&__button]:p-1 [&__button]:transition-colors'>
								{files &&
									files.length > 0 &&
									files.map((file, i) => (
										<FileUploaderItem
											key={i}
											index={i}
											className='flex h-fit cursor-default items-center'
										>
											<div className='relative aspect-square h-16 w-16'>
												<Image
													src={URL.createObjectURL(
														file
													)}
													alt={file.name}
													className='rounded-md object-cover'
													fill
												/>
											</div>
											<span className='ml-2'>
												{file.name}
											</span>
										</FileUploaderItem>
									))}
							</FileUploaderContent>
						</FileUploader>
					</FormControl>

					<FormMessage />
				</FormItem>

				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Стоимость</FormLabel>
							<FormControl>
								<Input
									placeholder='10.000.000'
									type=''
									{...field}
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
								<Input placeholder='43.8 ' type='' {...field} />
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
								<Input placeholder='2' type='' {...field} />
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
								<Input placeholder='14.3' type='' {...field} />
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
										type=''
										{...field}
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
								<Input placeholder='10' type='' {...field} />
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
								<Input placeholder='24' type='' {...field} />
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
								<Input placeholder='2024' type='' {...field} />
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
								<Input placeholder='2.5' type='' {...field} />
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
								>
									{[
										['Кирпич', BUILDING_TYPES.BRICK],
										['Монолит', BUILDING_TYPES.MONOLITH],
										['Панельный', BUILDING_TYPES.PANEL]
									].map((option, index) => (
										<FormItem
											className='flex items-center space-y-0 space-x-3'
											key={index}
										>
											<FormControl>
												<RadioGroupItem
													value={option[1]}
													className='peer sr-only'
												/>
											</FormControl>
											<FormLabel className='border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary" flex cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-transparent p-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												{option[0]}
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
								>
									{[
										[
											'Апартаменты',
											PROPERTY_TYPES.APARTMENT
										],
										['Евро', PROPERTY_TYPES.EURO_FLAT],
										['Квартира', PROPERTY_TYPES.FLAT],
										['Гостинная', PROPERTY_TYPES.GAB]
									].map((option, index) => (
										<FormItem
											className='flex items-center space-y-0 space-x-3'
											key={index}
										>
											<FormControl>
												<RadioGroupItem
													value={option[1]}
													className='peer sr-only'
												/>
											</FormControl>
											<FormLabel className='border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary" flex cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-transparent p-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												{option[0]}
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
								>
									{[
										['Аренда', SELLING_TYPES.RENT],
										['Продажа', SELLING_TYPES.SALE],
										['Продано', SELLING_TYPES.SOLD]
									].map((option, index) => (
										<FormItem
											className='flex items-center space-y-0 space-x-3'
											key={index}
										>
											<FormControl>
												<RadioGroupItem
													value={option[1]}
													className='peer sr-only'
												/>
											</FormControl>
											<FormLabel className='border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary" flex cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-transparent p-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												{option[0]}
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
									type=''
									{...field}
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
									type=''
									{...field}
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
									type=''
									{...field}
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
					>
						Сбросить
					</Button>
					<Button type='submit' className='grow'>
						Отправить
					</Button>
				</div>
			</form>
		</Form>
	)
}
