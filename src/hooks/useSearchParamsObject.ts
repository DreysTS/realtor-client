'use client'

import { useSearchParams } from 'next/navigation'

import { type SearchParamsObject } from '@/lib/types'

export const useSearchParamsObject = (): SearchParamsObject => {
	const params = useSearchParams()
	const result: SearchParamsObject = {}

	for (const [key, value] of params.entries()) {
		if (result[key]) {
			if (Array.isArray(result[key])) {
				result[key].push(value)
			} else {
				result[key] = [result[key], value]
			}
		} else {
			result[key] = value
		}
	}

	return result
}
