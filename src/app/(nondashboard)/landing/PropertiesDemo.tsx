'use client'

import { ArrowRight, Building2, FilePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Container, Section } from '@/components'
import { EmptyList, PropertyCard, SectionTitling } from '@/components/special'
import { Button, buttonVariants } from '@/components/ui'
import { useProperties } from '@/hooks/queries/properties'
import { cn } from '@/lib/utils'

export default function PropertiesDemo() {
	const { properties, isPropertiesLoading } = useProperties()

	return (
		<Section>
			<Container>
				<SectionTitling
					title='Свежие объекты недвижимости'
					subtitle='Последние предложения для вашего удобства'
				/>

				{properties?.length === 0 ? (
					<div className='relative grid place-items-center overflow-hidden rounded-xl border p-6 shadow-lg'>
						<div className='bg-primary absolute top-0 right-0 -z-1 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full blur-[15rem]'></div>
						<div className='bg-primary absolute bottom-0 left-0 -z-1 h-48 w-64 -translate-x-1/2 translate-y-1/2 rounded-full blur-[20rem]'></div>
						<EmptyList
							title='Список объектов пуст'
							description='Вы можете оставить заявку на приобретение недвижимости, либо
				подождать, пока появятся новые объекты'
							icon={Building2}
							buttonPrimary={
								<Button
									effect='expandIcon'
									icon={FilePlus}
									iconPlacement='right'
								>
									Оставить заявку
								</Button>
							}
						/>
					</div>
				) : (
					<>
						<div className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
							{properties
								?.slice(0, 4)
								.map(property => (
									<PropertyCard
										key={property.id}
										property={property}
									/>
								))}
						</div>
						<div className='flex justify-end'>
							<Link
								href='/properties'
								className={cn(
									buttonVariants({ effect: 'ringHover' })
								)}
								scroll={true}
							>
								Просмотреть все{' '}
								<ArrowRight className='size-5' />
							</Link>
						</div>
					</>
				)}
			</Container>
		</Section>
	)
}
