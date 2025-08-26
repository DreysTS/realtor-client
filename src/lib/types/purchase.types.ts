import { IUser } from './user.types'

export const PROPERTY_PURCHASE_STATUS = {
	ACTIVE: 'ACTIVE',
	PENDING: 'PENDING',
	COMPLETED: 'COMPLETED',
	REJECTED: 'REJECTED'
} as const

export type PropertyPurchaseStatusType =
	(typeof PROPERTY_PURCHASE_STATUS)[keyof typeof PROPERTY_PURCHASE_STATUS]

export interface IPurchase {
	id: string
	description: string
	budgetMin?: number
	budgetMax?: number
	rooms?: number
	areaMin?: number
	areaMax?: number
	contactMethod?: string
	status: PropertyPurchaseStatusType
	userId: string
	createdAt: string
	updatedAt: string
	user: IUser
}
