import { Metadata } from 'next'
import React from 'react'

import PropertyPage from './PropertyPage'
import { propertyService } from '@/services'

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params

	const property = await propertyService.findById(id)

	return {
		title: property.title,
		description: property.description.substring(0, 160),
		alternates: {
			canonical: `${process.env.CLIENT_URL}/properties/${id}`
		},
		openGraph: {
			title: property.title,
			description: property.description.substring(0, 160),
			url: `${process.env.CLIENT_URL}/properties/${id}`,
			siteName: 'MoskvRealty',
			images: [
				{
					url: `${process.env.SERVER_URL}/static/${property.images[0]}`,
					width: 1200,
					height: 630,
					alt: property.title
				}
			],
			locale: 'ru_RU',
			type: 'website'
		},
		robots: {
			index: true,
			follow: true,
			nocache: false,
			googleBot: {
				index: true,
				follow: true,
				noimageindex: false,
				'max-image-preview': 'large',
				'max-video-preview': -1,
				'max-snippet': -1
			}
		},
		twitter: {
			card: 'summary_large_image',
			title: property.title,
			description: property.description.substring(0, 160),
			images: [`${process.env.SERVER_URL}/static/${property.images[0]}`]
		}
	}
}

export default function Page() {
	return <PropertyPage />
}
