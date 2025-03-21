import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const SectionTitle = ({
	title,
	description,
}: {
	title: string
	description: string
}) => {
	const { theme } = useTheme()

	return (
		<>
			<motion.h1
				className={`text-4xl md:text-[44px] lg:text-[50px] font-semibold mb-4 ${
					theme === 'dark' ? 'text-white' : 'text-black'
				} font-manrope`}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{title}
			</motion.h1>
			<motion.p
				className={`text-[16px] ${
					theme === 'dark' ? 'text-gray-300' : 'text-black'
				} mb-12 md:mb-16 max-w-2xl font-medium tracking-[-.01em] leading-[1.5em] font-manrope mt-6`}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{description}
			</motion.p>
		</>
	)
}

export default SectionTitle
