'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	Textarea
} from './ui'
import { useCreateFeedback } from '@/hooks/queries/feedback'
import {
	FeedbackScheme,
	TypeFeedbackScheme
} from '@/lib/schemes/feedback.scheme'

export function FeedbackDialog() {
	const form = useForm<TypeFeedbackScheme>({
		resolver: zodResolver(FeedbackScheme),
		values: {
			content: ''
		}
	})

	const { createFeedback, isFeedbackCreating } = useCreateFeedback()

	async function onSubmit(values: TypeFeedbackScheme) {
		createFeedback(values)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button effect='ringHover'>Оставить отзыв</Button>
			</DialogTrigger>
			<DialogContent className='overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Оставьте ваш отзыв</DialogTitle>
					<DialogDescription>
						Также желательно оставьте ваши пожелания по поводу
						улучшения качества сайта
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											className='resize-none'
											{...field}
											disabled={isFeedbackCreating}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<DialogFooter className='pt-4'>
							<DialogClose asChild>
								<Button variant='ghost'>Отмена</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button
									type='submit'
									disabled={isFeedbackCreating}
								>
									Отправить
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
