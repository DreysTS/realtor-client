import React from 'react'
import { FieldValues } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Switch,
	SwitchIndicator,
	SwitchWrapper
} from '@/components/ui'
import { FieldProps } from '@/lib/types'

export function SwitchField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	disabled
}: FieldProps<T>) {
	const placeholders = placeholder?.split(',') as string[]

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<SwitchWrapper
							permanent={true}
							className='inline-grid w-full'
						>
							<Switch
								size='xl'
								className='h-9 w-full rounded-md'
								thumbClassName='rounded-md'
								checked={field.value}
								onCheckedChange={field.onChange}
								disabled={disabled}
							/>
							<SwitchIndicator
								state='on'
								className='text-accent-foreground peer-data-[state=unchecked]:text-primary w-1/2'
							>
								{placeholders[0]}
							</SwitchIndicator>
							<SwitchIndicator
								state='off'
								className='text-accent-foreground peer-data-[state=checked]:text-primary w-1/2'
							>
								{placeholders[1]}
							</SwitchIndicator>
						</SwitchWrapper>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
