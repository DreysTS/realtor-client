import { create } from 'zustand'

import { DEFAULT_FILTERS } from '@/lib/constants'
import { PropertyFilters, SearchParamsObject } from '@/lib/types'

type FiltersStore = {
	filters: SearchParamsObject
	// initialFilters: SearchParamsObject
	// setInitialFilters: (filters: SearchParamsObject) => void
	updateFilters: (update: Partial<PropertyFilters>) => void
	updateSorting: (field: string, direction: 'asc' | 'desc') => void
	resetFilters: () => void
}

export const useFiltersStore = create<FiltersStore>(set => ({
	filters: { ...DEFAULT_FILTERS },
	// initialFilters: {},
	// setInitialFilters: filters =>
	// 	set(state => ({
	// 		initialFilters: { ...filters }
	// 	})),
	updateFilters: update =>
		set(state => ({ filters: { ...state.filters, ...update } })),
	updateSorting: (field, direction) =>
		set(state => ({
			filters: { ...state.filters, sortBy: `${field},${direction}` }
		})),
	resetFilters: () => {
		set(state => ({ filters: { ...DEFAULT_FILTERS } }))
	}
}))
