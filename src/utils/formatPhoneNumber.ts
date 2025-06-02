export function formatPhoneNumber(rawNumber: string): string {
	const cleaned = rawNumber.replace(/\D/g, '')

	if (cleaned.length === 11 && cleaned.startsWith('8')) {
		return `+7 (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)} ${cleaned.substring(7, 9)}-${cleaned.substring(9, 11)}`
	} else if (cleaned.length === 11 && cleaned.startsWith('7')) {
		return `+7 (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)} ${cleaned.substring(7, 9)}-${cleaned.substring(9, 11)}`
	} else if (cleaned.length === 10 && cleaned.startsWith('9')) {
		return `+7 (${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)} ${cleaned.substring(6, 8)}-${cleaned.substring(8, 10)}`
	}

	return rawNumber // Если формат не распознан
}
