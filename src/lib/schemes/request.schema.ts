import { z } from 'zod'

import { BasePropertySchema } from './base-property.schema'

export const CreateRequestSchema = BasePropertySchema.extend({
	phoneNumber: z.string(),
	contactMethod: z.string().min(8, { message: 'Введите способ связи.' })
})

export type TypeCreateRequestSchema = z.infer<typeof CreateRequestSchema>
