'use client'

import { homePageNavbar } from '@/data/siteData'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BurgerMenu from './BurgerMenu'

const Navbar = () => {
	return (
		<motion.nav
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='fixed top-0 left-0 right-0 z-50 mx-4 mt-4'
		>
			<div
				className='flex items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-[25px] bg-white/[0.06] shadow-lg border border-white/[0.08]'
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
					className='text-2xl font-bold text-white tracking-tight hover:text-[rgb(239,252,118)] transition-colors duration-300'
				>
					Fluctus
				</Link>

				<div className='hidden lg:flex items-center gap-8'>
					{homePageNavbar.map(item => (
						<Link
							key={item.href}
							href={`/#${item.href.toLowerCase()}`}
							className='relative text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 group'
						>
							{item.label}
							<span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-[rgb(239,252,118)] transition-all duration-300 group-hover:w-full'></span>
						</Link>
					))}
				</div>

				<Link
					href='/auth/signin'
					className='hidden lg:flex items-center px-6 py-2.5 text-sm font-semibold text-black bg-[rgb(239,252,118)] rounded-xl hover:bg-[rgb(220,232,99)] transition-all duration-300 hover:scale-105 active:scale-95'
				>
					Sigin
				</Link>

				<BurgerMenu className='lg:hidden' />
			</div>
		</motion.nav>
	)
}

export default Navbar
