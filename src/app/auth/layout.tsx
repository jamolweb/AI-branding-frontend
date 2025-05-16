'use client'

import { authService } from '@/services/auth.service'
import { useEffect } from 'react'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		if (window.location.search.includes('auth_success=true')) {
			console.log('Auth layout detected Google callback');
			authService.handleGoogleCallback();
			window.location.href = '/dashboard';
			return;
		}

		const checkAuth = setTimeout(() => {
			authService.setAuthenticated(null);

			const isAuthenticated = authService.isAuthenticated();
			console.log('Auth layout - isAuthenticated:', isAuthenticated);

			if (isAuthenticated) {
				console.log('User is authenticated, redirecting to dashboard');
				window.location.href = '/dashboard';
			}
		}, 500);

		return () => clearTimeout(checkAuth);
	}, [])

	return (
		<div className='min-h-screen flex flex-col justify-center bg-gray-900 '>
			{children}
		</div>
	)
}
