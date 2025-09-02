'use client'

import { Building, Heart, LayoutDashboard, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { memo } from 'react'

import {
	Badge,
	BadgeDot,
	Button,
	Card,
	CardHeader,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui'
import { useProfile } from '@/hooks/queries/auth'
import { useFavorite } from '@/hooks/queries/favorites'
import { S3_PUBLIC_URL } from '@/lib/constants/environments'
import { IProperty } from '@/lib/types'
import { cn } from '@/lib/utils'

export const PropertyCard = memo(({ property }: { property: IProperty }) => {
	const router = useRouter()
	const { user, isLoading } = useProfile()
	const {
		handleFavorite,
		isAddingToFavorite,
		isFavorited,
		isRemovingFromFavorite
	} = useFavorite(property?.id as string)

	const footerUnits = [
		{
			icon: Ruler,
			value: property.square,
			unit: 'м²',
			tooltipContent: 'Площадь м²'
		},
		{
			icon: Building,
			value: `${property.floor}/${property.totalFloors}`,
			unit: 'эт.',
			tooltipContent: 'Этаж'
		},
		{
			icon: LayoutDashboard,
			value: property.rooms,
			unit: 'к',
			tooltipContent: 'Количество комнат'
		}
	]

	return (
		<Link href={`/properties/${property.id}`}>
			<Card className='group from-secondary/15 to-card overflow-hidden bg-gradient-to-t pt-0 backdrop-blur-2xl transition-all hover:shadow-xl'>
				<div className='relative aspect-video overflow-hidden'>
					<Image
						src={`${S3_PUBLIC_URL}/${property.images[0]}`}
						alt='Preview backblur'
						width={640}
						height={360}
						className='absolute inset-0 w-full object-cover blur-[10rem] transition-transform duration-300 group-hover:scale-105'
						loading='lazy'
					/>
					<Image
						src={`${S3_PUBLIC_URL}/${property.images[0]}`}
						alt='Preview'
						width={640}
						height={360}
						className='relative h-full object-contain transition-transform duration-300 group-hover:scale-105'
						loading='lazy'
					/>
					{!property.isSecondary && (
						<Badge className='absolute top-3 left-3 cursor-default rounded-full shadow'>
							<BadgeDot />
							Новостройка
						</Badge>
					)}

					<Button
						variant='outline'
						size='icon'
						className='absolute top-3 right-3 rounded-full'
						disabled={
							isAddingToFavorite ||
							isRemovingFromFavorite ||
							isLoading
						}
						onClick={e => {
							e.stopPropagation()
							e.preventDefault()
							if (user) {
								handleFavorite()
							} else {
								router.push('/auth/register')
							}
						}}
					>
						<Heart
							className={cn(
								isFavorited ? 'text-primary fill-primary' : ''
							)}
						/>
					</Button>
				</div>
				<CardHeader className='space-y-1 lg:space-y-2'>
					<div className='flex items-center justify-between'>
						<h3 className='truncate text-xl font-bold lg:text-2xl'>
							₽ {property.price.toLocaleString()}
						</h3>
					</div>
					<p className='line-clamp-1 truncate text-lg font-bold lg:text-xl'>
						{property.title}
					</p>
					<p className='text-muted-foreground line-clamp-1 flex w-full items-center gap-2 max-lg:text-sm'>
						<MapPin className='size-5' />
						<span className='truncate'>
							{property.location.address}
						</span>
					</p>
					<div className='bg-border h-px'></div>
					<div className='text-muted-foreground flex h-8 items-center justify-evenly [&_.lucide]:size-4'>
						{footerUnits.map((footerUnit, index) => {
							return (
								<React.Fragment key={index}>
									<Tooltip delayDuration={50}>
										<TooltipTrigger>
											<div className='flex items-center justify-center gap-1 p-1 max-sm:text-sm'>
												<footerUnit.icon />
												<span className='text-foreground'>
													{footerUnit.value}
												</span>
												{footerUnit.unit}
											</div>
										</TooltipTrigger>
										<TooltipContent>
											{footerUnit.tooltipContent}
										</TooltipContent>
									</Tooltip>
									{footerUnits.length !== index + 1 && (
										<Separator orientation='vertical' />
									)}
								</React.Fragment>
							)
						})}
					</div>
				</CardHeader>
			</Card>
		</Link>
	)
})
