'use client'

import { useSearchParams } from 'next/navigation'

import { type SearchParamsObject } from '@/lib/types'

export const useSearchParamsObject = (): SearchParamsObject => {
	const searchParams = useSearchParams()
	const result: SearchParamsObject = {}

	for (const [key, value] of searchParams.entries()) {
		if (result[key]) {
			if (Array.isArray(result[key])) {
				result[key] = [...result[key], value]
			} else {
				result[key] = [result[key], value]
			}
		} else {
			result[key] = value.includes(',') ? value.split(',') : value
		}
	}

	return result
}
