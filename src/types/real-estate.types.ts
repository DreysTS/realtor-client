export enum PropertyTypes {
	APARTMENT = 'APARTMENT',
	HOUSE = 'HOUSE',
	TOWNHOUSE = 'TOWNHOUSE',
	LAND = 'LAND'
}

export enum Status {
	SALE = 'SALE',
	RENT = 'RENT',
	SOLD = 'SOLD'
}

export enum ImageType {
	PLAN = 'PLAN',
	FACADE = 'FACADE',
	VIEW = 'VIEW',
	INTERIOR = 'INTERIOR'
}

export interface IRealEstate {
	id: string
	images: IImage[]
	price: number
	title: string

	city: 'Москва' | 'Московская область'
	district?: string
	street: string
	houseNumber: string

	square: number
	livingSpace?: number
	currentFloor: number
	floorsInTheHouse: number
	rooms: number

	propertyType: PropertyTypes
	status: Status

	isNewBuilding: boolean
	builtYear?: number
	description?: string
	createdAt: Date
	updatedAt: Date

	developerId?: string | null
	developer?: IDeveloper | null
}

export interface IImage {
	id: string
	url: string
	order: number
	description?: string
	isMain: boolean
	type?: ImageType
	realEstateId: string
	uploadedAt: Date
}

export interface IDeveloper {
	id: string
	name: string
	website?: string
	foundedYear?: number
	logo?: string
}

export type RealEstateInput = Omit<
	IRealEstate,
	'id' | 'createdAt' | 'updatedAt' | 'images' | 'developer'
> & {
	images: Omit<IImage, 'id' | 'realEstateId' | 'uploadedAt'>[]
}
