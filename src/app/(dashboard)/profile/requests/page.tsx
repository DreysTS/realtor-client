import React from 'react'

export default function Page() {
	return (
		<div className='grid grid-cols-4 gap-8'>
			{Array.from({ length: 12 }).map((_, id) => (
				<div
					key={id}
					className='bg-primary/20 aspect-square w-full rounded-xl border shadow-sm'
				></div>
			))}
		</div>
	)
}
