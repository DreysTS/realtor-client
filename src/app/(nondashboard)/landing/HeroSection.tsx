'use client'

import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import MoscowBackground from '../../../../public/moscow-background.png'

import { Container, Section } from '@/components'
import { SendYourApplication } from '@/components/feature/SendYourApplication'
import { Badge, buttonVariants } from '@/components/ui'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function HeroSection() {
	return (
		<Section
			className='flex items-center max-sm:flex-col lg:h-screen'
			style={{
				paddingTop: `calc(${NAVBAR_HEIGHT}px + 12px)`
			}}
		>
			<Image
				src={MoscowBackground}
				alt='Hero'
				fill={true}
				className='pointer-events-none -z-20 h-screen w-screen [mask-image:_linear-gradient(105deg,_transparent_50%,_var(--background))] object-cover select-none max-sm:hidden'
			/>
			<Image
				src={MoscowBackground}
				alt='Hero mobile'
				priority
				width={615}
				height={345.94}
				className='rounded-xl sm:hidden'
			/>

			<Container className='grid items-center gap-x-16 gap-y-8 lg:grid-cols-2'>
				<div className='relative z-0'>
					<div className='bg-primary/50 absolute top-0 left-0 -z-10 h-[150%] w-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[100%] blur-[128px] max-sm:hidden'>
						<div className='bg-background absolute top-1/2 right-0 z-20 aspect-square w-full translate-x-1/3 -translate-y-1/3 rounded-full'></div>
					</div>
					<Badge
						variant='outline'
						className='bg-background/40 flex w-fit gap-2 py-1.5 backdrop-blur-sm max-sm:hidden'
						size='lg'
						shape='circle'
					>
						<Badge size='sm' shape='circle'>
							<Sparkles size={16} />
						</Badge>
						Недвижимость в Москве и Московской области
					</Badge>
					<h1 className='mb-6 w-fit text-3xl font-bold tracking-tight [text-shadow:_var(--background)_1px_0_10px] sm:my-6 lg:text-5xl 2xl:text-6xl'>
						Ваш доверенный риэлтор в сфере недвижимости
					</h1>

					<ul className='my-6 ml-6 list-disc [text-shadow:_var(--background)_1px_0_10px] sm:w-4/5 xl:w-3/5 [&>li]:mt-2'>
						<li>
							Более 90 проведённых сделок по продаже и покупке
							вторичной недвижимости и новостроек
						</li>
						<li>
							Помогу вам найти идеальный дом или офис, который
							соответствует вашему запросу
						</li>
					</ul>

					<div className='z-10 flex flex-wrap gap-2'>
						<SendYourApplication />
						<Link
							className={cn(
								buttonVariants({
									variant: 'secondary',
									effect: 'shineHover'
								})
							)}
							href='/properties'
						>
							Каталог
						</Link>
					</div>
				</div>
			</Container>
		</Section>
	)
}
