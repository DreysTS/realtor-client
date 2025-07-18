import React from 'react'

import { SettingsForm } from './SettingsForm'
import { SidebarTitle } from '@/components/special'

export default function Page() {
	return (
		<div className='space-y-4'>
			<SidebarTitle>Настройки</SidebarTitle>
			<SettingsForm />
		</div>
	)
}
