'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { AuthWrapper } from '../AuthWrapper'

import { Loading } from '@/components/ui'
import { useVerificationMutation } from '@/hooks/query'

export default function NewVerificationPage() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		verification(token)
	}, [token])

	return (
		<AuthWrapper heading='Подтверждение почты'>
			<div>
				<Loading />
			</div>
		</AuthWrapper>
	)
}
