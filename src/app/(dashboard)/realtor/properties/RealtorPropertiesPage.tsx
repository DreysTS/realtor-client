'use client'

import { PlusCircle, TextSearch } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import PropertyForm from './PropertyForm'
import RealtorPropertyCard from './RealtorPropertyCard'
import { EmptyList, SidebarTitle } from '@/components/special'
import {
	Button,
	Loading,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	buttonVariants
} from '@/components/ui'
import { useRealtorProperties } from '@/hooks/properties'
import { cn } from '@/utils'

export default function RealtorPropertiesPage() {
	const { properties, isPropertiesLoading } = useRealtorProperties()

	if (isPropertiesLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>Список всех объектов</SidebarTitle>
			<div>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='outline'>
							Добавить <PlusCircle />
						</Button>
					</SheetTrigger>
					<SheetContent className='overflow-y-scroll sm:max-w-fit'>
						<SheetHeader>
							<SheetTitle className='text-2xl'>
								Добавить объект
							</SheetTitle>
						</SheetHeader>
						<div className='px-4'>
							<PropertyForm />
						</div>
					</SheetContent>
				</Sheet>
			</div>
			<div>
				{properties?.length === 0 ? (
					<div className='flex justify-center'>
						<EmptyList
							title='Список объектов пуст'
							description='По кнопке выше вы можете добавить ещё объекты, если они у вас имеются. Или вы можете одобрить новые в заявках.'
							icon={TextSearch}
							buttonPrimary={
								<Link
									href='/realtor/requests'
									className={cn(
										buttonVariants({ effect: 'ringHover' })
									)}
								>
									Заявки
								</Link>
							}
						/>
					</div>
				) : (
					<div className='flex flex-col gap-4 rounded-xl border p-4'>
						{properties?.map(property => (
							<RealtorPropertyCard
								key={property.id}
								property={property}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
