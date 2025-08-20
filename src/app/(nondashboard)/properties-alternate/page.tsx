import { Metadata } from 'next'
import React, { Suspense } from 'react'

import PropertiesPage from './PropertiesPage'

export const metadata: Metadata = {
	title: 'Каталог недвижимости',
	description:
		'Эксклюзивные предложения по продаже недвижимости от профессионального риэлтора в Москве и Московской области. Объекты недвижимости с проверенной историей. Подбор по вашим критериям!'
}

export default function Page() {
	return (
		<Suspense>
			<PropertiesPage />
		</Suspense>
	)
}
