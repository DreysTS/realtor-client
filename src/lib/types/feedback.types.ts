import { IUser } from './user.types'

export interface IFeedback {
	id: string
	content: string
	userId: string
	user: IUser
	createdAt: string
	updatedAt: string
}
