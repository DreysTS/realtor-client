'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import PropertyPurchasesCard from '../PropertyPurchasesCard'

import { Loading } from '@/components/ui'
import { SidebarTitle } from '@/components/widgets'
import { useFindPurchase } from '@/hooks/queries/purchases'
import { IPurchase } from '@/lib/types'

export default function Page() {
	const params = useParams<{ id: string }>()

	const { purchase, isPurchaseLoading } = useFindPurchase(params.id)

	if (isPurchaseLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>
				Заявка пользователя {purchase?.user.displayName}
			</SidebarTitle>
			<div className='flex flex-col gap-4'>
				<PropertyPurchasesCard purchase={purchase as IPurchase} />
			</div>
		</div>
	)
}
