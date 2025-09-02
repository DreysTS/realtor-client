import { buildingTypeMap, propertyTypeMap } from '../constants'
import { IProperty } from '../types'

import { translateEnum } from './translateEnum'

export const getPropertyData = (property: IProperty) => [
	{
		label: 'Цена',
		value: property.price.toLocaleString() + ' ₽'
	},
	{
		label: 'Площадь',
		value: property.square + ' м²'
	},
	{
		label: 'Цена за м²',
		value:
			Math.round(property.price / property.square).toLocaleString() + ' ₽'
	},
	{
		label: 'Этаж',
		value: property.floor + '/' + property.totalFloors
	},
	{
		label: 'Кол-во комнат',
		value: property.rooms
	},
	{
		label: 'Площадь кухни',
		value: property.kitchenSquare + ' м²'
	},
	{
		label: 'Высота потолков',
		value: property.ceilingHeight + ' м'
	},
	{
		label: 'Материал дома',
		value: translateEnum(property.buildingType as string, buildingTypeMap)
	},
	{
		label: 'Тип объекта',
		value: translateEnum(property.propertyType as string, propertyTypeMap)
	},
	{
		label: 'Год постройки',
		value: property.builtYear
	},
	{
		label: 'Адрес',
		value: property.location.address
	},
	{
		label: 'Дата создания',
		value: new Date(property.createdAt).toLocaleDateString('ru', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})
	},
	{
		label: 'Дата изменения',
		value: new Date(property.updatedAt).toLocaleDateString('ru', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})
	}
]
