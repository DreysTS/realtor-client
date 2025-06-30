export function debounce(callback: (...args: any[]) => void, delay: number) {
	let timeoutId: ReturnType<typeof setTimeout> | null = null

	return (...args: any[]) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			timeoutId = null
			callback(...args)
		}, delay)
	}
}
