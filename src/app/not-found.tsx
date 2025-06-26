import { Compass } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/utils'

export default function NotFound() {
	return (
		<div
			className='grid w-full place-items-center'
			style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
		>
			<div className='flex max-w-[40rem] flex-col items-center gap-4 text-center'>
				<span className='bg-card rounded-lg border p-2 lg:p-3'>
					<Compass className='max-lg:size-5' />
				</span>
				<h1 className='text-xl font-semibold lg:text-3xl'>
					Ресурс не найден
				</h1>
				<p className='text-muted-foreground'>
					Возможно, данного адреса не существует или он был перемещён
					в архив.
				</p>
				<div className='space-x-3'>
					<Link
						className={cn(buttonVariants({ effect: 'ringHover' }))}
						href='/'
					>
						На главную
					</Link>
				</div>
			</div>
		</div>
	)
}
