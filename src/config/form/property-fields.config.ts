import { TypeCreatePropertySchema } from '@/lib/schemes'
import { FormFieldProps } from '@/lib/types'

export const STATUS_OPTIONS = [
	{ value: 'DRAFT', label: 'Черновик' },
	{ value: 'ACTIVE', label: 'Активный' },
	{ value: 'ARCHIVED', label: 'В архиве' }
]

export const BUILDING_TYPE_OPTIONS = [
	{ value: 'BRICK', label: 'Кирпичный' },
	{ value: 'PANEL', label: 'Панельный' },
	{ value: 'MONOLITH', label: 'Монолитный' }
]

export const PROPERTY_TYPE_OPTIONS = [
	{ value: 'FLAT', label: 'Квартира' },
	{ value: 'EURO_FLAT', label: 'Евро' },
	{ value: 'APARTMENT', label: 'Апартаменты' },
	{ value: 'GAB', label: 'Габ' }
]

export const SELLING_TYPE_OPTIONS = [
	{ value: 'SALE', label: 'Продаётся' },
	{ value: 'RENT', label: 'Аренда' },
	{ value: 'SOLD', label: 'Продано' }
]

export const PROPERTY_FIELDS: FormFieldProps<TypeCreatePropertySchema>[] = [
	{
		type: 'text',
		name: 'title',
		label: 'Заголовок (название)',
		placeholder: 'Трёшка на Тверской'
	},
	{
		type: 'textarea',
		name: 'description',
		label: 'Описание',
		placeholder:
			'Просторная 3-комнатная квартира с евроремонтом 2023 года. Панорамные окна, вид на парк. Кухня-гостиная 25 м², санузел раздельный. Район тихий, в 5 минутах от метро, рядом школа и супермаркет.'
	},
	{
		type: 'image',
		name: 'images',
		label: 'Выберите изображения'
	},
	{
		type: 'text',
		name: 'price',
		label: 'Стоимость',
		placeholder: '10.000.000'
	},
	{
		type: 'text',
		name: 'square',
		label: 'Площадь',
		placeholder: '43.8'
	},
	{
		type: 'text',
		name: 'rooms',
		label: 'Количество комнат',
		placeholder: '2'
	},
	{
		type: 'text',
		name: 'kitchenSquare',
		label: 'Площадь кухни',
		placeholder: '14.3'
	},
	{
		type: 'tags',
		name: 'roomsSquare',
		label: 'Площадь комнат',
		placeholder: '13.7, 20.2'
	},
	{
		type: 'text',
		name: 'floor',
		label: 'Этаж',
		placeholder: '10'
	},
	{
		type: 'text',
		name: 'totalFloors',
		label: 'Этажей в доме',
		placeholder: '24'
	},
	{
		type: 'switch',
		name: 'isSecondary',
		label: 'Тип рынка',
		placeholder: 'Новостройка, вторичка'
	},
	{
		type: 'text',
		name: 'builtYear',
		label: 'Год постройки',
		placeholder: '2024'
	},
	{
		type: 'text',
		name: 'ceilingHeight',
		label: 'Высота потолков',
		placeholder: '2.5'
	},
	{
		type: 'radio',
		name: 'buildingType',
		label: 'Материал стен',
		options: BUILDING_TYPE_OPTIONS
	},
	{
		type: 'radio',
		name: 'propertyType',
		label: 'Тип недвижимости',
		options: PROPERTY_TYPE_OPTIONS
	},
	{
		type: 'radio',
		name: 'sellingType',
		label: 'Тип продажи',
		options: SELLING_TYPE_OPTIONS
	},
	{
		type: 'text',
		name: 'address',
		label: 'Адрес',
		placeholder: 'г. Москва, улица Пушкина, дом Колотушкина'
	},
	{
		type: 'text',
		name: 'city',
		label: 'Город',
		placeholder: 'Москва'
	},
	{
		type: 'text',
		name: 'district',
		label: 'Район',
		placeholder: 'Яуза парк'
	}
]
