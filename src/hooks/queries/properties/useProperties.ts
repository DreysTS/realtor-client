import { useInfiniteQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDebouncedEffect, useSearchParamsObject } from '@/hooks'
import { PropertyFilters, SearchParamsObject } from '@/lib/types'
import { propertyService } from '@/services'

export function useProperties() {
	const initialFilters = useSearchParamsObject()
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [filters, setFilters] = useState<SearchParamsObject>({
		...initialFilters
	})

	useEffect(() => {
		setFilters({ ...initialFilters })
	}, [searchParams])

	useDebouncedEffect(
		() => {
			handleApplyFilters()
		},
		[filters, searchParams, pathname],
		500
	)

	const {
		data,
		isLoading: isPropertiesLoading,
		isFetching: isPropertiesFetching,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useInfiniteQuery({
		queryKey: ['properties', initialFilters],
		queryFn: ({ pageParam = 1 }) =>
			propertyService.findAll({
				...initialFilters,
				page: pageParam.toString()
			}),
		getNextPageParam: lastPage => {
			return lastPage.pagination.hasMore
				? lastPage.pagination.page + 1
				: undefined
		},
		initialPageParam: 1
	})

	const properties = useMemo(() => {
		return data?.pages.flatMap(page => page.data)
	}, [initialFilters])

	const updateSorting = useCallback(
		(field: string, direction: 'asc' | 'desc') => {
			setFilters(prev => ({
				...prev,
				sortBy: `${field},${direction}`
			}))
		},
		[]
	)

	const updateFilters = useCallback((update: Partial<PropertyFilters>) => {
		setFilters(prev => ({ ...prev, ...update }))
	}, [])

	const handleApplyFilters = useCallback(() => {
		const params = new URLSearchParams()

		Object.entries(filters).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				if (value.length > 0) {
					params.set(key, value.join(','))
				}
			} else if (typeof value === 'string') {
				if (value.trim() !== '') {
					params.set(key, value)
				}
			}
		})

		const newQuery = params.toString() ? `?${params.toString()}` : ''
		if (typeof window !== 'undefined') {
			const current = window.location.search
			if (current === newQuery) return
		}

		router.push(`${pathname}${newQuery}`, { scroll: false })
	}, [filters, router, pathname])

	const loadMore = () => {
		if (hasNextPage && !isFetchingNextPage) fetchNextPage()
	}

	const resetFilters = useCallback(() => {
		setFilters({})
		router.push(pathname)
	}, [])

	return useMemo(
		() => ({
			properties,
			isPropertiesLoading,
			isPropertiesFetching,
			isFetchingNextPage,
			filters,
			updateSorting,
			updateFilters,
			handleApplyFilters,
			loadMore,
			resetFilters,
			hasMore: hasNextPage
		}),
		[
			properties,
			isPropertiesLoading,
			isPropertiesFetching,
			isFetchingNextPage,
			filters,
			updateSorting,
			updateFilters,
			handleApplyFilters,
			loadMore,
			resetFilters,
			hasNextPage
		]
	)
}
