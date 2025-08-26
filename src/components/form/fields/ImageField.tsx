import React from 'react'
import { FieldValues } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui'
import { ImageUpload } from '@/components/widgets'
import { FieldProps } from '@/lib/types'

export function ImageField<T extends FieldValues>({
	control,
	name,
	label,
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
						<ImageUpload
							disabled={disabled}
							onChange={field.onChange}
							value={field.value}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
