import { Building, Heart, LayoutDashboard, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
	Badge,
	Button,
	Card,
	CardHeader,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui'
import { useFavorite } from '@/hooks/queries/favorites'
import { IProperty } from '@/lib/types'
import { cn } from '@/lib/utils'

export function PropertyCard({ property }: { property: IProperty }) {
	const {
		handleFavorite,
		isAddingToFavorite,
		isFavorited,
		isRemovingFromFavorite
	} = useFavorite(property?.id as string)

	return (
		<Link href={`/properties/${property.id}`}>
			<Card className='group from-secondary/5 to-card overflow-hidden bg-gradient-to-t pt-0 backdrop-blur-2xl transition-all hover:shadow-xl'>
				<div className='relative aspect-video overflow-hidden'>
					<Image
						src={`${process.env.SERVER_URL}/static/${property.images[0]}`}
						alt='Preview'
						fill
						className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>

					<Button
						variant='outline'
						size='icon'
						className='absolute top-3 right-3 rounded-full'
						disabled={isAddingToFavorite || isRemovingFromFavorite}
						onClick={e => {
							handleFavorite(e)
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
						{!property.isSecondary ? (
							<Badge className='cursor-default rounded-full'>
								Новое
							</Badge>
						) : (
							''
						)}
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
