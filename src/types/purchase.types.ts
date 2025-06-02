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
	budget_min?: number
	budget_max?: number
	rooms?: number
	area_min?: number
	area_max?: number
	contact_method?: string
	status: PropertyPurchaseStatusType
	userId: string
	createdAt: string
	updatedAt: string
	user: IUser
}
