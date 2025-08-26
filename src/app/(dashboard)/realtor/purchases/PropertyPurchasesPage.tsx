'use client'

import { FileX2 } from 'lucide-react'
import React from 'react'

import PropertyPurchasesCard from './PropertyPurchasesCard'
import { Loading } from '@/components/ui'
import { EmptyList, IEmptyList, SidebarTitle } from '@/components/widgets'
import { useFindUsersPurchases } from '@/hooks/queries/purchases'

const emptyListProps: IEmptyList = {
	title: 'Список заявок на покупку пуст',
	description:
		'Ещё никто из пользователей не создал заявку на приобретение недвижимости. Нужно подождать определённый период времени.',
	icon: FileX2
}

export default function PropertyPurchasePage() {
	const { usersPurchases, isUsersPurchasesLoading } = useFindUsersPurchases()

	if (isUsersPurchasesLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Заявки на покупку</SidebarTitle>
			{usersPurchases?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyList
						title={emptyListProps.title}
						description={emptyListProps.description}
						icon={emptyListProps.icon}
					/>
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
