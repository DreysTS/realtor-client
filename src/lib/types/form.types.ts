import { Control, FieldValues, Path } from 'react-hook-form'

type FieldType =
	| 'text'
	| 'image'
	| 'textarea'
	| 'phone'
	| 'switch'
	| 'radio'
	| 'tags'

export type OptionType = {
	value: string
	label: string
}

export interface FieldProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label: string
	placeholder?: string
	options?: OptionType[]
	disabled?: boolean
}

export interface FormFieldProps<T extends FieldValues = any> {
	type: FieldType
	name: Path<T>
	label: string
	placeholder?: string
	options?: OptionType[]
}

export interface RenderFormFieldProps<T extends FieldValues> {
	field: FormFieldProps<T>
	control: Control<T>
	disabled?: boolean
}
