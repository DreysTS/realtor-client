import { IProperty } from './property.types'
import { IUser } from './user.types'

export const PropertyRequestStatus = {
	PENDING: 'PENDING',
	APPROWED: 'APPROWED',
	REJECTED: 'REJECTED'
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
	contactMethod: string
	status: PropertyRequestStatus
	rejectReason?: string
	propertyId?: string
	userId: string
	createdAt: string
	updatedAt: string
	property: IProperty
	user: IUser
}
