import React from 'react'
import { FieldValues } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Textarea
} from '../../ui'

import { FieldProps } from '@/lib/types'

export function TextareaField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	disabled
}: FieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							placeholder={placeholder}
							{...field}
							disabled={disabled}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
