'use client'

import Link from 'next/link'
import BurgerMenu from './BurgerMenu'

const Navbar = () => {
	return (
		<nav
			className='fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10'
			style={{
				borderRadius: '16px',
				boxShadow: `rgba(0, 0, 0, 0.192) 0px 0.6px 0.84px -1.33px, rgba(0, 0, 0, 0.165) 
				0px 2.29px 3.2px -2.67px, rgba(0, 0, 0, 0.05) 0px 10px 14px -4px',
			backdropFilter: 'blur(15px)',
			WebkitBackdropFilter: 'blur(15px)',
			borderTop: '1px solid rgba(255, 255, 255, 0.15)`,
			}}
		>
			<div className='container mx-auto px-4 py-4 flex justify-between items-center'>
				{/* Logo */}
				<Link href='/' className='text-2xl font-semibold text-white'>
					Fluctus
				</Link>

				{/* Desktop Navigation - Hidden on mobile/tablet */}
				<div className='hidden lg:flex gap-8'>
					<Link
						href='/#services'
						className='text-gray-200 hover:text-white transition-colors'
					>
						Services
					</Link>
					<Link
						href='/#process'
						className='text-gray-200 hover:text-white transition-colors'
					>
						Process
					</Link>
					<Link
						href='/#pricing'
						className='text-gray-200 hover:text-white transition-colors'
					>
						Pricing
					</Link>
					<Link
						href='/#faq'
						className='text-gray-200 hover:text-white transition-colors'
					>
						FAQ
					</Link>
					<Link
						href='/#contact'
						className='text-gray-200 hover:text-white transition-colors'
					>
						Contact
					</Link>
				</div>

				{/* Get Template Button - Hidden on mobile/tablet */}
				<Link
					href='/#get-template'
					className='hidden lg:block bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,99)] text-black px-6 py-2 rounded-xl font-medium transition-colors'
				>
					Get Template
				</Link>

				{/* Burger Menu - Shown only on mobile/tablet */}
				<BurgerMenu className='lg:hidden' />
			</div>
		</nav>
	)
}

export default Navbar
