'use client'

import SectionName from '@/components/ui/homePage/SectionName'
import SectionTitle from '@/components/ui/homePage/sectionTitle'
import { plans } from '@/data/siteData'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import StarBackground from './StarBackground'

const PlansSection = () => {
	const { theme } = useTheme()
	const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
		'monthly'
	)

	return (
		<section
			id='pricing'
			className='py-20'
			style={{
				fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
				backgroundColor: theme === 'dark' ? 'transparent' : '#f9f9f9',
			}}
		>
			<SectionName name='plans' title='Our plans' />

			<SectionTitle
				title='Pricing plans that scale with You'
				description={`Choose the perfect plan for your business with our straightforward pricing tiers designed for every stage of AI adoption.`}
			/>
			<div className='flex items-center gap-4 mt-13 mb-5'>
				<div className='flex items-center justify-center'>
					<p
						className={`text-sm font-medium ${
							billingCycle === 'monthly'
								? theme === 'dark'
									? 'text-white'
									: 'text-gray-900'
								: theme === 'dark'
								? 'text-gray-400'
								: 'text-gray-500'
						}`}
					>
						Monthly
					</p>
				</div>

				<div
					className={`relative h-7 w-14 rounded-full p-1 cursor-pointer ${
						billingCycle === 'yearly'
							? 'bg-[#EFFC76]'
							: theme === 'dark'
							? 'bg-gray-800'
							: 'bg-gray-300'
					}`}
					onClick={() =>
						setBillingCycle(prev => (prev === 'monthly' ? 'yearly' : 'monthly'))
					}
					role='switch'
					aria-checked={billingCycle === 'yearly'}
					tabIndex={0}
				>
					<div className='relative w-5 h-5'>
						{/* Main toggle circle */}
						<div
							className={`absolute w-5 h-5 rounded-full ${
								theme === 'dark' ? 'bg-black' : 'bg-white'
							} shadow-lg transition-transform duration-300 ${
								billingCycle === 'yearly' ? 'translate-x-7' : ''
							}`}
						></div>
					</div>
				</div>

				<div className='flex items-center justify-center'>
					<p
						className={`text-sm font-medium ${
							billingCycle === 'yearly'
								? theme === 'dark'
									? 'text-white'
									: 'text-gray-900'
								: theme === 'dark'
								? 'text-gray-400'
								: 'text-gray-500'
						}`}
					>
						Yearly
					</p>
				</div>

				<div
					className={`${
						theme === 'dark' ? 'bg-[#101010]' : 'bg-[#333333]'
					} px-3 py-1 rounded-full`}
				>
					<p className='text-xs font-semibold text-[#EFFC76] tracking-tight'>
						Save 20%
					</p>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{plans.map((plan, index) => (
					<div
						key={plan.name}
						className={`relative rounded-xl p-8 overflow-hidden ${
							plan.highlighted
								? theme === 'dark'
									? 'bg-[#1A1F1A] border border-[#E2FF3F]/20'
									: 'bg-[#f5f9f5] border border-[#E2FF3F]/30'
								: theme === 'dark'
								? 'bg-[#141414]'
								: 'bg-white shadow-md'
						}`}
						style={
							index === 1
								? {
										background:
											theme === 'dark'
												? 'radial-gradient(110.05833075471149% 94.07658768529376% at 50.000003279993855% 5.923412314706233%, rgba(239, 252, 118, 0.3) 0%, rgb(16, 16, 16) 100%)'
												: 'radial-gradient(110.05833075471149% 94.07658768529376% at 50.000003279993855% 5.923412314706233%, rgba(239, 252, 118, 0.3) 0%, rgb(255, 255, 255) 100%)',
										borderRadius: '16px',
										boxShadow:
											theme === 'dark'
												? 'rgba(0, 0, 0, 0.29) 0px 2px 4px 0px, rgba(0, 0, 0, 0.26) 0px 8px 8px 0px, rgba(0, 0, 0, 0.15) 0px 17px 10px 0px, rgba(0, 0, 0, 0.04) 0px 31px 12px 0px, rgba(0, 0, 0, 0.01) 0px 48px 13px 0px, rgba(0, 0, 0, 0.2) 0px -3px 7px 0px inset, rgba(0, 0, 0, 0.17) 1px -14px 14px 0px inset, rgba(0, 0, 0, 0.1) 3px -30px 18px 0px inset, rgba(0, 0, 0, 0.03) 5px -54px 22px 0px inset, rgba(0, 0, 0, 0) 7px -84px 24px 0px inset, rgba(255, 255, 255, 0.15) 0px 1px 0px 1px inset'
												: 'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.06) 0px 8px 8px 0px, rgba(226, 255, 63, 0.2) 0px 1px 0px 1px inset',
										opacity: 1,
								  }
								: {}
						}
					>
						{index === 1 && <StarBackground />}
						<div className='relative z-10'>
							<h3
								className={`text-2xl font-semibold mb-2 font-manrope tracking-[-0.03em] leading-[1.2em] ${
									theme === 'dark' ? 'text-white' : 'text-gray-900'
								}`}
								style={{
									fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
								}}
							>
								{plan.name}
							</h3>
							<p
								className={`${
									theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
								} mb-8`}
								style={{
									fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
									fontSize: '16px',
									fontWeight: 500,
									letterSpacing: '-0.01em',
									lineHeight: '1.5em',
									fontFeatureSettings:
										'"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on',
								}}
							>
								{plan.description}
							</p>
							<div className='mb-8'>
								{plan.priceMonthly || plan.priceYearly ? (
									<div className='flex items-start text-[#effc76] mt-5'>
										<span
											style={{
												fontFamily:
													'"Manrope", "Manrope Placeholder", sans-serif',
												fontSize: '60px',
												fontWeight: 600,
												letterSpacing: '-0.02em',
												lineHeight: '120%',
											}}
											className={`text-4xl font-bold ${
												theme === 'dark' ? 'text-[#E2FF3F]' : 'text-gray-900'
											}`}
										>
											$
										</span>
										<span
											style={{
												fontFamily:
													'"Manrope", "Manrope Placeholder", sans-serif',
												fontSize: '60px',
												fontWeight: 600,
												letterSpacing: '-0.02em',
												lineHeight: '120%',
											}}
											className={`${
												theme === 'dark' ? 'text-[#E2FF3F]' : 'text-gray-900'
											}`}
										>
											{billingCycle === 'monthly'
												? plan.priceMonthly
												: plan.priceYearly}
										</span>
									</div>
								) : (
									<span
										style={{
											fontFamily:
												'"Manrope", "Manrope Placeholder", sans-serif',
											fontSize: '60px',
											fontWeight: 600,
											letterSpacing: '-0.02em',
											lineHeight: '120%',
										}}
										className={`${
											theme === 'dark' ? 'text-[#E2FF3F]' : 'text-gray-900'
										}`}
									>
										{plan.price}
									</span>
								)}
								<div
									style={{
										color:
											theme === 'dark'
												? 'rgb(153, 153, 153)'
												: 'rgb(107, 114, 128)',
										fontSize: '16px',
										fontWeight: 500,
										letterSpacing: '-0.01em',
										lineHeight: '1.5em',
										fontFeatureSettings:
											'"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on',
									}}
								>
									per month{billingCycle === 'yearly' && ', billed annually'}
								</div>
							</div>
							<button
								className={`w-full py-3 px-6 rounded-lg mb-8 ${
									plan.highlighted
										? 'bg-[#E2FF3F] text-black hover:bg-[#E2FF3F]/90'
										: theme === 'dark'
										? 'bg-gray-800 hover:bg-gray-700 text-white'
										: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
								} transition-colors`}
							>
								Get Started
							</button>
							<div
								style={{
									background:
										theme === 'dark'
											? 'linear-gradient(90deg, rgba(213, 213, 213, 0.16) 0%, rgba(213, 213, 213, 0.64) 50%, rgba(213, 213, 213, 0.16) 100%)'
											: 'linear-gradient(90deg, rgba(213, 213, 213, 0.3) 0%, rgba(213, 213, 213, 0.8) 50%, rgba(213, 213, 213, 0.3) 100%)',
									opacity: 1,
									flex: 'none',
									height: '1px',
									overflow: 'hidden',
									position: 'relative',
									width: '100%',
									marginBottom: '25px',
								}}
							></div>
							<ul className='space-y-4'>
								{plan.features.map((feature, index) => (
									<li key={feature} className='flex items-start gap-3'>
										<motion.div
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												duration: 0.3,
												delay: index * 0.1,
												ease: 'easeOut',
											}}
											className='flex items-center gap-3'
										>
											<svg
												viewBox='0 0 24 24'
												fill='none'
												className='w-6 h-6 text-[#E2FF3F] flex-shrink-0'
											>
												<path
													d='M20 6L9 17L4 12'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
											<motion.span
												className={`font-["Manrope"] ${
													theme === 'dark' ? 'text-white' : 'text-gray-800'
												} text-[15px] font-medium tracking-[-.01em] leading-[1.5em]`}
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													duration: 0.3,
													delay: index * 0.1 + 0.1,
													ease: 'easeOut',
												}}
											>
												{feature}
											</motion.span>
										</motion.div>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default PlansSection
