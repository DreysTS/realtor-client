import { IProperty } from './property.types'

export interface IFavoriteId {
	propertyId: string
}

export interface IFavoritedProperties {
	userId: string
	propertyId: string
	property: IProperty
	favoritedAt: string
}
