import {
	File,
	FilePen,
	Heart,
	LucideIcon,
	Settings,
	Star,
	Users
} from 'lucide-react'

interface IReturnProps {
	icon: LucideIcon
	label: string
	href: string
}

export function navLinksGenerator(role: string): IReturnProps[] {
	return role === 'REGULAR'
		? [
				{
					icon: Heart,
					label: 'Избранное',
					href: '/profile/favorites'
				},
				{
					icon: File,
					label: 'Мои заявки',
					href: '/profile/requests'
				},
				{
					icon: Settings,
					label: 'Настройки',
					href: '/profile/settings'
				}
			]
		: role === 'REALTOR'
			? [
					{
						icon: Heart,
						label: 'Недвижимость',
						href: '/realtor/properties'
					},
					{
						icon: File,
						label: 'Заявки на продажу',
						href: '/realtor/requests'
					},
					{
						icon: FilePen,
						label: 'Заявки на покупку',
						href: '/realtor/purchases'
					},
					{
						icon: Star,
						label: 'Идеи',
						href: '/realtor/feedback'
					},
					{
						icon: Users,
						label: 'Пользователи',
						href: '/realtor/users'
					}
				]
			: []
}
