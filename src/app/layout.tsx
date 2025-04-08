import type { Metadata } from 'next'
import { Comfortaa, Montserrat_Alternates } from 'next/font/google'

import '../styles/globals.css'

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
	title: 'Риэлтор',
	description: 'Generated by create next app'
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
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
