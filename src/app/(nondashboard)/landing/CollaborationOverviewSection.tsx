'use client'

import {
	CheckCircle,
	Clock,
	CreditCard,
	FileCheck,
	Filter,
	Home,
	Layers,
	MessageCircle,
	Search,
	ShieldCheck
} from 'lucide-react'
import React, { useEffect, useRef } from 'react'

import { Container, Section, SectionTitling } from '@/components'

const iconsClassname = 'text-primary'

const cooperationSteps = [
	{
		title: 'Обозначение запроса',
		description:
			'Изначально формируем ваш запрос, который может быть скорректирован в процессе работы.',
		icon: <Search className={iconsClassname} />
	},
	{
		title: 'Помощь в одобрении ипотеки',
		description:
			'Подаём заявки в оптимальные банки, контролируем НБКИ. 90% успешных одобрений.',
		icon: <CheckCircle className={iconsClassname} />
	},
	{
		title: 'Одновременный поиск',
		description: 'Рассматриваем как вторичное жильё, так и новостройки.',
		icon: <Layers className={iconsClassname} />
	},
	{
		title: 'Консультации по новостройкам',
		description:
			'Проводим профессиональные консультации по выбору объектов в новостройках.',
		icon: <Home className={iconsClassname} />
	},
	{
		title: 'Подбор вторичного жилья',
		description:
			'Фильтруем проблемные квартиры и помогаем выбрать только надёжные варианты.',
		icon: <Filter className={iconsClassname} />
	},
	{
		title: 'Переговоры по сделке',
		description:
			'Оптимальное проведение сделки. Предлагаем электронную регистрацию и аккредитив за 4900 руб.',
		icon: <MessageCircle className={iconsClassname} />
	},
	{
		title: 'Юридический аудит',
		description:
			'Проверяем документы объекта и продавца, обеспечивая вашу безопасность.',
		icon: <ShieldCheck className={iconsClassname} />
	},
	{
		title: 'Сопровождение сделки',
		description:
			'Поддерживаем вас до подписания акта приёма-передачи квартиры.',
		icon: <FileCheck className={iconsClassname} />
	},
	{
		title: 'Оплата за результат',
		description:
			'Вы оплачиваете услуги только после завершения всех этапов работы.',
		icon: <CreditCard className={iconsClassname} />
	},
	{
		title: 'Экономия времени',
		description:
			'Оптимизируем все этапы сделки, чтобы сэкономить ваше время.',
		icon: <Clock className={iconsClassname} />
	}
]

export default function CollaborationOverviewSection() {
	const cardsRef = useRef<(HTMLDivElement | null)[]>([])
	const mousePosition = useRef({ x: 0, y: 0 })

	useEffect(() => {
		const updateGradient = (e: PointerEvent) => {
			mousePosition.current = { x: e.clientX, y: e.clientY }
			requestAnimationFrame(() => {
				cardsRef.current.forEach(card => {
					if (!card) return
					const rect = card.getBoundingClientRect()
					const x = mousePosition.current.x - rect.left
					const y = mousePosition.current.y - rect.top
					card.style.setProperty('--x', `${x}px`)
					card.style.setProperty('--y', `${y}px`)
				})
			})
		}

		document.body.addEventListener('pointermove', updateGradient)
		return () =>
			document.body.removeEventListener('pointermove', updateGradient)
	}, [])

	return (
		<Section>
			<Container className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				<SectionTitling
					title='Этапы и преимущества сотрудничества'
					subtitle='Полный цикл сопровождения: от первого запроса до передачи ключей'
					className='!mb-0 sm:col-span-2'
				/>
				{cooperationSteps.map((item, index) => (
					<CooperationCard
						key={index}
						index={index}
						item={item}
						cardsRef={cardsRef}
					/>
				))}
			</Container>
		</Section>
	)
}

interface CooperationCardProps {
	index: number
	item: {
		icon: React.ReactNode
		title: string
		description: string
	}
	cardsRef: React.RefObject<(HTMLDivElement | null)[]>
}

const CooperationCard: React.FC<CooperationCardProps> = ({
	index,
	item,
	cardsRef
}) => {
	return (
		<div
			className='group bg-muted cursor-default rounded-lg p-0.5'
			style={{
				background:
					'radial-gradient(27rem 27rem at var(--x, 50%) var(--y, 50%), var(--primary), transparent, transparent)'
			}}
			ref={el => {
				if (el) cardsRef.current[index] = el
			}}
		>
			<div className='bg-background/90 h-full space-y-2 rounded-md p-4 backdrop-blur-lg'>
				<div>{item.icon}</div>
				<h3 className='text-base font-semibold sm:text-lg'>
					{item.title}
				</h3>
				<p className='text-muted-foreground text-sm leading-snug font-semibold sm:text-base'>
					{item.description}
				</p>
			</div>
		</div>
	)
}
