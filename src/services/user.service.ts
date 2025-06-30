import { api } from '@/api'
import { TypeSettingsSchema } from '@/lib/schemes'
import { IUser } from '@/lib/types'

class UserService {
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	public async findServerProfile(cookie: string) {
		const response = await api.get<IUser>('users/profile', {
			headers: {
				Cookie: `session=${cookie}`
			}
		})

		return response
	}

	public async findById(id: string) {
		const response = await api.get<IUser>(`users/by-id/${id}`)

		return response
	}

	public async findAllUsers() {
		const response =
			await api.get<
				Pick<
					IUser,
					'id' | 'email' | 'displayName' | 'createdAt' | 'picture'
				>[]
			>('users')

		return response
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}

	public async role(cookie: string) {
		const response = await api.get<Pick<IUser, 'role'>>('users/is-admin', {
			headers: {
				Cookie: `session=${cookie}`
			}
		})

		return response
	}
}

export const userService = new UserService()
