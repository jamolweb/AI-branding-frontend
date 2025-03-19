'use client'

import SectionName from '@/components/ui/homePage/SectionName'
import SectionTitle from '@/components/ui/homePage/sectionTitle'
import { motion } from 'framer-motion'
import { useState } from 'react'
import StarBackground from './StarBackground'

const PlansSection = () => {
	const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
		'monthly'
	)

	const plans = [
		{
			name: 'Starter',
			description: 'Perfect for small business exploration',
			price: billingCycle === 'monthly' ? 499 : 399,
			features: [
				'Access to 3 pre-trained ML models',
				'10,000 API calls per month',
				'Basic analytics dashboard',
				'Email support (48h response time)',
			],
		},
		{
			name: 'Professional',
			description: 'Growing companies ready to scale',
			price: billingCycle === 'monthly' ? 1999 : 1599,
			features: [
				'2 custom ML models',
				'50,000 API calls per month',
				'Advanced analytics & reporting suite',
				'Priority support (24h response time)',
			],
			highlighted: true,
		},
		{
			name: 'Enterprise',
			description: 'Full AI transformation for enterprises',
			price: 'Custom',
			features: [
				'Unlimited custom model development',
				'Unlimited API calls',
				'Full data governance & compliance',
				'24/7 dedicated support',
			],
		},
	]

	return (
		<section
			className='py-20'
			style={{
				fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
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
							billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'
						}`}
					>
						Monthly
					</p>
				</div>

				<div
					className={`relative h-7 w-14 rounded-full p-1 cursor-pointer ${
						billingCycle === 'yearly' ? 'bg-[#EFFC76]' : 'bg-gray-800'
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
							className={`absolute w-5 h-5 rounded-full bg-black shadow-lg transition-transform duration-300 ${
								billingCycle === 'yearly' ? 'translate-x-7' : ''
							}`}
						></div>
					</div>
				</div>

				<div className='flex items-center justify-center'>
					<p
						className={`text-sm font-medium ${
							billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'
						}`}
					>
						Yearly
					</p>
				</div>

				<div className='bg-[#101010] px-3 py-1 rounded-full'>
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
								? 'bg-[#1A1F1A] border border-[#E2FF3F]/20'
								: 'bg-[#141414]'
						}`}
					>
						{index === 1 && <StarBackground />}
						<div className='relative z-10'>
							<h3
								className='text-2xl font-semibold mb-2 font-manrope tracking-[-0.03em] leading-[1.2em]'
								style={{
									fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
								}}
							>
								{plan.name}
							</h3>
							<p
								className='text-gray-400 mb-8'
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
								{typeof plan.price === 'number' ? (
									<div className='flex items-start text-[#effc76] mt-5'>
										<span
											className='text-4xl font-bold'
											style={{
												fontFamily:
													'"Manrope", "Manrope Placeholder", sans-serif',
												fontSize: '60px',
												fontWeight: 600,
												letterSpacing: '-0.02em',
												lineHeight: '120%',
											}}
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
										>
											{plan.price}
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
										className='text-[#E2FF3F]'
									>
										{plan.price}
									</span>
								)}
								<div
									style={{
										color: 'rgb(153, 153, 153)',
										fontSize: '16px',
										fontWeight: 500,
										letterSpacing: '-0.01em',
										lineHeight: '1.5em',
										fontFeatureSettings:
											'"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on',
									}}
								>
									per month
								</div>
							</div>
							<button
								className={`w-full py-3 px-6 rounded-lg mb-8 ${
									plan.highlighted
										? 'bg-[#E2FF3F] text-black hover:bg-[#E2FF3F]/90'
										: 'bg-gray-800 hover:bg-gray-700'
								} transition-colors`}
							>
								Get Started
							</button>
							<div
								style={{
									background:
										'linear-gradient(90deg, rgba(213, 213, 213, 0.16) 0%, rgba(213, 213, 213, 0.64) 50%, rgba(213, 213, 213, 0.16) 100%)',
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
												className='font-["Manrope"] text-white text-[15px] font-medium tracking-[-.01em] leading-[1.5em]'
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
