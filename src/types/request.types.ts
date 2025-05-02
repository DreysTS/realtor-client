import { IProperty } from './property.types'
import { IUser } from './user.types'

export const PropertyRequestStatus = {
	PENDING: 'Обрабатывается',
	APPROWED: 'Подтверждён',
	REJECTED: 'Отклонен'
} as const

export type PropertyRequestStatus =
	(typeof PropertyRequestStatus)[keyof typeof PropertyRequestStatus]

export interface IRequest {
	id: string
	title: string
	description: string
	price: number
	square: number
	rooms: number
	address: string
	images: string[]
	currentUrl?: string
	PropertyRequestStatus: PropertyRequestStatus
	rejectReason?: string
	propertyId?: string
	userId: string
	createdAt: string
	updatedAt: string
	property: IProperty
	user: IUser
}
