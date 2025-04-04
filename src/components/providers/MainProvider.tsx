'use client'

import { TanstackQueryProvider, ThemeProvider, ToastProvider } from '.'
import { type PropsWithChildren } from 'react'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
				storageKey='site-theme'
			>
				<ToastProvider />
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
