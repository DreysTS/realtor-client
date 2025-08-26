'use client'

import { useDirection } from '@radix-ui/react-direction'
import {
	Expand,
	Fullscreen,
	Maximize,
	PlusCircle,
	TextSearch
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import PropertyForm from './PropertyForm'
import RealtorPropertyCard from './RealtorPropertyCard'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Loading,
	buttonVariants
} from '@/components/ui'
import { EmptyList, IEmptyList, SidebarTitle } from '@/components/widgets'
import { useRealtorProperties } from '@/hooks/queries/properties'
import { cn } from '@/lib/utils'

const emptyListProps: IEmptyList = {
	title: 'Список объектов пуст',
	description:
		'По кнопке выше вы можете добавить ещё объекты, если они у вас имеются. Или вы можете одобрить новые в заявках.',
	icon: TextSearch,
	buttonPrimary: (
		<Link
			href='/realtor/requests'
			className={cn(buttonVariants({ effect: 'ringHover' }))}
		>
			Заявки
		</Link>
	)
}

export default function RealtorPropertiesPage() {
	const [variant, setVariant] = useState<'fullscreen' | 'default'>('default')

	const handleChangeVariant = () => {
		setVariant(prev => (prev === 'default' ? 'fullscreen' : 'default'))
	}

	const { properties, isPropertiesLoading } = useRealtorProperties()

	const direction = useDirection()

	if (isPropertiesLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Список всех объектов</SidebarTitle>
			<div>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='outline'>
							Создать заявку <PlusCircle />
						</Button>
					</DialogTrigger>
					<DialogContent
						className={cn(
							'p-0',
							variant === 'default'
								? 'sm:max-h-[min(650px,80vh)] sm:max-w-lg'
								: ''
						)}
						variant={variant}
						dir={direction}
					>
						<DialogHeader className='border-border m-0 border-b pt-5 pb-3'>
							<DialogTitle className='px-6 text-base'>
								Добавить недвижимость
							</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<div className='my-3 me-1 h-full overflow-y-auto ps-6 pe-5 text-sm'>
							<PropertyForm />
						</div>
						<DialogFooter className='border-border border-t px-6 py-4'>
							<Button
								className='grow'
								variant='outline'
								onClick={handleChangeVariant}
							>
								{variant === 'default' ? (
									<Expand />
								) : (
									<Maximize />
								)}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			{properties?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyList
						title={emptyListProps.title}
						description={emptyListProps.description}
						icon={emptyListProps.icon}
						buttonPrimary={emptyListProps.buttonPrimary}
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
	)
}
