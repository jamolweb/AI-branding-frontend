'use client'

import Link from 'next/link'
import StarBackground from './StarBackground'

const HeroSection = () => {
	return (
		<div className='relative flex flex-col items-center text-center pt-16 pb-24 overflow-hidden'>
			<StarBackground />

			<div className='framer-content-wrapper flex flex-col items-center text-center pt-16 pb-24'>
				{/* Top icon */}
				<div
					className='framer-1pei8m9 opacity-100 will-change-transform mb-12'
					style={{ transform: 'none' }}
				>
					<div
						className='framer-138gn0k'
						style={{
							imageRendering: 'pixelated',
							flexShrink: 0,
							width: '80px',
							height: '80px',
						}}
						aria-hidden='true'
					>
						<div
							className='svgContainer'
							style={{
								width: '100%',
								height: '100%',
								aspectRatio: 'inherit',
								background: 'rgba(24, 24, 27, 0.8)',
								borderRadius: '16px',
								padding: '14px',
								boxShadow:
									'rgba(0, 0, 0, 0.3) 0px 4px 10px, rgba(0, 0, 0, 0.2) 0px 10px 20px -5px',
								backdropFilter: 'blur(10px)',
								WebkitBackdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
							}}
						>
							<svg
								style={{ width: '100%', height: '100%' }}
								viewBox='0 0 24 24'
								fill='none'
							>
								<path
									d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
									fill='rgb(239, 252, 118)'
									stroke='rgb(239, 252, 118)'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className='framer-heading-wrapper'>
					<div className='framer-text-wrapper flex flex-col gap-5'>
						{/* Main heading */}
						<div className='flex flex-col justify-center opacity-100 flex-shrink-0 will-change-transform'>
							<h1 className='text-white text-5xl md:text-6xl font-bold max-w-4xl leading-tight'>
								Empowering the Future with Artificial Intelligence
							</h1>
						</div>

						{/* Description */}
						<div className='flex flex-col justify-center opacity-100 flex-shrink-0 will-change-transform'>
							<p className='text-white/80 text-xl max-w-2xl mx-auto'>
								Fluctus is a flexible and user-friendly template for AI startups
								to showcase their solutions and drive business growth.
							</p>
						</div>
					</div>

					{/* CTA buttons */}
					<div className='framer-ctas flex gap-4 justify-center mt-12 opacity-100 will-change-transform'>
						<Link
							href='/#services'
							className='bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-medium transition-colors'
							style={{
								backgroundColor: 'rgb(239, 252, 118)',
								borderRadius: '10px',
								boxShadow:
									'rgba(0, 0, 0, 0.29) 0px -2px 3px 0px inset, rgba(0, 0, 0, 0.26) 0px -6px 6px 0px inset, rgba(0, 0, 0, 0.15) 0px -14px 8px 0px inset, rgba(0, 0, 0, 0.04) 0px -25px 10px 0px inset, rgba(0, 0, 0, 0.01) 0px -39px 11px 0px inset',
							}}
						>
							<div className='flex flex-col justify-start flex-shrink-0'>
								<p className='font-medium'>Our services</p>
							</div>
						</Link>
						<Link
							href='/#contact'
							className='bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-medium transition-colors'
							style={{
								backgroundColor: 'rgb(45, 45, 45)',
								borderRadius: '10px',
								boxShadow:
									'rgba(0, 0, 0, 0.17) 1px -14px 14px 0px inset, rgba(0, 0, 0, 0.1) 3px -30px 18px 0px inset, rgba(0, 0, 0, 0.03) 5px -54px 22px 0px inset, rgba(0, 0, 0, 0) 7px -84px 24px 0px inset',
							}}
						>
							<div className='flex flex-col justify-start flex-shrink-0'>
								<p className='font-medium'>Contact us</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
