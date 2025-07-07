import { Compass } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function NotFound() {
	return (
		<div
			className='grid w-full place-items-center'
			style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
		>
			<div className='flex max-w-[40rem] flex-col items-center gap-4 text-center'>
				<h1 className='text-8xl font-bold'>404</h1>
				<p className='text-muted-foreground'>
					Запрашиваемый объект не был найден. Вы можете ознакомиться
					со всеми имеющимися объектами в каталоге
				</p>
				<div className='space-x-3'>
					<Link
						className={cn(buttonVariants({ effect: 'ringHover' }))}
						href='/properties'
					>
						К каталогу
					</Link>
				</div>
			</div>
		</div>
	)
}
