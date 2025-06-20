import React, { Suspense } from 'react'

import NewPasswordPage from './NewPasswordPage'

export default function Page() {
	return (
		<Suspense>
			<NewPasswordPage />
		</Suspense>
	)
}
