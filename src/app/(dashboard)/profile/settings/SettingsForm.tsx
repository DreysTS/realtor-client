'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading,
	Switch
} from '@/components/ui'
import { useProfile, useUpdateProfileMutation } from '@/hooks/query'
import { SettingsSchema, TypeSettingsSchema } from '@/lib/schemes'

export function SettingsForm() {
	const { user, isLoading } = useProfile()

	const form = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		values: {
			name: user?.displayName || '',
			email: user?.email || '',
			phoneNumber: user?.phoneNumber || '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const onSubmit = (values: TypeSettingsSchema) => {
		update(values)
	}

	if (!user) return null

	return (
		<Card className='bg-transparent lg:w-1/2'>
			<CardContent>
				{isLoading ? (
					<Loading />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-2 space-y-2'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя</FormLabel>
										<FormControl>
											<Input
												placeholder='Иван'
												disabled={isLoadingUpdate}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Почта</FormLabel>
										<FormControl>
											<Input
												placeholder='ivan@example.com'
												disabled={isLoadingUpdate}
												type='email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phoneNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Номер телефона</FormLabel>
										<FormControl>
											<Input
												placeholder='+70987654321'
												disabled={isLoadingUpdate}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>
												Двухфакторная аутентификация
											</FormLabel>
											<FormDescription>
												Включите двухфакторную
												аутентификацию для вашей учетной
												записи
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type='submit' disabled={isLoadingUpdate}>
								Сохранить
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
