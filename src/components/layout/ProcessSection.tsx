'use client'

import { useMobile } from '@/hooks/use-mobile'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ProcessSteps() {
	const [isMounted, setIsMounted] = useState(false)
	const isMobile = useMobile()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const steps = [
		{
			number: 1,
			title: 'Discover & Prepare',
			description:
				'We analyze your challenges and organize your data to create the perfect foundation for AI transformation.',
		},
		{
			number: 2,
			title: 'Develop & Test',
			description:
				'Our team builds and validates custom AI solutions precisely matched to your business goals.',
		},
		{
			number: 3,
			title: 'Deploy & Optimize',
			description:
				'We seamlessly integrate your AI solutions and continuously optimize them to deliver lasting value.',
		},
	]

	if (!isMounted) return null

	return (
		<div className='bg-transparent min-h-screen text-white p-4 md:p-8'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					className='flex items-center gap-2 bg-zinc-900/80 w-fit px-4 py-2 rounded-full mb-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='w-6 h-6 rounded-full flex items-center justify-center'>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z'
								fill='#EFFC76'
								fillOpacity='0.8'
							/>
							<path
								d='M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z'
								fill='#EFFC76'
								fillOpacity='0.8'
							/>
							<path
								d='M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z'
								fill='#EFFC76'
								fillOpacity='0.8'
							/>
							<path
								d='M21.17 8.24C21.8 9.41 22.15 10.8 21.96 12.36C21.27 18.08 15.54 21.55 9.82 20.86C4.1 20.17 0.63 14.44 1.32 8.72C2.01 3 7.74 -0.47 13.46 0.22C16.22 0.55 18.53 1.85 20.2 3.79C21.87 5.74 22.65 8.24 22.31 11C21.97 13.76 20.67 16.07 18.73 17.74C16.78 19.41 14.28 20.19 11.52 19.85C8.76 19.51 6.45 18.21 4.78 16.27C3.11 14.32 2.33 11.82 2.67 9.06'
								stroke='#EFFC76'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
					<span className='text-sm font-medium'>Our process</span>
				</motion.div>

				<motion.h1
					className='text-4xl md:text-[44px] lg:text-[50px] font-semibold mb-4'
					style={{ fontFamily: 'Manrope, sans-serif' }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					Simple steps, powerful results
				</motion.h1>
				<motion.p
					className='text-[16px] text-[#d5d5d5] mb-12 md:mb-16 max-w-2xl font-medium tracking-[-.01em] leading-[1.5em]'
					style={{ fontFamily: 'Manrope, sans-serif', marginTop: '25px' }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					We've simplified AI transformation into three clear steps that take
					you <br /> from concept to real-world results.
				</motion.p>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
					{steps.map((step, index) => (
						<motion.div
							key={step.number}
							className='relative'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true, margin: '-100px' }}
						>
							{!isMobile && (
								<div className='absolute top-0 mt-28 left-1/2 -translate-x-1/2 -translate-y-[70%] w-full h-32 pointer-events-none'>
									<RayBurst index={index} />
								</div>
							)}
							<div
								style={{
									backgroundColor: 'black',
									borderRadius: '16px',
									marginTop: '10px',
								}}
							>
								<div
									className={`rounded-2xl overflow-hidden ${
										!isMobile ? 'mt-28' : 'mt-0'
									}`}
								>
									<div className='bg-[#EFFC76FF] rounded-2xl py-2 px-3 flex items-center max-h-[71px]'>
										<div className='w-10 h-10 rounded-full  flex items-center justify-center mr-4 shadow-lg'>
											<span
												className='text-[#EFFC76FF] font-mono font-light text-xl'
												style={{
													fontFamily: 'DM Mono, monospace',
													backgroundColor: 'rgb(45, 45, 45)',
													borderRadius: '108.9px',
													boxShadow:
														'rgba(0, 0, 0, 0.2) 0px -3px 7px 0px inset, rgba(0, 0, 0, 0.17) 1px -14px 14px 0px inset, rgba(0, 0, 0, 0.1) 3px -30px 18px 0px inset, rgba(0, 0, 0, 0.03) 5px -54px 22px 0px inset, rgba(0, 0, 0, 0) 7px -84px 24px 0px inset, rgba(0, 0, 0, 0.29) 0px 2px 4px 0px, rgba(0, 0, 0, 0.26) 0px 8px 8px 0px, rgba(0, 0, 0, 0.15) 0px 17px 10px 0px, rgba(0, 0, 0, 0.04) 0px 31px 12px 0px, rgba(0, 0, 0, 0.01) 0px 48px 13px 0px',
													opacity: 1,
													padding: '0.5rem 1rem',
												}}
											>
												{step.number}
											</span>
										</div>
										<h3 className='text-black text-base md:text-lg lg:text-xl font-semibold'>
											{step.title}
										</h3>
									</div>
									<div className='rounded-b-xl p-6 border border-zinc-800/50 border-t-0 min-h-[120px]'>
										<p
											className='text-[#d5d5d5] text-base lg:text-[15px] md:text-sm'
											style={{
												fontFamily:
													'"Manrope", "Manrope Placeholder", sans-serif',
												fontWeight: 500,
												lineHeight: '1.5em',
												letterSpacing: '-0.01em',
											}}
										>
											{step.description}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}

function RayBurst({ index }: { index: number }) {
	const rayCount = index === 0 ? 5 : index === 1 ? 9 : 15

	return (
		<motion.div
			className='absolute inset-0 flex justify-center'
			initial={{ opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
			viewport={{ once: true }}
		>
			<svg
				width='160'
				height='80'
				viewBox='0 0 160 80'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g>
					{Array.from({ length: rayCount }).map((_, i) => {
						const angle = (Math.PI * i) / (rayCount - 1)
						const endX = 80 + 80 * Math.cos(angle)
						const endY = Math.abs(80 * Math.sin(angle))

						return (
							<motion.line
								key={i}
								x1='80'
								y1='80'
								x2={endX}
								y2={80 - endY}
								stroke='url(#rayGradient)'
								strokeWidth='2.5'
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.8 }}
								transition={{
									duration: 1.2,
									delay: 0.3 + (i / rayCount) * 0.5,
									ease: 'easeOut',
								}}
							/>
						)
					})}
				</g>
				<defs>
					<linearGradient
						id='rayGradient'
						x1='80'
						y1='80'
						x2='80'
						y2='0'
						gradientUnits='userSpaceOnUse'
					>
						<stop stopColor='#EFFC76' stopOpacity='0.9' />
						<stop offset='1' stopColor='#EFFC76' stopOpacity='0' />
					</linearGradient>
				</defs>
			</svg>
		</motion.div>
	)
}
