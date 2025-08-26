import React from 'react'
import { FieldValues } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	TagsInput
} from '@/components/ui'
import { FieldProps } from '@/lib/types'

export function TagsInputField<T extends FieldValues>({
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
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							<TagsInput
								className='w-full'
								placeholder={placeholder}
								value={field.value?.map(String)}
								onValueChange={vals => {
									const numbers = vals
										.map(v =>
											parseFloat(v.replace(',', '.'))
										)
										.filter(n => !isNaN(n))
									field.onChange(numbers)
								}}
								disabled={disabled}
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}
