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
		y: -10,
		scale: 0.95,
	},
	open: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 30,
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
}

const itemVariants = {
	closed: { opacity: 0, x: -10, y: -10 },
	open: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
}

const BurgerMenu = ({ className = '', theme = 'dark' }: BurgerMenuProps) => {
	const [isOpen, setIsOpen] = useState(false)

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

	const textColor = theme === 'light' ? 'text-black/90' : 'text-white/90'
	const textHoverColor = theme === 'light' ? 'text-black' : 'text-white'
	const lineColor = theme === 'light' ? 'bg-black' : 'bg-white'
	const menuBg = theme === 'light' ? 'bg-white/90' : 'bg-black/95'

	return (
		<div className={`lg:hidden ${className} flex items-center justify-center`}>
			<motion.button
				className='relative z-50 group p-2 rounded-full hover:bg-white/5 transition-colors duration-200 flex items-center justify-center'
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Toggle Menu'
				whileTap={{ scale: 0.95 }}
			>
				<div className='flex flex-col gap-1 w-4'>
					<motion.span
						animate={{
							rotate: isOpen ? 45 : 0,
							y: isOpen ? 5 : 0,
							width: isOpen ? '100%' : '100%',
						}}
						className={`block h-[1.5px] ${lineColor} origin-center transition-all duration-300 ease-out ${
							!isOpen && 'group-hover:w-3.5'
						}`}
					/>
					<motion.span
						animate={{
							opacity: isOpen ? 0 : 1,
							width: isOpen ? '0%' : '100%',
						}}
						className={`block h-[1.5px] ${lineColor} origin-center transition-all duration-300 ease-out ${
							!isOpen && 'group-hover:w-3'
						}`}
					/>
					<motion.span
						animate={{
							rotate: isOpen ? -45 : 0,
							y: isOpen ? -5 : 0,
							width: isOpen ? '100%' : '100%',
						}}
						className={`block h-[1.5px] ${lineColor} origin-center transition-all duration-300 ease-out ${
							!isOpen && 'group-hover:w-2.5'
						}`}
					/>
				</div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={() => setIsOpen(false)}
						/>

						<motion.div
							variants={menuVariants}
							initial='closed'
							animate='open'
							exit='closed'
							className='fixed z-50 top-[4rem] left-0 right-0'
							onClick={e => e.stopPropagation()}
						>
							<div
								className={`overflow-hidden shadow-2xl ${menuBg} backdrop-blur-[25px] border-b border-white/10 rounded-xl`}
							>
								<div className='py-2 px-3 container mx-auto'>
									<nav className='flex flex-col'>
										{homePageNavbar.map((item, index) => (
											<motion.div
												key={item.href}
												variants={itemVariants}
												custom={index}
											>
												<a
													className={`block px-2 py-2 text-[14px] font-medium ${textColor} ${textHoverColor} transition-colors duration-200 flex items-center`}
													key={item.href}
													href={`#${item.href.toLowerCase()}`}
													onClick={e =>
														handleScroll(e, item.href.toLowerCase())
													}
												>
													{item.icon && (
														<span className='mr-3 opacity-70'>{item.icon}</span>
													)}
													{item.label}
												</a>
											</motion.div>
										))}
									</nav>

									<motion.div variants={itemVariants} className='mt-2'>
										<Link
											href='/auth/signin'
											className='block w-full py-2 bg-[rgb(239,252,118)] text-black/90 text-[14px] text-center font-medium rounded-lg hover:bg-[rgb(220,232,99)] active:scale-95 transition-all duration-200'
											onClick={() => setIsOpen(false)}
										>
											Sign In
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
