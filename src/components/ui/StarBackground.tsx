'use client'

import { motion } from 'framer-motion'

const StarBackground = () => {
	return (
		<div className='absolute inset-0 overflow-hidden pointer-events-none'>
			<div className='absolute inset-0 bg-gradient-to-b from-[#effc76]/10 to-transparent opacity-[0.15]' />
			{[...Array(15)].map((_, i) => (
				<motion.div
					key={i}
					className='absolute w-1 h-1 bg-[#effc76] rounded-full'
					initial={{
						opacity: 0,
						scale: 0,
						x: `${Math.random() * 80 + 10}%`,
						y: `${Math.random() * 80 + 10}%`,
					}}
					animate={{
						opacity: [0, 1, 0],
						scale: [0, 1, 0],
						x: `${Math.random() * 80 + 10}%`,
						y: `${Math.random() * 80 + 10}%`,
					}}
					transition={{
						duration: Math.random() * 2 + 2,
						repeat: Infinity,
						delay: Math.random() * 2,
						ease: 'easeInOut',
					}}
					style={{
						left: `${Math.random() * 80 + 10}%`,
						top: `${Math.random() * 80 + 10}%`,
					}}
				/>
			))}
		</div>
	)
}

export default StarBackground
