import { FieldValues } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	RadioGroup,
	RadioGroupItem,
	buttonVariants
} from '@/components/ui'
import { FieldProps } from '@/lib/types'
import { cn } from '@/lib/utils'

export function RadioField<T extends FieldValues>({
	control,
	name,
	label,
	options,
	disabled
}: FieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='space-y-3'>
					<FormLabel>{label}</FormLabel>

					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							className='flex w-full items-stretch'
							defaultValue={field.value}
							disabled={disabled}
						>
							{options?.map((option, index) => (
								<FormItem
									key={index}
									className='flex flex-wrap items-center gap-2'
								>
									<FormControl>
										<RadioGroupItem
											value={option.value}
											className='peer sr-only'
										/>
									</FormControl>
									<FormLabel
										className={cn(
											buttonVariants({
												variant: 'outline'
											}),
											'peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
										)}
									>
										{option.label}
									</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
