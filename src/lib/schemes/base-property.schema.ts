import { z } from 'zod'

export const BasePropertySchema = z.object({
	title: z.string().min(1, { message: 'Введите заголовок' }),
	description: z.string().min(1, { message: 'Введите описание.' }),
	images: z.array(z.string()),
	price: z.coerce.number().positive('Цена должна быть положительным чилом.'),
	square: z.coerce
		.number()
		.positive('Площадь должна быть положительным числом.'),
	rooms: z.coerce
		.number()
		.int('Количество комнат должно быть целым числом.')
		.positive('Количество комнат должно быть положительным числом.'),
	address: z.string().min(1).optional(),
	latitude: z.coerce.number().optional(),
	longitude: z.coerce.number().optional()
})

export type TypeBasePropertySchema = z.infer<typeof BasePropertySchema>
