import React from 'react'

import { Container, Section } from '@/components'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui'
import { SectionTitling } from '@/components/widgets'

export function FrequentlyAskedQuestions() {
	const items = [
		{
			question: 'Берёте ли вы комиссию с покупателей или продавцов?',
			answer: 'Комиссия взимается только при успешной сделке и обсуждается индивидуально.',
			value: '1'
		},
		{
			question: 'Работаете ли вы с новостройками?',
			answer: 'Да, сотрудничаю с застройщиками. Для покупателей услуги бесплатны — комиссию оплачивает застройщик.',
			value: '2'
		},
		{
			question: 'Работаете ли вы со вторичной недвижимостью?',
			answer: 'Да, сопровождаю сделки от оценки и подготовки до передачи ключей.',
			value: '3'
		},
		{
			question: 'Помогаете ли вы с ипотекой?',
			answer: 'Да, консультирую и сопровождаю процесс одобрения ипотеки.',
			value: '4'
		},
		{
			question: 'Проверяете ли вы чистоту квартиры перед сделкой?',
			answer: 'Да, юридическая проверка объекта входит в стандартное сопровождение.',
			value: '5'
		},
		{
			question: 'Кто готовит и проверяет договор купли-продажи?',
			answer: 'Все документы подготавливаются и проверяются мной и юридическим отделом.',
			value: '6'
		},
		{
			question:
				'Нужно ли приезжать в офис или можно работать дистанционно?',
			answer: 'Большинство этапов можно пройти онлайн, но при желании возможны личные встречи.',
			value: '7'
		},
		{
			question: 'Как быстро вы выходите на связь после обращения?',
			answer: 'Стараюсь отвечать сразу или как только освобождаюсь.',
			value: '8'
		},
		{
			question: 'Какие гарантии вы даёте клиенту?',
			answer: 'Гарантирую полное сопровождение и юридическую чистоту сделки.',
			value: '9'
		}
	]

	return (
		<Section>
			<Container className='overflow-hidden'>
				<SectionTitling
					title='Вопросы и ответы'
					className='text-center'
				/>

				<div className='mx-auto max-w-2xl'>
					<Accordion
						type='single'
						collapsible
						className='bg-muted dark:bg-muted/50 w-full rounded-2xl p-1'
					>
						{items.map(item => (
							<div className='group' key={item.value}>
								<AccordionItem
									value={item.value}
									className='data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm'
								>
									<AccordionTrigger className='cursor-pointer text-base hover:no-underline'>
										{item.question}
									</AccordionTrigger>
									<AccordionContent>
										<p className='text-muted-foreground text-base'>
											{item.answer}
										</p>
									</AccordionContent>
								</AccordionItem>
								<hr className='mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0' />
							</div>
						))}
					</Accordion>
				</div>
			</Container>
		</Section>
	)
}
