'use client'

import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { Button } from '../ui'

import { useUpload } from '@/hooks/queries/files'

interface ImageUploadProps {
	disabled: boolean | undefined
	onChange: (value: string[]) => void
	value: string[]
}

export function ImageUpload({ disabled, onChange, value }: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange, value)

	return (
		<div className='space-y-2'>
			<Button
				type='button'
				disabled={disabled || isUploading}
				variant='secondary'
				onClick={handleButtonClick}
			>
				<ImagePlus />
				Загрузить изображения
			</Button>
			<input
				type='file'
				multiple
				className='hidden'
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={disabled}
			/>
			<div className='flex flex-wrap gap-4'>
				{value.map(url => (
					<div
						key={url}
						className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
					>
						<Image
							src={`${process.env.S3_PUBLIC_URL}/${url}`}
							alt='Превью'
							fill
						/>
					</div>
				))}
			</div>
		</div>
	)
}
