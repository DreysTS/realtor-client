'use client'

import { PlusCircle } from 'lucide-react'
import React from 'react'

import PurchaseCard from './PurchaseCard'
import PurchaseForm from './PurchaseForm'
import RequestCard from './RequestCard'
import RequestForm from './RequestForm'
import { SidebarTitle } from '@/components/special'
import {
	Button,
	Loading,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui'
import { useFindPurchases } from '@/hooks/purchases'
import { useRequests } from '@/hooks/requests'

export default function RequestPage() {
	const { requests, isRequestsLoading } = useRequests()
	const { purchases, isPurchasesLoading } = useFindPurchases()

	if (isRequestsLoading || isPurchasesLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>Мои заявки</SidebarTitle>
			<div className='space-x-4'>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='outline'>
							Продать <PlusCircle />
						</Button>
					</SheetTrigger>
					<SheetContent className='overflow-y-scroll sm:min-w-3xl'>
						<SheetHeader>
							<SheetTitle className='text-2xl'>
								Продать
							</SheetTitle>
						</SheetHeader>
						<div className='px-4'>
							<RequestForm />
						</div>
					</SheetContent>
				</Sheet>
				<Sheet>
					<SheetTrigger asChild>
						<Button>
							Купить <PlusCircle />
						</Button>
					</SheetTrigger>
					<SheetContent className='overflow-y-scroll sm:min-w-3xl'>
						<SheetHeader>
							<SheetTitle className='text-2xl'>Купить</SheetTitle>
						</SheetHeader>
						<div className='px-4'>
							<PurchaseForm />
						</div>
					</SheetContent>
				</Sheet>
			</div>
			<Tabs defaultValue='requests'>
				<TabsList>
					<TabsTrigger className='border-0' value='requests'>Продажа</TabsTrigger>
					<TabsTrigger className='border-0' value='purchases'>Покупка</TabsTrigger>
				</TabsList>
				<TabsContent value='requests'>
					<div className='flex flex-col gap-4'>
						{requests?.map(request => {
							return (
								<RequestCard
									key={request.id}
									request={request}
								/>
							)
						})}
					</div>
				</TabsContent>
				<TabsContent value='purchases'>
					<div className='flex flex-col gap-4'>
						{purchases?.map(purchase => {
							return (
								<PurchaseCard
									key={purchase.id}
									purchase={purchase}
								/>
							)
						})}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
