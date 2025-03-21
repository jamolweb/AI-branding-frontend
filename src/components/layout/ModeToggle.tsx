'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ModeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<Button
			variant='ghost'
			size='sm'
			className='size-8 px-0'
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			aria-label='Toggle Theme'
		>
			{resolvedTheme === 'dark' ? (
				<Sun className='size-5 text-yellow-400' />
			) : (
				<Moon className='size-5 text-gray-800' />
			)}
		</Button>
	)
}
