import { api } from '@/api'
import { TypePropertySchema, TypeUpdatePropertySchema } from '@/lib/schemes'
import { IProperty } from '@/types/property.types'

export class PropertyService {
	public async findAll() {
		const response = await api.get<IProperty[]>('property')

		return response
	}

	public async findById(id: string) {
		const response = await api.get<IProperty>(`property/${id}`)

		return response
	}

	public async create(formData: FormData) {
		const response = await api.post<IProperty>('property', formData)

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

	public async setDraftStatus(id: string) {
		const response = await api.patch(`property/${id}/draft`)

		return response
	}

	public async setActiveStatus(id: string) {
		const response = await api.patch(`property/${id}/active`)

		return response
	}

	public async setArchiveStatus(id: string) {
		const response = await api.patch(`property/${id}/archive`)

		return response
	}
}

export const propertyService = new PropertyService()
