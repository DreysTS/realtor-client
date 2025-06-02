'use client'

import React from 'react'

import PropertyPurchasesCard from './PropertyPurchasesCard'
import { SidebarTitle } from '@/components/special'
import { Loading } from '@/components/ui'
import { useFindUsersPurchases } from '@/hooks/purchases'

export default function PropertyPurchasePage() {
	const { usersPurchases, isUsersPurchasesLoading } = useFindUsersPurchases()

	if (isUsersPurchasesLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>Заявки на продажу</SidebarTitle>
			<div className='flex flex-col gap-4'>
				{usersPurchases?.map(purchase => (
					<PropertyPurchasesCard
						key={purchase.id}
						purchase={purchase}
					/>
				))}
			</div>
		</div>
	)
}
