import { type NextRequest, NextResponse } from 'next/server'

import { UserRole } from './lib/types'
import { userService } from './services'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const session = request.cookies.get('session')?.value

	const dashboard =
		pathname.startsWith('/realtor') || pathname.startsWith('/profile')

	// Если нет сессии и пользователь заходит на dashboard,
	// то редиректим на авторизацию

	// !! Если что, это я сам себе ставлю комменты, чтобы не забыть потом

	if (!session && dashboard) {
		return NextResponse.redirect(new URL('/auth/register', request.url))
	}

	let user = null

	if (session) {
		user = await userService.findServerProfile(session)
	}

	// Если роль пользователя не Риэлтор и он заходит в админку,
	// то его редиректит на странцу составления заявки

	if (user?.role !== UserRole.Realtor && pathname.startsWith('/realtor')) {
		return NextResponse.redirect(new URL('/profile/requests', request.url))
	}

	// В остальных случаях пропускает

	return NextResponse.next()
}

export const config = {
	matcher: ['/realtor/:path*', '/profile/:path*']
}
