'use client'

import { homePageNavbar } from '@/data/siteData'
import { useMobile } from '@/hooks/use-mobile'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ModeToggle } from '../ModeToggle'
import BurgerMenu from './BurgerMenu'

const Navbar = () => {
	const isMobile = useMobile()
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	const handleScroll = (
		e: React.MouseEvent<HTMLAnchorElement>,
		sectionId: string
	) => {
		e.preventDefault()
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<motion.nav
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='fixed top-0 left-0 right-0 z-50 px-4 pt-4'
		>
			<div
				className='flex items-center h-[53px] justify-between pr-2 pl-4 rounded-2xl backdrop-blur-[25px] 
                bg-white/[0.06] dark:bg-[rgb(16,16,16)] shadow-lg border border-white/[0.08] max-w-[668px] mx-auto'
				style={{
					backdropFilter: 'blur(25px)',
					WebkitBackdropFilter: 'blur(25px)',
					boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
					background:
						'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
				}}
			>
				<Link
					href='/'
					className={`text-[21px] tracking-tight font-medium transition-colors duration-300
				${
					theme === 'dark'
						? 'text-white hover:text-gray-300'
						: 'text-black hover:text-[rgb(239,252,118)]'
				}`}
					style={{ fontFamily: 'var(--framer-font-family)' }}
				>
					Fluctus
				</Link>

				<div className='hidden lg:flex items-center gap-8'>
					{homePageNavbar.map(item => (
						<a
							key={item.href}
							href={`#${item.href.toLowerCase()}`}
							onClick={e => handleScroll(e, item.href.toLowerCase())}
							className={`relative text-sm font-medium transition-colors duration-300 group cursor-pointer
						${
							theme === 'dark'
								? 'text-white hover:text-gray-300'
								: 'text-black hover:text-gray-800'
						}`}
						>
							{item.label}
							<span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-[rgb(239,252,118)] transition-all duration-300 group-hover:w-full'></span>
						</a>
					))}
				</div>

				{!isMobile && <ModeToggle />}
				<Link
					href='/auth/signin'
					className='hidden lg:flex items-center px-5 py-2.5 text-sm font-semibold 
                    text-black dark:text-[rgb(16,16,16)] bg-[rgb(239,252,118)] rounded-xl 
                    hover:bg-[rgb(220,232,99)] transition-all duration-300 hover:scale-105 active:scale-95'
				>
					Sign In
				</Link>

				<BurgerMenu className='lg:hidden' />
			</div>
		</motion.nav>
	)
}

export default Navbar
