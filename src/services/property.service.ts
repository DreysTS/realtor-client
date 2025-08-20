import { api } from '@/api'
import {
	TypeCreatePropertySchema,
	TypeUpdatePropertySchema
} from '@/lib/schemes'
import {
	IPagination,
	IProperty,
	PropertyResponse,
	SearchParamsObject
} from '@/lib/types'

export class PropertyService {
	public async findAll(filters: SearchParamsObject = {}) {
		const response = await api.get<PropertyResponse>('property', {
			params: filters
		})

		return response
	}

	public async realtorFindAll() {
		const response = await api.get<IProperty[]>('property/realtor')

		return response
	}

	public async realtorFindById(propertyId: string) {
		const response = await api.get<IProperty>(
			`property/realtor/${propertyId}`
		)

		return response
	}

	public async findById(id: string) {
		const response = await api.get<IProperty>(`property/${id}`)

		return response
	}

	public async create(body: TypeCreatePropertySchema) {
		const response = await api.post<IProperty>('property', body)

		return response
	}

	public async update(id: string, body: TypeUpdatePropertySchema) {
		const response = await api.patch<IProperty>(`property/${id}`, body)

		return response
	}

	public async delete(id: string) {
		const response = await api.delete<IProperty>(`property/${id}`)

		return response
	}

	public async setStatus(id: string, status: string) {
		const response = await api.patch(`property/${id}/${status}`)

		return response
	}
}

export const propertyService = new PropertyService()
