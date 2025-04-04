import { Cookie } from 'lucide-react'

import { api } from '@/api'
import { TypeSettingsSchema } from '@/lib/schemes'
import { IUser } from '@/types'

class UserService {
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}

	public async role(cookie: string) {
		const response = await api.get<Pick<IUser, 'role'>>('users/is-admin', {
			headers: {
				Cookie: cookie
			}
		})

		return response
	}
}

export const userService = new UserService()
