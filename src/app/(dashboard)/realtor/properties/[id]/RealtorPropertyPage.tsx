'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import RealtorPropertyCard from '../RealtorPropertyCard'

import { SidebarTitle } from '@/components/special'
import { Loading } from '@/components/ui'
import { useRealtorProperty } from '@/hooks/properties'
import { IProperty } from '@/types'

export default function RealtorPropertyPage() {
	const params = useParams<{ id: string }>()

	const { property, isPropertyLoading } = useRealtorProperty(params.id)

	if (isPropertyLoading) return <Loading />

	return (
		<div className='space-y-4'>
			<SidebarTitle>Объект {property?.title}</SidebarTitle>
			<RealtorPropertyCard property={property as IProperty} />
		</div>
	)
}
