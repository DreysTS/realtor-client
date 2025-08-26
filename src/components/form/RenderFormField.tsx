import { FieldValues } from 'react-hook-form'

import { RadioField } from './fields/RadioField'
import { SwitchField } from './fields/SwitchField'
import { TagsInputField } from './fields/TagsInputField'
import { ImageField, InputField, TextareaField } from '@/components/form/fields'
import { RenderFormFieldProps } from '@/lib/types'

export function RenderFormField<T extends FieldValues>({
	field,
	control,
	disabled
}: RenderFormFieldProps<T>) {
	switch (field.type) {
		case 'text':
			return (
				<InputField
					control={control}
					name={field.name}
					label={field.label}
					placeholder={field.placeholder}
					disabled={disabled}
				/>
			)
		case 'image':
			return (
				<ImageField
					control={control}
					name={field.name}
					label={field.label}
					disabled={disabled}
				/>
			)
		case 'textarea':
			return (
				<TextareaField
					control={control}
					name={field.name}
					label={field.label}
					placeholder={field.placeholder}
					disabled={disabled}
				/>
			)
		case 'radio':
			return (
				<RadioField
					control={control}
					name={field.name}
					label={field.label}
					options={field.options}
					disabled={disabled}
				/>
			)
		case 'switch':
			return (
				<SwitchField
					control={control}
					name={field.name}
					label={field.label}
					placeholder={field.placeholder}
					disabled={disabled}
				/>
			)
		case 'tags':
			return (
				<TagsInputField
					control={control}
					name={field.name}
					label={field.label}
					placeholder={field.placeholder}
					disabled={disabled}
				/>
			)
	}
}
