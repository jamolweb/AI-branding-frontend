'use client'

import { authService } from '@/services/auth.service'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const searchParams = useSearchParams()

	useEffect(() => {
		// Handle OAuth callback tokens if present in URL
		const accessToken = searchParams.get('accessToken')
		const refreshToken = searchParams.get('refreshToken')

		if (accessToken && refreshToken) {
			// Store the tokens
			authService.setTokens({
				accessToken,
				refreshToken,
			})

			// Clean up the URL by removing the tokens
			window.history.replaceState({}, document.title, '/dashboard')
		}

		// Check authentication
		if (!authService.isAuthenticated()) {
			redirect('/auth/signin')
		}
	}, [searchParams])

	return <>{children}</>
}
