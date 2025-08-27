'use client'

import React from 'react'

import PropertyPurchasesCard from './PropertyPurchasesCard'
import { EmptyRealtorPropertyPurchase } from '@/components/empty-state'
import { Loading } from '@/components/ui'
import { SidebarTitle } from '@/components/widgets'
import { useFindUsersPurchases } from '@/hooks/queries/purchases'

export default function PropertyPurchasePage() {
	const { usersPurchases, isUsersPurchasesLoading } = useFindUsersPurchases()

	if (isUsersPurchasesLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Заявки на покупку</SidebarTitle>
			{usersPurchases?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyRealtorPropertyPurchase />
				</div>
			) : (
				<div className='flex flex-col gap-4'>
					{usersPurchases?.map(purchase => (
						<PropertyPurchasesCard
							key={purchase.id}
							purchase={purchase}
						/>
					))}
				</div>
			)}
		</div>
	)
}
