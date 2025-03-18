import Link from 'next/link'

const HeroSection = () => {
	return (
		<div className='flex flex-col items-center text-center pt-16 pb-24'>
			{/* Logo icon */}
			<div
				className='bg-zinc-900/80 p-4 rounded-2xl mb-12 relative shadow-lg backdrop-blur-md'
				style={{
					boxShadow:
						'rgba(0, 0, 0, 0.3) 0px 4px 10px, rgba(0, 0, 0, 0.2) 0px 10px 20px -5px',
					backdropFilter: 'blur(10px)',
					WebkitBackdropFilter: 'blur(10px)',
					borderTop: '1px solid rgba(255, 255, 255, 0.1)',
				}}
			>
				<div className='text-yellow-300 w-14 h-14 flex items-center justify-center'>
					<svg viewBox='0 0 24 24' fill='none' className='w-full h-full'>
						<path
							d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
							fill='currentColor'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
			</div>

			{/* Main heading */}
			<h1 className='text-white text-5xl md:text-6xl font-bold max-w-4xl leading-tight mb-6'>
				Empowering the Future with Artificial Intelligence
			</h1>

			{/* Description */}
			<p className='text-white/80 text-xl max-w-2xl mb-12'>
				Fluctus is a flexible and user-friendly template for AI startups to
				showcase their solutions and drive business growth.
			</p>

			{/* CTA buttons */}
			<div className='flex gap-4'>
				<Link
					href='/#services'
					className='bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-medium transition-colors'
					style={{
						boxShadow:
							'rgba(0, 0, 0, 0.29) 0px -2px 3px 0px inset, rgba(0, 0, 0, 0.26) 0px -6px 6px 0px inset, rgba(0, 0, 0, 0.15) 0px -14px 8px 0px inset, rgba(0, 0, 0, 0.04) 0px -25px 10px 0px inset, rgba(0, 0, 0, 0.01) 0px -39px 11px 0px inset',
					}}
				>
					Our services
				</Link>
				<Link
					href='/#contact'
					className='bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-medium transition-colors'
					style={{
						boxShadow:
							'rgba(0, 0, 0, 0.17) 1px -14px 14px 0px inset, rgba(0, 0, 0, 0.1) 3px -30px 18px 0px inset, rgba(0, 0, 0, 0.03) 5px -54px 22px 0px inset, rgba(0, 0, 0, 0) 7px -84px 24px 0px inset',
					}}
				>
					Contact us
				</Link>
			</div>
		</div>
	)
}

export default HeroSection
