import { api } from '@/api'
import { TypeFeedbackScheme } from '@/lib/schemes/feedback.scheme'
import { IFeedback } from '@/lib/types'

export class FeedbackService {
	public async findFeedbacks() {
		const response = await api.get<IFeedback[]>('feedback/user')

		return response
	}

	public async findUserFeedbacks(targetUserId: string) {
		const response = await api.get<IFeedback[]>(
			`feedback/realtor/${targetUserId}`
		)

		return response
	}

	public async findUsersFeedbacks() {
		const response = await api.get<IFeedback[]>('feedback/realtor')

		return response
	}

	public async createFeedback(body: TypeFeedbackScheme) {
		const response = await api.post('feedback', body)

		return response
	}

	public async deleteFeedback(feedbackId: string) {
		const response = await api.delete(`feedback/${feedbackId}`)

		return response
	}
}

export const feedbackService = new FeedbackService()
