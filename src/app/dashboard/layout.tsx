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
				// Check for OAuth callback tokens in URL
				const accessToken = searchParams.get('accessToken')
				const refreshToken = searchParams.get('refreshToken')

				if (accessToken && refreshToken) {
					// Store tokens from OAuth callback
					authService.setTokens({
						accessToken,
						refreshToken,
					})

					// Clean up URL by removing tokens
					window.history.replaceState({}, document.title, '/dashboard')
					setIsLoading(false)
					return
				}

				// If no URL tokens, check for stored refresh token
				const storedRefreshToken = authService.getRefreshToken()
				if (!storedRefreshToken) {
					redirect('/auth/signin')
					return
				}

				// Try to refresh tokens using stored refresh token
				try {
					await authService.refreshToken()
					setIsLoading(false)
				} catch (error: any) {
					// Check if error is due to invalid token
					if (error?.response?.status === 401) {
						console.error('Invalid refresh token:', error)
						redirect('/auth/signin')
						return
					}

					// For other errors, just log and continue with current tokens
					console.warn(
						'Token refresh failed, continuing with current tokens:',
						error
					)
					if (authService.isAuthenticated()) {
						setIsLoading(false)
					} else {
						redirect('/auth/signin')
					}
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
			<div className='min-h-screen flex items-center justify-center bg-gray-900'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
			</div>
		)
	}

	return <div className='min-h-screen bg-gray-900'>{children}</div>
}
