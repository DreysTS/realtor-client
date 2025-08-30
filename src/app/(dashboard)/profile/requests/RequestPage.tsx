'use client'

import React from 'react'

import { PurchaseCard } from './PurchaseCard'
import { RequestCard } from './RequestCard'
import { EmptyUserPurchases, EmptyUserRequests } from '@/components/empty-state'
import { PurchaseForm, RequestForm } from '@/components/form'
import { DialogFormWrapper } from '@/components/form/DialogFormWrapper'
import {
	Loading,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui'
import { SidebarTitle } from '@/components/widgets'
import { useFindPurchases } from '@/hooks/queries/purchases'
import { useRequests } from '@/hooks/queries/requests'

export default function RequestPage() {
	const { requests, isRequestsLoading } = useRequests()
	const { purchases, isPurchasesLoading } = useFindPurchases()

	if (isRequestsLoading || isPurchasesLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Мои заявки</SidebarTitle>
			<Tabs defaultValue='requests' className='grow'>
				<div className='flex flex-wrap justify-between gap-2'>
					<DialogFormWrapper action='Создать заявку' title=''>
						<Tabs
							defaultValue='request'
							className='h-full overflow-hidden pt-4'
						>
							<div className='px-6'>
								<TabsList className='w-full'>
									<TabsTrigger value='request'>
										Продать
									</TabsTrigger>
									<TabsTrigger value='purchase'>
										Купить
									</TabsTrigger>
								</TabsList>
							</div>

							<div className='my-3 me-1 h-full overflow-y-auto ps-6 pe-5 text-sm'>
								<TabsContent value='request' className='h-full'>
									<RequestForm />
								</TabsContent>
								<TabsContent
									value='purchase'
									className='h-full'
								>
									<PurchaseForm />
								</TabsContent>
							</div>
						</Tabs>
					</DialogFormWrapper>
					<TabsList>
						<TabsTrigger className='border-0' value='requests'>
							Продажа
						</TabsTrigger>
						<TabsTrigger className='border-0' value='purchases'>
							Покупка
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent
					value='requests'
					className='rounded-xl sm:border sm:p-3'
				>
					{requests?.length === 0 ? (
						<div className='flex h-full grow items-center justify-center'>
							<EmptyUserRequests />
						</div>
					) : (
						<div className='flex flex-col gap-4'>
							{requests?.map(request => (
								<RequestCard
									key={request.id}
									request={request}
								/>
							))}
						</div>
					)}
				</TabsContent>
				<TabsContent
					value='purchases'
					className='rounded-xl sm:border sm:p-3'
				>
					{purchases?.length === 0 ? (
						<div className='flex h-full grow items-center justify-center'>
							<EmptyUserPurchases />
						</div>
					) : (
						<div className='flex flex-col gap-4'>
							{purchases?.map(purchase => (
								<PurchaseCard
									key={purchase.id}
									purchase={purchase}
								/>
							))}
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	)
}
