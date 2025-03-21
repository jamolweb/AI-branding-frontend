'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Star {
	id: number
	x: number
	y: number
	size: number
	opacity: number
	speed: number
	angle: number
}

const TestimonialWithStars = () => {
	const [stars, setStars] = useState<Star[]>([])
	const animationRef = useRef<number | undefined>(undefined)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const generateStars = () => {
			const newStars: Star[] = []
			for (let i = 0; i < 70; i++) {
				newStars.push({
					id: i,
					x: Math.random() * 100,
					y: Math.random() * 100,
					size: 0.5 + Math.random() * 2,
					opacity: 0.2 + Math.random() * 0.8,
					speed: 0.021 + Math.random() * 0.056,
					angle: Math.random() * Math.PI * 2,
				})
			}
			setStars(newStars)
		}

		const animateStars = () => {
			setStars(prevStars =>
				prevStars.map(star => {
					let newX = star.x + Math.cos(star.angle) * star.speed
					let newY = star.y + Math.sin(star.angle) * star.speed

					if (newX <= 0 || newX >= 100) {
						star.angle = Math.PI - star.angle + (Math.random() * 0.2 - 0.1)
						newX = Math.max(0, Math.min(100, newX))
					}
					if (newY <= 0 || newY >= 100) {
						star.angle = -star.angle + (Math.random() * 0.2 - 0.1)
						newY = Math.max(0, Math.min(100, newY))
					}

					return {
						...star,
						x: newX,
						y: newY,
					}
				})
			)

			animationRef.current = requestAnimationFrame(animateStars)
		}

		generateStars()
		animationRef.current = requestAnimationFrame(animateStars)

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className='relative flex items-center justify-center w-full overflow-hidden p-12 mt-12'
			style={{
				height: '320px',
				background:
					'radial-gradient(49% 100% at 50% 0%, rgba(144, 128, 255, 0.3) 0%, rgb(16, 16, 16) 100%)',
				borderRadius: '24px',
				boxShadow: 'rgba(255, 255, 255, 0.15) 0px 1px 1px 1px inset',
			}}
		>
			<div className='absolute inset-0 w-full h-full'>
				{stars.map(star => (
					<div
						key={star.id}
						className='absolute rounded-full bg-white'
						style={{
							top: `${star.y}%`,
							left: `${star.x}%`,
							width: `${star.size}px`,
							height: `${star.size}px`,
							opacity: star.opacity,
							transition: 'opacity 0.5s ease-in-out',
							filter: star.size > 1.5 ? 'blur(1px)' : 'none',
						}}
					/>
				))}
			</div>

			<div
				className='absolute'
				style={{
					top: '-10%',
					left: '50%',
					transform: 'translateX(-50%)',
					width: '60%',
					height: '40%',
					background: 'rgba(144, 128, 255, 0.08)',
					filter: 'blur(50px)',
					borderRadius: '50%',
				}}
			/>

			<div className='flex flex-row items-center z-10 gap-8 w-full max-w-4xl'>
				<div className='relative w-32 h-32 flex-shrink-0'>
					<div
						className='absolute inset-0 rounded-xl'
						style={{
							background: 'rgba(144, 128, 255, 0.1)',
							filter: 'blur(8px)',
							transform: 'scale(1.1)',
						}}
					/>
					<div className='w-full h-full rounded-xl overflow-hidden relative'>
						<Image
							src='/testimonials/marcus-thompson.png'
							alt='Marcus Thompson'
							width={300}
							height={300}
							className='w-full h-full object-cover brightness-90'
							style={{
								filter: 'sepia(0.3) contrast(1.05)',
							}}
						/>
					</div>
				</div>

				<div className='flex flex-col text-white'>
					<blockquote className='text-2xl font-medium mb-4 leading-tight'>
						"Their predictive analytics gave us market forecasting accuracy we
						never thought was possible."
					</blockquote>

					<div>
						<p className='font-semibold text-white'>Marcus Thompson</p>
						<p className='text-gray-400 text-sm'>
							VP of Innovation, Axiom Forge
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TestimonialWithStars
