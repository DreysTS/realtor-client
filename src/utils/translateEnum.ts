export function translateEnum(
	value: string,
	localeMap: Array<{ enum: string; translate: string }>,
	options: { caseSensitive?: boolean } = { caseSensitive: false }
): string {
	const compareValue = options.caseSensitive ? value : value.toUpperCase()

	const foundItem = localeMap.find(item =>
		options.caseSensitive
			? item.enum === compareValue
			: item.enum.toUpperCase() === compareValue
	)

	return foundItem?.translate || value
}


