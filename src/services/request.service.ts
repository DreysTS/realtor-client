import { api } from '@/api'
import { IRequest } from '@/types/request.types'

export class RequestService {
	public async findUserRequests() {
		const response = await api.get<IRequest[]>('property/request')

		return response
	}

	public async findUsersRequests() {
		const response = await api.get<IRequest[]>('property/request/realtor')

		return response
	}

	public async create(body: any) {
		const response = await api.post<IRequest>('property/request', body)

		return response
	}

	public async delete(id: string) {
		const response = await api.delete<IRequest>(`property/request/${id}`)

		return response
	}

	public async acceptRequest(id: string) {
		const response = await api.patch(`property/request/${id}/accept`)

		return response
	}

	public async declieneRequest(id: string, body: any) {
		const response = await api.patch(`property/request/${id}/decline`, body)

		return response
	}
}
