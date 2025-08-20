import { api } from '@/api'
import { IFile } from '@/lib/types/file.types'

export class FileService {
	public async upload(formData: FormData) {
		const response = await api.post<IFile[]>('storage', formData)

		return response
	}
}

export const fileService = new FileService()
