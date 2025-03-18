'use client'

import { homePageNavbar } from '@/data/siteData'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface BurgerMenuProps {
	className?: string
	theme?: 'light' | 'dark'
}

const menuVariants = {
	closed: {
		opacity: 0,
		y: -20,
	},
	open: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	closed: { opacity: 0, x: -20 },
	open: { opacity: 1, x: 0 },
}

const BurgerMenu = ({ className = '', theme = 'dark' }: BurgerMenuProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const textColor = theme === 'light' ? 'text-black/90' : 'text-white/90'
	const textHoverColor = theme === 'light' ? 'text-black' : 'text-white'
	const lineColor = theme === 'light' ? 'bg-black' : 'bg-white'
	const hoverBgColor =
		theme === 'light' ? 'hover:bg-black/[0.05]' : 'hover:bg-white/[0.03]'

	return (
		<div className={`lg:hidden ${className}`}>
			<motion.button
				className='relative z-50 p-2 group'
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Toggle Menu'
				whileTap={{ scale: 0.95 }}
			>
				<div className='flex flex-col gap-1.5 w-7'>
					<motion.span
						animate={{
							rotate: isOpen ? 45 : 0,
							y: isOpen ? 8 : 0,
							width: isOpen ? '100%' : '100%',
						}}
						className={`block h-[2px] ${lineColor} origin-center transition-all duration-300 ease-out ${
							!isOpen && 'group-hover:w-5'
						}`}
					/>
					<motion.span
						animate={{
							opacity: isOpen ? 0 : 1,
							width: isOpen ? '0%' : '100%',
						}}
						className={`block h-[2px] ${lineColor} origin-center transition-all duration-300 ease-out ${
							!isOpen && 'group-hover:w-6'
						}`}
					/>
					<motion.span
						animate={{
							rotate: isOpen ? -45 : 0,
							y: isOpen ? -8 : 0,
							width: isOpen ? '100%' : '100%',
						}}
						className={`block h-[2px] ${lineColor} origin-center transition-all duration-300 ease-out ${
							!isOpen && 'group-hover:w-4'
						}`}
					/>
				</div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed inset-0 z-40'
							onClick={() => setIsOpen(false)}
						/>

						<motion.div
							variants={menuVariants}
							initial='closed'
							animate='open'
							exit='closed'
							className='fixed z-50 top-20 left-4 right-4'
							onClick={e => e.stopPropagation()}
						>
							<div className='rounded-2xl overflow-hidden glass-light shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'>
								<div className='p-6'>
									<nav className='flex flex-col space-y-3'>
										{homePageNavbar.map((item, index) => (
											<motion.div
												key={item.href}
												variants={itemVariants}
												custom={index}
											>
												<Link
													href={item.href}
													className={`block px-4 py-3.5 text-[17px] font-medium ${textColor} ${textHoverColor} rounded-xl transition-all duration-300 ${hoverBgColor} flex items-center`}
													onClick={() => setIsOpen(false)}
												>
													{item.icon && (
														<span className='mr-3'>{item.icon}</span>
													)}
													{item.label}
												</Link>
											</motion.div>
										))}
									</nav>

									<motion.div variants={itemVariants} className='mt-6'>
										<Link
											href='/#get-template'
											className='block w-full py-4 bg-[rgb(239,252,118)] text-black text-center font-medium rounded-xl hover:bg-[rgb(220,232,99)] active:scale-95 transition-all duration-300'
											onClick={() => setIsOpen(false)}
											style={{
												fontSize: '17px',
											}}
										>
											Get Template
										</Link>
									</motion.div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default BurgerMenu
