import Image from 'next/image'
import React from 'react'

import AuthImage from '../../../public/auth-background.jpg'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid h-screen w-full lg:grid-cols-2'>
			<div className='relative grid place-items-center max-lg:hidden'>
				<Image
					src={AuthImage}
					alt='AuthImage'
					fill
					className='object-cover saturate-75'
				/>
			</div>
			<div className='relative grid place-items-center overflow-hidden'>
				<div className='from-primary via-primary absolute left-0 -z-10 h-[400px] w-[300px] -translate-x-1/2 rounded-full bg-radial to-transparent blur-[15rem]'></div>
				{children}
			</div>
		</div>
	)
}
