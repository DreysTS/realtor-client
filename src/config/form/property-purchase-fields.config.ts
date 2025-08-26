import { TypeCreatePurchaseSchema } from '@/lib/schemes'
import { FormFieldProps } from '@/lib/types'

export const PROPERTY_PURCHASE_FIELDS: FormFieldProps<TypeCreatePurchaseSchema>[] =
	[
		{
			type: 'textarea',
			name: 'description',
			label: 'Описание',
			placeholder:
				'Укажите предпочтительные районы, бюджет, тип недвижимости, сроки покупки. Опишите требования: этаж, наличие лифта, парковка, ремонт. Что для вас приоритетно: транспортная доступность, инфраструктура, экология?'
		},
		{
			type: 'text',
			name: 'budgetMin',
			label: 'Минимальный бюджет',
			placeholder: '10.000.000'
		},
		{
			type: 'text',
			name: 'budgetMax',
			label: 'Максимальный бюджет',
			placeholder: '12.000.000'
		},
		{
			type: 'text',
			name: 'rooms',
			label: 'Количество комнат',
			placeholder: '3'
		},
		{
			type: 'text',
			name: 'areaMin',
			label: 'Минимальная площадь',
			placeholder: '32'
		},
		{
			type: 'text',
			name: 'areaMax',
			label: 'Максимальная площадь',
			placeholder: '54'
		},
		{
			type: 'text',
			name: 'phoneNumber',
			label: 'Номер телефона',
			placeholder: '+7 987 654 32 10'
		},
		{
			type: 'text',
			name: 'contactMethod',
			label: 'Способ связи',
			placeholder: 'Телеграм, СМС, Whatsapp...'
		}
	]
