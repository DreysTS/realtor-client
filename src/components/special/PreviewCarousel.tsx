'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	Dialog,
	DialogContent,
	DialogTitle
} from '@/components/ui'
import { S3_PUBLIC_URL } from '@/lib/constants/environments'
import { cn } from '@/lib/utils'

export function PreviewCarousel({
	images,
	className
}: {
	images: string[]
	className?: string
}) {
	const [carouselDialogOpen, setCarouselDialogOpen] = useState(false)

	return (
		<>
			<Carousel
				className={cn('h-full w-full cursor-pointer', className)}
				onClick={e => {
					e.preventDefault()
					setCarouselDialogOpen(true)
				}}
			>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index}>
							<div className='relative aspect-video overflow-hidden rounded-lg'>
								<Image
									src={`${S3_PUBLIC_URL}/${image}`}
									alt={`Preview image ${index}`}
									fill
									priority={true}
									className='object-cover'
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<Dialog
				open={carouselDialogOpen}
				onOpenChange={setCarouselDialogOpen}
			>
				<DialogContent className='sm:max-w-5xl'>
					<DialogTitle>Галерея</DialogTitle>
					<Carousel
						className='h-full w-full'
						onClick={e => {
							e.preventDefault()
							setCarouselDialogOpen(true)
						}}
					>
						<CarouselContent>
							{images.map((image, index) => (
								<CarouselItem key={index}>
									<div className='relative aspect-video overflow-hidden rounded-lg'>
										<Image
											src={`${S3_PUBLIC_URL}/${image}`}
											alt={`Preview image ${index}`}
											fill
											className='object-cover'
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</DialogContent>
			</Dialog>
		</>
	)
}
