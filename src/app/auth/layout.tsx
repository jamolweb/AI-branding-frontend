'use client'

import { authService } from '@/services/auth.service'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		if (authService.isAuthenticated()) {
			redirect('/dashboard')
		}
	}, [])

	return (
		<div className='min-h-screen flex flex-col justify-center bg-gray-900 py-12 sm:px-6 lg:px-8'>
			{children}
		</div>
	)
}
