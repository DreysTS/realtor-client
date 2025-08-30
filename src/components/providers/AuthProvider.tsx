'use client'

import React, { PropsWithChildren, createContext, useContext } from 'react'

import { IUser } from '@/lib/types'

export type AuthContextType = {
	user: IUser | null
	isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = PropsWithChildren<{ user: IUser | null }>

export function AuthProvider({ children, user }: AuthProviderProps) {
	return (
		<AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const ctx = useContext(AuthContext)

	if (!ctx) throw new Error('useAuth muset be used with AuthProvider')

	return ctx
}
