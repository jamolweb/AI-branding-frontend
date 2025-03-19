'use client'

import SectionName from '@/components/ui/homePage/SectionName'
import SectionTitle from '@/components/ui/homePage/sectionTitle'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const FaqSection = () => {
	const [openQuestions, setOpenQuestions] = useState<number[]>([0])

	const faqs = [
		{
			question: 'What industries do you serve?',
			answer:
				'We work with clients across various sectors, including healthcare, finance, retail, manufacturing, and technology. Our AI solutions can be adapted to meet the unique challenges of any industry.',
		},
		{
			question: 'How long does it take to implement an AI solution?',
			answer:
				'Implementation timelines vary based on project complexity and scope. We typically provide detailed timelines during initial consultations and work closely with you to ensure efficient deployment.',
		},
		{
			question: 'Do I need a large amount of data to benefit from AI?',
			answer:
				'While more data can lead to better results, we can work with various data volumes. Our solutions can start with smaller datasets and scale as you collect more data over time.',
		},
		{
			question: 'How do you ensure the security and privacy of our data?',
			answer:
				'We implement industry-leading security measures, including encryption, secure access controls, and compliance with data protection regulations. Your data security is our top priority.',
		},
		{
			question: 'Can your AI solutions integrate with our existing systems?',
			answer:
				'Yes, our solutions are designed to seamlessly integrate with your existing infrastructure. We provide comprehensive API documentation and technical support throughout the integration process.',
		},
		{
			question: 'What kind of support do you offer after implementation?',
			answer:
				'We offer various levels of post-implementation support, from basic email support to 24/7 dedicated assistance, depending on your plan. This includes technical support, updates, and optimization services.',
		},
		{
			question: 'How do you stay current with the latest AI advancements?',
			answer:
				'Our team continuously researches and implements the latest AI technologies. We regularly update our solutions to incorporate new advancements and ensure you benefit from cutting-edge AI capabilities.',
		},
		{
			question: 'Can you help us develop an AI strategy for our business?',
			answer:
				'Absolutely! We offer strategic consulting services to help you identify opportunities for AI implementation, develop a roadmap, and maximize the value of AI for your business.',
		},
	]

	const toggleQuestion = (index: number) => {
		setOpenQuestions(prev => {
			if (prev.includes(index)) {
				return prev.filter(i => i !== index)
			}
			return [...prev, index]
		})
	}

	return (
		<section className='py-20'>
			<SectionName name='faq' title='FAQ' />
			<SectionTitle
				title='What You need to know'
				description={`Quick answers to the most common questions about our AI solutions and services.`}
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{faqs.map((faq, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: index * 0.1,
							ease: [0.23, 1, 0.32, 1],
						}}
					>
						<div
							className={`w-full rounded-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`}
						>
							<button
								className='w-full text-left px-0 py-4'
								onClick={() => toggleQuestion(index)}
							>
								<div className='flex justify-between items-start'>
									<h3
										className={`text-xl font-medium transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
											openQuestions.includes(index)
												? 'text-[#effc76]'
												: 'text-[#d5d5d5]'
										}`}
									>
										{faq.question}
									</h3>
									<motion.div
										className='ml-4 flex-shrink-0'
										animate={{
											rotate: openQuestions.includes(index) ? 45 : 0,
										}}
										transition={{
											duration: 0.4,
											ease: [0.23, 1, 0.32, 1],
										}}
									>
										<Plus
											className={`w-6 h-6 transition-colors duration-500 ${
												openQuestions.includes(index)
													? 'text-[#effc76]'
													: 'text-[#effc76]/70'
											}`}
										/>
									</motion.div>
								</div>
							</button>
							<AnimatePresence mode='sync'>
								{openQuestions.includes(index) && (
									<motion.div
										initial={{
											height: 0,
											opacity: 0,
											marginTop: 0,
											scale: 0.98,
										}}
										animate={{
											height: 'auto',
											opacity: 1,
											marginTop: 8,
											scale: 1,
											transition: {
												height: {
													duration: 0.5,
													ease: [0.23, 1, 0.32, 1],
												},
												opacity: {
													duration: 0.4,
													delay: 0.1,
												},
												scale: {
													duration: 0.5,
													ease: [0.23, 1, 0.32, 1],
												},
											},
										}}
										exit={{
											height: 0,
											opacity: 0,
											marginTop: 0,
											scale: 0.98,
											transition: {
												height: {
													duration: 0.4,
													ease: [0.23, 1, 0.32, 1],
												},
												opacity: { duration: 0.3 },
												scale: {
													duration: 0.4,
													ease: [0.23, 1, 0.32, 1],
												},
											},
										}}
										className='overflow-hidden px-0'
									>
										<motion.p
											initial={{ y: 20, opacity: 0 }}
											animate={{
												y: 0,
												opacity: 1,
												transition: {
													duration: 0.5,
													ease: [0.23, 1, 0.32, 1],
												},
											}}
											exit={{
												y: 10,
												opacity: 0,
												transition: {
													duration: 0.3,
													ease: [0.23, 1, 0.32, 1],
												},
											}}
											className='text-gray-300 leading-relaxed text-[18px] font-medium'
										>
											{faq.answer}
										</motion.p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}

export default FaqSection
