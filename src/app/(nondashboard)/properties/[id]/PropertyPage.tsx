'use client'

import {
	ArrowDownUp,
	BrickWall,
	Building,
	Calendar,
	Heart,
	House,
	MapPin,
	Share2,
	Sparkles
} from 'lucide-react'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import React from 'react'
import { FaTelegram, FaWhatsapp } from 'react-icons/fa'

import { Container, Footer, Section } from '@/components'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Carousel,
	CarouselContent,
	CarouselItem,
	Loading,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui'
import { useFavorite } from '@/hooks/queries/favorites'
import { usePropertyById } from '@/hooks/queries/properties'
import { buildingTypeMap, propertyTypeMap } from '@/lib/constants'
import { S3_PUBLIC_URL } from '@/lib/constants/environments'
import {
	cn,
	copyToClipboard,
	formatPhoneNumber,
	translateEnum
} from '@/lib/utils'

export default function PropertyPage() {
	const params = useParams<{ id: string }>()

	const { property, isPropertyLoading } = usePropertyById(params.id)
	const {
		handleFavorite,
		isAddingToFavorite,
		isFavorited,
		isRemovingFromFavorite
	} = useFavorite(property?.id as string)

	if (isPropertyLoading) {
		return (
			<Container>
				<Loading />
			</Container>
		)
	}

	if (!property) {
		notFound()
	}

	const featuresInformation = [
		{
			icon: Building,
			label: 'Этажность и текущий этаж',
			info: property?.floor + '/' + property?.totalFloors,
			isNull: property?.floor === null || property?.totalFloors === null
		},
		{
			icon: BrickWall,
			label: 'Тип материала стен',
			info: translateEnum(
				property?.buildingType as string,
				buildingTypeMap
			),
			isNull: property?.buildingType === null
		},
		{
			icon: House,
			label: 'Тип недвижимости',
			info: translateEnum(
				property?.propertyType as string,
				propertyTypeMap
			),
			isNull: property?.propertyType === null
		},
		{
			icon: Calendar,
			label: 'Год постройки объекта',
			info: property?.builtYear,
			isNull: property?.builtYear === null
		},
		{
			icon: ArrowDownUp,
			label: 'Высота потолков',
			info: property?.ceilingHeight,
			isNull: property?.ceilingHeight === null
		},
		{
			icon: Sparkles,
			label: 'Вторичка или новостройка',
			info: property?.isSecondary ? 'Вторичка' : 'Новостройка',
			isNull: property?.isSecondary === null
		}
	]

	return (
		<>
			<Section>
				<Container className='pt-0'>
					<div className='flex gap-4 mask-b-from-70% dark:mask-b-from-50%'>
						<Carousel className='w-full'>
							<CarouselContent>
								{property?.images.map((url, index) => {
									return (
										<CarouselItem
											key={index}
											className='sm:basis-1/2'
										>
											<div className='relative aspect-video w-full overflow-hidden rounded-2xl'>
												<Image
													src={`${S3_PUBLIC_URL}/${url}`}
													alt={`${property?.title} ${index}`}
													fill
													className='object-cover'
												/>
											</div>
										</CarouselItem>
									)
								})}
							</CarouselContent>
						</Carousel>
					</div>
				</Container>
			</Section>
			<Section className='-mt-16'>
				<Container className='grid gap-6 lg:grid-cols-3'>
					<div className='overflow-x-auto lg:col-span-2'>
						<div className='space-y-6'>
							<div className='flex flex-wrap justify-between gap-2 max-xl:flex-col-reverse xl:items-center'>
								<h1 className='text-xl font-bold sm:text-2xl lg:text-3xl 2xl:text-4xl'>
									{property?.title}
								</h1>
								<div className='flex gap-2 max-xl:ml-auto'>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													size='icon-sm'
													variant='outline'
													onClick={() => {
														copyToClipboard(
															`${process.env.CLIENT_URL}/properties/${property?.id}`
														)
													}}
												>
													<span className='sr-only'>
														Копировать ссылку
													</span>
													<Share2 />
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												Копировать ссылку
											</TooltipContent>
										</Tooltip>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													size='icon-sm'
													variant='outline'
													disabled={
														isAddingToFavorite ||
														isRemovingFromFavorite
													}
													onClick={() =>
														handleFavorite()
													}
												>
													<Heart
														className={cn(
															isFavorited
																? 'text-primary fill-primary'
																: ''
														)}
													/>
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												В избранное
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>

							<p className='flex gap-2'>
								<MapPin className='text-primary size-5' />{' '}
								<span>{property?.location.address}</span>
							</p>

							<div>
								<div className='flex flex-wrap items-center gap-2 rounded-2xl bg-transparent px-0 lg:grid lg:grid-cols-4 lg:border lg:p-6'>
									<BasicInfo
										title='Цена'
										description={
											property?.price.toLocaleString() +
											' ₽'
										}
									/>
									<BasicInfo
										title='Площадь'
										description={property?.square + ' м²'}
									/>
									<BasicInfo
										title='Цена за м²'
										description={
											Math.round(
												(property?.price as number) /
													(property?.square as number)
											).toLocaleString() + ' ₽'
										}
									/>
									<BasicInfo
										title='Кол-во комнат'
										description={property?.rooms}
									/>
								</div>
							</div>
							<div className='flex flex-col gap-2 py-6'>
								<h4 className='text-xl font-bold'>
									Описание недвижимости "{property?.title}"
								</h4>
								<p className='text-muted-foreground'>
									{property?.description}
								</p>
							</div>
							<div>
								<h2 className='text-2xl font-semibold'>
									Особенности недвижимости
								</h2>

								<div className='relative grid gap-4 overflow-x-auto py-4 max-sm:snap-x max-sm:snap-mandatory max-sm:grid-flow-col-dense max-sm:grid-rows-2 sm:grid-cols-2 xl:grid-cols-3'>
									{featuresInformation.map((item, index) => {
										if (item.isNull) return null

										return (
											<div
												className='hover:border-primary group space-y-2 rounded-xl border p-6 transition-all hover:shadow-lg max-sm:min-w-[320px]'
												key={index}
											>
												<item.icon className='text-primary' />
												<h1 className='text-lg font-bold'>
													{item.info}
												</h1>
												<span className='text-muted-foreground'>
													{item.label}
												</span>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>
					<div>
						<Card className='sticky top-20 rounded-lg border bg-transparent'>
							<CardHeader>
								<CardTitle className='text-xl font-semibold'>
									{formatPhoneNumber('+78005553535')}
								</CardTitle>
								<CardDescription>
									Позвоните по номеру телефона или
									воспользуйтесь другой контактной информацией
								</CardDescription>
							</CardHeader>
							<Separator orientation='horizontal' />
							<CardContent className='flex flex-wrap gap-6'>
								<Button
									variant='outline'
									effect='shineHover'
									className='grow'
								>
									Telegram <FaTelegram />
								</Button>
								<Button className='grow' effect='shineHover'>
									WhatsApp <FaWhatsapp />
								</Button>
							</CardContent>
						</Card>
					</div>
				</Container>
			</Section>

			<Footer />
		</>
	)
}

export function BasicInfo({
	title,
	description
}: {
	title: string
	description: string | number | undefined
}) {
	return (
		<div className='grid grow place-items-center max-lg:rounded-lg max-lg:border max-lg:p-3 max-lg:shadow'>
			<div className='flex flex-col gap-1 max-lg:text-center'>
				<span className='text-muted-foreground max-sm:text-sm'>
					{title}
				</span>
				<h4 className='text-xl font-semibold max-sm:text-lg'>
					{description}
				</h4>
			</div>
		</div>
	)
}
