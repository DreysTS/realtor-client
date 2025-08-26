import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaTelegram, FaViber, FaVk, FaWhatsapp } from 'react-icons/fa'

import { Container } from './Container'
import { FeedbackDialog } from './FeedbackDialog'
import { Section } from './Section'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Logo,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	buttonVariants
} from './ui'
import { cn } from '@/lib/utils'

const socialMedias = [
	{ icon: FaVk, label: 'Вконтакте' },
	{ icon: FaTelegram, label: 'Telegram' },
	{ icon: FaWhatsapp, label: 'WhatsApp' },
	{ icon: FaViber, label: 'Viber' },
	{ icon: Mail, label: 'Почта' }
]

export function Footer() {
	return (
		<>
			<Section>
				<Container>
					<Card className='relative z-0 overflow-hidden bg-transparent'>
						<div className='bg-primary absolute top-0 right-0 size-[calc(4vw+4vh)] translate-x-1/2 -translate-y-1/2 blur-[10rem]'></div>
						<div className='bg-primary absolute bottom-0 left-1/2 size-[calc(4vw+4vh)] -translate-x-1/2 translate-y-1/2 blur-[10rem] max-sm:hidden'></div>
						<CardHeader>
							<CardTitle className='text-xl font-bold'>
								Поделитесь вашим впечатлением.
							</CardTitle>
							<CardDescription>
								Нам очень важно знать, что бы вы хотели увидеть
								или улучшить на этом сайте.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<FeedbackDialog />
						</CardContent>
					</Card>
				</Container>
			</Section>
			<Section>
				<Container className='space-y-4 sm:space-y-8'>
					<div className='flex flex-wrap justify-between gap-3'>
						<Link className='flex items-center gap-3' href='/'>
							<Logo />
							<h2 className='text-2xl font-bold'>MoskvRealty</h2>
						</Link>
						<div className='flex flex-col gap-3'>
							<div className='flex gap-2'>
								<TooltipProvider>
									{socialMedias.map(item => (
										<Tooltip key={item.label}>
											<TooltipTrigger>
												<div
													className={cn(
														buttonVariants({
															variant: 'outline',
															size: 'icon'
														})
													)}
												>
													<item.icon className='' />
												</div>
											</TooltipTrigger>
											<TooltipContent>
												{item.label}
											</TooltipContent>
										</Tooltip>
									))}
								</TooltipProvider>
							</div>
						</div>
					</div>
					<Separator />
					<div className='flex justify-center'>
						&copy; MoskvRealty{' '}
						{new Date().toLocaleDateString('ru', {
							year: 'numeric'
						})}
					</div>
				</Container>
			</Section>
		</>
	)
}
