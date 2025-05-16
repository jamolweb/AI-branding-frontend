'use client'

import { authService } from '@/services/auth.service'
import { useEffect } from 'react'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		console.log(
			'from layout of auth, isAuthenticated:',
			authService.isAuthenticated()
		)

		if (authService.isAuthenticated()) {
			// redirect('/dashboard')
		}
	}, [])

	return (
		<div className='min-h-screen flex flex-col justify-center bg-gray-900 '>
			{children}
		</div>
	)
}
