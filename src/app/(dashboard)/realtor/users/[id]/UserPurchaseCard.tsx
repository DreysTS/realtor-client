import Link from 'next/link'
import React from 'react'

import { PreviewCarousel, PreviewDescription } from '@/components'
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	Separator,
	buttonVariants
} from '@/components/ui'
import { propertyPurchaseStatusMap } from '@/lib/constants'
import { IPurchase } from '@/types'
import { cn, translateEnum } from '@/utils'

export default function UserPurchaseCard({
	purchase
}: {
	purchase: IPurchase
}) {
	return (
		<Card className='bg-transparent'>
			<CardHeader className='grow'>
				<div className='space-y-2'>
					<h2 className='text-lg font-semibold sm:text-xl xl:text-2xl'>
						Заявка на покупку
					</h2>
					<Badge>
						{translateEnum(
							purchase.status,
							propertyPurchaseStatusMap
						)}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<PreviewDescription description={purchase.description} />
			</CardContent>
			<Separator />
			<CardFooter>
				<div className='flex w-full flex-wrap gap-2'>
					<Link
						className={cn(buttonVariants({}), 'grow')}
						href={`/realtor/purchases/${purchase.id}`}
					>
						Ссылка на заявку
					</Link>
				</div>
			</CardFooter>
		</Card>
	)
}
