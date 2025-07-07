import type { Metadata } from 'next'
import { Comfortaa, Montserrat_Alternates } from 'next/font/google'

import '../styles/globals.css'

import Navbar from '@/components/Navbar'
import { MainProvider } from '@/components/providers'

const comfortaa = Comfortaa({
	variable: '--font-comfortaa',
	subsets: ['cyrillic', 'latin']
})

const montserratAlternates = Montserrat_Alternates({
	variable: '--font-montserrat-alternates',
	weight: ['500', '600', '700', '800', '900'],
	subsets: ['cyrillic']
})

export const metadata: Metadata = {
	title: {
		template: '%s | MoskvRealty',
		default: 'MoskvRealty'
	},
	description:
		'Меня зовут Олена, я профессиональный риэлтор с 6 годами опыта на рынке недвижимости Москвы и Московской области. Помогаю клиентам безопасно и выгодно покупать квартиры, дома и коммерческую недвижимость. Работаю только с проверенными объектами, сопровождаю сделку от поиска до регистрации — чтобы вы получили идеальный вариант без переплат и рисков.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`selection:bg-primary/50 relative antialiased ${comfortaa.variable} ${montserratAlternates.variable}`}
			>
				<MainProvider>
					<Navbar />

					{children}
				</MainProvider>
			</body>
		</html>
	)
}
