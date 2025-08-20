import { useInfiniteQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDebouncedEffect, useSearchParamsObject } from '@/hooks'
import { PropertyFilters, SearchParamsObject } from '@/lib/types'
import { propertyService } from '@/services'

const DEFAULT_FILTERS = {
	minPrice: '0',
	maxPrice: '100000000',
	minSquare: '0',
	maxSquare: '200'
}

export function usePropertiesAlternate() {
	const initialFilters = useSearchParamsObject()
	const router = useRouter()
	const pathname = usePathname()

	const [filters, setFilters] = useState<SearchParamsObject>({
		...DEFAULT_FILTERS
	})

	useEffect(() => {
		setFilters(initialFilters)
	}, [])

	useDebouncedEffect(
		() => {
			handleApplyFilters()
		},
		[filters],
		300
	)

	const {
		data,
		isLoading: isPropertiesLoading,
		isFetching: isPropertiesFetching,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useInfiniteQuery({
		queryKey: ['propertiesAlternate', initialFilters],
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

	const properties = data?.pages.flatMap(page => page.data) || []

	const updateSorting = (field: string, direction: 'asc' | 'desc') => {
		setFilters(prev => ({
			...prev,
			sortBy: `${field},${direction}`
		}))
	}

	const updateFilters = (update: Partial<PropertyFilters>) => {
		setFilters(prev => ({
			...prev,
			...update
		}))
	}

	const handleApplyFilters = useCallback(() => {
		const params = new URLSearchParams()

		Object.entries(filters).forEach(([key, value]) => {
			if (value) {
				if (Array.isArray(value)) {
					let stringValue = ''
					const lastIndex = value.length - 1

					value.forEach((val, index) => {
						stringValue += val.toString()
						stringValue += index === lastIndex ? '' : ','
					})

					params.set(key, stringValue)
				} else {
					params.set(key, value)
				}
			}
		})

		router.push(`?${params.toString()}`)
	}, [filters, router])

	const loadMore = () => {
		if (hasNextPage && !isFetchingNextPage) fetchNextPage()
	}

	const resetFilters = () => {
		setFilters({ ...DEFAULT_FILTERS })
		router.push(pathname)
	}

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
