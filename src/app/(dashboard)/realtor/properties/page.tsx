'use client'

import { PlusCircle } from 'lucide-react'
import React from 'react'

import CreatePropertyForm from './CreatePropertyForm'
import PropertyCard from '@/components/PropertyCard'
import {
	Button,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui'
import { useProperties } from '@/hooks/query'

export default function Page() {
	const { properties, isPropertyLoading } = useProperties()

	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Список всех объектов</h1>
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
							<CreatePropertyForm />
						</div>
					</SheetContent>
				</Sheet>
			</div>
			{isPropertyLoading ?? <div>Loading...</div>}
			{properties?.length === 0 ? (
				<h2 className='font-bold'>Список объектов пуст</h2>
			) : (
				<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
					{properties?.map(property => (
						<PropertyCard key={property.id} property={property} />
					))}
				</div>
			)}
		</div>
	)
}
