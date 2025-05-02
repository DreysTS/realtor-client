'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, Paperclip } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
	Button,
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui'

const formSchema = z.object({
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	price: z.string().min(1).optional(),
	square: z.string().min(1).optional(),
	rooms: z.string().min(1).optional(),
	kitchenSquare: z.string().min(1).optional(),
	roomsSquare: z.string().min(1).optional(),
	floor: z.string().min(1).optional(),
	totalFloors: z.string().min(1).optional(),
	isSecondary: z.boolean().optional(),
	builtYear: z.string().min(1).optional(),
	ceilingHeight: z.string().min(1).optional(),
	buildingType: z.string().optional(),
	propertyType: z.string().optional(),
	sellingStatus: z.string().optional(),
	address: z.string().min(1).optional(),
	city: z.string().min(1).optional(),
	district: z.string().min(1).optional()
})

export default function CreatePropertyForm() {
	const [files, setFiles] = useState<File[] | null>(null)

	const dropZoneConfig = {
		maxFiles: 5,
		maxSize: 1024 * 1024 * 10,
		multiple: true
	}
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			console.log(values)
			toast(
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>
						{JSON.stringify(values, null, 2)}
					</code>
				</pre>
			)
		} catch (error) {
			console.error('Form submission error', error)
			toast.error('Failed to submit the form. Please try again.')
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto max-w-3xl space-y-8 py-10'
			>
				{/* Тут продолжение */}

				<FormItem>
					<FormLabel>Выберите изображения</FormLabel>
					<FormControl>
						<FileUploader
							value={files}
							onValueChange={setFiles}
							dropzoneOptions={dropZoneConfig}
							className='bg-background relative rounded-lg p-2'
						>
							<FileInput
								id='fileInput'
								className='outline-1 outline-slate-500 outline-dashed'
							>
								<div className='flex w-full flex-col items-center justify-center p-8'>
									<CloudUpload className='h-10 w-10 text-gray-500' />
									<p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
										<span className='font-semibold'>
											Click to upload
										</span>
										&nbsp; or drag and drop
									</p>
									<p className='text-xs text-gray-500 dark:text-gray-400'>
										SVG, PNG, JPG or GIF
									</p>
								</div>
							</FileInput>
							<FileUploaderContent>
								{files?.map((file, i) => (
									<FileUploaderItem key={i} index={i}>
										<Paperclip className='h-4 w-4' />
										<span>{file.name}</span>
									</FileUploaderItem>
								))}
							</FileUploaderContent>
						</FileUploader>
					</FormControl>

					<FormMessage />
				</FormItem>
				{/* Тут продолжение */}
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}
