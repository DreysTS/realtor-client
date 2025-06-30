import { api } from '@/api'
import {
	TypeCreatePurchaseSchema,
	TypeUpdatePurchaseSchema
} from '@/lib/schemes'
import { IPurchase } from '@/lib/types'

export class PurchaseService {
	public async findPurchase(purchaseId: string) {
		const response = await api.get<IPurchase>(
			`property/purchase/user/${purchaseId}`
		)

		return response
	}

	public async findPurchases() {
		const response = await api.get<IPurchase[]>('property/purchase/user')

		return response
	}

	public async findUserPurchases(targetUserId: string) {
		const response = await api.get<IPurchase[]>(
			`property/purchase/realtor/${targetUserId}`
		)

		return response
	}

	public async findUsersPurchases() {
		const response = await api.get<IPurchase[]>('property/purchase/realtor')

		return response
	}

	public async addPurchase(body: TypeCreatePurchaseSchema) {
		const response = await api.post('property/purchase', body)

		return response
	}

	public async updatePurchase(
		purchaseId: string,
		body: TypeUpdatePurchaseSchema
	) {
		const response = await api.patch(
			`property/purchase/${purchaseId}`,
			body
		)

		return response
	}

	public async deletePurchase(purchaseId: string) {
		const response = await api.delete(`property/purchase/${purchaseId}`)

		return response
	}

	public async updateStatus(purchaseId: string, status: string) {
		const response = await api.patch(
			`property/purchase/${purchaseId}/${status}`
		)

		return response
	}
}

export const purchaseService = new PurchaseService()
