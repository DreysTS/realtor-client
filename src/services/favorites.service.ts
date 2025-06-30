import { api } from '@/api'
import { IFavoriteId, IFavoritedProperties } from '@/lib/types'

export class FavoriteService {
	public async getFavoritesProperties() {
		const response = await api.get<IFavoritedProperties[]>('favorites')

		return response
	}

	public async getFavoritesId() {
		const response = await api.get<IFavoriteId[]>('favorites/ids')

		return response
	}

	public async getAllFavorites() {
		const response = await api.get('favorites/realtor')

		return response
	}

	public async addToFavorite(id: string) {
		const response = await api.post(`favorites/${id}`)

		return response
	}

	public async removeFromFavorite(id: string) {
		const reponse = await api.delete(`favorites/${id}`)

		return reponse
	}
}

export const favoriteService = new FavoriteService()
