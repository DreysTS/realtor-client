import Link from 'next/link'

import { ActionsMenu } from './ActionsMenu'
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	DataGroup,
	DataItem,
	Separator
} from '@/components/ui'
import { PreviewCarousel, PreviewDescription } from '@/components/widgets'
import { useSetStatus } from '@/hooks/queries/properties'
import { propertyStatuses, statusMap } from '@/lib/constants'
import { IProperty } from '@/lib/types'
import { cn, translateEnum } from '@/lib/utils'
import { getPropertyData } from '@/lib/utils'

export default function RealtorPropertyCard({
	property
}: {
	property: IProperty
}) {
	const { setStatus, isSettingStatus } = useSetStatus()

	const data = getPropertyData(property)

	const archived = property.status === 'ARCHIVED'

	return (
		<>
			<Card
				className={cn(
					'bg-transparent',
					archived ? 'bg-secondary/50' : ''
				)}
			>
				<CardHeader>
					<div className='flex justify-between gap-3 max-lg:flex-col lg:items-center'>
						<div className='flex flex-wrap items-center gap-3'>
							<h2 className='text-2xl font-semibold hover:underline'>
								<Link href={`/properties/${property.id}`}>
									{property.title}
								</Link>
							</h2>

							<Badge>
								{property.isSecondary
									? 'Вторичка'
									: 'Новостройка'}
							</Badge>
						</div>

						<ActionsMenu property={property} disabled={archived} />
					</div>
				</CardHeader>
				<CardContent className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5'>
					<PreviewCarousel images={property.images} />
					<DataGroup items={data.slice(0, 5)} />
					<DataGroup items={data.slice(5, 10)} />
					<div>
						<DataItem
							label={data[10].label}
							value={data[10].value}
							className='gap-1'
						/>
						<PreviewDescription
							description={property.description}
						/>
					</div>
					<DataGroup items={data.slice(11, 13)} />
				</CardContent>
				<Separator />
				<CardFooter className='flex flex-wrap justify-end gap-2'>
					{propertyStatuses.map((status, index) => (
						<Button
							key={index}
							className='max-sm:grow'
							onClick={() =>
								setStatus({ id: property.id, status })
							}
							disabled={
								property.status.toLowerCase() === status ||
								isSettingStatus
							}
							variant={
								property.status.toLowerCase() === status
									? 'default'
									: 'ghost'
							}
							size='sm'
						>
							{translateEnum(status, statusMap)}
						</Button>
					))}
				</CardFooter>
			</Card>
		</>
	)
}
