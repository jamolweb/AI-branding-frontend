'use client'

import { motion } from 'framer-motion'
import { Atom, Brain, LineChart, Settings, Sparkles } from 'lucide-react'

const features = [
	{
		icon: <Atom className='w-6 h-6' />,
		title: 'State-of-the-art algorithms',
		description:
			'Leverage cutting-edge AI algorithms to solve complex problems with unprecedented accuracy.',
		className: 'col-span-1',
	},
	{
		icon: <Brain className='w-6 h-6' />,
		title: 'Customizable solutions',
		description:
			'Tailor AI solutions to your specific needs with flexible and adaptable frameworks.',
		className: 'col-span-1',
	},
	{
		icon: <LineChart className='w-6 h-6' />,
		title: 'Real-time insights',
		description:
			'Get instant analytics and actionable insights to make data-driven decisions faster.',
		className: 'col-span-1',
	},
	{
		icon: <Settings className='w-6 h-6' />,
		title: 'Integration capabilities',
		description:
			'Seamlessly integrate AI solutions with your existing systems and workflows.',
		className: 'col-span-1',
	},
	{
		icon: <Sparkles className='w-6 h-6' />,
		title: 'Continuous improvement',
		description:
			'Benefit from self-learning systems that evolve and improve over time.',
		className: 'col-span-1',
	},
]

const FeaturesSection = () => {
	return (
		<section className='py-20 bg-transparent'>
			<div className='max-w-4xl mx-auto text-center mb-16 bg-transparent'>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-4xl md:text-5xl font-medium leading-tight mb-6'
				>
					Harness the power{' '}
					<span className='inline-block'>
						<Sparkles className='w-10 h-10 inline text-[rgb(239,252,118)]' />
					</span>{' '}
					of artificial intelligence
					<br />
					to drive innovation, boost efficiency and unlock
					<br />
					new possibilities{' '}
					<span className='inline-block'>
						<Settings className='w-10 h-10 inline text-[rgb(239,252,118)]' />
					</span>{' '}
					for your organization.
				</motion.h2>
			</div>

			<div className='flex flex-wrap justify-center gap-4 max-w-5xl mx-auto'>
				{features.map((feature, index) => (
					<motion.div
						key={feature.title}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						className={`${feature.className} ${index >= 3 ? 'md:ml-8' : ''}`}
					>
						<div className='bg-[#1E1E1E] rounded-2xl p-2 flex items-center gap-3 min-w-[280px] hover:bg-[#252525] transition-all duration-300'>
							<div className='bg-[rgb(239,252,118)] rounded-xl w-11 h-11 flex items-center justify-center shrink-0'>
								<div className='text-black'>{feature.icon}</div>
							</div>
							<h3 className='text-[15px] font-medium text-white/90'>
								{feature.title}
							</h3>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}

export default FeaturesSection
