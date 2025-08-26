'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RenderFormField } from '@/components/form/RenderFormField'
import { Button, Form } from '@/components/ui'
import { PROPERTY_FIELDS } from '@/config/form'
import {
	useCreateProperty,
	useUpdateProperty
} from '@/hooks/queries/properties'
import { PropertySchema, TypeCreatePropertySchema } from '@/lib/schemes'
import { IProperty } from '@/lib/types'

export default function PropertyForm({
	property
}: {
	property?: IProperty | null
}) {
	const form = useForm<TypeCreatePropertySchema>({
		resolver: zodResolver(PropertySchema),
		mode: 'onSubmit',
		values: {
			title: property?.title || '',
			description: property?.description || '',
			images: property?.images || [],
			price: property?.price || ('' as unknown as number),
			square: property?.square || ('' as unknown as number),
			rooms: property?.rooms || ('' as unknown as number),
			kitchenSquare: property?.kitchenSquare || ('' as unknown as number),
			roomsSquare: property?.roomsSquare || [],
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

	const disabled = isPropertyCreating || isPropertyUpdating

	async function onSubmit(values: TypeCreatePropertySchema) {
		property
			? updateProperty({ id: property.id, body: values })
			: createProperty(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				{PROPERTY_FIELDS.map(field => (
					<RenderFormField
						key={String(field.name)}
						field={field}
						control={form.control}
						disabled={disabled}
					/>
				))}

				<div className='flex gap-3'>
					<Button type='reset' variant='ghost' disabled={disabled}>
						Сбросить
					</Button>
					<Button type='submit' className='grow' disabled={disabled}>
						Отправить
					</Button>
				</div>
			</form>
		</Form>
	)
}
