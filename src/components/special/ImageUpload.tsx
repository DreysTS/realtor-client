'use client'

import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { Button } from '../ui'

import { useUpload } from '@/hooks/queries/files'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange)

	return (
		<div className='space-y-2'>
			<Button
				type='button'
				disabled={isDisabled || isUploading}
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
				disabled={isDisabled}
			/>
			<div className='flex flex-wrap gap-4'>
				{value.map(url => (
					<div
						key={url}
						className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
					>
						<Image
							src={`${process.env.SERVER_URL}/static/${url}`}
							alt='Превью'
							fill
						/>
					</div>
				))}
			</div>
		</div>
	)
}
