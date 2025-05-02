import {
	ArrowRight,
	Building,
	LayoutDashboard,
	MapPin,
	Ruler
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
	Badge,
	Card,
	CardHeader,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	buttonVariants
} from '@/components/ui'
import { IProperty } from '@/types'
import { cn } from '@/utils'

export default function PropertyCard({ property }: { property: IProperty }) {
	return (
		<Link href={`/properties/${property.id}`}>
			<Card className='group hover:border-primary overflow-hidden bg-transparent pt-0 backdrop-blur-2xl transition-all hover:shadow-xl'>
				<div className='relative aspect-video overflow-hidden'>
					<Image
						src={`${process.env.SERVER_URL}/static/${property.images[0]}`}
						alt='Preview'
						fill
						className='propertyect-cover w-full transition-transform duration-300 group-hover:scale-105'
					/>
					<div
						className={cn(
							buttonVariants({
								variant: 'outline',
								size: 'icon'
							}),
							'absolute top-3 right-3 rounded-full'
						)}
					>
						<ArrowRight className='size-5' />
					</div>
				</div>
				<CardHeader className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h3 className='text-2xl font-bold'>
							₽ {property.price.toLocaleString()}
						</h3>
						{!property.isSecondary ? (
							<Badge className='cursor-default rounded-full'>
								Новостройка
							</Badge>
						) : (
							''
						)}
					</div>
					<p className='text-xl font-bold'>{property.title}</p>
					<p className='text-muted-foreground line-clamp-1 flex w-full items-center gap-2'>
						<MapPin className='size-5' />
						<span className='truncate'>
							{property.location.address}
						</span>
					</p>
					<div className='bg-border h-px'></div>
					<TooltipProvider>
						<div className='text-muted-foreground flex h-8 items-center justify-evenly [&_.lucide]:size-4'>
							<Tooltip delayDuration={50}>
								<TooltipTrigger>
									<div className='flex items-center justify-center gap-1'>
										<Ruler />
										<span className='text-foreground'>
											{property.square}
										</span>
										м²
									</div>
								</TooltipTrigger>
								<TooltipContent>Площадь м²</TooltipContent>
							</Tooltip>

							<Separator orientation='vertical' />

							<Tooltip delayDuration={50}>
								<TooltipTrigger>
									<div className='flex items-center justify-center gap-1'>
										<Building />
										<span className='text-foreground'>
											{property.floor}/
											{property.totalFloors}
										</span>
										эт.
									</div>
								</TooltipTrigger>
								<TooltipContent>Этаж</TooltipContent>
							</Tooltip>

							<Separator orientation='vertical' />

							<Tooltip delayDuration={50}>
								<TooltipTrigger>
									<div className='flex items-center justify-center gap-1'>
										<LayoutDashboard />
										<span className='text-foreground'>
											{property.rooms}
										</span>
										к.
									</div>
								</TooltipTrigger>
								<TooltipContent>
									Количество комнат
								</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
				</CardHeader>
			</Card>
		</Link>
	)
}
