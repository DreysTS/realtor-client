import { api } from '@/api'
import { IFile } from '@/types/file.types'

export class FileService {
	public async upload(formData: FormData) {
		const response = await api.post<IFile[]>('files', formData)

		return response
	}
}

export const fileService = new FileService()
