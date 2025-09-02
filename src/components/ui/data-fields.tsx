import { cn } from '@/lib/utils'

interface DataProps {
	label: string
	value: string | number | Date | undefined
	className?: string
}

export function DataItem({ label, value, className = '' }: DataProps) {
	return (
		<div
			className={cn(
				'lg:hover:bg-secondary/50 flex flex-wrap items-center justify-between gap-y-2 lg:rounded-lg lg:px-2 lg:py-1 lg:transition-colors',
				className
			)}
		>
			<span className='text-muted-foreground text-sm font-normal'>
				{label}
			</span>
			<span className={cn('font-bold max-lg:text-sm')}>
				{String(value) ?? '-'}
			</span>
		</div>
	)
}

export function DataGroup({ items }: { items: DataProps[] }) {
	return (
		<div>
			{items.map((item, index) => (
				<DataItem key={index} label={item.label} value={item.value} />
			))}
		</div>
	)
}
