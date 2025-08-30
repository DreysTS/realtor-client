export const SORTING_FILTERS_LIST = [
	{
		field: 'price',
		label: 'По цене'
	},
	{
		field: 'square',
		label: 'По площади'
	},
	{
		field: 'rooms',
		label: 'По кол-ву комнат'
	}
]

export const ROOMS_FILTERS_LIST = [
	{ value: 0, label: 'Студия' },
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' }
]

export const BUILDING_TYPE_FILTERS_LIST = [
	{ value: 'panel', label: 'Панельный' },
	{ value: 'brick', label: 'Кирпичный' },
	{ value: 'monolith', label: 'Монолитный' }
]

export const PROPERTY_TYPE_FILTERS_LIST = [
	{ value: 'apartment', label: 'Апартаменты' },
	{ value: 'flat', label: 'Квартира' },
	{ value: 'euro_flat', label: 'Евро' },
	{ value: 'gab', label: 'ГАБ' }
]

export const SECONDARY_FILTERS_LIST = [
	{ value: 'false', label: 'Новостройка' },
	{ value: 'true', label: 'Вторичка' }
]

export const DEFAULT_FILTERS = {
	minPrice: '0',
	maxPrice: '100000000',
	minSquare: '0',
	maxSquare: '200'
}
