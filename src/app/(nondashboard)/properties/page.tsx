import React, { Suspense } from 'react'

import PropertiesPage from './PropertiesPage'

export default function Page() {
	return (
		<Suspense>
			<PropertiesPage />
		</Suspense>
	)
}
