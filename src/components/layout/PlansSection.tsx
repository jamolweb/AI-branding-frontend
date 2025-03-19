'use client'

import { motion } from 'framer-motion'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'

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
		<section className='py-20'>
			{/* Header */}
			<motion.div
				className='flex items-center gap-2 bg-zinc-900/80 w-fit px-4 py-2 rounded-full mb-6'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className='w-6 h-6 rounded-full flex items-center justify-center'>
					<StarIcon className='w-6 h-6 text-[#E2FF3F]' />
				</div>
				<span className='text-sm font-medium'>Our process</span>
			</motion.div>
			<h1 className='text-5xl font-semibold mb-4'>
				Pricing plans that scale with You
			</h1>
			<p className='text-gray-400 text-xl mb-12'>
				Choose the perfect plan for your business with our straightforward
				pricing tiers designed for every stage of AI adoption.
			</p>

			{/* Billing Toggle */}
			<div className='flex items-center gap-4 mb-12'>
				<span
					className={
						billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'
					}
				>
					Monthly
				</span>
				<button
					onClick={() =>
						setBillingCycle(prev => (prev === 'monthly' ? 'yearly' : 'monthly'))
					}
					className='relative w-14 h-7 bg-gray-800 rounded-full p-1 transition-colors'
				>
					<div
						className={`w-5 h-5 rounded-full bg-[#E2FF3F] transition-transform ${
							billingCycle === 'yearly' ? 'translate-x-7' : ''
						}`}
					/>
				</button>
				<span
					className={billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}
				>
					Yearly
				</span>
				<span className='text-[#E2FF3F] text-sm'>Save 20%</span>
			</div>

			{/* Plans Grid */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{plans.map(plan => (
					<div
						key={plan.name}
						className={`rounded-xl p-8 ${
							plan.highlighted
								? 'bg-[#1A1F1A] border border-[#E2FF3F]/20'
								: 'bg-[#141414]'
						}`}
					>
						<h3 className='text-2xl font-semibold mb-2'>{plan.name}</h3>
						<p className='text-gray-400 mb-8'>{plan.description}</p>
						<div className='mb-8'>
							{typeof plan.price === 'number' ? (
								<div className='flex items-start'>
									<span className='text-4xl font-bold'>$</span>
									<span className='text-6xl font-bold'>{plan.price}</span>
								</div>
							) : (
								<span className='text-6xl font-bold text-[#E2FF3F]'>
									{plan.price}
								</span>
							)}
							<div className='text-gray-400'>per month</div>
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
						<ul className='space-y-4'>
							{plan.features.map(feature => (
								<li key={feature} className='flex items-start gap-3'>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='w-6 h-6 text-[#E2FF3F] mt-1 flex-shrink-0'
									>
										<path
											d='M20 6L9 17L4 12'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									<span className='text-gray-300'>{feature}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	)
}

export default PlansSection
