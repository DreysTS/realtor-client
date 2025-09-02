import { Clock, Handshake, HousePlus, ShieldCheck } from 'lucide-react'
import React from 'react'

import { Container, Section } from '@/components'
import { SectionTitling } from '@/components/widgets'

const advantagesIconClass = 'size-8 lg:size-10 text-primary transition-colors'

const advantagesList = [
	{
		title: 'Осуществляйте выгодные сделки по продаже и покупке жилья с профессиональным подходом',
		icon: <Handshake className={advantagesIconClass} />
	},
	{
		title: 'Экономьте время и сохраняйте спокойствие — я беру все заботы на себя',
		icon: <Clock className={advantagesIconClass} />
	},
	{
		title: 'Полная правовая и финансовая защита ваших интересов',
		icon: <ShieldCheck className={advantagesIconClass} />
	},
	{
		title: 'Подбор жилого комплекса абсолютно бесплатно и с учётом ваших пожеланий',
		icon: <HousePlus className={advantagesIconClass} />
	}
]

export function AdvantagesSection() {
	return (
		<Section className='overflow-hidden'>
			<Container className='relative'>
				<div className='bg-border absolute inset-y-0 left-0 h-full w-px'>
					<div className='bg-primary absolute top-32 left-0 h-32 w-px'></div>
				</div>
				<div className='bg-border absolute inset-y-0 right-0 h-full w-px'>
					<div className='bg-primary absolute bottom-24 left-0 h-48 w-px'></div>
				</div>

				<SectionTitling
					title='Преимущества'
					subtitle='Профессиональная помощь на каждом этапе сделки'
					className='px-4'
				/>

				<div className='relative'>
					<div className='bg-border absolute top-0 -z-10 -mx-[calc((100vw-100%)/2)] h-px w-screen'>
						<div className='bg-primary absolute top-0 left-[55%] h-px w-52'></div>
					</div>
					<div className='grid cursor-default divide-x rounded-xl p-px lg:grid-cols-4'>
						{advantagesList.map((advantage, index) => (
							<div
								className='group hover:bg-primary/5 relative px-6 pb-10 transition-colors'
								key={index}
							>
								<div className='bg-border absolute top-0 left-0 -z-10 h-px w-screen lg:hidden'></div>
								<div className='bg-background group-hover:bg-primary group-hover:[&_.lucide]:text-primary-foreground -mt-7 mb-7 w-fit rounded-full p-3 transition-colors group-hover:shadow lg:-mt-10 lg:mb-10 lg:p-5'>
									{advantage.icon}
								</div>
								<p>{advantage.title}</p>
							</div>
						))}
					</div>
					<div className='bg-border absolute bottom-0 -mx-[calc((100vw-100%)/2)] h-px w-screen'>
						<div className='bg-primary absolute top-0 right-[70%] h-px w-52'></div>
					</div>
				</div>
			</Container>
		</Section>
	)
}
