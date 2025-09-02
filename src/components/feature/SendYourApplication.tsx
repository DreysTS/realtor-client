import { FilePlus } from 'lucide-react'
import Link from 'next/link'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	buttonVariants
} from '../ui'

import { useProfile } from '@/hooks/queries/auth'
import { cn } from '@/lib/utils'

export function SendYourApplication() {
	const { user } = useProfile()

	if (user)
		return (
			<Link className={cn(buttonVariants())} href='/profile/requests'>
				Оставить заявку
			</Link>
		)

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					effect='expandIcon'
					icon={FilePlus}
					iconPlacement='right'
				>
					Оставить заявку
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Необходима регистрация</AlertDialogTitle>
					<AlertDialogDescription>
						Чтобы оставить заявку на продажу или приобретение
						недвижимости, необходимо зарегистрироваться
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button variant='outline'>Закрыть</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Link
							className={cn(buttonVariants())}
							href='/auth/register'
						>
							Регистрация
						</Link>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
