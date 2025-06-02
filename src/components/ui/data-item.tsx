import { cn } from '@/utils'

interface DataItemProps {
	label: string
	value: string | number | Date | undefined
	row?: boolean
	description?: boolean
	className?: string
}

export function DataItem({
	label,
	value,
	row = true,
	description = false,
	className = ''
}: DataItemProps) {
	return (
		<div
			className={cn(
				'lg:hover:bg-secondary/50 flex flex-wrap gap-y-1 lg:rounded-lg lg:px-2 lg:py-1 lg:transition-colors',
				row ? 'items-center justify-between' : 'flex-col',
				className
			)}
		>
			<span className='text-muted-foreground text-sm font-normal'>
				{label}
			</span>
			<span
				className={cn(
					description ? 'line-clamp-3' : '',
					'font-bold max-lg:text-sm'
				)}
			>
				{value || value === null ? String(value) : '-'}
			</span>
		</div>
	)
}
