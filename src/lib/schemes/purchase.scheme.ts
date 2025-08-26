import { z } from 'zod'

export const CreatePurchaseSchema = z.object({
	description: z.string().min(8, { message: 'Введите описание' }),
	phoneNumber: z.string(),
	budgetMin: z.coerce
		.number({ message: 'Минимальный бюджет должен быть числом.' })
		.positive({ message: 'Максимальный бюджет должен быть положительным.' })
		.optional(),
	budgetMax: z.coerce
		.number({ message: 'Максимальный бюджет должен быть числом.' })
		.positive({ message: 'Максимальный бюджет должен быть положительным.' })
		.optional(),
	rooms: z.coerce
		.number({ message: 'Количество комнат должно быть числом.' })
		.positive({ message: 'Количество комнат должно быть положительным.' })
		.optional(),
	areaMin: z.coerce
		.number({ message: 'Минимальная площадь должна быть числом.' })
		.positive({
			message: 'Минимальная площадь должна быть положительной.'
		})
		.optional(),
	areaMax: z.coerce
		.number({ message: 'Максимальная площадь должна быть числом.' })
		.positive({
			message: 'Максимальная площадь должна быть положительной.'
		})
		.optional(),
	contactMethod: z.string().min(8, { message: 'Введите способ связи.' })
})

export type TypeCreatePurchaseSchema = z.infer<typeof CreatePurchaseSchema>
