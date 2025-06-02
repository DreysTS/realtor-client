import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { propertyService } from '@/services'

type PropertyFilters = {
	minPrice?: string
	maxPrice?: string
	minSquare?: string
	maxSquare?: string
	rooms?: string
	sortBy?: string
}

export function useProperties() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const initialParams = useMemo<PropertyFilters>(() => {
		return Object.fromEntries(searchParams.entries()) as PropertyFilters
	}, [searchParams])

	const [uiFilters, setUiFilters] = useState<PropertyFilters>(initialParams)
	const [apiFilters] = useDebounce(uiFilters, 300)

	useEffect(() => {
		const params = new URLSearchParams()

		Object.entries(apiFilters).forEach(([key, value]) => {
			if (value) params.set(key, value)
		})

		const newUrl = `${pathname}?${params.toString()}`
		if (`${pathname}?${searchParams.toString()}` !== newUrl) {
			router.push(newUrl)
		}
	}, [apiFilters, pathname, router])

	useEffect(() => {
		const params = Object.fromEntries(
			searchParams.entries()
		) as PropertyFilters
		setUiFilters(params)
	}, [searchParams])

	const {
		data: properties,
		isLoading: isPropertiesLoading,
		error: propertiesError,
		refetch
	} = useQuery({
		queryKey: ['properties', apiFilters],
		queryFn: () => propertyService.findAll(apiFilters)
	})

	useEffect(() => {
		refetch()
	}, [apiFilters, refetch])

	const updateFilters = useCallback((updates: Partial<PropertyFilters>) => {
		setUiFilters(prev => ({ ...prev, ...updates }))
	}, [])

	const updateSorting = useCallback(
		(field: string, direction: 'asc' | 'desc') => {
			setUiFilters(prev => ({
				...prev,
				sortBy: `${field},${direction}`
			}))
		},
		[]
	)

	const resetFilters = useCallback(() => {
		router.push(pathname)
	}, [pathname])

	return {
		properties,
		isPropertiesLoading,
		propertiesError,
		filters: uiFilters,
		updateFilters,
		updateSorting,
		resetFilters
	}
}
