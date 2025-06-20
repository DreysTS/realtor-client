import React, { Suspense } from 'react'

import NewVerificationPage from './NewVerificationPage'

export default function Page() {
	return (
		<Suspense>
			<NewVerificationPage />
		</Suspense>
	)
}
