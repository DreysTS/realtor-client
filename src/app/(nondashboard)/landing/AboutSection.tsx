import Image from 'next/image'

import About1 from '../../../../public/about-1.jpg'
import About2 from '../../../../public/about-2.jpg'
import About3 from '../../../../public/about-3.jpg'
import About4 from '../../../../public/about-4.jpg'
import About5 from '../../../../public/about-5.jpg'
import About6 from '../../../../public/about-6.jpg'

import { Container, Section, SectionTitling } from '@/components'
import { cn } from '@/utils'

const aboutList = [
	{
		text: 'Я являюсь опытным специалистом компании «Этажи» и обладаю обширными знаниями в области вторичного жилья.'
	},
	{
		text: 'За годы работы я успешно совмещала обязанности риэлтора и специалиста по сопровождению сделок. Это позволило мне глубже понять все аспекты процесса и научиться быстро находить решения даже для самых сложных ситуаций.'
	},
	{
		text: 'Моя главная цель — сделать так, чтобы каждый клиент получил именно то, что ищет, и остался доволен результатом.'
	},
	{
		text: 'Я ценю доверие моих клиентов и строю свою работу на принципах профессионализма и честности.'
	},
	{
		text: 'Моё стремление — не просто выполнить свою задачу, но и превзойти ожидания, чтобы вы с удовольствием рекомендовали меня своим друзьям и близким. Ведь рефералы — это главный показатель доверия и успеха.'
	},
	{
		text: 'Если вы хотите, чтобы ваша сделка прошла быстро, безопасно и комфортно, обращайтесь! Я с радостью помогу вам воплотить вашу мечту о новой недвижимости в реальность.'
	}
]

export default function AboutSection() {
	return (
		<Section>
			<Container className='overflow-hidden'>
				<div className='grid gap-6 lg:grid-cols-2'>
					<div className='overflow-x-auto'>
						<SectionTitling title='Обо мне' className='!mb-0' />
						{aboutList.slice(0, 3).map((item, index) => (
							<p className='my-4 pr-6 leading-7' key={index}>
								{item.text}
							</p>
						))}
						<div className='relative flex gap-6 overflow-x-auto max-sm:snap-x sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:place-content-center sm:items-center'>
							{[About5, About1, About3].map((item, index) => (
								<div
									className={cn(
										index === 0
											? 'sm:row-span-2 sm:my-auto'
											: index === 2
												? 'sm:place-self-start'
												: '',
										'bg-primary relative snap-center overflow-hidden rounded-lg max-sm:min-w-[80vw] sm:w-full'
									)}
									key={index}
								>
									<Image
										src={item}
										alt='about alt'
										className='h-full w-full object-cover'
									/>
								</div>
							))}
						</div>
					</div>
					<div className='flex flex-col-reverse overflow-x-auto lg:flex-col'>
						<div className='relative flex gap-6 overflow-x-auto max-sm:snap-x sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:place-content-center sm:items-center'>
							{[About2, About4, About6].map((item, index) => (
								<div
									className={cn(
										index === 0
											? 'sm:row-span-2 sm:my-auto'
											: index === 2
												? 'sm:place-self-start'
												: '',
										'bg-primary relative snap-center overflow-hidden rounded-lg max-sm:min-w-[80vw] sm:w-full'
									)}
									key={index}
								>
									<Image
										src={item}
										alt='about alt'
										className='h-full w-full object-cover'
									/>
								</div>
							))}
						</div>
						{aboutList.slice(3).map((item, index) => (
							<p
								className='my-4 pr-6 leading-7 lg:px-6'
								key={index}
							>
								{item.text}
							</p>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
