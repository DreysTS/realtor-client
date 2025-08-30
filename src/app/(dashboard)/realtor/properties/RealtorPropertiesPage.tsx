'use client'

import React from 'react'

import RealtorPropertyCard from './RealtorPropertyCard'
import { EmptyRealtorProperties } from '@/components/empty-state'
import { PropertyForm } from '@/components/form'
import { DialogFormWrapper } from '@/components/form/DialogFormWrapper'
import { Loading } from '@/components/ui'
import { SidebarTitle } from '@/components/widgets'
import { useRealtorProperties } from '@/hooks/queries/properties'

export default function RealtorPropertiesPage() {
	const { properties, isPropertiesLoading } = useRealtorProperties()

	if (isPropertiesLoading) return <Loading />

	return (
		<div className='flex h-full flex-col space-y-4'>
			<SidebarTitle>Список всех объектов</SidebarTitle>
			<div>
				<DialogFormWrapper action='Создать заявку'>
					<div className='my-3 me-1 h-full overflow-y-auto ps-6 pe-5 text-sm'>
						<PropertyForm />
					</div>
				</DialogFormWrapper>
			</div>
			{properties?.length === 0 ? (
				<div className='flex grow items-center justify-center'>
					<EmptyRealtorProperties />
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
