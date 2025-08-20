export const PROPERTY_TYPES = {
	APARTMENT: 'APARTMENT',
	FLAT: 'FLAT',
	EURO_FLAT: 'EURO_FLAT',
	GAB: 'GAB'
} as const

export type PropertyType = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES]

export const SELLING_TYPES = {
	SALE: 'SALE',
	RENT: 'RENT',
	SOLD: 'SOLD'
} as const

export type SellingType = (typeof SELLING_TYPES)[keyof typeof SELLING_TYPES]

export const BUILDING_TYPES = {
	PANEL: 'PANEL',
	BRICK: 'BRICK',
	MONOLITH: 'MONOLITH'
} as const

export type BuildingType = (typeof BUILDING_TYPES)[keyof typeof BUILDING_TYPES]

export const PROPERTY_STATUS = {
	ACTIVE: 'ACTIVE',
	DRAFT: 'DRAFT',
	ARCHIVED: 'ARCHIVED'
} as const

export type PropertyStatus =
	(typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS]

export interface Location {
	id: number
	address: string
	city?: string
	district?: string
	latitude?: number
	longitude?: number
}

export interface IProperty {
	id: string
	title: string
	description: string
	images: string[]
	price: number
	square: number
	rooms: number
	kitchenSquare?: number
	roomsSquare: number
	floor?: number
	totalFloors?: number
	isSecondary?: boolean
	builtYear?: number
	ceilingHeight?: number
	buildingType?: BuildingType
	propertyType?: PropertyType
	sellingType?: SellingType
	status: PropertyStatus
	locationId: number
	userId?: string
	createdAt: string
	updatedAt: string

	location: Location
}

export interface IPagination {
	total: number
	page: number
	limit: number
	hasMore: boolean
}

export type PropertyFilters = {
	minPrice?: string
	maxPrice?: string
	minSquare?: string
	maxSquare?: string
	rooms?: string[]
	buildingType?: BuildingType[]
	propertyType?: PropertyType[]
	isSecondary: string
	sortBy?: string
}

export type PropertyResponse = {
	data: IProperty[]
	pagination: IPagination
}

export type SearchParamsObject = Record<string, string | string[]>
