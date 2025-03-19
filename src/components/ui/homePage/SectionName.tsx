import { motion } from 'framer-motion'
import { FlowerIcon, RefreshCw, StarIcon } from 'lucide-react'

const icons = {
	process: (
		<div className='w-7 h-7 rounded-full flex items-center justify-center'>
			<RefreshCw className='w-7 h-7 text-[#E2FF3F]' />
		</div>
	),
	plans: (
		<div className='w-7 h-7 rounded-full flex items-center justify-center'>
			<StarIcon className='w-7 h-7 text-[#E2FF3F]' />
		</div>
	),
	faq: (
		<div className='w-7 h-7 rounded-full flex items-center justify-center'>
			<FlowerIcon className='w-7 h-7 text-[#effc76]' />
		</div>
	),
}

const SectionName = ({ name, title }: { name: string; title: string }) => {
	return (
		<motion.div
			className='flex items-center gap-3 bg-zinc-900/80 w-fit px-4 py-2 rounded-full mb-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{icons[name as keyof typeof icons]}
			<span
				style={{
					fontFamily: '"Satoshi", "Satoshi Placeholder", sans-serif',
					fontSize: '20px',
				}}
			>
				{title}
			</span>
		</motion.div>
	)
}

export default SectionName
