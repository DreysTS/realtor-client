export const NAVBAR_HEIGHT = 64

export const propertyStatuses = ['draft', 'active', 'archived']
export const propertyPurchaseStatuses = [
	'pending',
	'active',
	'rejected',
	'completed'
]

export const statusMap = [
	{ enum: 'DRAFT', translate: 'Черновик' },
	{ enum: 'ACTIVE', translate: 'Активный' },
	{ enum: 'ARCHIVED', translate: 'В архиве' }
]

export const buildingTypeMap = [
	{ enum: 'PANEL', translate: 'Панельный' },
	{ enum: 'BRICK', translate: 'Кирпичный' },
	{ enum: 'MONOLITH', translate: 'Монолитный' }
]

export const propertyTypeMap = [
	{ enum: 'APARTMENT', translate: 'Апартаменты' },
	{ enum: 'FLAT', translate: 'Квартира' },
	{ enum: 'EURO_FLAT', translate: 'Евро' },
	{ enum: 'GAB', translate: 'Габ' }
]

export const sellingTypeMap = [
	{ enum: 'SALE', translate: 'Продаётся' },
	{ enum: 'RENT', translate: 'Аренда' },
	{ enum: 'SOLD', translate: 'Продано' }
]

export const propertyRequestStatusMap = [
	{ enum: 'PENDING', translate: 'Рассматривается' },
	{ enum: 'APPROWED', translate: 'Одобрена' },
	{ enum: 'REJECTED', translate: 'Отклонена' }
]

export const propertyPurchaseStatusMap = [
	{ enum: 'PENDING', translate: 'Обрабатывается' },
	{ enum: 'ACTIVE', translate: 'Активная' },
	{ enum: 'REJECTED', translate: 'Отклонена' },
	{ enum: 'COMPLETED', translate: 'Закрыта' }
]

export const radioRooms = [
	{ value: 0, label: 'Студия' },
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' }
]

export const radioBuildingType = [
	{ value: 'panel', label: 'Панельный' },
	{ value: 'brick', label: 'Кирпичный' },
	{ value: 'monolith', label: 'Монолитный' }
]

export const radioPropertyType = [
	{ value: 'apartment', label: 'Апартаменты' },
	{ value: 'flat', label: 'Квартира' },
	{ value: 'euro_flat', label: 'Евро' },
	{ value: 'gab', label: 'Гараж' }
]

export const radioSecondary = [
	{ value: 'false', label: 'Новостройка' },
	{ value: 'true', label: 'Вторичка' }
]
