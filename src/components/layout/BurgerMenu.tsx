'use client'

import Link from 'next/link'
import { useState } from 'react'

interface BurgerMenuProps {
	className?: string
}

const BurgerMenu = ({ className = '' }: BurgerMenuProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const menuItemStyle = {
		backdropFilter: 'blur(25px)',
		WebkitBackdropFilter: 'blur(25px)',
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: '16px',
		boxShadow: 'rgba(255, 255, 255, 0.15) 0px -1px 0px 0px inset',
		transform: 'none',
		transformOrigin: '50% 50% 0px',
		opacity: 1,
	}

	return (
		<div className={`lg:hidden ${className}`}>
			{/* Burger Button */}
			<button
				className='relative z-50 p-2 group'
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Toggle Menu'
			>
				<div className='flex flex-col gap-1.5 w-6'>
					<span
						className={`block h-0.5 w-full bg-white transition-all duration-300 ease-in-out origin-center ${
							isOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-4'
						}`}
					/>
					<span
						className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${
							isOpen ? 'opacity-0 w-0' : 'w-full group-hover:w-5'
						}`}
					/>
					<span
						className={`block h-0.5 w-full bg-white transition-all duration-300 ease-in-out origin-center ${
							isOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-3'
						}`}
					/>
				</div>
			</button>

			{/* Menu Overlay */}
			<div
				className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
					isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
				}`}
				style={{
					background: 'rgba(16, 16, 16, 0.9)',
					...menuItemStyle,
				}}
			>
				<div className='relative flex flex-col h-full px-6 py-4'>
					{/* Top Bar */}
					<div className='flex justify-between items-center py-4 mb-10'>
						{/* Logo */}
						<Link
							href='/'
							className='text-[22px] font-medium text-white hover:opacity-80 transition-opacity'
							onClick={() => setIsOpen(false)}
						>
							Fluctus
						</Link>

						{/* Close button */}
						<button
							onClick={() => setIsOpen(false)}
							className='text-white/60 hover:text-white transition-all duration-300 p-2 hover:rotate-90'
							aria-label='Close Menu'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								className='transition-transform duration-300'
							>
								<path d='M18 6L6 18M6 6l12 12' />
							</svg>
						</button>
					</div>

					{/* Navigation Links Container */}
					<div className='relative rounded-2xl' style={menuItemStyle}>
						<nav className='flex flex-col p-4'>
							{[
								{ href: '/#services', label: 'Services' },
								{ href: '/#process', label: 'Process' },
								{ href: '/#pricing', label: 'Pricing' },
								{ href: '/#faq', label: 'FAQ' },
								{ href: '/#contact', label: 'Contact' },
							].map((item, index) => (
								<Link
									key={item.href}
									href={item.href}
									className={`text-[17px] text-white/60 hover:text-white transition-all duration-300 py-4 px-4 rounded-xl hover:bg-white/5 ${
										index !== 4 ? 'border-b border-white/5' : ''
									}`}
									onClick={() => setIsOpen(false)}
									style={{
										transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
										opacity: isOpen ? 1 : 0,
										transitionDelay: `${index * 100}ms`,
									}}
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Get Template Button */}
					<Link
						href='/#get-template'
						className='mt-auto mb-6 w-full py-4 bg-[rgb(239,252,118)] text-black text-center font-medium rounded-xl hover:bg-[rgb(220,232,99)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
						onClick={() => setIsOpen(false)}
						style={{
							fontSize: '17px',
							borderRadius: '12px',
							transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
							opacity: isOpen ? 1 : 0,
							transitionDelay: '500ms',
						}}
					>
						Get Template
					</Link>
				</div>
			</div>
		</div>
	)
}

export default BurgerMenu
