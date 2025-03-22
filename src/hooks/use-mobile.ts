'use client'

import { useEffect, useState } from 'react'

export function useMobile() {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkIfMobile = () => {
			if (typeof window !== 'undefined') {
				setIsMobile(window.innerWidth < 768)
			}
		}

		checkIfMobile()

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', checkIfMobile)
			return () => window.removeEventListener('resize', checkIfMobile)
		}
	}, [])

	return isMobile
}
