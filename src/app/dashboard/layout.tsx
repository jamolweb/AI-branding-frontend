'use client'

import { authService } from '@/services/auth.service'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const searchParams = useSearchParams()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				// First check for OAuth callback tokens in URL
				const accessToken = searchParams.get('accessToken')
				const refreshToken = searchParams.get('refreshToken')

				if (accessToken && refreshToken) {
					// Store the tokens from OAuth callback
					authService.setTokens({
						accessToken,
						refreshToken,
					})
					// Clean up the URL
					window.history.replaceState({}, document.title, '/dashboard')
					setIsLoading(false)
					return // No need to check refresh token as we just got new tokens
				}

				// If no URL tokens, check for stored refresh token
				const storedRefreshToken = authService.getRefreshToken()
				if (!storedRefreshToken) {
					// No refresh token available, redirect to login
					redirect('/auth/signin')
					return
				}

				// Try to refresh the tokens using stored refresh token
				try {
					await authService.refreshToken()
					setIsLoading(false)
				} catch (error) {
					// If refresh fails, redirect to login
					redirect('/auth/signin')
				}
			} catch (error) {
				console.error('Auth initialization error:', error)
				redirect('/auth/signin')
			}
		}

		initializeAuth()
	}, [searchParams])

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
			</div>
		)
	}

	return <>{children}</>
}
