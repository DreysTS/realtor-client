import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { propertyService } from '@/services'
import { BuildingType, PropertyType } from '@/types'

type PropertyFilters = {
	minPrice?: string
	maxPrice?: string
	minSquare?: string
	maxSquare?: string
	rooms?: string
	buildingType: BuildingType
	propertyType: PropertyType
	isSecondary: string
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
		data,
		isLoading: isPropertiesLoading,
		error: propertiesError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch
	} = useInfiniteQuery({
		queryKey: ['properties', apiFilters],
		queryFn: async ({ pageParam = 1 }) => {
			const response = await propertyService.findAll({
				...apiFilters,
				page: pageParam.toString()
			})
			return response
		},
		getNextPageParam: lastPage => {
			return lastPage.pagination.hasMore
				? lastPage.pagination.page + 1
				: undefined
		},
		initialPageParam: 1
	})

	const properties = useMemo(() => {
		return data?.pages.flatMap(page => page.data) || []
	}, [data])

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

	const loadMore = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	return {
		properties,
		isPropertiesLoading,
		isFetchingNextPage,
		propertiesError,
		filters: uiFilters,
		updateFilters,
		updateSorting,
		resetFilters,
		loadMore,
		hasMore: hasNextPage
	}
}
