import { motion } from 'framer-motion'
import { FlowerIcon, RefreshCw, StarIcon, Sun } from 'lucide-react'

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
	contact: (
		<div className='w-7 h-7 rounded-full flex items-center justify-center'>
			<Sun className='w-7 h-7 text-[#effc76]' />
		</div>
	),
}

const SectionName = ({ name, title }: { name: string; title: string }) => {
	return (
		<motion.div
			className='flex items-center gap-3 w-fit px-4 py-2 mb-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			style={{
				backgroundColor: 'rgb(45, 45, 45)',
				borderRadius: '16px',
				boxShadow:
					'rgba(0, 0, 0, 0.435) 0px -0.597144px 1.31372px -1.125px inset, rgba(0, 0, 0, 0.4) 0px -1.81088px 3.98394px -2.25px inset, rgba(0, 0, 0, 0.32) 0px -4.78699px 10.5314px -3.375px inset, rgba(0, 0, 0, 0.05) 0px -15px 33px -4.5px inset, rgba(0, 0, 0, 0.075) 0px 0.602187px 0.843062px -0.166667px, rgba(0, 0, 0, 0.14) 0px 2.28853px 3.20395px -0.333333px, rgba(0, 0, 0, 0.45) 0px 10px 14px -0.5px',
				opacity: 1,
			}}
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
