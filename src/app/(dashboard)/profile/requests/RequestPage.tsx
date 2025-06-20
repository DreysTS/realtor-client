'use client'

import { FileX, PlusCircle } from 'lucide-react'
import React from 'react'

import PurchaseCard from './PurchaseCard'
import PurchaseForm from './PurchaseForm'
import RequestCard from './RequestCard'
import RequestForm from './RequestForm'
import { EmptyList, IEmptyList, SidebarTitle } from '@/components/special'
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

const emptyListPropsRequests: IEmptyList = {
	title: 'Заявок на продажу нету',
	description:
		'Вы можете создать заявку на продажу по первой кнопке выше и заполнить небольшую форму. Ваша заявка будет рассмотрена риэлтором.',
	icon: FileX
}

const emptyListPropsPurchases: IEmptyList = {
	title: 'Заявок на покупку нету',
	description:
		'Вы можете создать заявку на покупку по второй кнопке выше и заполнить небольшую форму. Ваша заявка будет рассмотрена риэлтором.',
	icon: FileX
}

export default function RequestPage() {
	const { requests, isRequestsLoading } = useRequests()
	const { purchases, isPurchasesLoading } = useFindPurchases()

	if (isRequestsLoading || isPurchasesLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
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
			<Tabs defaultValue='requests' className='grow'>
				<TabsList>
					<TabsTrigger className='border-0' value='requests'>
						Продажа
					</TabsTrigger>
					<TabsTrigger className='border-0' value='purchases'>
						Покупка
					</TabsTrigger>
				</TabsList>
				<TabsContent value='requests' className='rounded-xl sm:border sm:p-3'>
					{requests?.length === 0 ? (
						<div className='flex h-full grow items-center justify-center'>
							<EmptyList
								title={emptyListPropsRequests.title}
								description={emptyListPropsRequests.description}
								icon={emptyListPropsRequests.icon}
								buttonPrimary={
									emptyListPropsRequests.buttonPrimary
								}
							/>
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
				<TabsContent value='purchases' className='rounded-xl sm:border sm:p-3'>
					{purchases?.length === 0 ? (
						<div className='flex h-full grow items-center justify-center'>
							<EmptyList
								title={emptyListPropsPurchases.title}
								description={
									emptyListPropsPurchases.description
								}
								icon={emptyListPropsPurchases.icon}
								buttonPrimary={
									emptyListPropsPurchases.buttonPrimary
								}
							/>
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
