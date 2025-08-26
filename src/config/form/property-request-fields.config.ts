import { TypeCreateRequestSchema } from '@/lib/schemes'
import { FormFieldProps } from '@/lib/types'

export const PROPERTY_REQUEST_FIELDS: FormFieldProps<TypeCreateRequestSchema>[] =
	[
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
				'Опишите уникальные особенности вашей недвижимости. Расскажите, что делает ваш объект особенным. Что важно знать потенциальным покупателям?'
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
			name: 'address',
			label: 'Адрес',
			placeholder: 'г. Москва, улица Пушкина, дом Колотушкина'
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
