'use client'

import { authService } from '@/services/auth.service'
import { AxiosError } from 'axios'
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
				const accessToken = searchParams.get('accessToken')
				const refreshToken = searchParams.get('refreshToken')

				if (accessToken && refreshToken) {
					authService.setTokens({
						accessToken,
						refreshToken,
					})

					window.history.replaceState({}, document.title, '/dashboard')
					setIsLoading(false)
					return
				}

				const storedRefreshToken = authService.getRefreshToken()
				if (!storedRefreshToken) {
					redirect('/auth/signin')
					return
				}

				try {
					await authService.refreshToken()
					setIsLoading(false)
				} catch (error) {
					if (error instanceof AxiosError && error.response?.status === 401) {
						console.error('Invalid refresh token:', error)
						redirect('/auth/signin')
						return
					}

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

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-900'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
			</div>
		)
	}

	return <div className='min-h-screen bg-gray-900'>{children}</div>
}
