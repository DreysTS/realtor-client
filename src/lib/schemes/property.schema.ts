import { z } from 'zod'

import { BasePropertySchema } from './base-property.schema'
import { BUILDING_TYPES, PROPERTY_TYPES, SELLING_TYPES } from '@/lib/types'

export const PropertySchema = BasePropertySchema.extend({
	kitchenSquare: z.coerce
		.number()
		.positive('Площадь кухни должна быть положительным числом.'),
	roomsSquare: z
		.array(z.number())
		.optional()
		.refine(value => value?.every(num => num > 0) ?? true, {
			message: 'Все значения должны быть положительными числами'
		})
		.default([]),
	floor: z.coerce
		.number()
		.int('Этаж должен быть целым числом')
		.positive('Этаж должен быть положительным числом.'),
	totalFloors: z.coerce
		.number()
		.int('Общее количество этажей должно быть целым числом')
		.positive('Общее количество этажей должно быть положительным числом.'),
	isSecondary: z.boolean().optional(),
	builtYear: z.coerce
		.number()
		.int('Год постройки должен быть целым числом.')
		.positive('Год постройки должен быть положительным числом.'),
	ceilingHeight: z.coerce.number().positive().optional(),
	buildingType: z
		.enum([
			BUILDING_TYPES.PANEL,
			BUILDING_TYPES.BRICK,
			BUILDING_TYPES.MONOLITH
		])
		.optional(),
	propertyType: z
		.enum([
			PROPERTY_TYPES.APARTMENT,
			PROPERTY_TYPES.FLAT,
			PROPERTY_TYPES.EURO_FLAT,
			PROPERTY_TYPES.GAB
		])
		.optional(),
	sellingType: z
		.enum([SELLING_TYPES.RENT, SELLING_TYPES.SALE, SELLING_TYPES.SOLD])
		.optional(),
	city: z.string().min(1).optional(),
	district: z.string().min(1).optional()
})

export type TypeCreatePropertySchema = z.infer<typeof PropertySchema>

export const UpdatePropertySchema = PropertySchema.partial()

export type TypeUpdatePropertySchema = z.infer<typeof UpdatePropertySchema>
