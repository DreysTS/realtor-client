import { z } from 'zod'

export const FeedbackScheme = z.object({
	content: z.string().min(8, { message: 'Введите текст' })
})

export type TypeFeedbackScheme = z.infer<typeof FeedbackScheme>
