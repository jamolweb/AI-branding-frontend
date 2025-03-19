import { motion } from 'framer-motion'

const SectionTitle = ({
	title,
	description,
}: {
	title: string
	description: string
}) => {
	return (
		<>
			<motion.h1
				className='text-4xl md:text-[44px] lg:text-[50px] font-semibold mb-4'
				style={{ fontFamily: 'Manrope, sans-serif' }}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{title}
			</motion.h1>
			<motion.p
				className='text-[16px] text-[#d5d5d5] mb-12 md:mb-16 max-w-2xl font-medium tracking-[-.01em] leading-[1.5em]'
				style={{ fontFamily: 'Manrope, sans-serif', marginTop: '25px' }}
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
