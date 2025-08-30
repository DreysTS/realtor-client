import {
	Building,
	File,
	FilePen,
	Heart,
	LucideIcon,
	Settings,
	Star,
	Users
} from 'lucide-react'

export interface Link {
	icon: LucideIcon
	label: string
	href: string
}

export interface Section {
	title: string
	links: Link[]
}

export const DASHBOARD_LINKS_CONFIG = {
	profile: {
		title: 'Профиль',
		links: [
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
	},
	realtor: {
		title: 'Риэлтор',
		links: [
			{
				icon: Building,
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
	}
} as const

export type DashboardLinksConfig = typeof DASHBOARD_LINKS_CONFIG
export type DashboardSectionKey = keyof DashboardLinksConfig
export type DashboardLink =
	DashboardLinksConfig[DashboardSectionKey]['links'][number]
