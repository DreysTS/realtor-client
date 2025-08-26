import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '../../ui'

import { FieldProps } from '@/lib/types'

export function InputField<T extends FieldValues>({
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
						<Input
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
