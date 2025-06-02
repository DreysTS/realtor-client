import { toast } from 'sonner'

export async function copyToClipboard(text: string) {
	const successMessage = 'Скопировано в буфер обмена'
	const errorMessage = 'Ошибка при копировании'

	if (!navigator?.clipboard?.writeText) {
		toast.error(`${errorMessage}: Clipboard API не поддерживается`)
		return
	}

	try {
		await navigator.clipboard.writeText(text)
		toast.success(successMessage)
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error)
		toast.error(`${errorMessage}: ${message}`)
	}
}
