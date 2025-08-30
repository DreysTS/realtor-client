import {
	HydrationBoundary,
	QueryClient,
	dehydrate
} from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import PropertiesPage from './PropertiesPage'
import { propertyService } from '@/services'

export const metadata: Metadata = {
	title: 'Каталог недвижимости',
	description:
		'Эксклюзивные предложения по продаже недвижимости от профессионального риэлтора в Москве и Московской области. Объекты недвижимости с проверенной историей. Подбор по вашим критериям!'
}

type Props = {
	searchParams: Promise<{
		[key: string]: string | string[] | undefined
	}>
}

export default async function Page({ searchParams }: Props) {
	const filters = await searchParams

	const queryClient = new QueryClient()

	try {
		await queryClient.prefetchInfiniteQuery({
			queryKey: ['properties', filters],
			queryFn: ({ pageParam }) =>
				propertyService.findAll({
					...filters,
					page: pageParam.toString()
				}),
			initialPageParam: 1,
			retry: false
		})
	} catch (error) {
		notFound()
	}

	return (
		<Suspense>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PropertiesPage />
			</HydrationBoundary>
		</Suspense>
	)
}
