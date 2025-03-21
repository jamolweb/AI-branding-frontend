'use client'

import SectionName from '@/components/ui/homePage/SectionName'
import SectionTitle from '@/components/ui/homePage/sectionTitle'
import { faqs } from '@/data/siteData'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

const FaqSection = () => {
	const [openQuestions, setOpenQuestions] = useState<number[]>([0])
	const { theme } = useTheme()

	const toggleQuestion = (index: number) => {
		setOpenQuestions(prev => {
			if (prev.includes(index)) {
				return prev.filter(i => i !== index)
			}
			return [...prev, index]
		})
	}

	return (
		<section id='faq' className='py-20'>
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
										className={`text-lg font-medium transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
											openQuestions.includes(index)
												? theme === 'dark'
													? 'text-[#E2FF3F]'
													: 'text-gray-900'
												: theme === 'dark'
												? 'text-gray-300'
												: 'text-gray-500'
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
													? theme === 'dark'
														? 'text-[#E2FF3F]'
														: 'text-gray-900'
													: theme === 'dark'
													? 'text-gray-400'
													: 'text-gray-500'
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
											className={`leading-relaxed text-base font-medium ${
												theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
											}`}
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
