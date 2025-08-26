import { create } from 'zustand'


import { PropertyFilters, SearchParamsObject } from '@/lib/types'
import { DEFAULT_FILTERS } from '../lib/constants/filters'

type FiltersStore = {
	filters: SearchParamsObject
	updateFilters: (update: Partial<PropertyFilters>) => void
	updateSorting: (field: string, direction: 'asc' | 'desc') => void
	resetFilters: () => void
}

export const useFiltersStore = create<FiltersStore>(set => ({
	filters: { ...DEFAULT_FILTERS },
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
