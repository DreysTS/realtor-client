'use client'

import {
	QueryClient,
	QueryClientProvider,
	isServer
} from '@tanstack/react-query'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 1000 * 60 * 5
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

export function TanstackQueryProvider({
	children
}: {
	children: React.ReactNode
}) {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
