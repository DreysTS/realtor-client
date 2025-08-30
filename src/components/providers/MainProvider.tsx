'use client'

import {
	AuthProvider,
	TanstackQueryProvider,
	ThemeProvider,
	ToastProvider
} from '.'
import { type PropsWithChildren } from 'react'

import { IUser } from '@/lib/types'

type MainProviderProps = PropsWithChildren<{
	user: IUser | null
}>

export function MainProvider({ children, user }: MainProviderProps) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='dark'
				disableTransitionOnChange
				storageKey='site-theme'
			>
				<AuthProvider user={user}>
					<ToastProvider />
					{children}
				</AuthProvider>
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
